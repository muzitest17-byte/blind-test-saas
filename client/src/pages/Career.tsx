import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loadCareerSave, saveCareer, totalStars, campaigns as base } from '../data/career';
import type { Campaign } from '../types';

export default function Career() {
  const nav = useNavigate();
  const [camps, setCamps] = useState<Campaign[]>([]);
  const [selected, setSelected] = useState<Campaign | null>(null);

  useEffect(() => { setCamps(loadCareerSave()); }, []);

  const stars = totalStars(camps);
  const maxStars = camps.reduce((a, c) => a + c.levels.length * 3, 0);
  const pct = maxStars ? Math.round((stars / maxStars) * 100) : 0;

  function reset() {
    if (!confirm('Effacer toute la progression ?')) return;
    localStorage.removeItem('blindtest-career-v2');
    setCamps(base.map(c => ({ ...c, levels: c.levels.map(l => ({ ...l })) })));
    setSelected(null);
  }

  return (
    <div className="min-h-screen bg-app-alt p-5">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] opacity-10"
             style={{ background: 'radial-gradient(ellipse, #06b6d4, transparent 65%)' }} />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between py-5 mb-2">
          <button
            onClick={() => selected ? setSelected(null) : nav('/')}
            className="btn btn-ghost btn-sm gap-1.5"
          >
            ← {selected ? 'Campagnes' : 'Accueil'}
          </button>
          <div className="flex items-center gap-4">
            <div className="badge badge-amber">
              ⭐ {stars} / {maxStars}
            </div>
            <button onClick={reset} className="text-white/15 hover:text-red-400 text-xs transition-colors">reset</button>
          </div>
        </div>

        {/* Progress global */}
        <div className="flex items-center gap-4 mb-8 fade-in">
          <div className="flex-1 pbar"><div className="pbar-fill pbar-fill-cyan" style={{ width: `${pct}%` }} /></div>
          <span className="text-xs text-white/30 font-medium w-10 text-right">{pct}%</span>
        </div>

        {!selected ? (
          <CampaignGrid camps={camps} onSelect={c => c.unlocked && setSelected(c)} />
        ) : (
          <LevelDetail
            campaign={selected}
            onPlay={id => nav(`/career/play/${selected.id}/${id}`)}
          />
        )}
      </div>
    </div>
  );
}

function CampaignGrid({ camps, onSelect }: { camps: Campaign[]; onSelect: (c: Campaign) => void }) {
  return (
    <>
      <div className="mb-8 fade-in">
        <h1 className="font-display leading-none mb-1" style={{ fontSize: '4rem' }}>
          <span className="gradient-text-cyan">CARRIÈRE</span>
        </h1>
        <p className="text-white/60 text-sm">Progresse à travers {camps.length} campagnes musicales</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 stagger">
        {camps.map(camp => {
          const s = camp.levels.reduce((a, l) => a + l.stars, 0);
          const m = camp.levels.length * 3;
          const done = s === m && m > 0;
          return (
            <button key={camp.id} onClick={() => onSelect(camp)}
              className={`relative p-4 rounded-3xl text-left overflow-hidden transition-all duration-300 ${camp.unlocked ? 'card card-hover cursor-pointer' : 'cursor-not-allowed opacity-40'}`}
              style={camp.unlocked ? { border: '1px solid rgba(255,255,255,0.22)' } : {}}>

              {camp.unlocked && (
                <div className={`absolute inset-0 opacity-40 pointer-events-none bg-gradient-to-br ${camp.color}`} style={{ opacity: 0.07 }} />
              )}
              <div className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r ${camp.color} opacity-40`} />

              <div className="relative z-10">
                <span className="text-2xl block mb-2">{camp.unlocked ? camp.emoji : '🔒'}</span>
                <p className="font-bold text-white text-sm leading-tight mb-0.5">{camp.name}</p>
                <p className="text-white/60 text-xs mb-3 leading-tight">{camp.subtitle}</p>
                <div className="flex items-center justify-between">
                  <div className="flex">
                    {[...Array(Math.min(m, 9))].map((_, i) => (
                      <span key={i} className={`text-xs ${i < s ? 'text-yellow-400' : 'text-white/25'}`}>★</span>
                    ))}
                  </div>
                  {done && <span className="text-[10px] text-yellow-400/70 font-bold">✓</span>}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </>
  );
}

function LevelDetail({ campaign, onPlay }: { campaign: Campaign; onPlay: (id: string) => void }) {
  return (
    <div className="fade-in">
      <div className="flex items-center gap-4 mb-8">
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl bg-gradient-to-br ${campaign.color}`}>
          {campaign.emoji}
        </div>
        <div>
          <h2 className="font-display text-3xl text-white">{campaign.name}</h2>
          <p className="text-white/60 text-sm">{campaign.subtitle}</p>
        </div>
      </div>

      <div className="space-y-2 stagger">
        {campaign.levels.map((lv, i) => {
          const done = lv.stars === 3;
          return (
            <button key={lv.id} onClick={() => lv.unlocked && onPlay(lv.id)}
              className={`w-full p-4 rounded-2xl text-left transition-all ${lv.unlocked ? 'card card-hover cursor-pointer' : 'opacity-35 cursor-not-allowed card'}`}>
              <div className="flex items-center gap-4">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center font-black text-lg flex-shrink-0 ${lv.unlocked ? `bg-gradient-to-br ${campaign.color}` : 'bg-white/5'}`}>
                  {done ? '⭐' : lv.unlocked ? i + 1 : '🔒'}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-white text-sm">{lv.name}</p>
                  <p className="text-white/60 text-xs truncate mt-0.5">{lv.description}</p>
                </div>
                <div className="flex gap-0.5 flex-shrink-0">
                  {[1,2,3].map(s => (
                    <span key={s} className={`text-lg ${s <= lv.stars ? 'text-yellow-400' : 'text-white/20'} star-pop`}
                          style={{ animationDelay: `${s * 0.1 + i * 0.05}s` }}>★</span>
                  ))}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
