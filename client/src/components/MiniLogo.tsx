import { useNavigate } from 'react-router-dom';

export default function MiniLogo({ size = 34 }: { size?: number }) {
  const nav = useNavigate();
  return (
    <button
      onClick={() => nav('/')}
      title="Blind Mix — Accueil"
      className="relative shrink-0 rounded-full transition-transform duration-150 hover:scale-110 active:scale-95"
      style={{ width: size, height: size }}
    >
      <div className="absolute inset-0 rounded-full"
           style={{
             background: 'conic-gradient(from -90deg, #fde68a, #fbbf24, #92400e, #fbbf24, #fff7ed, #fbbf24, #92400e, #fbbf24, #fde68a)',
             boxShadow: '0 0 10px rgba(251,191,36,0.5)',
           }} />
      <div className="absolute rounded-full flex items-center justify-center"
           style={{ inset: '14%', background: 'radial-gradient(circle at 50% 35%, #1a1408 0%, #0a0a16 70%)' }}>
        <span className="font-black" style={{ fontSize: size * 0.42, color: 'rgba(253,230,138,0.95)', textShadow: '0 0 8px #fbbf24', lineHeight: 1 }}>?</span>
      </div>
    </button>
  );
}
