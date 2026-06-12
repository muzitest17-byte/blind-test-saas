import { useEffect, useRef, useState, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getSongsByFilters, shuffle, genreLabels, genreColors, decadeLabels, generateOptions, songs as allSongs } from '../data/songs';
import QCMOptions from '../components/QCMOptions';
import type { Song, Genre, Decade } from '../types';

/* ─── Config step ────────────────────────────────────────────────────────── */
const ALL_GENRES = Object.keys(genreLabels) as Genre[];
const ALL_DECADES = Object.keys(decadeLabels) as Decade[];

const DIFFICULTIES = [
  { max: 1, label: 'Novice',        emoji: '😊', color: '#10b981' },
  { max: 2, label: 'Amateur',       emoji: '😄', color: '#3b82f6' },
  { max: 3, label: 'Interméd.',     emoji: '😐', color: '#f59e0b' },
  { max: 4, label: 'Expert',        emoji: '😤', color: '#ef4444' },
  { max: 5, label: 'Maître',        emoji: '🔥', color: '#a855f7' },
];

const DIFFICULTY_TIME: Record<number, number> = { 1: 30, 2: 20, 3: 15, 4: 10, 5: 10 };

interface Config { genres: Genre[]; decades: Decade[]; difficulty: number; count: number; qcm: boolean }

export default function FreePlay() {
  const nav = useNavigate();
  const location = useLocation();
  const [mode, setMode] = useState<'config' | 'game'>(location.state?.restart ? 'game' : 'config');
  const [config, setConfig] = useState<Config>(
    location.state?.config ?? { genres: [], decades: [], difficulty: 2, count: 10, qcm: false }
  );

  if (mode === 'config') return (
    <Config
      config={config}
      onChange={setConfig}
      onStart={() => setMode('game')}
      onBack={() => nav('/')}
    />
  );
  return (
    <Game
      config={config}
      onRestart={() => setMode('config')}
      onHome={() => nav('/')}
    />
  );
}

