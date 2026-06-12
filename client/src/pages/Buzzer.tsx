import { useEffect, useState, useCallback, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { socket } from '../socket';
import type { Player } from '../types';
import { genreLabels, genreColors, decadeLabels } from '../data/songs';

type BuzzerState = 'lobby' | 'waiting' | 'ready' | 'buzzed-me' | 'buzzed-other' | 'revealed' | 'finished' | 'wrong';

export default function Buzzer() {
  const { code }   = useParams<{ code: string }>();
  const nav        = useNavigate();
  const [bstate, setBstate] = useState<BuzzerState>('lobby');
  const [players, setPlayers]   = useState<Player[]>([]);
  const [question, setQuestion] = useState<{ index: number; total: number; genre?: string; decade?: string } | null>(null);
  const [revealed, setRevealed] = useState<{ title: string; artist: string; year: number } | null>(null);
  const [buzzedName, setBuzzedName] = useState('');
  const [myScore, setMyScore]   = useState(0);
  const [delta, setDelta]       = useState<number | null>(null);
  const prevScore = useRef(0);
  const wakeLock  = useRef<WakeLockSentinel | null>(null);

  /* Empêche l'écran de s'éteindre */
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    (async () => {
      try { wakeLock.current = await navigator.wakeLock?.request('screen'); } catch {}
    })();
    return () => {
      document.body.style.overflow = '';
      wakeLock.current?.release();
    };
  }, []);

  useEffect(() => {
    socket.on('room-update', ({ players: p }) => {
      setPlayers(p);
      const me = p.find((x: Player) => x.id === socket.id);
      if (me) setMyScore(me.score);
    });
    socket.on('game-started', () => setBstate('waiting'));
    socket.on('new-question', ({ index, total, song }) => {
      setQuestion({ index, total, genre: song?.genre, decade: song?.decade });
      setRevealed(null); setBuzzedName(''); setBstate('waiting');
    });
    socket.on('buzz-enabled', () => setBstate('ready'));
    socket.on('player-buzzed', ({ playerId, playerName }) => {
      if (playerId === socket.id) { setBstate('buzzed-me'); vibrate(200); }
      else { setBuzzedName(playerName); setBstate('buzzed-other'); }
    });
    socket.on('answer-correct', ({ playerId, players: p }) => {
      const me = p.find((x: Player) => x.id === socket.id);
      if (me) {
        const d = me.score - prevScore.current;
        if (d !== 0) { setDelta(d); setTimeout(() => setDelta(null), 2500); }
        setMyScore(me.score); prevScore.current = me.score;
      }
      if (playerId !== socket.id) setBstate('waiting');
    });
    socket.on('answer-wrong', ({ playerId, players: p }) => {
      const me = p.find((x: Player) => x.id === socket.id);
      if (me) { setMyScore(me.score); prevScore.current = me.score; }
      if (playerId === socket.id) {
        vibrate([80, 60, 80]);
        setBstate('wrong'); setTimeout(() => setBstate('ready'), 2000);
      }
    });
    socket.on('reveal-answer', ({ song, players: p }) => {
      setRevealed(song); setBstate('revealed');
      const me = p.find((x: Player) => x.id === socket.id);
      if (me) setMyScore(me.score);
    });
    socket.on('game-finished', ({ players: p }) => { setPlayers(p); setBstate('finished'); });
    socket.on('host-left', () => nav('/'));
    return () => ['room-update','game-started','new-question','buzz-enabled','player-buzzed','answer-correct','answer-wrong','reveal-answer','game-finished','host-left'].forEach(e => socket.off(e));
  }, [nav]);

  const doBuzz = useCallback(() => {
    if (bstate !== 'ready') return;
    socket.emit('buzz', { code });
  }, [bstate, code]);

  const gc = question?.genre ? (genreColors[question.genre] || '#a855f7') : '#a855f7';

  // ── LOBBY ──────────────────────────────────────────────────────────────
  if (bstate === 'lobby') return (
    <FullScreen bg="#08090f">
      <div className="vinyl vinyl-spin mb-6" style={{ width: 80, height: 80 }}>
        <div className="vinyl-center" />
      </div>
      <div className="px-5 py-2 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 font-mono font-bold tracking-widest text-lg mb-4">
        {code}
      </div>
      <h2 className="font-display text-5xl text-white mb-2">EN ATTENTE</h2>
      <p className="text-white/30 mb-8">L'hôte va démarrer…</p>
      <div className="w-full max-w-xs rounded-2xl bg-white/5 border border-white/8 p-4 space-y-1">
        <p className="text-xs text-white/25 uppercase tracking-widest text-center mb-3">Joueurs ({players.length}/8)</p>
        {players.map(p => (
          <div key={p.id} className={`py-2.5 px-4 rounded-xl text-sm font-semibold text-center ${p.id === socket.id ? 'bg-purple-500/20 border border-purple-500/30 text-purple-300' : 'text-white/40'}`}>
            {p.name}{p.id === socket.id && <span className="ml-2 text-xs opacity-50">moi</span>}
          </div>
        ))}
      </div>
    </FullScreen>
  );

  // ── WAITING ────────────────────────────────────────────────────────────
  if (bstate === 'waiting') return (
    <FullScreen bg="#08090f">
      {question && (
        <div className="px-5 py-3 rounded-2xl text-center mb-8"
             style={{ background: `${gc}12`, border: `1px solid ${gc}30` }}>
          <p className="text-white/25 text-xs mb-0.5">Question {question.index}/{question.total}</p>
          {question.genre && <p className="font-bold text-sm" style={{ color: gc }}>{genreLabels[question.genre]}</p>}
          {question.decade && <p className="text-white/20 text-xs">{decadeLabels[question.decade]}</p>}
        </div>
      )}
      <div className="vinyl vinyl-spin mb-5" style={{ width: 100, height: 100 }}>
        <div className="vinyl-center" />
      </div>
      <p className="text-white/30 animate-pulse text-lg">🎵 Écoute…</p>
      <ScoreBadge score={myScore} delta={delta} />
    </FullScreen>
  );

  // ── READY — le bouton occupe tout l'écran ──────────────────────────────
  if (bstate === 'ready') return (
    <button
      onPointerDown={doBuzz}
      className="min-h-screen w-full flex flex-col items-center justify-center select-none active:scale-95 transition-transform duration-100"
      style={{
        touchAction: 'none',
        background: 'radial-gradient(ellipse at 50% 70%, rgba(220,38,38,0.18), #08090f 65%)',
        WebkitTapHighlightColor: 'transparent',
      }}>

      {question && (
        <div className="mb-10 px-5 py-2.5 rounded-2xl text-center pointer-events-none"
             style={{ background: `${gc}15`, border: `1px solid ${gc}30` }}>
          <p className="text-xs text-white/25">Question {question.index}/{question.total}</p>
          {question.genre && <p className="font-bold text-sm" style={{ color: gc }}>{genreLabels[question.genre]}</p>}
        </div>
      )}

      {/* Bouton buzzer — plein écran */}
      <div className="relative pointer-events-none">
        <div className="buzzer-ring" />
        <div className="buzzer-ring" style={{ animationDelay: '0.5s' }} />
        <div className="buzzer flex flex-col items-center justify-center">
          <span className="text-6xl mb-2 drop-shadow-2xl">🔔</span>
          <span className="font-display text-white text-3xl tracking-widest drop-shadow-lg">BUZZ</span>
        </div>
      </div>

      <p className="mt-12 text-white/20 text-sm tracking-wider pointer-events-none">
        Appuie dès que tu reconnais !
      </p>
      <div className="pointer-events-none">
        <ScoreBadge score={myScore} delta={delta} />
      </div>
    </button>
  );

  // ── BUZZÉ MOI ──────────────────────────────────────────────────────────
  if (bstate === 'buzzed-me') return (
    <FullScreen bg="radial-gradient(ellipse at 50% 40%, #2d0f00, #08090f 70%)">
      <div className="relative mb-6">
        <div className="w-44 h-44 rounded-full border-2 border-orange-400/60 flex items-center justify-center"
             style={{ background: 'rgba(251,146,60,0.12)', boxShadow: '0 0 60px rgba(251,146,60,0.4), 0 0 120px rgba(251,146,60,0.15)' }}>
          <span className="text-7xl">🔔</span>
        </div>
        <div className="absolute inset-0 rounded-full border border-orange-400/40 animate-ping" />
      </div>
      <h2 className="font-display text-6xl mb-3"
          style={{ color: '#fb923c', textShadow: '0 0 40px rgba(251,146,60,0.7)' }}>
        TU AS BUZZÉ !
      </h2>
      <p className="text-white/40 text-lg">Donne ta réponse à l'hôte</p>
      <ScoreBadge score={myScore} delta={delta} />
    </FullScreen>
  );

  // ── BUZZÉ AUTRE ────────────────────────────────────────────────────────
  if (bstate === 'buzzed-other') return (
    <FullScreen bg="#08090f">
      <span className="text-7xl mb-5 opacity-25">🔇</span>
      <h2 className="font-display text-5xl text-white mb-2">{buzzedName}</h2>
      <p className="text-white/30 text-lg">a buzzé en premier…</p>
      <ScoreBadge score={myScore} delta={delta} />
    </FullScreen>
  );

  // ── MAUVAISE RÉPONSE ───────────────────────────────────────────────────
  if (bstate === 'wrong') return (
    <FullScreen bg="radial-gradient(ellipse at 50% 40%, #1a0000, #08090f 70%)">
      <span className="text-8xl mb-4 pop">❌</span>
      <h2 className="font-display text-7xl mb-2"
          style={{ color: '#f87171', textShadow: '0 0 30px rgba(239,68,68,0.6)' }}>
        FAUX !
      </h2>
      <p className="text-white/30 text-lg">−25 points</p>
      <p className="text-white/15 text-sm mt-6 animate-pulse">Rebuzze si tu connais…</p>
    </FullScreen>
  );

  // ── RÉPONSE RÉVÉLÉE ────────────────────────────────────────────────────
  if (bstate === 'revealed' && revealed) return (
    <FullScreen bg="#08090f">
      <div className="vinyl mb-5" style={{ width: 80, height: 80, opacity: 0.5 }}>
        <div className="vinyl-center" />
      </div>
      <p className="text-white/25 text-xs uppercase tracking-widest mb-4">C'était…</p>
      <h2 className="font-display text-5xl text-white text-center px-5 mb-2"
          style={{ textShadow: '0 0 30px rgba(139,92,246,0.5)' }}>
        {revealed.title}
      </h2>
      <p className="text-purple-300 font-semibold text-xl">{revealed.artist}</p>
      <p className="text-white/20 mt-1">{revealed.year}</p>
      <p className="text-white/10 text-xs mt-8 animate-pulse">Prochaine question…</p>
      <ScoreBadge score={myScore} delta={delta} />
    </FullScreen>
  );

  // ── FIN ────────────────────────────────────────────────────────────────
  if (bstate === 'finished') {
    const sorted = [...players].sort((a, b) => b.score - a.score);
    const rank   = sorted.findIndex(p => p.id === socket.id) + 1;
    const medals = ['🥇','🥈','🥉'];
    return (
      <FullScreen bg="#08090f">
        <span className="text-7xl mb-3 pop">🏆</span>
        <h1 className="font-display text-6xl text-white mb-6" style={{ textShadow: '0 0 40px rgba(139,92,246,0.5)' }}>
          TERMINÉ !
        </h1>
        <div className="w-full max-w-xs rounded-2xl bg-white/5 border border-white/8 p-4 mb-5 space-y-1">
          {sorted.map((p, i) => (
            <div key={p.id} className={`flex items-center justify-between py-2.5 px-3 rounded-xl ${p.id === socket.id ? 'bg-purple-500/20 border border-purple-500/25' : ''}`}>
              <div className="flex items-center gap-2">
                <span className="w-7 text-center">{medals[i] || `${i+1}.`}</span>
                <span className="font-semibold text-white text-sm">{p.name}</span>
              </div>
              <span className="font-black text-purple-300">{p.score}pts</span>
            </div>
          ))}
        </div>
        {rank === 1
          ? <p className="text-yellow-400 font-black text-2xl mb-5">🏆 VICTOIRE !</p>
          : <p className="text-white/35 text-lg mb-5">{rank}ème place</p>}
        <button onClick={() => nav('/')} className="btn-primary px-10 py-4 font-display text-2xl">
          ACCUEIL
        </button>
      </FullScreen>
    );
  }

  return null;
}

/* ── Helpers ────────────────────────────────────────────── */

function vibrate(pattern: number | number[]) {
  try { navigator.vibrate?.(pattern); } catch {}
}

function FullScreen({ children, bg }: { children: React.ReactNode; bg: string }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-5 text-center transition-all duration-500"
         style={{ background: bg }}>
      {children}
    </div>
  );
}

function ScoreBadge({ score, delta }: { score: number; delta: number | null }) {
  return (
    <div className="mt-10 relative flex flex-col items-center">
      {delta !== null && (
        <span className={`score-delta text-2xl font-black ${delta > 0 ? 'text-emerald-400' : 'text-red-400'}`}
              style={{ position: 'absolute', top: -30 }}>
          {delta > 0 ? `+${delta}` : delta}
        </span>
      )}
      <div className="px-8 py-3 rounded-2xl bg-white/6 border border-white/10 text-center">
        <span className="font-display text-4xl"
              style={{ background: 'linear-gradient(90deg,#a855f7,#ec4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          {score}
        </span>
        <span className="text-white/25 text-sm ml-2">pts</span>
      </div>
    </div>
  );
}
