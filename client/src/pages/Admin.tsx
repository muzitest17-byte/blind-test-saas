import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BACKEND = (import.meta.env.VITE_BACKEND_URL as string) ?? '';

export default function Admin() {
  const nav = useNavigate();
  const [adminPwd, setAdminPwd] = useState('');
  const [authed, setAuthed] = useState(false);
  const [codes, setCodes] = useState<string[]>([]);
  const [newCode, setNewCode] = useState('');
  const [error, setError] = useState('');
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);

  async function api(path: string, body: object) {
    const res = await fetch(`${BACKEND}/api/access/admin/${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ adminPassword: adminPwd, ...body }),
    });
    if (res.status === 401) throw new Error('Mot de passe admin incorrect');
    if (!res.ok) throw new Error('Erreur serveur');
    return res.json();
  }

  async function login(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true); setError('');
    try {
      const data = await api('list', {});
      setCodes(data.codes);
      setAuthed(true);
    } catch (err: any) {
      setError(err.message);
    } finally { setLoading(false); }
  }

  async function createCode() {
    setLoading(true); setError(''); setMsg('');
    try {
      const data = await api('create', newCode.trim() ? { code: newCode.trim() } : {});
      setCodes(prev => [...prev, data.code]);
      setMsg(`✅ Code créé : ${data.code}`);
      setNewCode('');
    } catch (err: any) {
      setError(err.message);
    } finally { setLoading(false); }
  }

  async function deleteCode(code: string) {
    setLoading(true); setError(''); setMsg('');
    try {
      await api('delete', { code });
      setCodes(prev => prev.filter(c => c !== code));
      setMsg(`🗑️ Code supprimé : ${code}`);
    } catch (err: any) {
      setError(err.message);
    } finally { setLoading(false); }
  }

  async function refresh() {
    try {
      const data = await api('list', {});
      setCodes(data.codes);
    } catch {}
  }

  return (
    <div className="min-h-screen bg-app flex flex-col items-center p-6 relative">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full"
             style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.25) 0%, transparent 65%)' }} />
      </div>

      <div className="relative z-10 w-full max-w-md mt-8">
        <button onClick={() => nav('/')} className="text-white/40 hover:text-white/70 text-sm mb-8 flex items-center gap-2 transition-colors">
          ← Accueil
        </button>

        <h1 className="text-white font-bold text-2xl mb-1">Panel Admin</h1>
        <p className="text-white/40 text-sm mb-8">Gestion des codes d'accès Blind Mix</p>

        {!authed ? (
          <form onSubmit={login} className="flex flex-col gap-3">
            <input
              type="password"
              value={adminPwd}
              onChange={e => setAdminPwd(e.target.value)}
              placeholder="Mot de passe admin"
              autoFocus
              className="w-full px-4 py-3 rounded-xl text-white outline-none"
              style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.15)' }}
            />
            {error && <p className="text-red-400 text-sm">{error}</p>}
            <button type="submit" disabled={loading}
              className="py-3 rounded-xl font-bold text-white disabled:opacity-40"
              style={{ background: 'linear-gradient(135deg, #7c3aed, #a855f7)' }}>
              {loading ? 'Connexion…' : 'Se connecter'}
            </button>
          </form>
        ) : (
          <div className="flex flex-col gap-6">
            {/* Créer un code */}
            <div className="rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <h2 className="text-white font-bold mb-3">Créer un code</h2>
              <div className="flex gap-2">
                <input
                  value={newCode}
                  onChange={e => setNewCode(e.target.value.toUpperCase())}
                  placeholder="Laisser vide = auto"
                  maxLength={20}
                  className="flex-1 px-3 py-2 rounded-lg text-white text-sm outline-none"
                  style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}
                />
                <button onClick={createCode} disabled={loading}
                  className="px-4 py-2 rounded-lg font-bold text-sm text-white disabled:opacity-40"
                  style={{ background: 'rgba(139,92,246,0.5)', border: '1px solid rgba(139,92,246,0.6)' }}>
                  + Créer
                </button>
              </div>
              {msg && <p className="text-green-400 text-sm mt-2">{msg}</p>}
              {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
            </div>

            {/* Liste des codes */}
            <div className="rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-white font-bold">Codes actifs ({codes.length})</h2>
                <button onClick={refresh} className="text-white/40 hover:text-white/70 text-sm transition-colors">↻ Actualiser</button>
              </div>
              {codes.length === 0 ? (
                <p className="text-white/30 text-sm">Aucun code actif</p>
              ) : (
                <div className="flex flex-col gap-2">
                  {codes.map(c => (
                    <div key={c} className="flex items-center justify-between px-4 py-2.5 rounded-xl"
                         style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}>
                      <span className="text-white font-mono font-bold tracking-widest">{c}</span>
                      <button onClick={() => deleteCode(c)} disabled={loading}
                        className="text-red-400/60 hover:text-red-400 text-sm transition-colors disabled:opacity-40">
                        Supprimer
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <p className="text-white/25 text-xs text-center">
              ⚠️ Les codes sont réinitialisés au redémarrage du serveur.<br />
              Configure ACCESS_CODES dans Railway pour les rendre persistants.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
