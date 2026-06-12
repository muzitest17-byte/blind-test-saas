import { useEffect, useRef, useState, useCallback } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import { socket } from '../socket';
import type { Player, Song } from '../types';
import { genreLabels, genreColors, decadeLabels } from '../data/songs';

type Phase = 'lobby' | 'question' | 'listening' | 'buzzed' | 'revealed' | 'finished';
type Tab   = 'game' | 'players' | 'qr';

export default function Host() {
  const { code } = useParams<{ code: string }>();
  const { state } = useLocation() as { state: { ip: string } };
  const nav = useNavigate();

  const [players, setPlayers]               = useState<Player[]>([]);
  const [phase, setPhase]                   = useState<Phase>('lobby');
  const [currentSong, setCurrentSong]       = useState<Song | null>(null);
  const [questionIndex, setQuestionIndex]   = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [buzzedPlayer, setBuzzedPlayer]     = useState<{ id: string; name: string } | null>(null);
  const [previewUrl, setPreviewUrl]         = useState<string | null>(null);
  const [previewLoading, setPreviewLoading] = useState(false);
  const [isPlaying, setIsPlaying]           = useState(false);
  const [volume, setVolume]                 = useState(0.8);
  const [currentTime, setCurrentTime]       = useState(0);
  const [finalPlayers, setFinalPlayers]     = useState<Player[]>([]);
  const [tab, setTab]                       = useState<Tab>('game');

  // Mode "Je joue aussi"
  const [hostIsPlayer, setHostIsPlayer]     = useState(false);
  const [hostName, setHostName]             = useState('');
  const [hostNameInput, setHostNameInput]   = useState('');
  const [revealedSong, setRevealedSong]     = useState<Song | null>(null); // chanson révélée manuellement
  const [myBuzzed, setMyBuzzed]             = useState(false); // j'ai buzzé
  const [myDelta, setMyDelta]               = useState<number | null>(null);
  const [myScore, setMyScore]               = useState(0);
  const prevScore = useRef(0);

  const audioRef = useRef<HTMLAudioElement>(null);
  const joinUrl  = `${window.location.origin}/join/${code}`;

  const loadPreview = useCallback(async (song: Song) => {
    if (!song.deezerQuery) return; // joueurs ne reçoivent pas deezerQuery
    setPreviewLoading(true); setPreviewUrl(null); setIsPlaying(false);
    try {
      const r = await fetch(`/api/preview?q=${encodeURIComponent(song.deezerQuery)}`);
      const d = await r.json();
      setPreviewUrl(d.preview || null);
    } catch { setPreviewUrl(null); }
    setPreviewLoading(false);
  }, []);

  useEffect(() => {
    socket.on('room-update', ({ players: p }) => {
      setPlayers(p);
      const me = p.find((x: Player) => x.id === socket.id);
      if (me) { setMyScore(me.score); }
    });
    socket.on('game-started', ({ total }) => setTotalQuestions(total));
    socket.on('new-question', ({ song, index }) => {
      setCurrentSong(song as Song);
      setQuestionIndex(index);
      setPhase('question');
      setBuzzedPlayer(null);
      setPreviewUrl(null);
      setRevealedSong(null);
      setMyBuzzed(false);
      setTab('game');
      loadPreview(song as Song);
    });
    socket.on('buzz-enabled', () => setPhase('listening'));
    socket.on('player-buzzed', ({ playerId, playerName }) => {
      setBuzzedPlayer({ id: playerId, name: playerName });
      setPhase('buzzed');
      if (playerId === socket.id) setMyBuzzed(true);
      if (audioRef.current) audioRef.current.pause();
    });
    socket.on('answer-correct', ({ players: p }) => {
      setPlayers(p);
      const me = p.find((x: Player) => x.id === socket.id);
      if (me) {
        const d = me.score - prevScore.current;
        if (d > 0) { setMyDelta(d); setTimeout(() => setMyDelta(null), 2500); }
        setMyScore(me.score); prevScore.current = me.score;
      }
    });
    socket.on('answer-wrong', ({ players: p }) => {
      setPlayers(p);
      const me = p.find((x: Player) => x.id === socket.id);
      if (me) { setMyScore(me.score); prevScore.current = me.score; }
      setBuzzedPlayer(null); setMyBuzzed(false); setPhase('listening');
    });
    socket.on('reveal-answer', ({ song, players: p }) => {
      setCurrentSong(song as Song); setRevealedSong(song as Song); setPlayers(p); setPhase('revealed');
      const me = p.find((x: Player) => x.id === socket.id);
      if (me) setMyScore(me.score);
    });
    socket.on('game-finished', ({ players: p }) => { setFinalPlayers(p); setPhase('finished'); });
    socket.on('host-left', () => nav('/'));
    return () => ['room-update','game-started','new-question','buzz-enabled','player-buzzed','answer-correct','answer-wrong','reveal-answer','game-finished','host-left'].forEach(e => socket.off(e));
  }, [nav, loadPreview]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !previewUrl) return;
    audio.src = previewUrl; audio.volume = volume;
    const onTime = () => setCurrentTime(audio.currentTime);
    audio.addEventListener('timeupdate', onTime);
    return () => audio.removeEventListener('timeupdate', onTime);
  }, [previewUrl]);

  function togglePlay() { const a = audioRef.current; if (!a) return; if (isPlaying) { a.pause(); setIsPlaying(false); } else { a.play(); setIsPlaying(true); } }
  function restart()    { const a = audioRef.current; if (!a) return; a.currentTime = 0; a.play(); setIsPlaying(true); }
  function enableBuzz() { socket.emit('enable-buzz', { code }); setPhase('listening'); const a = audioRef.current; if (a && previewUrl) { a.play(); setIsPlaying(true); } }
  function markCorrect(){ socket.emit('answer-result', { code, correct: true }); }
  function markWrong()  { socket.emit('answer-result', { code, correct: false }); }
  function skipQ()      { socket.emit('skip-question', { code }); }
  function startGame()  { socket.emit('start-game', { code }); }

  function doBuzz() {
    if (phase !== 'listening') return;
    socket.emit('buzz', { code });
    try { navigator.vibrate?.(150); } catch {}
  }

  function joinAsPlayer() {
    const name = hostNameInput.trim();
    if (!name) return;
    socket.emit('host-join-as-player', { code, name }, () => {
      setHostName(name); setHostIsPlayer(true);
    });
  }

  function revealSong() {
    socket.emit('get-current-song', { code }, ({ song }: { song: Song }) => {
      setRevealedSong(song);
    });
  }

  if (phase === 'finished') return <Podium players={finalPlayers} myId={socket.id ?? ''} onHome={() => nav('/')} />;

  const song = revealedSong || currentSong;
  const gc = song?.genre ? (genreColors[song.genre] || '#8b5cf6') : '#8b5cf6';
  const songVisible = !hostIsPlayer || revealedSong !== null;

  return (
    <div className="min-h-screen bg-[#06060e] flex flex-col" style={{ userSelect: 'none' }}>
      <audio ref={audioRef} onEnded={() => setIsPlaying(false)} />

      {/* ── TOP BAR ── */}
      <div className="flex items-center justify-between px-4 pt-4 pb-2 gap-3">
        <div className="flex items-center gap-2">
          <span className="font-display text-3xl text-white leading-none">{code}</span>
          <span className="text-xs font-bold px-2.5 py-1.5 rounded-full"
                style={{ background: phase === 'buzzed' ? 'rgba(251,146,60,0.15)' : phase === 'revealed' ? 'rgba(6,182,212,0.15)' : 'rgba(139,92,246,0.15)',
                         color:      phase === 'buzzed' ? '#fb923c'              : phase === 'revealed' ? '#22d3ee'              : '#c084fc',
                         border: `1px solid ${phase === 'buzzed' ? 'rgba(251,146,60,0.3)' : phase === 'revealed' ? 'rgba(6,182,212,0.3)' : 'rgba(192,132,252,0.3)'}` }}>
            {phase === 'lobby' ? '⏳ Attente' : `Q ${questionIndex}/${totalQuestions}`}
          </span>
        </div>
        {/* Score si je joue */}
        {hostIsPlayer && phase !== 'lobby' && (
          <div className="relative flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white/6 border border-white/10">
            {myDelta !== null && (
              <span className="absolute -top-5 right-0 text-emerald-400 font-black text-sm animate-bounce">
                +{myDelta}
              </span>
            )}
            <span className="text-white/40 text-xs">{hostName}</span>
            <span className="font-display text-lg" style={{ background: 'linear-gradient(90deg,#a855f7,#ec4899)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>
              {myScore}
            </span>
            <span className="text-white/20 text-xs">pts</span>
          </div>
        )}
      </div>

      {/* Progress */}
      {phase !== 'lobby' && (
        <div className="mx-4 h-1 rounded-full bg-white/5 overflow-hidden">
          <div className="h-full rounded-full transition-all duration-700"
               style={{ width:`${(questionIndex/totalQuestions)*100}%`, background:`linear-gradient(90deg,${gc},${gc}99)` }} />
        </div>
      )}

      {/* ── TABS ── */}
      {phase !== 'lobby' && (
        <div className="flex mx-4 mt-3 gap-1 p-1 rounded-2xl bg-white/5 border border-white/8">
          {(['game','players','qr'] as Tab[]).map(t => (
            <button key={t} onClick={() => setTab(t)}
              className="flex-1 py-2 rounded-xl text-xs font-bold transition-all"
              style={{ background: tab === t ? 'rgba(139,92,246,0.3)' : 'transparent',
                       color:      tab === t ? '#c084fc' : 'rgba(255,255,255,0.3)',
                       border: `1px solid ${tab === t ? 'rgba(192,132,252,0.4)' : 'transparent'}` }}>
              {t === 'game' ? '🎵 Jeu' : t === 'players' ? `👥 (${players.length})` : '📷 QR'}
            </button>
          ))}
        </div>
      )}

      {/* ── CONTENU ── */}
      <div className="flex-1 overflow-auto px-4 pb-4 pt-3">

        {/* ══ LOBBY ══ */}
        {phase === 'lobby' && (
          <div className="flex flex-col items-center gap-4 pt-2">
            <div className="bg-white p-3 rounded-2xl shadow-xl">
              <QRCodeSVG value={joinUrl} size={190} />
            </div>
            <p className="text-white/25 text-xs text-center break-all font-mono px-2">{joinUrl}</p>

            {/* Joueurs */}
            <div className="w-full rounded-2xl bg-white/5 border border-white/8 p-4">
              <p className="text-xs text-white/25 uppercase tracking-widest text-center mb-3">
                Joueurs ({players.length}/8)
              </p>
              {players.length === 0
                ? <p className="text-white/15 text-sm text-center py-3">Aucun joueur encore…</p>
                : <div className="flex flex-wrap gap-2 justify-center">
                    {players.map(p => (
                      <span key={p.id} className="px-3 py-1.5 rounded-full bg-white/8 border border-white/12 text-white/70 text-sm font-semibold">
                        {p.name}
                      </span>
                    ))}
                  </div>
              }
            </div>

            {/* Je joue aussi */}
            <div className="w-full rounded-2xl border p-4"
                 style={{ background: hostIsPlayer ? 'rgba(139,92,246,0.1)' : 'rgba(255,255,255,0.04)',
                          borderColor: hostIsPlayer ? 'rgba(192,132,252,0.4)' : 'rgba(255,255,255,0.08)' }}>
              {!hostIsPlayer ? (
                <>
                  <p className="text-white/50 text-sm font-semibold mb-3 text-center">🎮 Je joue aussi</p>
                  <div className="flex gap-2">
                    <input
                      value={hostNameInput}
                      onChange={e => setHostNameInput(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && joinAsPlayer()}
                      placeholder="Mon prénom…"
                      maxLength={20}
                      className="flex-1 rounded-xl px-4 py-3 text-base outline-none"
                      style={{ background:'#ffffff', color:'#111111', border:'2px solid rgba(255,255,255,0.2)' }}
                    />
                    <button onClick={joinAsPlayer} disabled={!hostNameInput.trim()}
                      className="px-5 py-3 rounded-xl font-bold text-sm disabled:opacity-30 transition-all active:scale-95"
                      style={{ background:'rgba(139,92,246,0.3)', border:'1px solid rgba(192,132,252,0.4)', color:'#c084fc' }}>
                      OK
                    </button>
                  </div>
                </>
              ) : (
                <p className="text-purple-300 font-bold text-center">
                  ✅ Tu joues en tant que <span className="text-white">{hostName}</span>
                </p>
              )}
            </div>

            <button onClick={startGame} disabled={players.length === 0}
              className="w-full py-6 rounded-3xl font-display text-3xl tracking-widest disabled:opacity-30 transition-all active:scale-95"
              style={{ background:'linear-gradient(135deg,#7c3aed,#c084fc)', boxShadow:'0 0 40px rgba(139,92,246,0.4)' }}>
              DÉMARRER
            </button>
          </div>
        )}

        {/* ══ TAB JEU ══ */}
        {phase !== 'lobby' && tab === 'game' && (
          <div className="flex flex-col gap-3">

            {/* Chanson — cachée si je joue et pas encore révélée */}
            {currentSong && (phase === 'question' || phase === 'listening' || phase === 'buzzed') && (
              <div className="rounded-2xl p-4 relative overflow-hidden"
                   style={{ background:`linear-gradient(135deg,${gc}18,${gc}06)`, border:`1px solid ${gc}35` }}>
                <div className="absolute top-0 right-0 w-28 h-28 rounded-full blur-3xl opacity-20"
                     style={{ background:`radial-gradient(circle,${gc},transparent)` }} />
                {song?.genre && (
                  <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: gc }}>
                    {genreLabels[song.genre]}{song.decade ? ` · ${decadeLabels[song.decade]}` : ''}
                  </p>
                )}
                {songVisible ? (
                  <>
                    <p className="font-display text-3xl text-white leading-tight">{song?.title}</p>
                    <p className="text-white/50 font-semibold mt-0.5">{song?.artist}{song?.year ? ` · ${song.year}` : ''}</p>
                  </>
                ) : (
                  <div className="flex items-center justify-between mt-1">
                    <div>
                      <div className="h-6 w-48 rounded-lg bg-white/10 mb-2 blur-sm" />
                      <div className="h-4 w-32 rounded-lg bg-white/6 blur-sm" />
                    </div>
                    <button onClick={revealSong}
                      className="px-4 py-2.5 rounded-xl text-sm font-bold transition-all active:scale-95 flex-shrink-0"
                      style={{ background:'rgba(255,255,255,0.08)', border:'1px solid rgba(255,255,255,0.15)', color:'rgba(255,255,255,0.5)' }}>
                      👁 Voir
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* BUZZÉ — qui */}
            {phase === 'buzzed' && buzzedPlayer && (
              <div className={`rounded-2xl p-4 text-center animate-scale-in ${myBuzzed ? 'border-2 border-orange-500/50 bg-orange-500/10' : 'border border-orange-500/30 bg-orange-500/6'}`}>
                <p className="text-orange-400/60 text-xs uppercase tracking-widest mb-1">A buzzé !</p>
                <h3 className="font-display text-4xl" style={{ color:'#fb923c', textShadow:'0 0 25px rgba(251,146,60,0.5)' }}>
                  {buzzedPlayer.name}
                </h3>
                {myBuzzed && <p className="text-orange-300/60 text-sm mt-1">C'est toi ! Donne ta réponse puis valide</p>}
              </div>
            )}

            {/* ── BUZZER si je joue ── */}
            {hostIsPlayer && phase === 'listening' && !buzzedPlayer && (
              <button onPointerDown={doBuzz}
                className="w-full py-8 rounded-3xl flex flex-col items-center justify-center gap-2 transition-all active:scale-95"
                style={{ background:'radial-gradient(ellipse at 50% 60%, rgba(220,38,38,0.2), rgba(220,38,38,0.05))',
                         border:'2px solid rgba(220,38,38,0.4)',
                         boxShadow:'0 0 30px rgba(220,38,38,0.2)' }}>
                <span className="text-5xl">🔔</span>
                <span className="font-display text-white text-2xl tracking-widest">BUZZ</span>
              </button>
            )}

            {/* Audio player */}
            {(phase === 'question' || phase === 'listening' || phase === 'buzzed') && previewUrl && !previewLoading && (
              <div className="rounded-2xl bg-white/5 border border-white/8 p-4 space-y-3">
                <div className="flex items-end justify-center gap-1" style={{ height:28 }}>
                  {[14,22,30,16,26,12,22,28,10,18,24].map((h,i) => (
                    <div key={i} className="eq-bar rounded-sm"
                         style={{ height:h, width:4, animationDelay:`${i*0.07}s`, opacity:isPlaying?1:0.2,
                                  background:`linear-gradient(to top,${gc}99,${gc})` }} />
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-white/25 tabular-nums w-6">{Math.floor(currentTime)}s</span>
                  <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all" style={{ width:`${(currentTime/30)*100}%`, background:gc }} />
                  </div>
                  <span className="text-xs text-white/25 tabular-nums w-6">30s</span>
                </div>
                <div className="flex items-center justify-center gap-4">
                  <button onClick={restart} className="text-white/30 active:text-white/60 text-xl">↩</button>
                  <button onClick={togglePlay}
                    className="w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold transition-all active:scale-90"
                    style={{ background:isPlaying?`${gc}25`:'linear-gradient(135deg,#7c3aed,#a855f7)',
                             border:`2px solid ${isPlaying?gc:'rgba(167,139,250,0.5)'}`,
                             boxShadow:`0 0 20px ${isPlaying?gc:'#a855f7'}40` }}>
                    {isPlaying ? '⏸' : '▶'}
                  </button>
                  <div className="flex items-center gap-2">
                    <span className="text-white/20 text-sm">🔊</span>
                    <input type="range" min={0} max={1} step={0.05} value={volume}
                      onChange={e => { setVolume(+e.target.value); if (audioRef.current) audioRef.current.volume = +e.target.value; }}
                      className="w-20 accent-purple-500" />
                  </div>
                </div>
              </div>
            )}
            {(phase === 'question' || phase === 'listening' || phase === 'buzzed') && previewLoading && (
              <div className="text-center py-4 text-white/25 text-sm animate-pulse">Chargement audio…</div>
            )}

            {/* Revealed */}
            {phase === 'revealed' && currentSong && (
              <div className="rounded-2xl p-6 text-center bg-white/5 border border-white/8 animate-scale-in">
                <div className="vinyl vinyl-spin w-14 h-14 mx-auto relative mb-4"><div className="vinyl-center" /></div>
                <p className="text-white/25 text-xs uppercase tracking-widest mb-2">C'était…</p>
                <h2 className="font-display text-4xl text-white mb-1" style={{ textShadow:`0 0 30px ${gc}70` }}>
                  {revealedSong?.title || currentSong.title}
                </h2>
                <p className="text-white/50 font-semibold text-lg">{revealedSong?.artist || currentSong.artist}</p>
                <p className="text-white/25 text-sm mt-1">{revealedSong?.year || currentSong.year} · {genreLabels[currentSong.genre]}</p>
                <p className="text-white/15 text-xs mt-5 animate-pulse">Prochaine question dans 6s…</p>
              </div>
            )}

            {/* ── ACTIONS HOST ── */}
            {phase === 'question' && (
              <div className="grid grid-cols-2 gap-3">
                <button onClick={enableBuzz}
                  className="py-5 rounded-2xl font-display text-xl tracking-wider active:scale-95 transition-all"
                  style={{ background:'rgba(16,185,129,0.15)', border:'2px solid rgba(16,185,129,0.4)', color:'#6ee7b7' }}>
                  ✅ ACTIVER
                </button>
                <button onClick={skipQ}
                  className="py-5 rounded-2xl font-bold text-white/30 bg-white/5 border border-white/10 active:scale-95 transition-all">
                  ⏭ Passer
                </button>
              </div>
            )}

            {phase === 'listening' && !buzzedPlayer && (
              <div className="rounded-2xl p-3 text-center border border-emerald-500/20 bg-emerald-500/6">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                  <p className="text-emerald-400 font-black text-sm">BUZZEURS ACTIFS</p>
                </div>
                <button onClick={skipQ} className="mt-2 px-5 py-2 rounded-xl text-white/30 bg-white/5 border border-white/10 text-sm active:scale-95">
                  Révéler et passer
                </button>
              </div>
            )}

            {phase === 'buzzed' && buzzedPlayer && (
              <div className="grid grid-cols-2 gap-3">
                <button onClick={markCorrect}
                  className="py-6 rounded-2xl font-display text-2xl tracking-wider active:scale-95 transition-all"
                  style={{ background:'rgba(16,185,129,0.15)', border:'2px solid rgba(16,185,129,0.4)', color:'#6ee7b7' }}>
                  ✅ OUI
                </button>
                <button onClick={markWrong}
                  className="py-6 rounded-2xl font-display text-2xl tracking-wider active:scale-95 transition-all"
                  style={{ background:'rgba(239,68,68,0.15)', border:'2px solid rgba(239,68,68,0.4)', color:'#fca5a5' }}>
                  ❌ NON
                </button>
              </div>
            )}
          </div>
        )}

        {/* ══ TAB JOUEURS ══ */}
        {phase !== 'lobby' && tab === 'players' && (
          <div className="rounded-2xl bg-white/5 border border-white/8 p-4">
            <p className="text-xs text-white/25 uppercase tracking-widest mb-4 font-semibold text-center">
              Classement — {players.length} joueurs
            </p>
            {[...players].sort((a,b) => b.score-a.score).map((p,i) => (
              <div key={p.id} className={`flex items-center gap-3 py-3.5 border-b border-white/5 last:border-0 ${p.id === socket.id ? 'text-purple-300' : ''}`}>
                <span className="text-xl w-8 text-center">
                  {i===0?'🥇':i===1?'🥈':i===2?'🥉':`${i+1}.`}
                </span>
                <span className={`flex-1 font-semibold text-base truncate ${p.id===socket.id?'text-purple-300':'text-white'}`}>
                  {p.name}{p.id===socket.id && <span className="text-xs opacity-50 ml-1">moi</span>}
                </span>
                <div className="text-right">
                  <p className="font-black text-lg" style={{ color: p.id===socket.id ? '#c084fc' : gc }}>{p.score}</p>
                  <p className="text-white/20 text-xs">{p.correct}✓ {p.wrong}✗</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ══ TAB QR ══ */}
        {phase !== 'lobby' && tab === 'qr' && (
          <div className="flex flex-col items-center gap-4 pt-4">
            <div className="bg-white p-3 rounded-2xl shadow-xl">
              <QRCodeSVG value={joinUrl} size={220} />
            </div>
            <p className="text-white/25 text-xs text-center break-all font-mono px-2">{joinUrl}</p>
          </div>
        )}
      </div>
    </div>
  );
}

function Podium({ players, myId, onHome }: { players: Player[]; myId: string; onHome: () => void }) {
  const medals = ['🥇','🥈','🥉'];
  const rank   = players.findIndex(p => p.id === myId) + 1;
  return (
    <div className="min-h-screen bg-[#06060e] flex flex-col items-center justify-center p-5">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 flex items-center justify-center opacity-10">
          <div className="w-96 h-96 rounded-full" style={{ background:'radial-gradient(circle,#7c3aed,transparent 65%)' }} />
        </div>
      </div>
      <div className="text-6xl mb-3 animate-bounce">🏆</div>
      <h1 className="font-display text-6xl text-white mb-1 tracking-widest"
          style={{ textShadow:'0 0 40px rgba(139,92,246,0.6)' }}>PODIUM</h1>
      <p className="text-white/25 text-sm mb-7">Résultats finaux</p>
      <div className="w-full max-w-sm space-y-2 mb-8 relative z-10">
        {players.map((p,i) => (
          <div key={p.id} className={`flex items-center gap-3 py-3.5 px-4 rounded-2xl ${p.id===myId ? 'border border-purple-500/40 bg-purple-500/10' : i===0 ? 'border border-yellow-500/30 bg-yellow-500/8' : 'border border-white/6 bg-white/3'}`}>
            <span className="text-2xl w-8">{medals[i]||`${i+1}.`}</span>
            <span className={`flex-1 font-bold ${p.id===myId?'text-purple-300':'text-white'}`}>{p.name}</span>
            <div className="text-right">
              <span className="font-display text-2xl text-purple-300">{p.score}</span>
              <p className="text-white/20 text-xs">{p.correct}✓ {p.wrong}✗</p>
            </div>
          </div>
        ))}
      </div>
      {rank > 0 && (rank === 1
        ? <p className="text-yellow-400 font-black text-xl mb-4">🏆 Tu as gagné !</p>
        : <p className="text-white/35 mb-4">{rank}ème place</p>)}
      <button onClick={onHome}
        className="px-12 py-4 rounded-2xl font-display text-2xl tracking-widest relative z-10 active:scale-95 transition-all"
        style={{ background:'linear-gradient(135deg,#7c3aed,#c084fc)', boxShadow:'0 0 30px rgba(139,92,246,0.4)' }}>
        ACCUEIL
      </button>
    </div>
  );
}
