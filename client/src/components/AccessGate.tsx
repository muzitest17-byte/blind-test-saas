import { useState, useEffect, type ReactNode } from 'react';
import { useLocation } from 'react-router-dom';

const BACKEND = (import.meta.env.VITE_BACKEND_URL as string) ?? '';
const LS_KEY = 'blind_mix_access';
const SESSION_KEY = 'blind_mix_session';

// Pages accessibles sans code (point d'entrée pour les joueurs QR)
const PUBLIC_PATHS = ['/join'];

async function verifyCode(code: string): Promise<boolean> {
  try {
    const res = await fetch(`${BACKEND}/api/access/verify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code }),
    });
    return (await res.json()).valid === true;
  } catch { return false; }
}

async function verifySession(token: string): Promise<boolean> {
  try {
    const res = await fetch(`${BACKEND}/api/access/session`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
    });
    return (await res.json()).valid === true;
  } catch { return false; }
}

export default function AccessGate({ children }: { children: ReactNode }) {
  const location = useLocation();
  const [status, setStatus] = useState<'checking' | 'locked' | 'open'>('checking');
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Pages publiques (join) : toujours ouvertes
  const isPublic = PUBLIC_PATHS.some(p => location.pathname.startsWith(p));

  useEffect(() => {
    if (isPublic) { setStatus('open'); return; }

    async function check() {
      // 1. Code d'accès permanent
      const saved = localStorage.getItem(LS_KEY);
      if (saved && await verifyCode(saved)) { setStatus('open'); return; }

      // 2. Token de session temporaire (joueur rejoint via QR)
      const session = localStorage.getItem(SESSION_KEY);
      if (session && await verifySession(session)) { setStatus('open'); return; }

      // Nettoyer la session expirée
      if (session) localStorage.removeItem(SESSION_KEY);
      setStatus('locked');
    }
    check();
  }, [location.pathname]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(''); setLoading(true);
    const trimmed = code.trim().toUpperCase();
    const valid = await verifyCode(trimmed);
    setLoading(false);
    if (valid) {
      localStorage.setItem(LS_KEY, trimmed);
      setStatus('open');
    } else {
      setError('Code invalide — demande ton code à l\'administrateur');
    }
  }

  if (status === 'checking') return (
    <div className="min-h-screen bg-app flex items-center justify-center">
      <div className="w-8 h-8 rounded-full border-2 border-purple-500 border-t-transparent animate-spin" />
    </div>
  );

  if (status === 'open') return <>{children}</>;

  return (
    <div className="min-h-screen bg-app flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full"
             style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.3) 0%, transparent 65%)' }} />
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full"
             style={{ background: 'radial-gradient(circle, rgba(251,191,36,0.2) 0%, transparent 65%)' }} />
      </div>

      <div className="relative z-10 w-full max-w-sm">
        <div className="flex justify-center mb-8">
          <div className="relative w-20 h-20">
            <div className="absolute inset-0 rounded-full"
                 style={{ background: 'conic-gradient(from -90deg, #fde68a, #fbbf24, #92400e, #fbbf24, #fff7ed, #fbbf24, #92400e, #fbbf24, #fde68a)', boxShadow: '0 0 30px rgba(251,191,36,0.5)' }} />
            <div className="absolute rounded-full flex flex-col items-center justify-center"
                 style={{ inset: '8%', background: 'radial-gradient(circle at 50% 35%, #1a1408 0%, #0a0a16 70%)' }}>
              <span className="font-black text-[10px] leading-none"
                    style={{ background: 'linear-gradient(90deg, #fde68a, #fbbf24)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>BLIND</span>
              <span className="text-white/90 font-black text-[10px] leading-none">MIX</span>
            </div>
          </div>
        </div>

        <h1 className="text-center text-white font-bold text-2xl mb-1">Accès privé</h1>
        <p className="text-center text-white/50 text-sm mb-8">Entrez votre code d'accès pour continuer</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            value={code}
            onChange={e => { setCode(e.target.value.toUpperCase()); setError(''); }}
            placeholder="CODE D'ACCÈS"
            maxLength={20}
            autoFocus
            className="w-full px-5 py-4 rounded-2xl text-center text-xl font-black tracking-[0.3em] text-white placeholder-white/25 outline-none"
            style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.15)' }}
          />
          {error && <p className="text-red-400 text-sm text-center">{error}</p>}
          <button
            type="submit"
            disabled={loading || code.trim().length < 4}
            className="w-full py-4 rounded-2xl font-bold text-base transition-all duration-200 disabled:opacity-40"
            style={{ background: 'linear-gradient(135deg, #7c3aed, #a855f7)', boxShadow: '0 0 24px rgba(139,92,246,0.5)' }}
          >
            {loading ? 'Vérification…' : 'Entrer'}
          </button>
        </form>

        <p className="text-center text-white/25 text-xs mt-8">
          🔒 Application privée · Blind Mix
        </p>
        <p className="text-center mt-4">
          <a href="/join" className="text-purple-400/60 hover:text-purple-400 text-xs underline transition-colors">
            Rejoindre une partie via QR code →
          </a>
        </p>
      </div>
    </div>
  );
}
