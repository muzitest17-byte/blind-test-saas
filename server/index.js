import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import fetch from 'node-fetch';
import os from 'os';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: { origin: '*', methods: ['GET', 'POST'] },
});

app.use(cors());
app.use(express.json());

function getLocalIP() {
  const nets = os.networkInterfaces();
  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      if (net.family === 'IPv4' && !net.internal) return net.address;
    }
  }
  return 'localhost';
}

// Proxy Deezer pour éviter les problèmes CORS
app.get('/api/preview', async (req, res) => {
  try {
    const { q } = req.query;
    const url = `https://api.deezer.com/search?q=${encodeURIComponent(q)}&limit=5&output=json`;
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

app.get('/api/local-ip', (_req, res) => {
  res.json({ ip: getLocalIP() });
});

// Stockage des salles
const rooms = new Map();

function generateCode() {
  return Math.random().toString(36).substring(2, 7).toUpperCase();
}

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

io.on('connection', (socket) => {
  console.log('+ Connexion:', socket.id);

  // ─── Création salle ───
  socket.on('create-room', ({ difficulty, genres, questionCount, songs }, cb) => {
    const code = generateCode();
    const room = {
      code,
      hostId: socket.id,
      players: [],
      status: 'lobby',
      difficulty,
      genres,
      questionCount,
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
    const room = rooms.get(code);
    if (!room) return cb({ error: 'Salle introuvable' });
    if (room.status !== 'lobby') return cb({ error: 'Partie déjà commencée' });
    if (room.players.length >= 8) return cb({ error: 'Salle pleine (max 8)' });

    const player = { id: socket.id, name, score: 0, buzzes: 0, correct: 0, wrong: 0 };
    room.players.push(player);
    socket.join(code);
    socket.data.roomCode = code;
    socket.data.isHost = false;

    io.to(code).emit('room-update', { players: room.players, status: room.status });
    cb({ ok: true, code });
  });

  // ─── Host rejoint en tant que joueur ───
  socket.on('host-join-as-player', ({ code, name }, cb) => {
    const room = rooms.get(code);
    if (!room || room.hostId !== socket.id) return cb?.({ error: 'Non autorisé' });
    if (room.players.find(p => p.id === socket.id)) return cb?.({ ok: true }); // déjà inscrit
    const player = { id: socket.id, name, score: 0, buzzes: 0, correct: 0, wrong: 0 };
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

  // ─── Passer la question ───
  socket.on('skip-question', ({ code }) => {
    const room = rooms.get(code);
    if (!room || room.hostId !== socket.id) return;
    revealAndNext(code);
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
      return;
    }

    const song = room.songs[room.currentQuestion];
    room.currentSong = song;
    room.buzzedPlayerId = null;
    room.canBuzz = false;
    room.status = 'question';

    // Host reçoit le titre complet (sauf s'il joue aussi — il reçoit alors la version joueur)
    if (room.hostIsPlayer) {
      io.to(room.hostId).emit('new-question', {
        song: { id: song.id, genre: song.genre, decade: song.decade, difficulty: song.difficulty },
        index: room.currentQuestion + 1,
        total: room.songs.length,
      });
    } else {
      io.to(room.hostId).emit('new-question', {
        song,
        index: room.currentQuestion + 1,
        total: room.songs.length,
      });
    }

    // Joueurs reçoivent seulement genre + décennie
    room.players.forEach(p => {
      io.to(p.id).emit('new-question', {
        song: { id: song.id, genre: song.genre, decade: song.decade, difficulty: song.difficulty },
        index: room.currentQuestion + 1,
        total: room.songs.length,
      });
    });
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
