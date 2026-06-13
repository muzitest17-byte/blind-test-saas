import { useEffect, useState, useCallback, useRef } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { socket } from '../socket';
import type { Player, Song } from '../types';
import { genreLabels, genreColors, decadeLabels, songs as allSongs, generateOptions } from '../data/songs';
import QCMOptions from '../components/QCMOptions';

type BuzzerState = 'host-lobby' | 'lobby' | 'waiting' | 'ready' | 'buzzed-me' | 'buzzed-other' | 'revealed' | 'finished' | 'wrong';

const DIFFICULTY_TIME: Record<number, number> = { 1: 30, 2: 20, 3: 15, 4: 10, 5: 10 };

export default function Buzzer() {
  const { code }   = useParams<{ code: string }>();
  const nav        = useNavigate();
  const location   = useLocation();
  const isHost     = !!(location.state as any)?.isHost;
  const [bstate, setBstate] = useState<BuzzerState>(isHost ? 'host-lobby' : 'lobby');
  const [hostName, setHostName] = useState('');
  const [players, setPlayers]   = useState<Player[]>([]);
  const [question, setQuestion] = useState<{ index: number; total: number; genre?: string; decade?: string } | null>(null);
  const [revealed, setRevealed] = useState<{ title: string; artist: string; year: number } | null>(null);
  const [buzzedName, setBuzzedName] = useState('');
  const [myScore, setMyScore]     = useState(0);
  const [delta, setDelta]         = useState<number | null>(null);
  const [isPlaying, setIsPlaying]           = useState(false);
  const [qcmOptions, setQcmOptions]         = useState<string[]>([]);
  const [qcmSelected, setQcmSelected]       = useState<string | null>(null);
  const [qcmCorrectSong, setQcmCorrectSong] = useState<Song | null>(null);
  const [timeLeft, setTimeLeft]             = useState(0);
  const [roomDifficulty, setRoomDifficulty] = useState(2);
  const prevScore     = useRef(0);
  const shouldPlayRef = useRef(false);
  const previewUrlRef = useRef<string | null>(null);
  const audioRef      = useRef<HTMLAudioElement>(null);
  const wakeLock     = useRef<WakeLockSentinel | null>(null);

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

  // Re-apply audio src after bstate change (new <audio> element mounts)
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !previewUrlRef.current) return;
    audio.src = previewUrlRef.current; audio.volume = 0.8;
    if (shouldPlayRef.current && (bstate === 'ready')) {
      audio.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  }, [bstate]);

  useEffect(() => {
    if (bstate !== 'ready') return;
    if (timeLeft <= 0) return;
    const t = setTimeout(() => setTimeLeft(s => s - 1), 1000);
    return () => clearTimeout(t);
  }, [bstate, timeLeft]);

  const loadPreview = useCallback(async (deezerQuery: string) => {
    previewUrlRef.current = null; setIsPlaying(false);
    try {
      const r = await fetch(`/api/preview?q=${encodeURIComponent(deezerQuery)}`);
      const d = await r.json();
      previewUrlRef.current = d.preview || null;
      const audio = audioRef.current;
      if (audio && previewUrlRef.current) {
        audio.src = previewUrlRef.current; audio.volume = 0.8;
        if (shouldPlayRef.current) {
          audio.play().then(() => setIsPlaying(true)).catch(() => {});
        }
      }
    } catch { previewUrlRef.current = null; }
  }, []);

  useEffect(() => {
    socket.on('room-update', ({ players: p }) => {
      setPlayers(p);
      const me = p.find((x: Player) => x.id === socket.id);
      if (me) setMyScore(me.score);
    });
    socket.on('game-started', ({ roomDifficulty: rd }) => { setBstate('waiting'); if (rd) setRoomDifficulty(rd); });
    socket.on('new-question', ({ index, total, song }) => {
      setQuestion({ index, total, genre: song?.genre, decade: song?.decade });
      setRevealed(null); setBuzzedName(''); setBstate('waiting');
      setQcmSelected(null); setQcmOptions([]);
      setTimeLeft(0);
      shouldPlayRef.current = false;
      const fullSong = song?.id ? allSongs.find(s => s.id === song.id) : null;
      if (fullSong) {
        setQcmCorrectSong(fullSong);
        setQcmOptions(generateOptions(fullSong, allSongs));
        loadPreview(fullSong.deezerQuery);
      }
    });
    socket.on('buzz-enabled', () => {
      setBstate('ready');
      shouldPlayRef.current = true;
      setTimeLeft(DIFFICULTY_TIME[roomDifficulty]);
      const audio = audioRef.current;
      if (audio && previewUrlRef.current) { audio.play().then(() => setIsPlaying(true)).catch(() => {}); }
    });
    socket.on('player-buzzed', ({ playerId, playerName }) => {
      if (playerId === socket.id) { setBstate('buzzed-me'); vibrate(200); }
      else { setBuzzedName(playerName); setBstate('buzzed-other'); }
      audioRef.current?.pause(); setIsPlaying(false);
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
        setBstate('wrong');
        setTimeout(() => {
          setBstate('ready');
          shouldPlayRef.current = true;
          const audio = audioRef.current;
          if (audio && previewUrlRef.current) { audio.play().then(() => setIsPlaying(true)).catch(() => {}); }
        }, 2000);
      } else {
        shouldPlayRef.current = true;
        const audio = audioRef.current;
        if (audio && previewUrlRef.current) { audio.play().then(() => setIsPlaying(true)).catch(() => {}); }
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
  }, [nav, loadPreview]);

  const doBuzz = useCallback(() => {
    if (bstate !== 'ready') return;
    socket.emit('buzz', { code });
  }, [bstate, code]);

  const gc = question?.genre ? (genreColors[question.genre] || '#a855f7') : '#a855f7';

  // ── HOST LOBBY ─────────────────────────────────────────────────────────
  if (bstate === 'host-lobby') {
    const startGame = () => {
      if (hostName.trim()) {
        socket.emit('host-join-as-player', { code, name: hostName.trim() }, () => {});
      }
      socket.emit('start-game', { code });
    };
    const joinUrl = `${window.location.origin}/join/${code}`;
    return (
      <FullScreen bg="radial-gradient(ellipse at 50% 20%, rgba(124,58,237,0.2), #08090f 60%)">
        {/* Code */}
        <div className="px-6 py-2.5 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 font-mono font-bold tracking-widest text-2xl mb-2">
          {code}
        </div>
        <p className="text-white/25 text-xs mb-5 font-mono">{joinUrl}</p>

        {/* Players */}
        <div className="w-full max-w-xs rounded-2xl bg-white/5 border border-white/8 p-4 mb-5 space-y-1">
          <p className="text-xs text-white/25 uppercase tracking-widest text-center mb-3">
            Joueurs ({players.length}/8)
          </p>
          {players.length === 0
            ? <p className="text-white/20 text-sm text-center py-2">En attente de joueurs…</p>
            : players.map(p => (
              <div key={p.id} className="py-2 px-3 rounded-xl text-sm font-semibold text-center text-white/60">
                {p.name}
              </div>
            ))
          }
        </div>

        {/* Host name (optional — to also play) */}
        <div className="w-full max-w-xs mb-4">
          <p className="text-xs text-white/25 uppercase tracking-widest text-center mb-2">Tu joues aussi ? (optionnel)</p>
          <input
            value={hostName}
            onChange={e => setHostName(e.target.value.slice(0, 20))}
            placeholder="Ton prénom…"
            className="w-full bg-white/8 border border-white/12 rounded-xl px-4 py-3 text-white placeholder-white/20 text-sm focus:outline-none focus:border-purple-400/50 text-center"
          />
        </div>

        <button
          onClick={startGame}
          disabled={players.length === 0}
          className="w-full max-w-xs py-5 rounded-2xl font-display text-2xl tracking-widest text-white transition-all active:scale-95 disabled:opacity-30"
          style={{ background: 'linear-gradient(135deg, #7c3aed, #a855f7)', boxShadow: '0 0 30px rgba(139,92,246,0.4)' }}>
          ▶ DÉMARRER
        </button>
        <p className="text-white/15 text-xs mt-4">Les joueurs rejoignent via le code ou le lien</p>
      </FullScreen>
    );
  }

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
      <audio ref={audioRef} onEnded={() => setIsPlaying(false)} />
      {question && (
        <div className="px-5 py-3 rounded-2xl text-center mb-6"
             style={{ background: `${gc}12`, border: `1px solid ${gc}30` }}>
          <p className="text-white/25 text-xs mb-0.5">Question {question.index}/{question.total}</p>
          {question.genre && <p className="font-bold text-sm" style={{ color: gc }}>{genreLabels[question.genre]}</p>}
          {question.decade && <p className="text-white/20 text-xs">{decadeLabels[question.decade]}</p>}
        </div>
      )}
      <div className="vinyl vinyl-spin mb-5" style={{ width: 100, height: 100 }}>
        <div className="vinyl-center" />
      </div>
      <p className="text-white/30 animate-pulse text-lg">🎵 La musique arrive…</p>
      <ScoreBadge score={myScore} delta={delta} />
    </FullScreen>
  );

  // ── READY — gros buzzer plein écran ──────────────────────────────────
  if (bstate === 'ready') return (
    <div className="min-h-screen flex flex-col select-none"
         style={{ background: 'radial-gradient(ellipse at 50% 60%, rgba(220,38,38,0.18), #08090f 70%)' }}>
      <audio ref={audioRef} onEnded={() => setIsPlaying(false)} />

      {/* Header compact */}
      <div className="flex items-center justify-between px-5 pt-5 pb-2">
        <div className="flex items-center gap-2">
          {isPlaying && (
            <div className="flex items-end gap-0.5" style={{ height: 16 }}>
              {[8,14,10,16,9].map((h, i) => (
                <div key={i} className="eq-bar rounded-sm"
                     style={{ height: h, width: 3, animationDelay: `${i * 0.1}s`,
                              background: `linear-gradient(to top, ${gc}99, ${gc})` }} />
              ))}
            </div>
          )}
          {question && (
            <span className="text-xs text-white/30">Q{question.index}/{question.total}</span>
          )}
        </div>
        {timeLeft > 0 && (
          <span className="font-display text-3xl tabular-nums"
                style={{ color: timeLeft <= 5 ? '#f87171' : timeLeft <= 10 ? '#fb923c' : '#6ee7b7',
                         textShadow: timeLeft <= 5 ? '0 0 16px rgba(248,113,113,0.8)' : 'none' }}>
            {timeLeft}s
          </span>
        )}
      </div>

      {/* Gros bouton BUZZ — occupe tout l'espace restant */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pb-8">
        <button
          onPointerDown={doBuzz}
          className="w-full active:scale-95 transition-transform duration-75 flex flex-col items-center justify-center gap-4"
          style={{
            touchAction: 'none',
            WebkitTapHighlightColor: 'transparent',
            height: '60vmax',
            maxHeight: 420,
            borderRadius: '50%',
            background: 'radial-gradient(ellipse at 50% 45%, rgba(220,38,38,0.45), rgba(185,28,28,0.15))',
            border: '3px solid rgba(239,68,68,0.6)',
            boxShadow: '0 0 60px rgba(220,38,38,0.4), 0 0 120px rgba(220,38,38,0.15), inset 0 0 40px rgba(220,38,38,0.1)',
          }}>
          <span style={{ fontSize: '4rem' }}>🔔</span>
          <span className="font-display text-white tracking-widest" style={{ fontSize: '2.5rem' }}>BUZZ</span>
        </button>
        {isHost && (
          <button
            onClick={() => socket.emit('skip-question', { code })}
            className="mt-3 text-white/20 hover:text-white/50 text-sm transition-colors">
            ⏭ Passer la question
          </button>
        )}
        <ScoreBadge score={myScore} delta={delta} />
      </div>
    </div>
  );

  // ── BUZZÉ MOI — QCM pour répondre ────────────────────────────────────
  if (bstate === 'buzzed-me') {
    const submitQCM = (opt: string) => {
      setQcmSelected(opt);
      socket.emit('player-answer', { code, selectedOption: opt });
    };
    return (
      <div className="min-h-screen flex flex-col p-5"
           style={{ background: 'radial-gradient(ellipse at 50% 30%, #2d0f00, #08090f 65%)' }}>
        <audio ref={audioRef} />

        {/* Badge buzzé */}
        <div className="flex flex-col items-center pt-6 pb-4">
          <div className="relative mb-3">
            <div className="w-20 h-20 rounded-full border-2 border-orange-400/60 flex items-center justify-center"
                 style={{ background: 'rgba(251,146,60,0.15)', boxShadow: '0 0 40px rgba(251,146,60,0.4)' }}>
              <span className="text-4xl">🔔</span>
            </div>
            <div className="absolute inset-0 rounded-full border border-orange-400/40 animate-ping" />
          </div>
          <h2 className="font-display text-4xl mb-1"
              style={{ color: '#fb923c', textShadow: '0 0 30px rgba(251,146,60,0.7)' }}>
            TU AS BUZZÉ !
          </h2>
          <p className="text-white/35 text-sm">Choisis ta réponse :</p>
        </div>

        {/* QCM */}
        {qcmOptions.length > 0 ? (
          <div className="flex-1">
            <QCMOptions
              options={qcmOptions}
              correctOption={qcmCorrectSong ? `${qcmCorrectSong.title} — ${qcmCorrectSong.artist}` : ''}
              selected={qcmSelected}
              onSelect={submitQCM}
            />
          </div>
        ) : (
          <p className="text-white/30 text-center flex-1 flex items-center justify-center">
            Donne ta réponse à l'hôte
          </p>
        )}

        <ScoreBadge score={myScore} delta={delta} />
      </div>
    );
  }

  // ── BUZZÉ AUTRE ────────────────────────────────────────────────────────
  if (bstate === 'buzzed-other') return (
    <FullScreen bg="radial-gradient(ellipse at 50% 35%, #1a1200, #08090f 70%)">
      <audio ref={audioRef} />
      <div className="relative mb-5">
        <div className="w-36 h-36 rounded-full border-2 border-yellow-400/60 flex items-center justify-center"
             style={{ background: 'rgba(250,204,21,0.12)', boxShadow: '0 0 60px rgba(250,204,21,0.35), 0 0 120px rgba(250,204,21,0.12)' }}>
          <span className="text-6xl">🔔</span>
        </div>
        <div className="absolute inset-0 rounded-full border border-yellow-400/40 animate-ping" />
      </div>
      <h2 className="font-display text-5xl text-center px-4 mb-2"
          style={{ color: '#fde047', textShadow: '0 0 40px rgba(250,204,21,0.6)' }}>
        {buzzedName}
      </h2>
      <p className="text-white/40 text-xl font-bold tracking-wide">A BUZZÉ !</p>
      <p className="text-white/20 text-sm mt-3 animate-pulse">En attente de sa réponse…</p>
      <ScoreBadge score={myScore} delta={delta} />
    </FullScreen>
  );

  // ── MAUVAISE RÉPONSE ───────────────────────────────────────────────────
  if (bstate === 'wrong') return (
    <FullScreen bg="radial-gradient(ellipse at 50% 40%, #1a0000, #08090f 70%)">
      <audio ref={audioRef} />
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
      <audio ref={audioRef} />
      <div className="vinyl mb-5" style={{ width: 80, height: 80, opacity: 0.5 }}>
        <div className="vinyl-center" />
      </div>
      <p className="text-white/25 text-xs uppercase tracking-widest mb-3">C'était…</p>
      <h2 className="font-display text-5xl text-white text-center px-5 mb-1"
          style={{ textShadow: '0 0 30px rgba(139,92,246,0.5)' }}>
        {revealed.title}
      </h2>
      <p className="text-purple-300 font-semibold text-xl">{revealed.artist}</p>
      <p className="text-white/20 mt-1">{revealed.year}</p>
      {qcmOptions.length > 0 && (
        <div className="w-full max-w-sm mt-5 px-4">
          <QCMOptions
            options={qcmOptions}
            correctOption={`${revealed.title} — ${revealed.artist}`}
            selected={qcmSelected ?? `${revealed.title} — ${revealed.artist}`}
            onSelect={() => {}}
          />
        </div>
      )}
      <p className="text-white/10 text-xs mt-5 animate-pulse">Prochaine question…</p>
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
