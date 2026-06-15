import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loadCareerSave, totalStars, campaigns as base } from '../data/career';
import type { Campaign, CareerLevel } from '../types';

// ─── Personnages musicaux ─────────────────────────────────────────────────────

function CleSol({ pulse = false, size = 52 }: { pulse?: boolean; size?: number }) {
  return (
    <div className={`select-none leading-none ${pulse ? 'animate-bounce' : ''}`}
         style={{ fontSize: size, filter: 'drop-shadow(0 0 12px #fbbf24)' }}>
      𝄞
    </div>
  );
}

function CleFa({ size = 44 }: { size?: number }) {
  return (
    <div className="select-none leading-none"
         style={{ fontSize: size, filter: 'drop-shadow(0 0 10px #a78bfa)' }}>
      𝄢
    </div>
  );
}

function NoteNoire({ size = 36, color = '#22d3ee' }: { size?: number; color?: string }) {
  return (
    <div className="select-none leading-none" style={{ fontSize: size, color, filter: `drop-shadow(0 0 8px ${color})` }}>
      ♩
    </div>
  );
}

function NoteCroche({ size = 32, color = '#f472b6' }: { size?: number; color?: string }) {
  return (
    <div className="select-none leading-none" style={{ fontSize: size, color, filter: `drop-shadow(0 0 8px ${color})` }}>
      ♪
    </div>
  );
}

// ─── Nœud de niveau ──────────────────────────────────────────────────────────

function LevelNode({
  level, index, camp, isPlayer, onClick,
}: {
  level: CareerLevel; index: number; camp: Campaign; isPlayer: boolean; onClick: () => void;
}) {
  const color = camp.color.replace('from-', '').split(' ')[0];

  return (
    <div className="flex flex-col items-center gap-1 relative">
      {/* Personnage joueur au-dessus */}
      {isPlayer && (
        <div className="absolute -top-14 left-1/2 -translate-x-1/2 z-20">
          <CleSol pulse size={44} />
        </div>
      )}

      <button
        onClick={onClick}
        disabled={!level.unlocked}
        className={`
          w-14 h-14 rounded-full font-black text-lg transition-all duration-200 relative z-10 border-4
          ${level.unlocked
            ? 'cursor-pointer hover:scale-110 active:scale-95'
            : 'cursor-not-allowed opacity-40'}
          ${isPlayer ? 'scale-110' : ''}
        `}
        style={level.unlocked ? {
          background: `linear-gradient(135deg, var(--tw-gradient-stops))`,
          backgroundImage: `linear-gradient(135deg, #${camp.color.includes('yellow') ? 'fbbf24' : camp.color.includes('cyan') ? '06b6d4' : camp.color.includes('purple') ? 'a855f7' : camp.color.includes('pink') ? 'ec4899' : camp.color.includes('green') ? '22c55e' : camp.color.includes('orange') ? 'f97316' : camp.color.includes('blue') ? '3b82f6' : camp.color.includes('red') ? 'ef4444' : '8b5cf6'}, #1e1b4b)`,
          border: `4px solid rgba(255,255,255,${isPlayer ? '0.9' : '0.5'})`,
          boxShadow: isPlayer ? '0 0 20px rgba(251,191,36,0.6)' : '0 4px 12px rgba(0,0,0,0.4)',
        } : { background: '#1e1e2e', border: '4px solid rgba(255,255,255,0.15)' }}
      >
        <span className="text-white drop-shadow-lg">
          {!level.unlocked ? '🔒' : level.stars === 3 ? '⭐' : index + 1}
        </span>
      </button>

      {/* Étoiles sous le nœud */}
      <div className="flex gap-0.5">
        {[1, 2, 3].map(s => (
          <span key={s} className={`text-xs ${s <= level.stars ? 'text-yellow-400' : 'text-white/15'}`}>★</span>
        ))}
      </div>

      {/* Nom du niveau */}
      <span className="text-[10px] text-white/50 text-center w-16 leading-tight truncate">{level.name}</span>
    </div>
  );
}

// ─── Monde (campagne) ─────────────────────────────────────────────────────────

const NPC_POSITIONS = [
  { at: 2, char: 'fa' },
  { at: 5, char: 'noire' },
  { at: 8, char: 'croche' },
  { at: 10, char: 'fa' },
];

