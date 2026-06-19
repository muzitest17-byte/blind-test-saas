import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import fetch from 'node-fetch';
import os from 'os';

const app = express();
const httpServer = createServer(app);

const ALLOWED_ORIGINS = [
  'https://blind-test-musique-c.vercel.app',
  'http://localhost:5173',
  'http://localhost:4173',
];

const corsOptions = {
  origin: (origin, cb) => {
    // Autoriser les requêtes sans origin (ex: Postman, mobile)
    if (!origin || ALLOWED_ORIGINS.includes(origin)) return cb(null, true);
    cb(new Error('CORS non autorisé'));
  },
  methods: ['GET', 'POST'],
};

const io = new Server(httpServer, { cors: corsOptions });

app.use(cors(corsOptions));
app.use(express.json({ limit: '50kb' }));

function getLocalIP() {
  const nets = os.networkInterfaces();
  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      if (net.family === 'IPv4' && !net.internal) return net.address;
    }
  }
  return 'localhost';
}

// ─── Rate limiting simple pour /api/preview ───
const previewRequests = new Map();
function isRateLimited(ip, maxPerMinute = 30) {
  const now = Date.now();
  const windowStart = now - 60_000;
  const timestamps = (previewRequests.get(ip) || []).filter(t => t > windowStart);
  if (timestamps.length >= maxPerMinute) return true;
  timestamps.push(now);
  previewRequests.set(ip, timestamps);
  return false;
}

// IP locale pour le QR code (usage réseau local uniquement)
app.get('/api/local-ip', (_req, res) => {
  res.json({ ip: getLocalIP() });
});

// Proxy Deezer pour éviter les problèmes CORS
app.get('/api/preview', async (req, res) => {
  const ip = req.headers['x-forwarded-for']?.split(',')[0] || req.socket.remoteAddress;
  if (isRateLimited(ip)) return res.status(429).json({ error: 'Trop de requêtes' });

  const { q } = req.query;
  if (!q || typeof q !== 'string' || q.trim().length === 0 || q.length > 200) {
    return res.status(400).json({ preview: null, found: false });
  }

  try {
    const url = `https://api.deezer.com/search?q=${encodeURIComponent(q.trim())}&limit=5&output=json`;
    const response = await fetch(url);
    const data = await response.json();
    if (data.data && data.data.length > 0) {
      const track = data.data.find(t => t.preview) || data.data[0];
      res.json({
        preview: track.preview || null,
        cover: track.album?.cover_medium || null,
        found: !!track.preview,
      });
    } else {
      res.json({ preview: null, found: false });
    }
  } catch (err) {
    console.error('Deezer error:', err.message);
    res.status(500).json({ preview: null, found: false });
  }
});

// ─── Système de codes d'accès ───
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'blindmix-admin-2024';
const accessCodes = new Set(
  (process.env.ACCESS_CODES || '').split(',').map(c => c.trim().toUpperCase()).filter(Boolean)
);

function generateAccessCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 6; i++) code += chars[Math.floor(Math.random() * chars.length)];
  return code;
}

// Vérifier un code d'accès
app.post('/api/access/verify', (req, res) => {
  const { code } = req.body;
  if (!code || typeof code !== 'string' || code.length > 20) {
    return res.status(400).json({ valid: false });
  }
  res.json({ valid: accessCodes.has(code.trim().toUpperCase()) });
});

// Admin : lister les codes
app.post('/api/access/admin/list', (req, res) => {
  if (req.body?.adminPassword !== ADMIN_PASSWORD) return res.status(401).json({ error: 'Non autorisé' });
  res.json({ codes: [...accessCodes] });
});

// Admin : créer un code
app.post('/api/access/admin/create', (req, res) => {
  if (req.body?.adminPassword !== ADMIN_PASSWORD) return res.status(401).json({ error: 'Non autorisé' });
  const code = req.body.code
    ? req.body.code.trim().toUpperCase()
    : generateAccessCode();
  if (code.length < 4 || code.length > 20) return res.status(400).json({ error: 'Code invalide' });
  accessCodes.add(code);
  res.json({ code });
});

// Admin : supprimer un code
app.post('/api/access/admin/delete', (req, res) => {
  if (req.body?.adminPassword !== ADMIN_PASSWORD) return res.status(401).json({ error: 'Non autorisé' });
  const code = req.body.code?.trim().toUpperCase();
  if (!code) return res.status(400).json({ error: 'Code manquant' });
  accessCodes.delete(code);
  res.json({ ok: true });
});

// Stockage des salles
const rooms = new Map();

// Rate limiting pour la création de salles (par socket)
const roomCreationTracker = new Map();
function canCreateRoom(socketId) {
  const now = Date.now();
  const last = roomCreationTracker.get(socketId) || 0;
  if (now - last < 5_000) return false; // max 1 salle toutes les 5s
  roomCreationTracker.set(socketId, now);
  return true;
}

function generateCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // sans O/0/I/1 pour éviter la confusion
  let code = '';
  for (let i = 0; i < 5; i++) code += chars[Math.floor(Math.random() * chars.length)];
  return code;
}

function sanitizeName(name) {
  if (typeof name !== 'string') return null;
  const trimmed = name.trim();
  if (trimmed.length === 0 || trimmed.length > 30) return null;
  return trimmed;
}

function validateSongs(songs) {
  if (!Array.isArray(songs) || songs.length === 0 || songs.length > 100) return false;
  return songs.every(s =>
    s && (typeof s.id === 'string' || typeof s.id === 'number') &&
    typeof s.title === 'string' && s.title.length <= 200 &&
    typeof s.artist === 'string' && s.artist.length <= 200
  );
}

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Nettoyage des salles terminées après 5 minutes
function scheduleRoomCleanup(code) {
  setTimeout(() => {
    rooms.delete(code);
    console.log(`Salle nettoyée: ${code}`);
  }, 5 * 60_000);
}

io.on('connection', (socket) => {
  console.log('+ Connexion:', socket.id);

  // ─── Création salle ───
  socket.on('create-room', ({ difficulty, genres, questionCount, songs }, cb) => {
    if (!canCreateRoom(socket.id)) return cb?.({ error: 'Trop de salles créées, attendez un moment' });
    if (!validateSongs(songs)) return cb?.({ error: 'Liste de chansons invalide' });

    const count = typeof questionCount === 'number' ? Math.min(Math.max(1, questionCount), 50) : 10;
    const code = generateCode();
    const room = {
      code,
      hostId: socket.id,
      players: [],
      status: 'lobby',
      difficulty,
      genres,
      questionCount: count,
      songs: shuffle([...songs]),
      currentQuestion: 0,
      currentSong: null,
      buzzedPlayerId: null,
      canBuzz: false,
    };
    rooms.set(code, room);
    socket.join(code);
    socket.data.roomCode = code;
    socket.data.isHost = true;
    cb({ code, ip: getLocalIP() });
    console.log(`Salle créée: ${code}`);
  });

  // ─── Rejoindre salle ───
  socket.on('join-room', ({ code, name }, cb) => {
    const safeName = sanitizeName(name);
    if (!safeName) return cb({ error: 'Nom invalide (1-30 caractères)' });

    const room = rooms.get(typeof code === 'string' ? code.toUpperCase() : '');
    if (!room) return cb({ error: 'Salle introuvable' });
    if (room.status !== 'lobby') return cb({ error: 'Partie déjà commencée' });
    if (room.players.length >= 8) return cb({ error: 'Salle pleine (max 8)' });

    const player = { id: socket.id, name: safeName, score: 0, buzzes: 0, correct: 0, wrong: 0 };
    room.players.push(player);
    socket.join(room.code);
    socket.data.roomCode = room.code;
    socket.data.isHost = false;

    io.to(room.code).emit('room-update', { players: room.players, status: room.status });
    cb({ ok: true, code: room.code });
  });

  // ─── Host rejoint en tant que joueur ───
  socket.on('host-join-as-player', ({ code, name }, cb) => {
    const safeName = sanitizeName(name);
    if (!safeName) return cb?.({ error: 'Nom invalide (1-30 caractères)' });

    const room = rooms.get(code);
    if (!room || room.hostId !== socket.id) return cb?.({ error: 'Non autorisé' });
    if (room.players.find(p => p.id === socket.id)) return cb?.({ ok: true });

    const player = { id: socket.id, name: safeName, score: 0, buzzes: 0, correct: 0, wrong: 0 };
    room.players.push(player);
    room.hostIsPlayer = true;
    io.to(code).emit('room-update', { players: room.players, status: room.status });
    cb?.({ ok: true });
  });

  // ─── Host demande la chanson complète (quand il joue aussi) ───
  socket.on('get-current-song', ({ code }, cb) => {
    const room = rooms.get(code);
    if (!room || room.hostId !== socket.id) return;
    cb?.({ song: room.currentSong });
  });

  // ─── Démarrer la partie ───
  socket.on('start-game', ({ code }) => {
    const room = rooms.get(code);
    if (!room || room.hostId !== socket.id) return;
    room.status = 'playing';
    io.to(code).emit('game-started', { total: room.songs.length, roomDifficulty: room.difficulty });
    sendNextQuestion(code);
  });

  // ─── Activer le buzzer ───
  socket.on('enable-buzz', ({ code }) => {
    const room = rooms.get(code);
    if (!room || room.hostId !== socket.id) return;
    room.canBuzz = true;
    room.buzzedPlayerId = null;
    room.status = 'playing';
    io.to(code).emit('buzz-enabled');
  });

  // ─── Buzzer ───
  socket.on('buzz', ({ code }) => {
    const room = rooms.get(code);
    if (!room || !room.canBuzz || room.buzzedPlayerId) return;
    const player = room.players.find(p => p.id === socket.id);
    if (!player) return;

    room.buzzedPlayerId = socket.id;
    room.canBuzz = false;
    room.status = 'buzzed';
    player.buzzes++;

    io.to(code).emit('player-buzzed', { playerId: socket.id, playerName: player.name });
  });

  // ─── Réponse joueur via QCM ───
  socket.on('player-answer', ({ code, selectedOption }) => {
    if (typeof selectedOption !== 'string' || selectedOption.length > 400) return;
    const room = rooms.get(code);
    if (!room) return;
    const player = room.players.find(p => p.id === socket.id);
    if (!player || room.buzzedPlayerId !== socket.id) return;
    const song = room.currentSong;
    const correct = selectedOption === `${song.title} — ${song.artist}`;
    if (correct) {
      player.score += 100; player.correct++;
      io.to(code).emit('answer-correct', { playerId: player.id, playerName: player.name, players: room.players });
      revealAndNext(code);
    } else {
      player.score = Math.max(0, player.score - 25); player.wrong++;
      io.to(code).emit('answer-wrong', { playerId: player.id, playerName: player.name, players: room.players });
      revealAndNext(code);
    }
  });

  // ─── Résultat réponse ───
  socket.on('answer-result', ({ code, correct }) => {
    const room = rooms.get(code);
    if (!room || room.hostId !== socket.id) return;
    const player = room.players.find(p => p.id === room.buzzedPlayerId);
    if (!player) return;

    if (correct) {
      player.score += 100;
      player.correct++;
      io.to(code).emit('answer-correct', { playerId: player.id, playerName: player.name, players: room.players });
      revealAndNext(code);
    } else {
      player.score = Math.max(0, player.score - 25);
      player.wrong++;
      room.buzzedPlayerId = null;
      room.canBuzz = true;
      room.status = 'playing';
      io.to(code).emit('answer-wrong', { playerId: player.id, playerName: player.name, players: room.players });
    }
  });

  // ─── Passer / Suivant ───
  socket.on('skip-question', ({ code }) => {
    const room = rooms.get(code);
    if (!room || room.hostId !== socket.id) return;
    if (room.status === 'revealed') {
      sendNextQuestion(code);
    } else {
      revealAndNext(code);
    }
  });

  // ─── Déconnexion ───
  socket.on('disconnect', () => {
    const code = socket.data.roomCode;
    if (!code) return;
    const room = rooms.get(code);
    if (!room) return;

    if (room.hostId === socket.id) {
      io.to(code).emit('host-left');
      rooms.delete(code);
      console.log(`Salle supprimée: ${code}`);
    } else {
      room.players = room.players.filter(p => p.id !== socket.id);
      io.to(code).emit('room-update', { players: room.players, status: room.status });
    }
  });

  function sendNextQuestion(code) {
    const room = rooms.get(code);
    if (!room) return;

    if (room.currentQuestion >= room.songs.length) {
      room.status = 'finished';
      const sorted = [...room.players].sort((a, b) => b.score - a.score);
      io.to(code).emit('game-finished', { players: sorted });
      scheduleRoomCleanup(code);
      return;
    }

    const song = room.songs[room.currentQuestion];
    room.currentSong = song;
    room.buzzedPlayerId = null;
    room.canBuzz = false;
    room.status = 'question';

    io.to(code).emit('new-question', {
      song: { id: song.id, genre: song.genre, decade: song.decade, difficulty: song.difficulty },
      index: room.currentQuestion + 1,
      total: room.songs.length,
    });

    // Auto-activer le buzz après 10s
    setTimeout(() => {
      const r = rooms.get(code);
      if (!r || r.status !== 'question' || r.canBuzz) return;
      r.canBuzz = true;
      r.buzzedPlayerId = null;
      r.status = 'playing';
      io.to(code).emit('buzz-enabled');
    }, 10000);
  }

  function revealAndNext(code) {
    const room = rooms.get(code);
    if (!room) return;
    room.canBuzz = false;
    room.status = 'revealed';
    io.to(code).emit('reveal-answer', { song: room.currentSong, players: room.players });
    room.currentQuestion++;
    setTimeout(() => sendNextQuestion(code), 6000);
  }
});

const PORT = process.env.PORT || 3002;
httpServer.listen(PORT, '0.0.0.0', () => {
  console.log(`\n🎵 Blind Test Server on http://localhost:${PORT}`);
  console.log(`📱 IP locale: ${getLocalIP()}\n`);
});
