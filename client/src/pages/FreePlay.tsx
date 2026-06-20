import { useEffect, useRef, useState, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getSongsByFilters, shuffle, genreLabels, genreColors, decadeLabels, generateOptions, songs as allSongs } from '../data/songs';
import QCMOptions from '../components/QCMOptions';
import MiniLogo from '../components/MiniLogo';
import type { Song, Genre, Decade } from '../types';

/* ─── Constants ──────────────────────────────────────────────────────────── */
const ALL_GENRES = Object.keys(genreLabels) as Genre[];
const ALL_DECADES = Object.keys(decadeLabels) as Decade[];

const DIFFICULTIES = [
  { max: 1, label: 'Novice',    emoji: '😊', color: '#10b981', time: 10 },
  { max: 2, label: 'Amateur',   emoji: '😄', color: '#3b82f6', time: 10 },
  { max: 3, label: 'Interméd.', emoji: '😐', color: '#f59e0b', time: 10 },
  { max: 4, label: 'Expert',    emoji: '😤', color: '#ef4444', time: 10 },
  { max: 5, label: 'Maître',    emoji: '🔥', color: '#a855f7', time: 10 },
];

const DIFFICULTY_TIME: Record<number, number> = { 1: 10, 2: 10, 3: 10, 4: 10, 5: 10 };

interface Config { genres: Genre[]; decades: Decade[]; difficulty: number; count: number; qcm: boolean }
interface Delta { id: number; text: string; positive: boolean }
type Phase = 'ready' | 'listening' | 'answered' | 'revealed';

/* ─── Extra CSS injected once ────────────────────────────────────────────── */
const EXTRA_CSS = `
  @keyframes floatNote {
    0%   { transform: translateY(0) rotate(0deg); opacity: 0; }
    8%   { opacity: 1; }
    92%  { opacity: 1; }
    100% { transform: translateY(-110vh) rotate(200deg); opacity: 0; }
  }
  @keyframes comboBurst {
    0%  { transform: scale(0.4) rotate(-8deg); opacity: 0; }
    55% { transform: scale(1.18) rotate(2deg); opacity: 1; }
    75% { transform: scale(0.96); }
    100%{ transform: scale(1) rotate(0); opacity: 1; }
  }
  @keyframes comboFade {
    0%,55% { opacity: 1; }
    100%   { opacity: 0; transform: translateY(-14px); }
  }
  @keyframes flashGreen {
    0%,100% { opacity: 0; }
    20%     { opacity: 1; }
  }
  @keyframes flashRed {
    0%,100% { opacity: 0; }
    20%     { opacity: 1; }
  }
  @keyframes scoreCount {
    from { opacity: 0; transform: translateY(18px) scale(0.85); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
  }
  @keyframes firePulse {
    0%,100% { text-shadow: 0 0 10px #f97316, 0 0 20px #ef4444; filter: brightness(1); }
    50%     { text-shadow: 0 0 24px #fbbf24, 0 0 48px #f97316; filter: brightness(1.2); }
  }
  @keyframes starReveal {
    from { transform: scale(0) rotate(-25deg); opacity: 0; }
    to   { transform: scale(1) rotate(0); opacity: 1; }
  }
  .combo-burst  { animation: comboBurst 0.5s cubic-bezier(0.34,1.56,0.64,1) forwards; }
  .combo-fade   { animation: comboFade 2s ease forwards; }
  .score-anim   { animation: scoreCount 0.6s cubic-bezier(0.16,1,0.3,1) forwards; }
`;

/* ─── Root ───────────────────────────────────────────────────────────────── */
export default function FreePlay() {
  const nav = useNavigate();
  const location = useLocation();
  const [mode, setMode] = useState<'config' | 'game'>(location.state?.restart ? 'game' : 'config');
  const [config, setConfig] = useState<Config>(
    location.state?.config ?? { genres: [], decades: [], difficulty: 2, count: 10, qcm: true }
  );

  return (
    <>
      <style>{EXTRA_CSS}</style>
      {mode === 'config'
        ? <ConfigScreen config={config} onChange={setConfig} onStart={() => setMode('game')} onBack={() => nav('/')} />
        : <GameScreen   config={config} onRestart={() => setMode('config')} onHome={() => nav('/')} />
      }
    </>
  );
}

