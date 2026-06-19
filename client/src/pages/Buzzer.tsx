import { useEffect, useState, useCallback, useRef } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import { socket } from '../socket';
import type { Player, Song } from '../types';
import { genreLabels, genreColors, songs as allSongs, generateOptions } from '../data/songs';
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
  const [listenCountdown, setListenCountdown] = useState(0);
  const [roomDifficulty, setRoomDifficulty] = useState(2);
  const prevScore     = useRef(0);
  const shouldPlayRef = useRef(false);
  const previewUrlRef = useRef<string | null>(null);
  const audioRef      = useRef<HTMLAudioElement>(null);
  const wakeLock     = useRef<WakeLockSentinel | null>(null);

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
    if (bstate !== 'ready') return;
    if (timeLeft <= 0) return;
    const t = setTimeout(() => setTimeLeft(s => s - 1), 1000);
    return () => clearTimeout(t);
  }, [bstate, timeLeft]);

  useEffect(() => {
    if (bstate !== 'waiting') return;
    if (listenCountdown <= 0) return;
    const t = setTimeout(() => setListenCountdown(s => s - 1), 1000);
    return () => clearTimeout(t);
  }, [bstate, listenCountdown]);

  const loadPreview = useCallback(async (deezerQuery: string) => {
    previewUrlRef.current = null; setIsPlaying(false);
    try {
      const r = await fetch(`/api/preview?q=${encodeURIComponent(deezerQuery)}`);
      const d = await r.json();
      previewUrlRef.current = d.preview || null;
      // audioRef.current is always the same persistent element — safe to use directly
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
      setListenCountdown(10);
      shouldPlayRef.current = true; // musique démarre dès le chargement, sans attendre le buzz
      // Clear previous audio immediately so the old song doesn't bleed over
      const audio = audioRef.current;
      if (audio) { audio.pause(); audio.src = ''; }
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
      // audioRef.current is the persistent element — always valid here
      const audio = audioRef.current;
      if (audio && previewUrlRef.current) {
        audio.play().then(() => setIsPlaying(true)).catch(() => {});
      }
      // If previewUrlRef is still null (slow network), loadPreview will play when it resolves
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

  const submitQCM = useCallback((opt: string) => {
    setQcmSelected(opt);
    socket.emit('player-answer', { code, selectedOption: opt });
  }, [code]);

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
        <div className="px-6 py-2.5 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 font-mono font-bold tracking-widest text-2xl mb-4">
          {code}
        </div>

        <div className="bg-white rounded-2xl p-4 mb-4">
          <QRCodeSVG value={joinUrl} size={180} />
        </div>
        <p className="text-white/20 text-xs mb-4 font-mono text-center px-4">{joinUrl}</p>

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

  // ── ÉTATS DE JEU — audio persistant, jamais démonté entre états ───────
  return (
    <>
      {/* Un seul élément audio partagé par tous les états de jeu */}
      <audio ref={audioRef} onEnded={() => setIsPlaying(false)} style={{ display: 'none' }} />

      {/* WAITING — bouton visible dès le début, désactivé avec countdown */}
      {bstate === 'waiting' && (
        <div className="min-h-screen flex flex-col select-none"
             style={{ background: 'radial-gradient(ellipse at 50% 45%, #1e0308, #08090f 75%)' }}>
          {/* Header */}
          <div className="flex items-center justify-between px-5 pt-5 pb-2">
            <div className="flex items-center gap-2">
              {isPlaying && (
                <div className="flex items-end gap-0.5" style={{ height: 16 }}>
                  {[8,14,10,16,9].map((h, i) => (
                    <div key={i} className="eq-bar rounded-sm"
                         style={{ height: h, width: 3, animationDelay: `${i * 0.1}s`,
                                  background: 'linear-gradient(to top, #8B000099, #DC143C)' }} />
                  ))}
                </div>
              )}
              {question && <span className="text-xs text-white/30">Q{question.index}/{question.total}</span>}
            </div>
            {question?.genre && (
              <span className="text-xs font-bold px-3 py-1 rounded-full"
                    style={{ background: `${gc}20`, color: gc, border: `1px solid ${gc}40` }}>
                {genreLabels[question.genre]}
              </span>
            )}
          </div>

          {/* Bouton désactivé avec countdown arménien */}
          <div className="flex-1 flex flex-col items-center justify-center gap-5 pb-4">
            {/* Anneau décoratif arménien */}
            <div style={{
              borderRadius: '50%', padding: 10,
              background: 'conic-gradient(#7a6000 0deg, #3d0a12 40deg, #7a6000 80deg, #0d2a5e 120deg, #7a6000 160deg, #3d0a12 200deg, #7a6000 240deg, #0d2a5e 280deg, #7a6000 320deg, #3d0a12 360deg)',
              boxShadow: '0 0 20px rgba(122,96,0,0.2)',
            }}>
              <div style={{ borderRadius: '50%', padding: 8, background: '#0d0206' }}>
                <div style={{
                  width: '62vmin', height: '62vmin', maxWidth: 310, maxHeight: 310,
                  borderRadius: '50%',
                  background: 'radial-gradient(ellipse at 40% 35%, #3a1018, #1e0610 50%, #110208)',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                  boxShadow: 'inset 0 0 40px rgba(0,0,0,0.6)',
                }}>
                  <span style={{
                    fontFamily: 'var(--font-display, sans-serif)', fontSize: '1.4rem',
                    letterSpacing: '0.25em', color: 'rgba(184,151,26,0.35)',
                  }}>
                    BUZZ
                  </span>
                </div>
              </div>
            </div>
            <p className="text-white/25 text-xs uppercase tracking-widest">🎵 Écoute avant de buzzer</p>
            <ScoreBadge score={myScore} delta={delta} />
          </div>
        </div>
      )}

      {/* READY — buzzer arménien actif */}
      {bstate === 'ready' && (
        <div className="min-h-screen flex flex-col select-none"
             style={{ background: 'radial-gradient(ellipse at 50% 45%, #2d0508, #08090f 75%)' }}>
          {/* Header */}
          <div className="flex items-center justify-between px-5 pt-5 pb-2">
            <div className="flex items-center gap-2">
              {isPlaying && (
                <div className="flex items-end gap-0.5" style={{ height: 16 }}>
                  {[8,14,10,16,9].map((h, i) => (
                    <div key={i} className="eq-bar rounded-sm"
                         style={{ height: h, width: 3, animationDelay: `${i * 0.1}s`,
                                  background: 'linear-gradient(to top, #DC143C99, #FF6B35)' }} />
                  ))}
                </div>
              )}
              {question && <span className="text-xs text-white/30">Q{question.index}/{question.total}</span>}
            </div>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center gap-4 pb-4">
            {/* Anneau décoratif arménien — couleurs vives */}
            <div style={{
              borderRadius: '50%', padding: 10,
              background: 'conic-gradient(#FFD700 0deg, #DC143C 40deg, #FFD700 80deg, #1B5E9E 120deg, #FFD700 160deg, #DC143C 200deg, #FFD700 240deg, #1B5E9E 280deg, #FFD700 320deg, #DC143C 360deg)',
              boxShadow: '0 0 60px rgba(220,20,60,0.55), 0 0 120px rgba(220,20,60,0.2), 0 0 0 3px rgba(255,215,0,0.25)',
              animation: 'armpulse 2s ease-in-out infinite',
            }}>
              <div style={{ borderRadius: '50%', padding: 8, background: '#0d0206' }}>
                <button
                  onPointerDown={doBuzz}
                  className="active:scale-90 transition-transform duration-75"
                  style={{
                    touchAction: 'none', WebkitTapHighlightColor: 'transparent',
                    width: '62vmin', height: '62vmin', maxWidth: 310, maxHeight: 310,
                    borderRadius: '50%', border: 'none', cursor: 'pointer',
                    background: 'radial-gradient(ellipse at 38% 32%, #FF8C50, #DC143C 40%, #8B0000 70%, #4a0010)',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6,
                    boxShadow: 'inset 0 -10px 25px rgba(0,0,0,0.45), inset 0 5px 15px rgba(255,120,60,0.3)',
                  }}>
                  <span style={{ fontSize: '3rem', filter: 'drop-shadow(0 0 10px rgba(255,215,0,0.6))' }}>🔔</span>
                  <span style={{
                    fontFamily: 'var(--font-display, sans-serif)', fontSize: '2.4rem',
                    letterSpacing: '0.2em', color: '#FFD700',
                    textShadow: '0 0 25px rgba(255,215,0,0.9), 0 2px 6px rgba(0,0,0,0.6)',
                  }}>
                    BUZZ
                  </span>
                </button>
              </div>
            </div>

            {isHost && (
              <button
                onClick={() => socket.emit('skip-question', { code })}
                className="text-white/20 hover:text-white/50 text-sm transition-colors">
                ⏭ Passer la question
              </button>
            )}
            <ScoreBadge score={myScore} delta={delta} />
          </div>
        </div>
      )}

      {/* BUZZED-ME */}
      {bstate === 'buzzed-me' && (
        <div className="min-h-screen flex flex-col p-5"
             style={{ background: 'radial-gradient(ellipse at 50% 30%, #2d0f00, #08090f 65%)' }}>
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
      )}

      {/* BUZZED-OTHER */}
      {bstate === 'buzzed-other' && (
        <FullScreen bg="radial-gradient(ellipse at 50% 35%, #1a1200, #08090f 70%)">
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
      )}

      {/* WRONG */}
      {bstate === 'wrong' && (
        <FullScreen bg="radial-gradient(ellipse at 50% 40%, #1a0000, #08090f 70%)">
          <span className="text-8xl mb-4 pop">❌</span>
          <h2 className="font-display text-7xl mb-2"
              style={{ color: '#f87171', textShadow: '0 0 30px rgba(239,68,68,0.6)' }}>
            FAUX !
          </h2>
          <p className="text-white/30 text-lg">−25 points</p>
          <p className="text-white/15 text-sm mt-6 animate-pulse">La bonne réponse arrive…</p>
        </FullScreen>
      )}

      {/* REVEALED */}
      {bstate === 'revealed' && revealed && (
        <FullScreen bg="#08090f">
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
          {isHost ? (
            <button
              onClick={() => socket.emit('skip-question', { code })}
              className="mt-5 px-10 py-4 rounded-2xl font-display text-xl tracking-widest text-white active:scale-95 transition-all"
              style={{ background: 'linear-gradient(135deg, #7c3aed, #a855f7)', boxShadow: '0 0 25px rgba(139,92,246,0.4)' }}>
              SUIVANT →
            </button>
          ) : (
            <p className="text-white/15 text-xs mt-5 animate-pulse">Prochaine question…</p>
          )}
          <ScoreBadge score={myScore} delta={delta} />
        </FullScreen>
      )}
    </>
  );
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