/* ─── Config panel ───────────────────────────────────────────────────────── */
function Config({ config, onChange, onStart, onBack }: {
  config: Config;
  onChange: (c: Config) => void;
  onStart: () => void;
  onBack: () => void;
}) {
  function toggle<T>(arr: T[], v: T) { return arr.includes(v) ? arr.filter(x => x !== v) : [...arr, v]; }
  const set = (patch: Partial<Config>) => onChange({ ...config, ...patch });

  const available = getSongsByFilters(config.genres, config.decades, config.difficulty);
  const maxQ = Math.min(50, available.length);

  return (
    <div className="min-h-screen bg-[#06060e] flex flex-col p-5 pt-10">
      {/* bg orb */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] opacity-10"
             style={{ background: 'radial-gradient(ellipse, #06b6d4, transparent 70%)' }} />
      </div>

      <div className="w-full max-w-2xl mx-auto z-10">
        <button onClick={onBack} className="text-white/30 hover:text-white/60 transition-colors text-sm mb-8">← Accueil</button>

        <div className="mb-8">
          <h1 className="font-display text-6xl text-white mb-1" style={{ textShadow: '0 0 30px rgba(6,182,212,0.5)' }}>
            MODE LIBRE
          </h1>
          <p className="text-white/30 text-sm">Configure ta partie et joue sans contrainte</p>
        </div>

        {/* Genres */}
        <Section title="Genres" hint="Vide = tous">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {ALL_GENRES.map(g => {
              const on = config.genres.includes(g);
              const col = genreColors[g] || '#a855f7';
              return (
                <button key={g} onClick={() => set({ genres: toggle(config.genres, g) })}
                  className={`py-2.5 px-4 rounded-xl text-sm font-semibold text-left transition-all border ${on ? 'text-white' : 'text-white/40 border-white/8 hover:border-white/20 hover:text-white/70 bg-white/3'}`}
                  style={on ? { background: `${col}22`, borderColor: `${col}55` } : {}}>
                  {genreLabels[g]}
                  {on && <span className="float-right opacity-60">✓</span>}
                </button>
              );
            })}
          </div>
          {config.genres.length > 0 && (
            <button onClick={() => set({ genres: [] })} className="text-xs text-white/20 hover:text-white/50 mt-2 transition-colors">
              Tout effacer
            </button>
          )}
        </Section>

        {/* Décennies */}
        <Section title="Décennies" hint="Vide = toutes">
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
            {ALL_DECADES.map(d => {
              const on = config.decades.includes(d);
              return (
                <button key={d} onClick={() => set({ decades: toggle(config.decades, d) })}
                  className={`py-2.5 px-2 rounded-xl text-xs font-bold text-center transition-all border ${on ? 'bg-cyan-600/25 border-cyan-400/50 text-cyan-300' : 'bg-white/3 border-white/8 text-white/40 hover:border-white/20 hover:text-white/70'}`}>
                  {decadeLabels[d].replace('Années ', "'")}
                  {on && <div className="text-[10px] mt-0.5 opacity-60">✓</div>}
                </button>
              );
            })}
          </div>
        </Section>

        {/* Difficulté */}
        <Section title="Difficulté" hint="">
          <div className="grid grid-cols-5 gap-2">
            {DIFFICULTIES.map(d => (
              <button key={d.max} onClick={() => set({ difficulty: d.max })}
                className={`py-3 rounded-xl text-center transition-all border ${config.difficulty === d.max ? 'text-white' : 'bg-white/3 border-white/8 text-white/40 hover:border-white/20 hover:text-white/70'}`}
                style={config.difficulty === d.max ? { background: `${d.color}20`, borderColor: `${d.color}50` } : {}}>
                <div className="text-xl mb-1">{d.emoji}</div>
                <div className="text-[11px] font-bold leading-tight">{d.label}</div>
              </button>
            ))}
          </div>
        </Section>

        {/* Nombre de questions */}
        <Section title="Questions" hint="">
          <div className="glass rounded-2xl p-4">
            <div className="flex justify-between items-center mb-3">
              <span className="text-white/40 text-sm">Nombre de questions</span>
              <span className="font-display text-4xl text-cyan-300">{Math.min(config.count, maxQ)}</span>
            </div>
            <input type="range" min={5} max={Math.max(5, maxQ)} value={Math.min(config.count, maxQ)}
              onChange={e => set({ count: +e.target.value })}
              className="w-full accent-cyan-500" />
            <div className="flex justify-between text-xs text-white/20 mt-1">
              <span>5</span><span>{Math.max(5, maxQ)} max</span>
            </div>
          </div>
        </Section>

        {/* Availability */}
        <div className={`rounded-2xl p-4 flex items-center gap-3 border text-sm mb-6 ${
          available.length >= 5
            ? 'glass-green border-emerald-500/20 text-emerald-400'
            : available.length >= 1
            ? 'border-yellow-500/20 text-yellow-400 bg-yellow-500/8'
            : 'glass-red border-red-500/20 text-red-400'
        }`}>
          <span className="text-xl">{available.length >= 5 ? '✅' : '⚠️'}</span>
          <span><strong>{available.length}</strong> chanson{available.length !== 1 ? 's' : ''} disponible{available.length !== 1 ? 's' : ''}
            {available.length < 5 && available.length > 0 && ' — Élargissez un peu les filtres'}
            {available.length === 0 && ' — Aucune chanson ne correspond'}
          </span>
        </div>

        {/* Mode réponse */}
        <Section title="Mode de réponse" hint="">
          <div className="grid grid-cols-2 gap-3">
            <button onClick={() => set({ qcm: false })}
              className={`py-4 rounded-2xl border text-center transition-all ${!config.qcm ? 'border-cyan-400/60 bg-cyan-500/15 text-white' : 'border-white/8 bg-white/3 text-white/40 hover:text-white/70 hover:border-white/20'}`}>
              <div className="text-2xl mb-1">⌨️</div>
              <div className="font-bold text-sm">Saisie libre</div>
              <div className="text-xs opacity-50 mt-0.5">Tu tapes la réponse</div>
            </button>
            <button onClick={() => set({ qcm: true })}
              className={`py-4 rounded-2xl border text-center transition-all ${config.qcm ? 'border-cyan-400/60 bg-cyan-500/15 text-white' : 'border-white/8 bg-white/3 text-white/40 hover:text-white/70 hover:border-white/20'}`}>
              <div className="text-2xl mb-1">🔡</div>
              <div className="font-bold text-sm">QCM — 4 choix</div>
              <div className="text-xs opacity-50 mt-0.5">Choisis parmi 4 options</div>
            </button>
          </div>
        </Section>

        <button
          onClick={onStart}
          disabled={available.length < 1}
          className="w-full py-4 font-display text-2xl tracking-wider rounded-2xl text-white transition-all active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed"
          style={{ background: 'linear-gradient(135deg, #0891b2, #06b6d4, #22d3ee)', boxShadow: '0 0 25px rgba(6,182,212,0.4)' }}>
          ▶ JOUER
        </button>
      </div>
    </div>
  );
}

