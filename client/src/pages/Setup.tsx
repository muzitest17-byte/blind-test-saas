import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { socket } from '../socket';
import { genreLabels, genreColors, decadeLabels, getSongsByFilters, shuffle } from '../data/songs';
import type { Genre, Decade } from '../types';

const ALL_GENRES = Object.keys(genreLabels) as Genre[];
const ALL_DECADES = Object.keys(decadeLabels) as Decade[];

const DIFFICULTIES = [
  { max: 1, label: 'Novice',          emoji: '😊', desc: 'Tubes ultra connus',        color: '#10b981' },
  { max: 2, label: 'Amateur',         emoji: '😄', desc: 'Chansons populaires',        color: '#3b82f6' },
  { max: 3, label: 'Intermédiaire',   emoji: '😐', desc: 'Un peu de challenge',        color: '#f59e0b' },
  { max: 4, label: 'Expert',          emoji: '😤', desc: 'Ça se corse',               color: '#ef4444' },
  { max: 5, label: 'Maître',          emoji: '🔥', desc: 'Seulement les pros',        color: '#a855f7' },
];

export default function Setup() {
  const nav = useNavigate();
  const [step, setStep] = useState<1|2|3>(1);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [decades, setDecades] = useState<Decade[]>([]);
  const [difficulty, setDifficulty] = useState(2);
  const [qCount, setQCount] = useState(10);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  function toggle<T>(arr: T[], v: T) { return arr.includes(v) ? arr.filter(x => x !== v) : [...arr, v]; }

  const available = getSongsByFilters(genres, decades, difficulty);
  const maxQ = Math.min(30, available.length);

  async function create() {
    if (available.length < 3) { setError('Pas assez de chansons. Élargissez vos critères.'); return; }
    setLoading(true); setError('');
    const picked = shuffle(available).slice(0, qCount);
    socket.connect();
    socket.emit('create-room', { difficulty, genres, questionCount: qCount, songs: picked }, (res: { code: string; ip: string }) => {
      setLoading(false);
      nav(`/host/${res.code}`, { state: { ip: res.ip } });
    });
  }

  return (
    <div className="min-h-screen bg-[#06060e] flex flex-col p-5 pt-10">
      {/* bg orbs */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10" style={{ background: 'radial-gradient(circle, #7c3aed, transparent 70%)' }} />
      </div>

      <div className="w-full max-w-xl mx-auto z-10">
        {/* Back */}
        <button onClick={() => step > 1 ? setStep(s => (s - 1) as 1|2|3) : nav('/')}
          className="text-white/30 hover:text-white/70 transition-colors text-sm mb-8 flex items-center gap-2">
          ← Retour
        </button>

        {/* Step dots */}
        <div className="flex items-center gap-2 mb-10">
          {(['Genres','Décennies','Paramètres'] as const).map((label, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                i + 1 === step ? 'bg-purple-600 text-white' :
                i + 1 < step  ? 'bg-purple-600/30 text-purple-400' :
                'bg-white/5 text-white/20'
              }`}>
                <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${i + 1 <= step ? 'bg-white/20' : ''}`}>
                  {i + 1 < step ? '✓' : i + 1}
                </span>
                {label}
              </div>
              {i < 2 && <div className={`h-px w-6 ${i + 1 < step ? 'bg-purple-600' : 'bg-white/10'}`} />}
            </div>
          ))}
        </div>

        {/* ── Step 1: Genres ── */}
        {step === 1 && (
          <div className="animate-fade-up">
            <h2 className="font-display text-4xl text-white mb-1">GENRES</h2>
            <p className="text-white/30 text-sm mb-7">Sélectionne un ou plusieurs genres. Vide = tout.</p>
            <div className="grid grid-cols-2 gap-3">
              {ALL_GENRES.map(g => {
                const on = genres.includes(g);
                const color = genreColors[g] || '#a855f7';
                return (
                  <button
                    key={g}
                    onClick={() => setGenres(toggle(genres, g))}
                    className={`py-3 px-4 rounded-2xl text-sm font-semibold text-left transition-all duration-200 border ${
                      on ? 'text-white border-transparent' : 'text-white/50 border-white/8 hover:border-white/20 hover:text-white/80 bg-white/3'
                    }`}
                    style={on ? { background: `${color}25`, borderColor: `${color}60`, color: '#fff' } : {}}
                  >
                    <span className="mr-1">{genreLabels[g]}</span>
                    {on && <span className="float-right opacity-70">✓</span>}
                  </button>
                );
              })}
            </div>
            <div className="flex justify-between items-center mt-8">
              <span className="text-white/25 text-sm">{genres.length === 0 ? 'Tous les genres' : `${genres.length} sélectionné(s)`}</span>
              <button onClick={() => setStep(2)} className="btn-primary px-8">Suivant →</button>
            </div>
          </div>
        )}

        {/* ── Step 2: Décennies ── */}
        {step === 2 && (
          <div className="animate-fade-up">
            <h2 className="font-display text-4xl text-white mb-1">DÉCENNIES</h2>
            <p className="text-white/30 text-sm mb-7">Sélectionne une ou plusieurs décennies. Vide = toutes.</p>
            <div className="grid grid-cols-3 gap-3">
              {ALL_DECADES.map(d => {
                const on = decades.includes(d);
                return (
                  <button key={d} onClick={() => setDecades(toggle(decades, d))}
                    className={`py-4 px-3 rounded-2xl text-sm font-bold text-center transition-all border ${
                      on ? 'bg-purple-600/30 border-purple-400/60 text-purple-300' : 'bg-white/3 border-white/8 text-white/40 hover:border-white/20 hover:text-white/70'
                    }`}>
                    {decadeLabels[d]}
                    {on && <div className="text-xs mt-0.5 opacity-60">✓</div>}
                  </button>
                );
              })}
            </div>
            <div className="flex justify-between items-center mt-8">
              <span className="text-white/25 text-sm">{decades.length === 0 ? 'Toutes les décennies' : `${decades.length} sélectionnée(s)`}</span>
              <button onClick={() => setStep(3)} className="btn-primary px-8">Suivant →</button>
            </div>
          </div>
        )}

        {/* ── Step 3: Params ── */}
        {step === 3 && (
          <div className="animate-fade-up space-y-8">
            <div>
              <h2 className="font-display text-4xl text-white mb-1">PARAMÈTRES</h2>
              <p className="text-white/30 text-sm mb-7">Configure la difficulté et le nombre de questions.</p>
            </div>

            {/* Difficulty */}
            <div>
              <p className="text-xs uppercase tracking-widest text-white/30 mb-3 font-semibold">Difficulté</p>
              <div className="grid grid-cols-5 gap-2">
                {DIFFICULTIES.map(d => (
                  <button key={d.max} onClick={() => setDifficulty(d.max)}
                    className={`py-4 rounded-2xl text-center transition-all border ${
                      difficulty === d.max ? 'border-transparent text-white' : 'bg-white/3 border-white/8 text-white/40 hover:border-white/20 hover:text-white/70'
                    }`}
                    style={difficulty === d.max ? { background: `${d.color}20`, borderColor: `${d.color}50` } : {}}>
                    <div className="text-2xl mb-1">{d.emoji}</div>
                    <div className="text-[11px] font-bold">{d.label}</div>
                  </button>
                ))}
              </div>
              <p className="text-center text-white/30 text-xs mt-2">
                {DIFFICULTIES.find(d => d.max === difficulty)?.desc}
              </p>
            </div>

            {/* Question count */}
            <div>
              <p className="text-xs uppercase tracking-widest text-white/30 mb-3 font-semibold">Nombre de questions</p>
              <div className="glass rounded-2xl p-5">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-white/40 text-sm">Questions</span>
                  <span className="font-display text-3xl text-white">{Math.min(qCount, maxQ)}</span>
                </div>
                <input type="range" min={5} max={maxQ} value={Math.min(qCount, maxQ)}
                  onChange={e => setQCount(+e.target.value)}
                  className="w-full accent-purple-500" />
                <div className="flex justify-between text-xs text-white/20 mt-1">
                  <span>5 min</span><span>{maxQ} max</span>
                </div>
              </div>
            </div>

            {/* Availability */}
            <div className={`rounded-2xl p-4 flex items-center gap-3 border text-sm ${
              available.length >= 3
                ? 'glass-green border-emerald-500/20 text-emerald-400'
                : 'glass-red border-red-500/20 text-red-400'
            }`}>
              <span className="text-xl">{available.length >= 3 ? '✅' : '⚠️'}</span>
              <span>
                <strong>{available.length}</strong> chanson{available.length !== 1 ? 's' : ''} disponible{available.length !== 1 ? 's' : ''}
                {available.length < 3 && ' — Élargissez vos filtres'}
              </span>
            </div>

            {error && <p className="text-red-400 text-sm">{error}</p>}

            <button onClick={create} disabled={loading || available.length < 3} className="btn-primary w-full py-4 text-lg font-black">
              {loading ? '⏳ Création de la salle…' : '🚀 CRÉER LA SALLE'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
