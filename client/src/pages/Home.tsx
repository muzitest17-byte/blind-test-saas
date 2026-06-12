import { useNavigate } from 'react-router-dom';

const MODES = [
  {
    path: '/free',
    icon: '🎲',
    label: 'Mode Libre',
    sub: 'Solo · Tes propres règles',
    accent: '#22d3ee',
    glow: 'rgba(6,182,212,0.5)',
    border: 'rgba(34,211,238,0.55)',
    bg: 'rgba(6,182,212,0.18)',
  },
  {
    path: '/setup',
    icon: '🎮',
    label: 'Multijoueur',
    sub: "Buzzeurs · QR code · 8 joueurs",
    accent: '#c084fc',
    glow: 'rgba(192,132,252,0.5)',
    border: 'rgba(192,132,252,0.55)',
    bg: 'rgba(139,92,246,0.18)',
  },
  {
    path: '/career',
    icon: '🏆',
    label: 'Carrière',
    sub: 'Solo · 11 campagnes · Étoiles',
    accent: '#fbbf24',
    glow: 'rgba(251,191,36,0.45)',
    border: 'rgba(251,191,36,0.55)',
    bg: 'rgba(245,158,11,0.18)',
  },
];

const STATS = [
  { n: '460', label: 'chansons' },
  { n: '19', label: 'genres' },
  { n: '9', label: 'décennies' },
  { n: '11', label: 'campagnes' },
];

export default function Home() {
  const nav = useNavigate();

  return (
    <div className="min-h-screen bg-app flex flex-col items-center justify-center p-5 relative overflow-hidden">

      {/* ── Ambient lights ── */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[700px] h-[700px] rounded-full"
             style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.35) 0%, transparent 65%)' }} />
        <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full"
             style={{ background: 'radial-gradient(circle, rgba(236,72,153,0.28) 0%, transparent 65%)' }} />
        <div className="absolute top-[30%] right-[10%] w-[400px] h-[400px] rounded-full"
             style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.22) 0%, transparent 65%)' }} />
        {/* Grid lines */}
        <div className="absolute inset-0 opacity-[0.07]"
             style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '80px 80px' }} />
      </div>

      {/* ── Hero ── */}
      <div className="relative z-10 text-center mb-10 fade-in">
        {/* Vinyl */}
        <div className="relative inline-flex mb-6 mt-2">
          <div className="vinyl vinyl-spin" style={{ width: 100, height: 100 }}>
            <div className="vinyl-center" />
          </div>
          {/* Ripple */}
          <span className="absolute inset-0 rounded-full border border-purple-500/20 animate-ping" style={{ animationDuration: '3s' }} />
          <span className="absolute -inset-3 rounded-full border border-purple-500/10 animate-ping" style={{ animationDuration: '3s', animationDelay: '0.8s' }} />
        </div>

        {/* Title */}
        <h1 className="font-display leading-none mb-2" style={{ fontSize: 'clamp(4.5rem, 15vw, 10rem)' }}>
          <span className="shimmer">BLIND</span>
          <span className="text-white"> TEST</span>
        </h1>
        <p className="text-white/55 text-sm tracking-[0.35em] uppercase font-medium">
          Musical · Domaine public — 2024
        </p>
      </div>

      {/* ── Mode cards ── */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-2xl stagger">
        {MODES.map(m => (
          <button
            key={m.path}
            onClick={() => nav(m.path)}
            className="group relative p-6 rounded-3xl text-left overflow-hidden transition-all duration-300 hover:scale-[1.04] hover:-translate-y-1"
            style={{
              background: m.bg,
              border: `1px solid ${m.border}`,
              boxShadow: `0 0 0 transparent`,
            }}
            onMouseEnter={e => (e.currentTarget.style.boxShadow = `0 12px 40px ${m.glow}, 0 0 0 1px ${m.border}`)}
            onMouseLeave={e => (e.currentTarget.style.boxShadow = '0 0 0 transparent')}
          >
            {/* Inner shine */}
            <div className="absolute top-0 left-0 right-0 h-px opacity-50"
                 style={{ background: `linear-gradient(90deg, transparent, ${m.accent}, transparent)` }} />

            <span className="text-3xl block mb-3 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
              {m.icon}
            </span>
            <p className="font-bold text-white text-base mb-0.5">{m.label}</p>
            <p className="text-white/65 text-xs leading-relaxed">{m.sub}</p>

            {/* Arrow */}
            <span className="absolute bottom-4 right-4 text-white/40 transition-all duration-200 group-hover:text-white/80 group-hover:translate-x-1">
              →
            </span>
          </button>
        ))}
      </div>

      {/* ── Join + QR ── */}
      <div className="relative z-10 mt-5 flex items-center gap-4 fade-in" style={{ animationDelay: '0.5s' }}>
        <button
          onClick={() => nav('/join')}
          className="text-white/55 hover:text-white/90 text-sm transition-all duration-200 tracking-wide flex items-center gap-2"
        >
          <span className="w-4 h-px bg-white/40" />
          Rejoindre avec un code
          <span className="w-4 h-px bg-white/40" />
        </button>
        <button
          onClick={() => nav('/qr')}
          className="badge badge-purple hover:bg-purple-500/25 transition-colors cursor-pointer"
          title="QR Code d'accès"
        >
          📱 QR Code
        </button>
      </div>

      {/* ── Stats ── */}
      <div className="relative z-10 mt-10 fade-in" style={{ animationDelay: '0.6s' }}>
        <div className="flex items-center gap-6 sm:gap-10">
          {STATS.map(s => (
            <div key={s.label} className="text-center">
              <p className="font-display text-2xl sm:text-3xl gradient-text">{s.n}</p>
              <p className="text-white/55 text-xs mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Genre ticker ── */}
      <div className="fixed bottom-0 left-0 right-0 z-10 overflow-hidden pointer-events-none" style={{ height: 36 }}>
        <div className="flex items-center h-full" style={{ animation: 'ticker 30s linear infinite', width: 'max-content' }}>
          {[...Array(3)].flatMap(() => [
            '🎻 Classique','🎸 Blues','🙏 Gospel','🪕 Folk','🎭 Opéra','🎷 Jazz','🎸 Rock','🎤 Pop','🌿 Reggae',
            '🎛️ Électronique','🎧 Hip-Hop','🎵 Soul','🪩 Disco','🤘 Métal','🥐 Chanson française','🕺 Funk',
          ]).map((g, i) => (
            <span key={i} className="text-white/40 text-xs font-medium mx-6 whitespace-nowrap">{g}</span>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes ticker { from { transform: translateX(0); } to { transform: translateX(-33.33%); } }
      `}</style>
    </div>
  );
}