/* ─── Config screen ──────────────────────────────────────────────────────── */
function ConfigScreen({ config, onChange, onStart, onBack }: {
  config: Config; onChange: (c: Config) => void; onStart: () => void; onBack: () => void;
}) {
  function toggle<T>(arr: T[], v: T) { return arr.includes(v) ? arr.filter(x => x !== v) : [...arr, v]; }
  const set = (patch: Partial<Config>) => onChange({ ...config, ...patch });
  const available = getSongsByFilters(config.genres, config.decades, config.difficulty);
  const maxQ = Math.max(5, Math.min(50, available.length));
  const count = Math.min(config.count, maxQ);

  return (
    <div className="min-h-screen flex flex-col p-5 pt-8 relative overflow-hidden"
         style={{ background: 'radial-gradient(ellipse 90% 50% at 50% -5%, rgba(6,182,212,0.14) 0%, #06060e 55%)' }}>

      {/* Floating musical notes */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        {['♩','♪','♫','♬','𝄞','♪','♩','𝄞','♫','♬','♩','♪'].map((n, i) => (
          <span key={i} style={{
            position: 'absolute',
            left: `${(i * 8.5 + 2) % 100}%`,
            bottom: '-30px',
            fontSize: 10 + (i % 4) * 8,
            opacity: 0.035 + (i % 3) * 0.015,
            color: ['#c084fc','#22d3ee','#f9a8d4','#fbbf24'][i % 4],
            animation: `floatNote ${9 + (i % 5) * 3}s linear ${i * 0.9}s infinite`,
          }}>{n}</span>
        ))}
      </div>

      <div className="w-full max-w-2xl mx-auto z-10 relative">
        <div className="flex items-center gap-3 mb-6">
          <MiniLogo size={30} />
          <button onClick={onBack} className="text-white/20 hover:text-white/60 transition-colors text-sm">← Accueil</button>
        </div>

        {/* Title */}
        <div className="mb-8">
          <h1 className="font-display text-7xl text-white leading-none"
              style={{ textShadow: '0 0 40px rgba(6,182,212,0.55), 0 0 80px rgba(6,182,212,0.2)' }}>
            MODE LIBRE
          </h1>
          <p className="text-white/30 text-xs tracking-[0.3em] uppercase mt-1">Configure · Joue · Recommence</p>
        </div>

        {/* Genres */}
        <ConfigSection title="Genres"
          badge={config.genres.length > 0 ? `${config.genres.length} sélectionnés` : 'Tous'}
          onClear={config.genres.length > 0 ? () => set({ genres: [] }) : undefined}>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {ALL_GENRES.map(g => {
              const on = config.genres.includes(g);
              const col = genreColors[g] || '#a855f7';
              return (
                <button key={g} onClick={() => set({ genres: toggle(config.genres, g) })}
                  className="relative py-3 px-4 rounded-2xl text-sm font-bold text-left transition-all duration-200 border overflow-hidden"
                  style={on
                    ? { background: `${col}15`, borderColor: `${col}50`, color: '#fff', boxShadow: `0 0 16px ${col}20` }
                    : { background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.35)' }
                  }>
                  {on && <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at 20% 50%, ${col}12, transparent 70%)` }} />}
                  <span className="relative">{genreLabels[g]}</span>
                  {on && <span className="absolute right-3 top-1/2 -translate-y-1/2 font-black" style={{ color: col }}>✓</span>}
                </button>
              );
            })}
          </div>
        </ConfigSection>

        {/* Decades */}
        <ConfigSection title="Décennies"
          badge={config.decades.length > 0 ? `${config.decades.length} sélectionnées` : 'Toutes'}
          onClear={config.decades.length > 0 ? () => set({ decades: [] }) : undefined}>
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
            {ALL_DECADES.map(d => {
              const on = config.decades.includes(d);
              return (
                <button key={d} onClick={() => set({ decades: toggle(config.decades, d) })}
                  className="py-2.5 rounded-xl text-xs font-bold text-center transition-all duration-200 border"
                  style={on
                    ? { background: 'rgba(6,182,212,0.14)', borderColor: 'rgba(34,211,238,0.5)', color: '#67e8f9', boxShadow: '0 0 12px rgba(6,182,212,0.2)' }
                    : { background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.35)' }
                  }>
                  {decadeLabels[d].replace('Années ', "'")}
                </button>
              );
            })}
          </div>
        </ConfigSection>

        {/* Difficulty */}
        <ConfigSection title="Difficulté" badge="">
          <div className="grid grid-cols-5 gap-2">
            {DIFFICULTIES.map(d => {
              const on = config.difficulty === d.max;
              return (
                <button key={d.max} onClick={() => set({ difficulty: d.max })}
                  className="py-3 rounded-2xl text-center transition-all duration-200 border"
                  style={on
                    ? { background: `${d.color}18`, borderColor: `${d.color}55`, boxShadow: `0 0 18px ${d.color}25` }
                    : { background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.07)' }
                  }>
                  <div className="text-xl mb-0.5">{d.emoji}</div>
                  <div className="text-[10px] font-bold leading-tight" style={{ color: on ? '#fff' : 'rgba(255,255,255,0.4)' }}>{d.label}</div>
                  <div className="text-[9px] mt-0.5" style={{ color: on ? d.color : 'rgba(255,255,255,0.2)' }}>{d.time}s</div>
                </button>
              );
            })}
          </div>
        </ConfigSection>

        {/* Question count */}
        <ConfigSection title="Questions" badge="">
          <div className="bg-white/4 rounded-2xl p-4 border border-white/6">
            <div className="flex justify-between items-center mb-3">
              <span className="text-white/35 text-sm">Nombre de questions</span>
              <span className="font-display text-5xl text-cyan-300" style={{ textShadow: '0 0 20px rgba(34,211,238,0.5)' }}>{count}</span>
            </div>
            <input type="range" min={5} max={maxQ} value={count}
              onChange={e => set({ count: +e.target.value })}
              className="w-full accent-cyan-500" />
            <div className="flex justify-between text-xs text-white/20 mt-1.5">
              <span>5 min</span><span>{maxQ} max</span>
            </div>
          </div>
        </ConfigSection>

        {/* Availability */}
        <div className="rounded-2xl p-3.5 flex items-center gap-3 border text-sm mb-5"
             style={available.length >= 5
               ? { background: 'rgba(16,185,129,0.06)', borderColor: 'rgba(52,211,153,0.2)', color: '#34d399' }
               : available.length >= 1
               ? { background: 'rgba(245,158,11,0.06)', borderColor: 'rgba(252,211,77,0.2)', color: '#fcd34d' }
               : { background: 'rgba(239,68,68,0.06)', borderColor: 'rgba(252,165,165,0.2)', color: '#f87171' }
             }>
          <span className="text-lg">{available.length >= 5 ? '✅' : '⚠️'}</span>
          <span>
            <strong>{available.length}</strong> chanson{available.length !== 1 ? 's' : ''} disponible{available.length !== 1 ? 's' : ''}
            {available.length > 0 && available.length < 5 && ' — Élargissez un peu les filtres'}
            {available.length === 0 && ' — Aucune chanson ne correspond'}
          </span>
        </div>

        {/* Response mode */}
        <ConfigSection title="Mode de réponse" badge="">
          <div className="grid grid-cols-2 gap-3">
            {[
              { qcm: false, icon: '⌨️', title: 'Saisie libre', desc: 'Tu tapes la réponse' },
              { qcm: true,  icon: '🔡', title: 'QCM — 4 choix', desc: 'Choisis parmi 4' },
            ].map(m => (
              <button key={String(m.qcm)} onClick={() => set({ qcm: m.qcm })}
                className="py-4 rounded-2xl border text-center transition-all duration-200"
                style={config.qcm === m.qcm
                  ? { borderColor: 'rgba(34,211,238,0.55)', background: 'rgba(6,182,212,0.1)', boxShadow: '0 0 16px rgba(6,182,212,0.15)' }
                  : { borderColor: 'rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.03)' }
                }>
                <div className="text-2xl mb-1.5">{m.icon}</div>
                <div className="font-bold text-sm" style={{ color: config.qcm === m.qcm ? '#fff' : 'rgba(255,255,255,0.4)' }}>{m.title}</div>
                <div className="text-xs mt-0.5 text-white/25">{m.desc}</div>
              </button>
            ))}
          </div>
        </ConfigSection>

        {/* Play button */}
        <button onClick={onStart} disabled={available.length < 1}
          className="w-full py-5 font-display text-3xl tracking-wider rounded-2xl text-white transition-all active:scale-95 disabled:opacity-25 disabled:cursor-not-allowed"
          style={{
            background: 'linear-gradient(135deg, #0891b2, #06b6d4, #22d3ee)',
            boxShadow: available.length >= 1
              ? '0 0 40px rgba(6,182,212,0.5), 0 0 80px rgba(6,182,212,0.2), inset 0 1px 0 rgba(255,255,255,0.2)'
              : 'none',
          }}>
          ▶ JOUER — {count} CHANSONS
        </button>
      </div>
    </div>
  );
}

function ConfigSection({ title, badge, onClear, children }: {
  title: string; badge: string; onClear?: () => void; children: React.ReactNode;
}) {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-xs uppercase tracking-widest text-white/30 font-semibold">{title}</span>
          {badge && <span className="text-xs text-white/15">{badge}</span>}
        </div>
        {onClear && (
          <button onClick={onClear} className="text-xs text-white/20 hover:text-white/50 transition-colors">Effacer</button>
        )}
      </div>
      {children}
    </div>
  );
}

/* ─── Game screen ────────────────────────────────────────────────────────── */
function GameScreen({ config, onRestart, onHome }: { config: Config; onRestart: () => void; onHome: () => void }) {
  const [queue] = useState(() =>
    shuffle(getSongsByFilters(config.genres, config.decades, config.difficulty)).slice(0, config.count)
  );
  const [qi, setQi]               = useState(0);
  const [phase, setPhase]         = useState<Phase>('ready');
  const [score, setScore]         = useState(0);
  const [correct, setCorrect]     = useState(0);
  const [wrong, setWrong]         = useState(0);
  const [streak, setStreak]       = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [guess, setGuess]         = useState('');
  const [feedback, setFeedback]   = useState<'correct' | 'wrong' | null>(null);
  const [deltas, setDeltas]       = useState<Delta[]>([]);
  const [comboMsg, setComboMsg]   = useState<string | null>(null);
  const [flash, setFlash]         = useState<'correct' | 'wrong' | null>(null);
  const [previewUrl, setPreviewUrl]     = useState<string | null>(null);
  const [previewLoading, setPreviewLoading] = useState(false);
  const [buzzTime, setBuzzTime]   = useState(0);
  const [timeLeft, setTimeLeft]   = useState(30);
  const [finished, setFinished]   = useState(false);
  const [finalStars, setFinalStars] = useState<0|1|2|3>(0);
  const [qcmOptions, setQcmOptions] = useState<string[]>([]);
  const [qcmSelected, setQcmSelected] = useState<string | null>(null);
  const [useQCM, setUseQCM]       = useState(config.qcm);

  const audioRef = useRef<HTMLAudioElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const song = queue[qi];
  const multiplier = streak >= 5 ? 3 : streak >= 3 ? 2 : 1;

  function spawnDelta(text: string, positive: boolean) {
    const id = Date.now() + Math.random();
    setDeltas(d => [...d, { id, text, positive }]);
    setTimeout(() => setDeltas(d => d.filter(x => x.id !== id)), 1900);
  }

  const loadPreview = useCallback(async (s: Song) => {
    setPreviewLoading(true); setPreviewUrl(null);
    try {
      const r = await fetch(`/api/preview?q=${encodeURIComponent(s.deezerQuery)}`);
      const d = await r.json();
      setPreviewUrl(d.preview || null);
    } catch { setPreviewUrl(null); }
    setPreviewLoading(false);
  }, []);

  useEffect(() => {
    if (song) { loadPreview(song); setQcmOptions(generateOptions(song, allSongs)); setQcmSelected(null); }
  }, [qi, song]);

  useEffect(() => {
    const a = audioRef.current;
    if (!a || !previewUrl) return;
    a.src = previewUrl; a.volume = 0.8;
  }, [previewUrl]);

  useEffect(() => {
    const a = audioRef.current;
    return () => { a?.pause(); };
  }, []);

  function play() {
    const a = audioRef.current; if (!a || !previewUrl) return;
    const limit = DIFFICULTY_TIME[song?.difficulty ?? 1] ?? 30;
    setTimeLeft(limit);
    a.play(); setPhase('listening'); setBuzzTime(Date.now());
    if (!useQCM) setTimeout(() => inputRef.current?.focus(), 100);
  }

  useEffect(() => {
    if (phase !== 'listening') return;
    if (timeLeft <= 0) { revealSkip(); return; }
    const t = setTimeout(() => setTimeLeft(s => s - 1), 1000);
    return () => clearTimeout(t);
  }, [phase, timeLeft]);

  function resolveAnswer(ok: boolean) {
    if (audioRef.current) { audioRef.current.pause(); }
    const secs = (Date.now() - buzzTime) / 1000;

    if (ok) {
      const speedBonus = secs < 5 ? 50 : secs < 10 ? 25 : 0;
      const gained = (100 + speedBonus) * multiplier;
      setScore(s => s + gained);
      setCorrect(c => c + 1);
      setFeedback('correct');

      const newStreak = streak + 1;
      setStreak(newStreak);
      setMaxStreak(m => Math.max(m, newStreak));

      const parts = [`+${gained}`];
      if (speedBonus > 0) parts.push(`⚡${speedBonus}`);
      if (multiplier > 1) parts.push(`×${multiplier}`);
      spawnDelta(parts.join(' '), true);

      setFlash('correct');
      setTimeout(() => setFlash(null), 600);

      if (newStreak === 3) triggerCombo('🔥 COMBO ×2 !', 2000);
      else if (newStreak === 5) triggerCombo('⚡ COMBO ×3 !!!', 2200);
      else if (newStreak > 5 && newStreak % 5 === 0) triggerCombo(`🌟 ${newStreak} DE SUITE !`, 2000);
    } else {
      setScore(s => Math.max(0, s - 25));
      setWrong(w => w + 1);
      setFeedback('wrong');
      setStreak(0);
      spawnDelta('-25', false);
      setFlash('wrong');
      setTimeout(() => setFlash(null), 600);
    }
    setPhase('answered');
  }

  function triggerCombo(msg: string, duration: number) {
    setComboMsg(msg);
    setTimeout(() => setComboMsg(null), duration);
  }

  function submit() {
    if (!song || phase !== 'listening') return;
    const g = guess.trim().toLowerCase(); if (!g) return;
    const title = song.title.toLowerCase();
    const artist = song.artist.toLowerCase();
    const ok = title.includes(g) || artist.includes(g) ||
      g.split(' ').some(w => w.length > 2 && (title.includes(w) || artist.includes(w)));
    resolveAnswer(ok);
  }

  function selectQCM(opt: string) {
    if (!song || phase !== 'listening') return;
    setQcmSelected(opt);
    resolveAnswer(opt === `${song.title} — ${song.artist}`);
  }

  function revealSkip() {
    if (audioRef.current) { audioRef.current.pause(); }
    setStreak(0);
    setPhase('revealed');
  }

  function next() {
    if (qi + 1 >= queue.length) { finish(); return; }
    setQi(i => i + 1); setGuess(''); setFeedback(null); setPhase('ready');
  }

  function finish() {
    const pct = correct / queue.length;
    setFinalStars(pct >= 0.9 && wrong === 0 ? 3 : pct >= 0.75 ? 2 : pct >= 0.5 ? 1 : 0);
    setFinished(true);
  }

  if (finished) {
    return <Results
      score={score} correct={correct} total={queue.length} wrong={wrong}
      stars={finalStars} maxStreak={maxStreak} config={config}
      onReplay={() => {
        setQi(0); setScore(0); setCorrect(0); setWrong(0);
        setStreak(0); setMaxStreak(0); setGuess(''); setFeedback(null);
        setDeltas([]); setComboMsg(null); setFinished(false); setPhase('ready');
      }}
      onRestart={onRestart} onHome={onHome}
    />;
  }

  const songColor = song ? (genreColors[song.genre] || '#06b6d4') : '#06b6d4';
  const isLast = qi + 1 >= queue.length;

  return (
    <div className="min-h-screen bg-[#06060e] flex flex-col p-4 relative">
      <audio ref={audioRef} onEnded={() => {}} />

      {/* Flash overlay */}
      {flash && (
        <div className="fixed inset-0 pointer-events-none z-40"
             style={{
               background: flash === 'correct' ? 'rgba(16,185,129,0.14)' : 'rgba(239,68,68,0.12)',
               animation: flash === 'correct' ? 'flashGreen 0.6s ease forwards' : 'flashRed 0.6s ease forwards',
             }} />
      )}

      {/* Combo burst */}
      {comboMsg && (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
          <div className="combo-burst combo-fade font-display text-5xl sm:text-6xl text-center px-8 py-5 rounded-3xl border"
               style={{
                 color: multiplier >= 3 ? '#fde68a' : '#67e8f9',
                 borderColor: multiplier >= 3 ? 'rgba(251,191,36,0.5)' : 'rgba(34,211,238,0.4)',
                 background: multiplier >= 3 ? 'rgba(251,191,36,0.1)' : 'rgba(6,182,212,0.08)',
                 textShadow: multiplier >= 3 ? '0 0 30px #fbbf24, 0 0 60px #f97316' : '0 0 30px #22d3ee',
                 backdropFilter: 'blur(4px)',
               }}>
            {comboMsg}
          </div>
        </div>
      )}

      {/* Top bar */}
      <div className="flex items-center justify-between mb-3 max-w-lg mx-auto w-full">
        <div className="flex items-center gap-2">
          <MiniLogo size={28} />
          <button onClick={onHome} className="text-white/20 hover:text-white/50 transition-colors text-lg">✕</button>
        </div>

        <div className="flex items-center gap-2">
          {streak >= 2 && (
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-full font-black text-sm border"
                 style={streak >= 5
                   ? { borderColor: 'rgba(251,191,36,0.55)', background: 'rgba(251,191,36,0.12)', color: '#fde68a', animation: 'firePulse 1.1s ease-in-out infinite' }
                   : { borderColor: 'rgba(34,211,238,0.45)', background: 'rgba(34,211,238,0.1)', color: '#67e8f9' }
                 }>
              {streak >= 5 ? '🔥' : '⚡'} {streak}
              {multiplier > 1 && <span className="opacity-70 text-xs ml-0.5">×{multiplier}</span>}
            </div>
          )}

          <span className="text-white/30 text-sm">{qi + 1}<span className="text-white/15">/{queue.length}</span></span>

          <div className="font-black text-xl tabular-nums"
               style={{ color: '#22d3ee', textShadow: '0 0 10px rgba(34,211,238,0.5)' }}>
            {score}
          </div>

          <div className="flex gap-1.5 text-xs font-bold">
            <span className="text-emerald-400">✓{correct}</span>
            <span className="text-red-400">✗{wrong}</span>
          </div>

          <button onClick={() => setUseQCM(q => !q)}
            className="px-2 py-0.5 rounded-full text-xs font-bold border transition-all"
            style={useQCM
              ? { background: 'rgba(6,182,212,0.18)', borderColor: 'rgba(34,211,238,0.5)', color: '#67e8f9' }
              : { borderColor: 'rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.3)' }}>
            {useQCM ? '🔡' : '⌨️'}
          </button>
        </div>
      </div>

      {/* Progress */}
      <div className="max-w-lg mx-auto w-full mb-4">
        <div className="relative h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
          <div className="h-full rounded-full transition-all duration-500"
               style={{ width: `${(qi / queue.length) * 100}%`, background: 'linear-gradient(90deg, #0891b2, #06b6d4, #22d3ee)', boxShadow: '0 0 8px rgba(6,182,212,0.7)' }} />
          {[0.25, 0.5, 0.75].map(m => (
            <div key={m} className="absolute top-0 h-full w-px" style={{ left: `${m * 100}%`, background: 'rgba(255,255,255,0.15)' }} />
          ))}
        </div>
      </div>

      <div className="max-w-lg mx-auto w-full flex-1 flex flex-col gap-3 relative">

        {/* Delta popups */}
        <div className="absolute -top-1 left-1/2 -translate-x-1/2 z-30 pointer-events-none flex flex-col items-center">
          {deltas.map(d => (
            <div key={d.id} className="score-delta font-black text-lg"
                 style={{ color: d.positive ? '#34d399' : '#f87171', textShadow: d.positive ? '0 0 12px rgba(52,211,153,0.8)' : '0 0 12px rgba(248,113,113,0.8)' }}>
              {d.text}
            </div>
          ))}
        </div>

        {/* Genre hint */}
        {song && (
          <div className="flex items-center justify-between px-4 py-2.5 rounded-xl border text-sm"
               style={{ background: `${songColor}08`, borderColor: `${songColor}22` }}>
            <span className="font-bold" style={{ color: songColor }}>{genreLabels[song.genre]}</span>
            <span className="text-white/20 text-xs">{song.year}</span>
            <span className="text-white/20 text-xs">{decadeLabels[song.decade]}</span>
          </div>
        )}

        {/* Audio card */}
        <div className="flex-1 flex flex-col justify-center rounded-3xl border min-h-48 p-5"
             style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.07)' }}>

          {previewLoading && (
            <div className="text-center py-6">
              <div className="vinyl vinyl-spin w-16 h-16 mx-auto relative mb-3"><div className="vinyl-center" /></div>
              <p className="text-white/20 text-sm animate-pulse">Chargement…</p>
            </div>
          )}

          {!previewLoading && !previewUrl && (
            <div className="text-center py-5">
              <p className="text-white/30 mb-3 text-sm">Audio non disponible</p>
              <button onClick={revealSkip} className="btn-ghost btn-sm">Voir la réponse</button>
            </div>
          )}

          {!previewLoading && previewUrl && phase === 'ready' && (
            <div className="flex flex-col items-center gap-4">
              <div className="vinyl w-20 h-20 relative"><div className="vinyl-center" /></div>
              {multiplier > 1 && (
                <div className="text-xs font-bold px-3 py-1.5 rounded-full border"
                     style={multiplier >= 3
                       ? { color: '#fde68a', borderColor: 'rgba(251,191,36,0.4)', background: 'rgba(251,191,36,0.08)' }
                       : { color: '#67e8f9', borderColor: 'rgba(34,211,238,0.35)', background: 'rgba(34,211,238,0.07)' }
                     }>
                  {multiplier >= 3 ? '🔥' : '⚡'} Multiplicateur ×{multiplier} actif — score {multiplier === 2 ? 'doublé' : 'triplé'} !
                </div>
              )}
              <button onClick={play}
                className="w-full py-4 font-display text-2xl tracking-wider rounded-2xl text-white transition-all active:scale-95"
                style={{ background: 'linear-gradient(135deg, #0891b2, #06b6d4, #22d3ee)', boxShadow: '0 0 30px rgba(6,182,212,0.5), inset 0 1px 0 rgba(255,255,255,0.2)' }}>
                ▶ ÉCOUTER
              </button>
            </div>
          )}

          {!previewLoading && previewUrl && phase === 'listening' && (
            <div className="flex flex-col items-center">
              <div className="relative flex items-center justify-center mb-3" style={{ width: 190, height: 190 }}>
                <div className="absolute rounded-full border-2 border-cyan-400/40" style={{ inset: 0, animation: 'ring-pulse 1.6s ease-out infinite' }} />
                <div className="absolute rounded-full border border-cyan-300/20" style={{ inset: -16, animation: 'ring-pulse 2s ease-out infinite', animationDelay: '0.4s' }} />
                {multiplier >= 2 && (
                  <div className="absolute rounded-full border" style={{
                    inset: -32,
                    borderColor: multiplier >= 3 ? 'rgba(251,191,36,0.25)' : 'rgba(34,211,238,0.18)',
                    animation: 'ring-pulse 2.5s ease-out infinite', animationDelay: '0.8s',
                  }} />
                )}
                <div className="vinyl vinyl-spin relative z-10" style={{ width: 152, height: 152 }}>
                  <div className="vinyl-center" />
                </div>
                {multiplier > 1 && (
                  <div className="absolute top-1 right-1 z-20 rounded-full w-9 h-9 flex items-center justify-center font-black text-sm border"
                       style={multiplier >= 3
                         ? { background: 'rgba(251,191,36,0.18)', borderColor: 'rgba(251,191,36,0.6)', color: '#fde68a' }
                         : { background: 'rgba(34,211,238,0.15)', borderColor: 'rgba(34,211,238,0.6)', color: '#67e8f9' }
                       }>
                    ×{multiplier}
                  </div>
                )}
              </div>

              <div className="flex items-end justify-center gap-1 mb-3" style={{ height: 44 }}>
                {[16,28,44,20,38,30,50,18,40,32,48,22,42,18,36].map((h, i) => (
                  <div key={i} className="eq-bar" style={{
                    height: h, width: 5, borderRadius: 3,
                    animationDelay: `${i * 0.065}s`,
                    background: i % 3 === 0 ? 'linear-gradient(to top,#0891b2,#22d3ee)' : i % 3 === 1 ? 'linear-gradient(to top,#7c3aed,#c084fc)' : 'linear-gradient(to top,#db2777,#f9a8d4)',
                  }} />
                ))}
              </div>

            </div>
          )}
        </div>

        {/* Answer */}
        {(phase === 'ready' || phase === 'listening' || phase === 'answered') && song && (
          <div className="rounded-3xl p-4 space-y-3 border"
               style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.06)' }}>
            <p className="text-xs text-white/25 uppercase tracking-widest font-semibold">Quelle est cette chanson ?</p>

            {useQCM ? (
              <QCMOptions
                options={qcmOptions}
                correctOption={`${song.title} — ${song.artist}`}
                selected={qcmSelected}
                onSelect={selectQCM}
              />
            ) : (
              phase === 'listening' && (
                <div className="flex gap-2">
                  <input ref={inputRef} value={guess} onChange={e => setGuess(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && submit()}
                    placeholder="Tape titre ou artiste…"
                    className="flex-1 rounded-xl px-4 py-3 text-white text-sm focus:outline-none transition-colors"
                    style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)' }} />
                  <button onClick={submit}
                    className="bg-cyan-500 hover:bg-cyan-400 active:scale-95 text-white font-bold px-5 rounded-xl transition-all">
                    OK
                  </button>
                </div>
              )
            )}

            {feedback === 'correct' && (
              <div className="scale-in rounded-2xl p-3 font-black text-center"
                   style={{ background: 'rgba(16,185,129,0.14)', border: '1px solid rgba(52,211,153,0.35)', color: '#34d399' }}>
                ✅ BRAVO !{multiplier > 1 ? ` ×${multiplier}` : ''}
              </div>
            )}
            {feedback === 'wrong' && (
              <div className="scale-in rounded-2xl p-3 font-black text-center"
                   style={{ background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(252,165,165,0.3)', color: '#f87171' }}>
                ❌ DOMMAGE ! −25 pts
              </div>
            )}
          </div>
        )}

        {/* Reveal */}
        {(phase === 'answered' || phase === 'revealed') && song && (
          <div className="scale-in rounded-3xl p-5 text-center border"
               style={feedback === 'correct'
                 ? { background: 'rgba(16,185,129,0.07)', borderColor: 'rgba(52,211,153,0.2)' }
                 : feedback === 'wrong'
                 ? { background: 'rgba(239,68,68,0.07)', borderColor: 'rgba(252,165,165,0.18)' }
                 : { background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.08)' }}>
            <p className="text-white/20 text-xs uppercase tracking-widest mb-2">Réponse</p>
            <h2 className="font-display text-3xl text-white mb-0.5">{song.title}</h2>
            <p className="font-semibold text-lg" style={{ color: songColor }}>{song.artist}</p>
            <p className="text-white/20 text-sm mt-1">{song.year}</p>
          </div>
        )}

        {phase === 'listening' && (
          <button onClick={revealSkip} className="text-white/20 hover:text-white/40 text-sm text-center py-1 transition-colors">
            Passer / Voir la réponse
          </button>
        )}

        {(phase === 'answered' || phase === 'revealed') && (
          <button onClick={next}
            className="py-4 font-display text-xl tracking-wider rounded-2xl text-white transition-all active:scale-95"
            style={{
              background: isLast ? 'linear-gradient(135deg, #6d28d9, #7c3aed, #a855f7)' : 'linear-gradient(135deg, #0891b2, #06b6d4)',
              boxShadow: isLast ? '0 0 20px rgba(139,92,246,0.4)' : '0 0 20px rgba(6,182,212,0.3)',
            }}>
            {isLast ? '🏁 RÉSULTATS' : 'SUIVANT →'}
          </button>
        )}
      </div>
    </div>
  );
}

/* ─── Results screen ─────────────────────────────────────────────────────── */
function Results({ score, correct, total, wrong, stars, maxStreak, config, onReplay, onRestart, onHome }: {
  score: number; correct: number; total: number; wrong: number; stars: 0|1|2|3;
  maxStreak: number; config: Config;
  onReplay: () => void; onRestart: () => void; onHome: () => void;
}) {
  const [displayScore, setDisplayScore] = useState(0);
  const pct = Math.round((correct / total) * 100);

  useEffect(() => {
    if (score === 0) { setDisplayScore(0); return; }
    let current = 0;
    const step = Math.max(1, Math.ceil(score / 55));
    const t = setInterval(() => {
      current = Math.min(current + step, score);
      setDisplayScore(current);
      if (current >= score) clearInterval(t);
    }, 18);
    return () => clearInterval(t);
  }, [score]);

  const [ico, msg, col] =
    stars === 3 ? ['🌟', 'PARFAIT !',   '#fbbf24'] :
    stars === 2 ? ['🎵', 'EXCELLENT !', '#c084fc'] :
    stars === 1 ? ['👍', 'PAS MAL !',   '#22d3ee'] :
                  ['💪', 'RÉESSAIE !',  '#f87171'];

  const diff = DIFFICULTIES.find(d => d.max === config.difficulty);
  const streakStr = maxStreak >= 5 ? `🔥 ${maxStreak}` : maxStreak >= 3 ? `⚡ ${maxStreak}` : String(maxStreak);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 fade-up"
         style={{ background: 'radial-gradient(ellipse 80% 55% at 50% 15%, rgba(139,92,246,0.14) 0%, #06060e 60%)' }}>

      <div className="text-7xl mb-3 pop">{ico}</div>

      <h1 className="font-display text-6xl mb-1" style={{ color: col, textShadow: `0 0 30px ${col}70` }}>
        {msg}
      </h1>
      <p className="text-white/25 text-sm mb-6 tracking-widest">
        {total} questions · {diff?.label ?? ''} {diff?.emoji ?? ''}
      </p>

      {/* Animated score */}
      <div className="text-center mb-5 score-anim">
        <div className="font-display tabular-nums"
             style={{ fontSize: '5rem', lineHeight: 1, color: '#22d3ee', textShadow: '0 0 30px rgba(34,211,238,0.6)' }}>
          {displayScore}
        </div>
        <div className="text-white/30 text-xs tracking-[0.3em] uppercase mt-1">points</div>
      </div>

      {/* Stars */}
      <div className="flex gap-3 mb-7">
        {[1, 2, 3].map(s => (
          <span key={s} style={{
            fontSize: '3rem',
            color: s <= stars ? '#fbbf24' : 'rgba(255,255,255,0.08)',
            animation: s <= stars ? `starReveal 0.45s cubic-bezier(0.34,1.56,0.64,1) ${s * 0.15}s both` : undefined,
            filter: s <= stars ? 'drop-shadow(0 0 8px rgba(251,191,36,0.7))' : undefined,
          }}>★</span>
        ))}
      </div>

      {/* Stats */}
      <div className="rounded-3xl p-5 w-full max-w-sm mb-7 border space-y-3"
           style={{ background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.07)' }}>
        {([
          ['Correctes',       `${correct}/${total}`, '#34d399'],
          ['Incorrectes',     String(wrong),         '#f87171'],
          ['Réussite',        `${pct}%`,             '#c084fc'],
          ['Meilleure série', streakStr,             '#fbbf24'],
        ] as const).map(([label, value, color]) => (
          <div key={label} className="flex justify-between items-center py-1.5 border-b border-white/5 last:border-0">
            <span className="text-white/30 text-sm">{label}</span>
            <span className="font-black text-xl" style={{ color }}>{value}</span>
          </div>
        ))}
      </div>

      {/* Buttons */}
      <div className="flex gap-3 flex-wrap justify-center">
        <button onClick={onRestart} className="btn-ghost btn-md">⚙️ Reconfigurer</button>
        <button onClick={onReplay}
          className="font-bold py-3 px-7 rounded-2xl text-white transition-all active:scale-95"
          style={{ background: 'linear-gradient(135deg, #0891b2, #06b6d4)', boxShadow: '0 0 20px rgba(6,182,212,0.4)' }}>
          ↩ Rejouer
        </button>
        <button onClick={onHome} className="btn-ghost btn-md">🏠</button>
      </div>
    </div>
  );
}