function WorldZone({
  camp, campIndex, playerCampId, playerLevelId, onSelectLevel, totalCamps,
}: {
  camp: Campaign; campIndex: number; playerCampId: string | null; playerLevelId: string | null;
  onSelectLevel: (c: Campaign, l: CareerLevel) => void; totalCamps: number;
}) {
  const isCurrentCamp = camp.id === playerCampId;
  const rtl = campIndex % 2 === 1;
  const levels = rtl ? [...camp.levels].reverse() : camp.levels;

  const gradFrom = camp.color.split(' ')[0].replace('from-', '');
  const gradTo = camp.color.split(' ')[1]?.replace('to-', '') || gradFrom;

  const npc = NPC_POSITIONS.find(n => n.at === campIndex);

  return (
    <div className={`relative mb-4 ${!camp.unlocked ? 'opacity-40' : ''}`}>
      {/* Étiquette monde */}
      <div className={`flex items-center gap-2 mb-4 ${rtl ? 'justify-end' : 'justify-start'}`}>
        <div className={`px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${camp.color} opacity-90`}>
          {camp.emoji} {camp.name}
        </div>
      </div>

      <div className="relative flex items-start">
        {/* NPC latéral */}
        {npc && camp.unlocked && (
          <div className={`absolute top-0 z-10 ${rtl ? 'left-0' : 'right-0'}`}>
            {npc.char === 'fa'     && <CleFa size={38} />}
            {npc.char === 'noire'  && <NoteNoire size={32} />}
            {npc.char === 'croche' && <NoteCroche size={28} />}
          </div>
        )}

        {/* Nœuds de niveaux + chemin */}
        <div className={`flex items-end gap-0 w-full ${rtl ? 'flex-row-reverse' : 'flex-row'}`}>
          {levels.map((lv, i) => {
            const realIndex = rtl ? camp.levels.length - 1 - i : i;
            const realLevel = camp.levels[realIndex];
            const isPlayer = isCurrentCamp && realLevel.id === playerLevelId;

            return (
              <div key={lv.id} className="flex items-center">
                <LevelNode
                  level={realLevel}
                  index={realIndex}
                  camp={camp}
                  isPlayer={isPlayer}
                  onClick={() => camp.unlocked && onSelectLevel(camp, realLevel)}
                />
                {/* Chemin entre nœuds */}
                {i < levels.length - 1 && (
                  <div className="flex flex-col items-center justify-center mx-1 mb-6">
                    <div
                      className="h-1 rounded-full"
                      style={{
                        width: 28,
                        background: realLevel.unlocked && camp.levels[realIndex + (rtl ? -1 : 1)]?.unlocked
                          ? `linear-gradient(90deg, #fbbf2480, #ffffff40)`
                          : 'rgba(255,255,255,0.1)',
                        boxShadow: realLevel.unlocked ? '0 0 6px rgba(251,191,36,0.3)' : 'none',
                      }}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Connecteur vers le monde suivant */}
      {campIndex < totalCamps - 1 && (
        <div className={`flex ${rtl ? 'justify-start' : 'justify-end'} mt-2 mb-0`}>
          <div className="flex flex-col items-center gap-1 opacity-40">
            <div className="w-px h-8 bg-gradient-to-b from-white/30 to-transparent" />
            <span className="text-white/30 text-xs">↓</span>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Panneau niveau sélectionné ───────────────────────────────────────────────

function LevelPanel({
  campaign, level, onPlay, onClose,
}: {
  campaign: Campaign; level: CareerLevel; onPlay: () => void; onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4"
         style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)' }}>
      <div className="w-full max-w-sm glass rounded-3xl p-6 fade-in" style={{ border: '1px solid rgba(255,255,255,0.15)' }}>
        {/* En-tête */}
        <div className="flex items-center gap-3 mb-4">
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl bg-gradient-to-br ${campaign.color}`}>
            {campaign.emoji}
          </div>
          <div>
            <p className="text-white/50 text-xs">{campaign.name}</p>
            <h3 className="font-bold text-white">{level.name}</h3>
          </div>
          <button onClick={onClose} className="ml-auto text-white/40 hover:text-white text-xl">✕</button>
        </div>

        {/* Description */}
        {level.description && (
          <p className="text-white/60 text-sm mb-4">{level.description}</p>
        )}

        {/* Étoiles */}
        <div className="flex items-center gap-2 mb-6">
          <span className="text-white/40 text-xs">Progression :</span>
          <div className="flex gap-1">
            {[1, 2, 3].map(s => (
              <span key={s} className={`text-2xl ${s <= level.stars ? 'text-yellow-400' : 'text-white/15'}`}>★</span>
            ))}
          </div>
        </div>

        {/* Bouton jouer */}
        {level.unlocked ? (
          <button onClick={onPlay}
            className="w-full py-3 rounded-2xl font-bold text-white text-base transition-all hover:scale-105 active:scale-95"
            style={{ background: `linear-gradient(135deg, #fbbf24, #f97316)`, boxShadow: '0 4px 20px rgba(251,191,36,0.4)' }}>
            🎵 Jouer ce niveau
          </button>
        ) : (
          <div className="text-center text-white/30 text-sm py-2">
            🔒 Termine le niveau précédent pour débloquer
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Page principale ──────────────────────────────────────────────────────────

export default function Career() {
  const nav = useNavigate();
  const [camps, setCamps] = useState<Campaign[]>([]);
  const [selected, setSelected] = useState<{ camp: Campaign; level: CareerLevel } | null>(null);

  useEffect(() => { setCamps(loadCareerSave()); }, []);

  const stars = totalStars(camps);
  const maxStars = camps.reduce((a, c) => a + c.levels.length * 3, 0);
  const pct = maxStars ? Math.round((stars / maxStars) * 100) : 0;

  // Position du joueur : dernier niveau débloqué
  let playerCampId: string | null = null;
  let playerLevelId: string | null = null;
  for (const c of camps) {
    for (const l of c.levels) {
      if (l.unlocked) { playerCampId = c.id; playerLevelId = l.id; }
    }
  }

  function reset() {
    if (!confirm('Effacer toute la progression ?')) return;
    localStorage.removeItem('blindtest-career-v2');
    setCamps(base.map(c => ({ ...c, levels: c.levels.map(l => ({ ...l })) })));
    setSelected(null);
  }

  return (
    <div className="min-h-screen bg-app relative overflow-hidden">

      {/* Portée musicale en fond */}
      <div className="pointer-events-none fixed inset-0">
        {[18, 30, 42, 54, 66].map(top => (
          <div key={top} className="absolute w-full h-px" style={{ top: `${top}%`, background: 'rgba(255,255,255,0.025)' }} />
        ))}
        <div className="absolute top-[-10%] left-[-5%] w-[600px] h-[600px] rounded-full"
             style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 65%)' }} />
        <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full"
             style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.1) 0%, transparent 65%)' }} />
      </div>

      <div className="max-w-lg mx-auto px-4 py-5 relative z-10">

        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <button onClick={() => nav('/')} className="btn btn-ghost btn-sm">← Accueil</button>
          <div className="flex items-center gap-3">
            <div className="badge badge-amber">⭐ {stars} / {maxStars}</div>
            <button onClick={reset} className="text-white/15 hover:text-red-400 text-xs transition-colors">reset</button>
          </div>
        </div>

        {/* Titre + barre progression */}
        <div className="mb-6 fade-in">
          <div className="flex items-center gap-3 mb-3">
            <CleSol size={48} pulse={false} />
            <div>
              <h1 className="font-display text-4xl leading-none gradient-text-cyan">CARRIÈRE</h1>
              <p className="text-white/40 text-xs mt-0.5">Voyage musical · {camps.length} mondes</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex-1 pbar">
              <div className="pbar-fill pbar-fill-cyan" style={{ width: `${pct}%` }} />
            </div>
            <span className="text-xs text-white/30 w-9 text-right">{pct}%</span>
          </div>
        </div>

        {/* Légende personnages */}
        <div className="flex items-center gap-4 mb-6 px-3 py-2 rounded-2xl" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
          <div className="flex items-center gap-1.5">
            <span style={{ fontSize: 22, filter: 'drop-shadow(0 0 6px #fbbf24)' }}>𝄞</span>
            <span className="text-white/40 text-[10px]">Toi</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span style={{ fontSize: 20, filter: 'drop-shadow(0 0 6px #a78bfa)' }}>𝄢</span>
            <span className="text-white/40 text-[10px]">Maître</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span style={{ fontSize: 18, color: '#22d3ee' }}>♩</span>
            <span className="text-white/40 text-[10px]">Guide</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span style={{ fontSize: 16, color: '#f472b6' }}>♪</span>
            <span className="text-white/40 text-[10px]">Ami</span>
          </div>
        </div>

        {/* Carte des mondes */}
        <div className="space-y-0">
          {camps.map((camp, ci) => (
            <WorldZone
              key={camp.id}
              camp={camp}
              campIndex={ci}
              playerCampId={playerCampId}
              playerLevelId={playerLevelId}
              totalCamps={camps.length}
              onSelectLevel={(c, l) => setSelected({ camp: c, level: l })}
            />
          ))}
        </div>

        {/* Message bas de carte */}
        <div className="text-center mt-8 pb-8 fade-in">
          <span style={{ fontSize: 32 }}>♬</span>
          <p className="text-white/20 text-xs mt-2">La musique n'a pas de fin…</p>
        </div>
      </div>

      {/* Panneau niveau sélectionné */}
      {selected && (
        <LevelPanel
          campaign={selected.camp}
          level={selected.level}
          onPlay={() => {
            nav(`/career/play/${selected.camp.id}/${selected.level.id}`);
            setSelected(null);
          }}
          onClose={() => setSelected(null)}
        />
      )}

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(-8px); }
        }
        .animate-bounce { animation: bounce 1.2s ease-in-out infinite; }
      `}</style>
    </div>
  );
}
