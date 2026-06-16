const LOGO_CATEGORIES = [
  { icon: '🌍', label: 'Géo',        color: '#22c55e' },
  { icon: '🎵', label: 'Musique',    color: '#a855f7' },
  { icon: '📜', label: 'Histoire',   color: '#3b82f6' },
  { icon: '🔍', label: 'Mots rares', color: '#ec4899' },
  { icon: '💡', label: 'Autres',     color: '#f97316' },
];

export default function Logo() {
  return (
    <div className="relative mx-auto w-[200px] h-[200px] sm:w-[240px] sm:h-[240px] select-none">
      {/* Gold metallic ring */}
      <div className="absolute inset-0 rounded-full"
           style={{
             background: 'conic-gradient(from -90deg, #fde68a, #fbbf24, #92400e, #fbbf24, #fff7ed, #fbbf24, #92400e, #fbbf24, #fde68a)',
             boxShadow: '0 0 36px rgba(251,191,36,0.45), 0 0 70px rgba(251,191,36,0.2), inset 0 0 12px rgba(255,247,237,0.4)',
           }} />
      {/* Rotating shine */}
      <div className="absolute inset-0 rounded-full overflow-hidden" style={{ animation: 'goldSweep 6s linear infinite' }}>
        <div className="absolute" style={{ top: '-10%', left: '40%', width: '20%', height: '120%', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.55), transparent)', filter: 'blur(6px)' }} />
      </div>

      {/* Inner dark disc */}
      <div className="absolute rounded-full flex flex-col items-center justify-center"
           style={{ inset: '5%', background: 'radial-gradient(circle at 50% 35%, #1a1408 0%, #0a0a16 70%)', boxShadow: 'inset 0 0 30px rgba(0,0,0,0.7), inset 0 0 2px rgba(251,191,36,0.3)' }}>
        <div className="relative flex items-center justify-center mb-1" style={{ height: '30%' }}>
          <span className="font-black" style={{ fontSize: '2.4rem', color: 'rgba(253,230,138,0.95)', textShadow: '0 0 16px #fbbf24, 0 0 32px #92400e', lineHeight: 1 }}>?</span>
          <span className="absolute -top-1 text-2xl" style={{ filter: 'drop-shadow(0 0 4px rgba(251,191,36,0.6))' }}>🎧</span>
        </div>
        <p className="font-display leading-none text-2xl tracking-wide"
           style={{
             background: 'linear-gradient(90deg, #fde68a, #fbbf24, #fff7ed, #fbbf24, #fde68a)',
             backgroundSize: '200% auto',
             WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
             animation: 'goldShimmer 3s ease-in-out infinite',
             textShadow: '0 0 18px rgba(251,191,36,0.25)',
           }}>BLIND</p>
        <p className="font-display leading-none text-2xl tracking-wide text-white/90" style={{ textShadow: '0 0 14px rgba(255,255,255,0.35)' }}>TEST</p>
        <p className="tracking-widest text-[8px] mt-1" style={{ color: 'rgba(251,191,36,0.5)' }}>DE TOUS</p>
      </div>

      {/* Category pills around the ring */}
      {LOGO_CATEGORIES.map((c, i) => {
        const angle = (-90 + i * (360 / LOGO_CATEGORIES.length)) * Math.PI / 180;
        const x = 50 + 47 * Math.cos(angle);
        const y = 50 + 47 * Math.sin(angle);
        return (
          <div key={c.label}
            className="absolute flex items-center gap-1 px-2 py-0.5 rounded-full font-bold whitespace-nowrap text-[9px] sm:text-[10px]"
            style={{
              left: `${x}%`, top: `${y}%`, transform: 'translate(-50%,-50%)',
              background: `${c.color}dd`, color: '#fff',
              boxShadow: `0 0 8px ${c.color}80, 0 0 0 1px rgba(251,191,36,0.5)`,
              border: '1px solid rgba(255,247,237,0.4)',
            }}>
            <span>{c.icon}</span><span>{c.label}</span>
          </div>
        );
      })}
    </div>
  );
}