function Section({ title, hint, children }: { title: string; hint: string; children: React.ReactNode }) {
  return (
    <div className="mb-6">
      <div className="flex items-baseline gap-2 mb-3">
        <p className="text-xs uppercase tracking-widest text-white/30 font-semibold">{title}</p>
        {hint && <span className="text-xs text-white/15">{hint}</span>}
      </div>
      {children}
    </div>
  );
}

/* ─── Game ───────────────────────────────────────────────────────────────── */
type Phase = 'ready' | 'listening' | 'answered' | 'revealed' | 'finished';

function Game({ config, onRestart, onHome }: { config: Config; onRestart: () => void; onHome: () => void }) {
  const [queue] = useState(() =>
    shuffle(getSongsByFilters(config.genres, config.decades, config.difficulty)).slice(0, config.count)
  );
  const [qi, setQi] = useState(0);
  const [phase, setPhase] = useState<Phase>('ready');
  const [score, setScore] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [guess, setGuess] = useState('');
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [previewLoading, setPreviewLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [buzzTime, setBuzzTime] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [finished, setFinished] = useState(false);
  const [finalStars, setFinalStars] = useState<0|1|2|3>(0);
  // QCM state
  const [qcmOptions, setQcmOptions] = useState<string[]>([]);
  const [qcmSelected, setQcmSelected] = useState<string | null>(null);
  const [useQCM, setUseQCM] = useState(config.qcm);

  const audioRef = useRef<HTMLAudioElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const song = queue[qi];

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
    if (song) {
      loadPreview(song);
      setQcmOptions(generateOptions(song, allSongs));
      setQcmSelected(null);
    }
  }, [qi, song]);

  useEffect(() => {
    const a = audioRef.current;
    if (!a || !previewUrl) return;
    a.src = previewUrl; a.volume = 0.8;
    const fn = () => setCurrentTime(a.currentTime);
    a.addEventListener('timeupdate', fn);
    return () => a.removeEventListener('timeupdate', fn);
  }, [previewUrl]);

  function play() {
    const a = audioRef.current; if (!a || !previewUrl) return;
    const limit = DIFFICULTY_TIME[song?.difficulty ?? 1] ?? 30;
    setTimeLeft(limit);
    a.play(); setIsPlaying(true); setPhase('listening'); setBuzzTime(Date.now());
    if (!useQCM) setTimeout(() => inputRef.current?.focus(), 100);
  }

  useEffect(() => {
    if (phase !== 'listening') return;
    if (timeLeft <= 0) { revealSkip(); return; }
    const t = setTimeout(() => setTimeLeft(s => s - 1), 1000);
    return () => clearTimeout(t);
  }, [phase, timeLeft]);

  function resolveAnswer(ok: boolean) {
    if (audioRef.current) { audioRef.current.pause(); setIsPlaying(false); }
    const secs = (Date.now() - buzzTime) / 1000;
    if (ok) {
      const bonus = secs < 5 ? 50 : secs < 10 ? 25 : 0;
      setScore(s => s + 100 + bonus); setCorrect(c => c + 1); setFeedback('correct');
    } else {
      setScore(s => Math.max(0, s - 25)); setWrong(w => w + 1); setFeedback('wrong');
    }
    setPhase('answered');
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
    const correctLabel = `${song.title} — ${song.artist}`;
    resolveAnswer(opt === correctLabel);
  }

  function revealSkip() {
    if (audioRef.current) { audioRef.current.pause(); setIsPlaying(false); }
    setPhase('revealed');
  }

  function next() {
    if (qi + 1 >= queue.length) { finish(); return; }
    setQi(i => i + 1); setGuess(''); setFeedback(null); setCurrentTime(0); setPhase('ready');
  }

  function finish() {
    const pct = correct / queue.length;
    setFinalStars(pct >= 0.9 && wrong === 0 ? 3 : pct >= 0.75 ? 2 : pct >= 0.5 ? 1 : 0);
    setFinished(true);
  }

  /* ── Résultats ── */
  if (finished) {
    const pct = Math.round((correct / queue.length) * 100);
    const [ico, msg, col] = finalStars === 3 ? ['🌟','PARFAIT !','text-yellow-400'] : finalStars === 2 ? ['🎵','EXCELLENT !','text-purple-300'] : finalStars === 1 ? ['👍','PAS MAL !','text-cyan-400'] : ['💪','RÉESSAIE !','text-red-400'];
    return (
      <div className="min-h-screen bg-[#06060e] flex flex-col items-center justify-center p-6 animate-fade-up">
        <div className="pointer-events-none fixed inset-0">
          <div className="absolute inset-0 flex items-center justify-center opacity-10">
            <div className="w-[500px] h-[500px] rounded-full" style={{ background: 'radial-gradient(circle, #06b6d4, transparent 70%)' }} />
          </div>
        </div>
        <div className="text-7xl mb-3 animate-bounce-custom">{ico}</div>
        <h1 className={`font-display text-6xl mb-2 ${col}`}>{msg}</h1>
        <p className="text-white/25 text-sm mb-6">Mode libre · {config.count} questions</p>

        <div className="flex gap-1 mb-8">
          {[1,2,3].map(s => (
            <span key={s} className={`text-4xl star-anim ${s <= finalStars ? 'text-yellow-400' : 'text-white/10'}`}
                  style={{ animationDelay: `${s * 0.2}s` }}>★</span>
          ))}
        </div>

        <div className="glass rounded-3xl p-6 w-full max-w-sm mb-8 space-y-3">
          {([['Score', `${score} pts`, 'text-cyan-400'], ['Correctes', `${correct}/${queue.length}`, 'text-emerald-400'], ['Incorrectes', `${wrong}`, 'text-red-400'], ['Réussite', `${pct}%`, 'text-purple-300']] as const).map(([l, v, c]) => (
            <div key={l} className="flex justify-between items-center py-1.5 border-b border-white/5 last:border-0">
              <span className="text-white/30 text-sm">{l}</span>
              <span className={`font-black text-xl ${c}`}>{v}</span>
            </div>
          ))}
        </div>

        <div className="flex gap-3">
          <button onClick={onRestart} className="btn-ghost">⚙️ Reconfigurer</button>
          <button onClick={() => { setQi(0); setScore(0); setCorrect(0); setWrong(0); setGuess(''); setFeedback(null); setCurrentTime(0); setFinished(false); setPhase('ready'); }}
            className="text-white font-bold py-3 px-6 rounded-2xl transition-all active:scale-95"
            style={{ background: 'linear-gradient(135deg, #0891b2, #06b6d4)', boxShadow: '0 0 20px rgba(6,182,212,0.4)' }}>
            ↩ Rejouer
          </button>
          <button onClick={onHome} className="btn-ghost">🏠</button>
        </div>
      </div>
    );
  }

  const songColor = song ? (genreColors[song.genre] || '#06b6d4') : '#06b6d4';

  /* ── Jeu ── */
  return (
    <div className="min-h-screen bg-[#06060e] flex flex-col p-4">
      <audio ref={audioRef} onEnded={() => setIsPlaying(false)} />

      {/* Top bar */}
      <div className="flex items-center justify-between mb-4 max-w-lg mx-auto w-full">
        <button onClick={onHome} className="text-white/20 hover:text-white/50 transition-colors text-sm">← Quitter</button>
        <div className="flex items-center gap-3 text-sm">
          <span className="text-white/30 font-medium">{qi + 1}<span className="text-white/15">/{queue.length}</span></span>
          <span className="font-black text-cyan-300">{score}pts</span>
          <span className="text-emerald-400 font-bold">✓{correct}</span>
          <span className="text-red-400 font-bold">✗{wrong}</span>
          {/* Toggle QCM */}
          <button
            onClick={() => setUseQCM(q => !q)}
            className={`px-2.5 py-1 rounded-full text-xs font-bold border transition-all ${useQCM ? 'bg-cyan-500/20 border-cyan-400/50 text-cyan-300' : 'border-white/10 text-white/30 hover:text-white/60'}`}
            title="Basculer QCM / saisie libre"
          >
            {useQCM ? '🔡 QCM' : '⌨️ Libre'}
          </button>
        </div>
      </div>

      {/* Progress */}
      <div className="max-w-lg mx-auto w-full mb-5">
        <div className="progress-bar">
          <div className="h-full rounded-full transition-all duration-500"
               style={{ width: `${(qi / queue.length) * 100}%`, background: 'linear-gradient(90deg, #0891b2, #06b6d4, #22d3ee)', boxShadow: '0 0 8px rgba(6,182,212,0.6)' }} />
        </div>
      </div>

      <div className="max-w-lg mx-auto w-full flex-1 flex flex-col gap-4">
        {/* Hint */}
        {song && (
          <div className="glass rounded-2xl p-3.5 flex items-center justify-between"
               style={{ borderColor: `${songColor}25`, background: `${songColor}08` }}>
            <span className="font-bold text-sm" style={{ color: songColor }}>{genreLabels[song.genre]}</span>
            <span className="text-white/25 text-xs">{song.year}</span>
            <span className="text-white/25 text-xs">{decadeLabels[song.decade]}</span>
          </div>
        )}

        {/* Audio */}
        <div className="glass rounded-3xl p-6 flex-1 flex flex-col justify-center min-h-48">
          {previewLoading && (
            <div className="text-center py-8">
              <div className="vinyl vinyl-spin w-16 h-16 mx-auto relative mb-4"><div className="vinyl-center" /></div>
              <p className="text-white/20 text-sm animate-pulse">Chargement…</p>
            </div>
          )}
          {!previewLoading && !previewUrl && (
            <div className="text-center py-6">
              <p className="text-white/20 text-sm mb-4">Audio non disponible</p>
              <button onClick={revealSkip} className="btn-ghost text-sm py-2 px-5">Voir la réponse</button>
            </div>
          )}
          {!previewLoading && previewUrl && (
            <>
              {phase === 'ready' && (
                <>
                  <div className="flex items-center justify-center mb-5">
                    <div className="vinyl w-20 h-20 relative"><div className="vinyl-center" /></div>
                  </div>
                  <div className="flex items-center gap-3 mb-5">
                    <span className="text-xs text-white/40 w-7 text-right">0s</span>
                    <div className="flex-1 pbar"><div className="pbar-fill pbar-fill-cyan" style={{ width: '0%' }} /></div>
                    <span className="text-xs text-white/40 w-12 text-right">{DIFFICULTY_TIME[song?.difficulty ?? 1] ?? 30}s</span>
                  </div>
                  <button onClick={play}
                    className="w-full py-4 font-display text-2xl tracking-wider rounded-2xl text-white transition-all active:scale-95"
                    style={{ background: 'linear-gradient(135deg, #0891b2, #06b6d4, #22d3ee)', boxShadow: '0 0 30px rgba(6,182,212,0.5)' }}>
                    ▶ ÉCOUTER
                  </button>
                </>
              )}

              {phase === 'listening' && (
                <div className="flex flex-col items-center py-1">
                  {/* Grand vinyle avec anneaux pulsants */}
                  <div className="relative flex items-center justify-center mb-4" style={{ width: 240, height: 240 }}>
                    <div className="absolute rounded-full border-2 border-cyan-400/50"
                         style={{ inset: 0, animation: 'ring-pulse 1.6s ease-out infinite' }} />
                    <div className="absolute rounded-full border-2 border-cyan-300/30"
                         style={{ inset: -22, animation: 'ring-pulse 2.0s ease-out infinite', animationDelay: '0.4s' }} />
                    <div className="absolute rounded-full border border-purple-400/20"
                         style={{ inset: -44, animation: 'ring-pulse 2.5s ease-out infinite', animationDelay: '0.9s' }} />
                    <div className="absolute rounded-full"
                         style={{ inset: 10, background: 'radial-gradient(circle, rgba(6,182,212,0.35) 0%, transparent 70%)' }} />
                    <div className="vinyl vinyl-spin relative z-10" style={{ width: 190, height: 190 }}>
                      <div className="vinyl-center" />
                    </div>
                  </div>
                  {/* Barres EQ tricolores */}
                  <div className="flex items-end justify-center gap-1 mb-4" style={{ height: 64 }}>
                    {[18,32,52,26,48,36,58,22,44,38,54,28,46,20,40,34,56].map((h, i) => (
                      <div key={i} className="eq-bar" style={{
                        height: h, width: 5, borderRadius: 3,
                        animationDelay: `${i * 0.065}s`,
                        background: i % 3 === 0
                          ? 'linear-gradient(to top, #0891b2, #22d3ee)'
                          : i % 3 === 1
                          ? 'linear-gradient(to top, #7c3aed, #c084fc)'
                          : 'linear-gradient(to top, #db2777, #f9a8d4)',
                      }} />
                    ))}
                  </div>
                  {/* Chrono */}
                  {(() => {
                    const limit = DIFFICULTY_TIME[song?.difficulty ?? 1] ?? 30;
                    const pct = (timeLeft / limit) * 100;
                    const urgent = timeLeft <= 3;
                    const color = urgent ? '#ef4444' : timeLeft <= 7 ? '#f59e0b' : '#22d3ee';
                    return (
                      <div className="w-full mb-3">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-white/40 uppercase tracking-widest">Temps</span>
                          <span className={`text-2xl font-black tabular-nums ${urgent ? 'text-red-400 animate-pulse' : 'text-white'}`}>{timeLeft}s</span>
                        </div>
                        <div className="pbar"><div className="pbar-fill" style={{ width: `${pct}%`, background: color, transition: 'width 1s linear, background 0.3s' }} /></div>
                      </div>
                    );
                  })()}
                  <p className="text-cyan-300 text-xs tracking-[0.35em] uppercase font-bold animate-pulse">🎵 Écoute bien…</p>
                </div>
              )}
            </>
          )}
        </div>

        {/* Answer */}
        {(phase === 'listening' || phase === 'answered') && song && (
          <div className="space-y-3">
            {useQCM ? (
              /* ── QCM mode ── */
              <div className="glass rounded-3xl p-4 space-y-3">
                <p className="text-xs text-white/30 uppercase tracking-widest font-semibold">Quelle est cette chanson ?</p>
                {(phase === 'answered' || timeLeft <= 5) ? (
                  <QCMOptions
                    options={qcmOptions}
                    correctOption={`${song.title} — ${song.artist}`}
                    selected={qcmSelected}
                    onSelect={selectQCM}
                  />
                ) : (
                  <div className="text-center py-5">
                    <p className="text-white/20 text-xs uppercase tracking-widest mb-1">Choix disponibles dans</p>
                    <p className="font-display text-4xl text-white/60">{timeLeft - 5}s</p>
                  </div>
                )}
                {feedback === 'correct' && (
                  <div className="glass-green rounded-2xl p-3 text-emerald-400 font-black text-center animate-scale-in">
                    ✅ BRAVO ! +100 pts
                  </div>
                )}
                {feedback === 'wrong' && (
                  <div className="glass-red rounded-2xl p-3 text-red-400 font-black text-center animate-scale-in">
                    ❌ DOMMAGE ! −25 pts
                  </div>
                )}
              </div>
            ) : (
              /* ── Free text mode ── */
              <div className="glass rounded-3xl p-5 space-y-3">
                <label className="text-xs text-white/30 uppercase tracking-widest font-semibold">Titre ou artiste ?</label>
                <div className="flex gap-2">
                  <input
                    ref={inputRef} type="text" value={guess}
                    onChange={e => setGuess(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && phase === 'listening' && submit()}
                    placeholder="Tape ta réponse…"
                    disabled={phase !== 'listening'}
                    className="flex-1 text-base rounded-2xl px-4 py-3 outline-none transition-all disabled:opacity-40"
                    style={{ background: '#ffffff', color: '#111111', border: '2px solid rgba(255,255,255,0.3)' }}
                  />
                  {phase === 'listening' && (
                    <button onClick={submit}
                      className="font-bold px-5 rounded-2xl text-white transition-all active:scale-95"
                      style={{ background: 'linear-gradient(135deg, #0891b2, #06b6d4)' }}>
                      OK
                    </button>
                  )}
                </div>
                {feedback === 'correct' && (
                  <div className="glass-green rounded-2xl p-3 text-emerald-400 font-black text-center animate-scale-in">
                    ✅ BRAVO ! +100 pts
                  </div>
                )}
                {feedback === 'wrong' && (
                  <div className="glass-red rounded-2xl p-3 text-red-400 font-black text-center animate-scale-in">
                    ❌ DOMMAGE ! −25 pts
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Reveal */}
        {(phase === 'answered' || phase === 'revealed') && song && (
          <div className={`rounded-3xl p-5 text-center animate-scale-in border ${feedback === 'correct' ? 'glass-green' : feedback === 'wrong' ? 'glass-red' : 'glass'}`}>
            <p className="text-white/20 text-xs uppercase tracking-widest mb-2">Réponse</p>
            <h2 className="font-display text-3xl text-white mb-1">{song.title}</h2>
            <p className="font-semibold text-lg" style={{ color: songColor }}>{song.artist}</p>
            <p className="text-white/20 text-sm mt-1">{song.year} · {decadeLabels[song.decade]}</p>
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
            style={{ background: 'linear-gradient(135deg, #0891b2, #06b6d4)', boxShadow: '0 0 20px rgba(6,182,212,0.3)' }}>
            {qi + 1 >= queue.length ? '🏁 RÉSULTATS' : 'SUIVANT →'}
          </button>
        )}
      </div>
    </div>
  );
}
