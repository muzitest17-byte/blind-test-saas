import { useEffect, useRef, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { loadCareerSave, saveCareer } from '../data/career';
import { getSongsByFilters, shuffle, genreLabels, genreColors, decadeLabels, generateOptions, songs as allSongs } from '../data/songs';
import QCMOptions from '../components/QCMOptions';
import type { Song } from '../types';

type Phase = 'loading' | 'ready' | 'listening' | 'answered' | 'revealed';

export default function CareerGame() {
  const { campaignId, levelId } = useParams<{ campaignId: string; levelId: string }>();
  const nav = useNavigate();

  const [camps] = useState(loadCareerSave());
  const campaign = camps.find(c => c.id === campaignId);
  const level = campaign?.levels.find(l => l.id === levelId);

  const [queue, setQueue] = useState<Song[]>([]);
  const [qi, setQi] = useState(0);
  const [phase, setPhase] = useState<Phase>('loading');
  const [score, setScore] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [guess, setGuess] = useState('');
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [previewLoading, setPreviewLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [finished, setFinished] = useState(false);
  const [finalStars, setFinalStars] = useState<0|1|2|3>(0);
  const [buzzTime, setBuzzTime] = useState(0);
  const [useQCM, setUseQCM] = useState(true);
  const [qcmOptions, setQcmOptions] = useState<string[]>([]);
  const [qcmSelected, setQcmSelected] = useState<string | null>(null);

  const audioRef = useRef<HTMLAudioElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!level) return;
    const q = shuffle(getSongsByFilters(level.genreFilter ?? [], level.decadeFilter ?? [], level.difficultyMax)).slice(0, level.songCount);
    setQueue(q); setPhase('ready');
  }, []);

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
    if (phase === 'ready' && song) {
      loadPreview(song);
      setQcmOptions(generateOptions(song, allSongs));
      setQcmSelected(null);
    }
  }, [phase, qi, song]);

  useEffect(() => {
    const a = audioRef.current;
    if (!a || !previewUrl) return;
    a.src = previewUrl; a.volume = 0.8;
    const onTime = () => setCurrentTime(a.currentTime);
    a.addEventListener('timeupdate', onTime);
    return () => a.removeEventListener('timeupdate', onTime);
  }, [previewUrl]);

  function play() {
    const a = audioRef.current;
    if (!a || !previewUrl) return;
    a.play(); setIsPlaying(true); setPhase('listening'); setBuzzTime(Date.now());
  }

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
    const g = guess.trim().toLowerCase();
    if (!g) return;
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
    if (audioRef.current) { audioRef.current.pause(); setIsPlaying(false); }
    setPhase('revealed');
  }

  function next() {
    if (qi + 1 >= queue.length) { finish(); return; }
    setQi(i => i + 1); setGuess(''); setFeedback(null); setCurrentTime(0); setPhase('ready');
  }

  function finish() {
    const pct = correct / queue.length;
    const s: 0|1|2|3 = pct >= 0.9 && wrong === 0 ? 3 : pct >= 0.75 ? 2 : pct >= 0.5 ? 1 : 0;
    setFinalStars(s);

    const updated = loadCareerSave().map(c => {
      if (c.id !== campaignId) return c;
      return {
        ...c,
        levels: c.levels.map((lv, i) => {
          if (lv.id === levelId) {
            const next = c.levels[i + 1];
            if (next && s >= 1) c.levels[i + 1] = { ...next, unlocked: true };
            return { ...lv, stars: Math.max(lv.stars, s) as 0|1|2|3 };
          }
          return lv;
        }),
      };
    });
    // Unlock next campaign
    const ci = updated.findIndex(c => c.id === campaignId);
    if (ci >= 0 && updated[ci].levels.every(l => l.stars >= 1) && ci + 1 < updated.length) {
      updated[ci + 1] = { ...updated[ci + 1], unlocked: true };
    }
    saveCareer(updated);
    setFinished(true);
  }

  if (!campaign || !level) return <div className="min-h-screen bg-[#06060e] flex items-center justify-center text-white/30">Niveau introuvable</div>;

  if (finished) {
    const pct = Math.round((correct / queue.length) * 100);
    const msg = finalStars === 3 ? ['🌟','PARFAIT !','text-yellow-400'] : finalStars === 2 ? ['🎵','EXCELLENT !','text-purple-400'] : finalStars === 1 ? ['👍','PAS MAL !','text-cyan-400'] : ['💪','RÉESSAIE !','text-red-400'];
    return (
      <div className="min-h-screen bg-[#06060e] flex flex-col items-center justify-center p-6 animate-fade-up">
        <div className="pointer-events-none fixed inset-0">
          <div className="absolute inset-0 flex items-center justify-center opacity-10">
            <div className="w-[500px] h-[500px] rounded-full" style={{ background: 'radial-gradient(circle, #7c3aed, transparent 70%)' }} />
          </div>
        </div>
        <div className="text-7xl mb-4 animate-bounce-custom">{msg[0]}</div>
        <h1 className={`font-display text-6xl mb-2 ${msg[2]}`}>{msg[1]}</h1>
        <p className="text-white/30 text-sm mb-6">{level.name} · {campaign.name}</p>

        <div className="flex gap-1 mb-8">
          {[1,2,3].map(s => (
            <span key={s} className={`text-4xl star-anim ${s <= finalStars ? 'text-yellow-400' : 'text-white/10'}`}
                  style={{ animationDelay: `${s * 0.2}s` }}>★</span>
          ))}
        </div>

        <div className="glass rounded-3xl p-6 w-full max-w-sm mb-8 space-y-3">
          {[['Score', `${score} pts`, 'text-purple-400'], ['Correctes', `${correct}/${queue.length}`, 'text-emerald-400'], ['Incorrectes', `${wrong}`, 'text-red-400'], ['Réussite', `${pct}%`, 'text-cyan-400']].map(([l, v, c]) => (
            <div key={l} className="flex justify-between items-center py-1.5 border-b border-white/5 last:border-0">
              <span className="text-white/30 text-sm">{l}</span>
              <span className={`font-black text-xl ${c}`}>{v}</span>
            </div>
          ))}
        </div>

        <div className="flex gap-3">
          <button onClick={() => { setQi(0); setScore(0); setCorrect(0); setWrong(0); setGuess(''); setFeedback(null); setQueue(shuffle([...queue])); setFinished(false); setPhase('ready'); }} className="btn-ghost">↩ Rejouer</button>
          <button onClick={() => nav('/career')} className="btn-primary px-8">Campagnes</button>
        </div>
      </div>
    );
  }

  const songColor = song ? (genreColors[song.genre] || '#a855f7') : '#a855f7';

  return (
    <div className="min-h-screen bg-[#06060e] flex flex-col p-4">
      <audio ref={audioRef} onEnded={() => setIsPlaying(false)} />

      {/* Top bar */}
      <div className="flex items-center justify-between mb-4 max-w-lg mx-auto w-full">
        <button onClick={() => nav('/career')} className="text-white/20 hover:text-white/50 transition-colors text-sm">← Quitter</button>
        <div className="flex items-center gap-3 text-sm">
          <span className="text-white/30">{qi + 1}/{queue.length}</span>
          <span className="font-black text-purple-300">{score}pts</span>
          <span className="text-emerald-400 font-bold">✓{correct}</span>
          <span className="text-red-400 font-bold">✗{wrong}</span>
          <button
            onClick={() => { setUseQCM(q => !q); setQcmSelected(null); }}
            className={`px-2.5 py-1 rounded-full text-xs font-bold border transition-all ${useQCM ? 'bg-purple-500/20 border-purple-400/50 text-purple-300' : 'border-white/10 text-white/30 hover:text-white/60'}`}
          >
            {useQCM ? '🔡 QCM' : '⌨️ Libre'}
          </button>
        </div>
      </div>

      {/* Progress */}
      <div className="max-w-lg mx-auto w-full mb-5">
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${(qi / queue.length) * 100}%` }} />
        </div>
      </div>

      <div className="max-w-lg mx-auto w-full flex-1 flex flex-col gap-4">
        {/* Hint card */}
        {song && (
          <div className="glass rounded-2xl p-4 flex items-center justify-between"
               style={{ borderColor: `${songColor}25`, background: `${songColor}08` }}>
            <span className="font-bold text-sm" style={{ color: songColor }}>{genreLabels[song.genre]}</span>
            <span className="text-white/30 text-xs">{song.year}</span>
            <span className="text-white/30 text-xs">{decadeLabels[song.decade]}</span>
          </div>
        )}

        {/* Audio */}
        <div className="glass rounded-3xl p-6 flex-1 flex flex-col justify-center">
          {previewLoading && (
            <div className="text-center py-8">
              <div className="vinyl vinyl-spin w-16 h-16 mx-auto relative mb-4"><div className="vinyl-center" /></div>
              <p className="text-white/20 text-sm animate-pulse">Chargement…</p>
            </div>
          )}
          {!previewLoading && !previewUrl && song && (
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
                    <div className="flex-1 pbar"><div className="pbar-fill" style={{ width: '0%' }} /></div>
                    <span className="text-xs text-white/40 w-7">30s</span>
                  </div>
                  <button onClick={play} className="btn-primary w-full py-4 font-display text-2xl tracking-wider">
                    ▶ ÉCOUTER
                  </button>
                </>
              )}

              {phase === 'listening' && (
                <div className="flex flex-col items-center py-1">
                  {/* Grand vinyle avec anneaux pulsants */}
                  <div className="relative flex items-center justify-center mb-4" style={{ width: 240, height: 240 }}>
                    <div className="absolute rounded-full border-2 border-purple-400/55"
                         style={{ inset: 0, animation: 'ring-pulse 1.6s ease-out infinite' }} />
                    <div className="absolute rounded-full border-2 border-purple-300/30"
                         style={{ inset: -22, animation: 'ring-pulse 2.0s ease-out infinite', animationDelay: '0.4s' }} />
                    <div className="absolute rounded-full border border-pink-400/20"
                         style={{ inset: -44, animation: 'ring-pulse 2.5s ease-out infinite', animationDelay: '0.9s' }} />
                    <div className="absolute rounded-full"
                         style={{ inset: 10, background: 'radial-gradient(circle, rgba(139,92,246,0.4) 0%, transparent 70%)' }} />
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
                          ? 'linear-gradient(to top, #7c3aed, #c084fc)'
                          : i % 3 === 1
                          ? 'linear-gradient(to top, #db2777, #f9a8d4)'
                          : 'linear-gradient(to top, #0891b2, #22d3ee)',
                      }} />
                    ))}
                  </div>
                  {/* Barre de progression */}
                  <div className="flex items-center gap-3 w-full mb-3">
                    <span className="text-xs text-white/50 w-7 text-right tabular-nums">{Math.floor(currentTime)}s</span>
                    <div className="flex-1 pbar"><div className="pbar-fill" style={{ width: `${(currentTime/30)*100}%` }} /></div>
                    <span className="text-xs text-white/50 w-7 tabular-nums">30s</span>
                  </div>
                  <p className="text-purple-300 text-xs tracking-[0.35em] uppercase font-bold animate-pulse">🎵 Musique en cours…</p>
                </div>
              )}
            </>
          )}
        </div>

        {/* Answer */}
        {(phase === 'listening' || phase === 'answered') && song && (
          <div>
            {useQCM ? (
              <div className="glass rounded-3xl p-4 space-y-3">
                <p className="text-xs text-white/30 uppercase tracking-widest font-semibold">Quelle est cette chanson ?</p>
                <QCMOptions
                  options={qcmOptions}
                  correctOption={`${song.title} — ${song.artist}`}
                  selected={qcmSelected}
                  onSelect={selectQCM}
                />
                {feedback === 'correct' && <div className="glass-green rounded-2xl p-3 text-emerald-400 font-black text-center animate-scale-in">✅ BRAVO ! +100 pts</div>}
                {feedback === 'wrong'   && <div className="glass-red rounded-2xl p-3 text-red-400 font-black text-center animate-scale-in">❌ DOMMAGE ! −25 pts</div>}
              </div>
            ) : (
              <div className="glass rounded-3xl p-5 space-y-3">
                <label className="text-xs text-white/30 uppercase tracking-widest font-semibold">Titre ou artiste ?</label>
                <div className="flex gap-2">
                  <input ref={inputRef} type="text" value={guess}
                    onChange={e => setGuess(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && phase === 'listening' && submit()}
                    placeholder="Tape ta réponse…"
                    disabled={phase !== 'listening'}
                    className="flex-1 text-base rounded-2xl px-4 py-3 outline-none transition-all disabled:opacity-40"
                    style={{ background: '#ffffff', color: '#111111', border: '2px solid rgba(255,255,255,0.3)' }} />
                  {phase === 'listening' && <button onClick={submit} className="btn-primary px-5">OK</button>}
                </div>
                {feedback === 'correct' && <div className="glass-green rounded-2xl p-3 text-emerald-400 font-black text-center animate-scale-in">✅ BRAVO ! +100 pts</div>}
                {feedback === 'wrong'   && <div className="glass-red rounded-2xl p-3 text-red-400 font-black text-center animate-scale-in">❌ DOMMAGE ! −25 pts</div>}
              </div>
            )}
          </div>
        )}

        {/* Reveal card */}
        {(phase === 'answered' || phase === 'revealed') && song && (
          <div className={`rounded-3xl p-5 text-center animate-scale-in border ${
            feedback === 'correct' ? 'glass-green' : feedback === 'wrong' ? 'glass-red' : 'glass'
          }`}>
            <p className="text-white/30 text-xs uppercase tracking-widest mb-2">Réponse</p>
            <h2 className="font-display text-3xl text-white mb-1">{song.title}</h2>
            <p className="text-purple-300 font-semibold">{song.artist}</p>
            <p className="text-white/20 text-sm mt-1">{song.year}</p>
          </div>
        )}

        {phase === 'listening' && (
          <button onClick={revealSkip} className="text-white/20 hover:text-white/40 text-sm transition-colors text-center py-2">
            Passer / Voir la réponse
          </button>
        )}

        {(phase === 'answered' || phase === 'revealed') && (
          <button onClick={next} className="btn-primary py-4 font-display text-xl tracking-wider">
            {qi + 1 >= queue.length ? '🏁 RÉSULTATS' : 'SUIVANT →'}
          </button>
        )}
      </div>
    </div>
  );
}
