import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { socket } from '../socket';

export default function Join() {
  const { code: paramCode } = useParams<{ code?: string }>();
  const nav = useNavigate();
  const [code, setCode] = useState(paramCode || '');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function join() {
    if (!code.trim() || !name.trim()) { setError('Remplis les deux champs'); return; }
    setLoading(true); setError('');
    socket.connect();
    socket.emit('join-room', { code: code.toUpperCase(), name: name.trim() }, (res: { ok?: boolean; error?: string; code?: string }) => {
      setLoading(false);
      if (res.error) { setError(res.error); socket.disconnect(); }
      else nav(`/buzzer/${res.code}`);
    });
  }

  return (
    <div className="min-h-screen bg-app flex items-center justify-center p-5">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[500px] h-[500px] rounded-full opacity-15"
               style={{ background: 'radial-gradient(circle, #7c3aed, transparent 65%)' }} />
        </div>
      </div>

      <div className="w-full max-w-sm relative z-10 scale-in">
        {/* Vinyl */}
        <div className="flex justify-center mb-6">
          <div className="vinyl relative" style={{ width: 72, height: 72 }}>
            <div className="vinyl-center" />
          </div>
        </div>

        <h1 className="font-display text-center mb-1 glow-purple" style={{ fontSize: '3.5rem' }}>
          REJOINDRE
        </h1>
        <p className="text-white/30 text-center text-sm mb-8 tracking-wide">
          Scanne le QR code ou entre le code manuellement
        </p>

        <div className="card p-6 space-y-4">
          <div>
            <label className="text-xs font-semibold text-white/30 uppercase tracking-widest block mb-2">
              Code de la salle
            </label>
            <input
              type="text"
              value={code}
              onChange={e => setCode(e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 5))}
              placeholder="XXXXX"
              maxLength={5}
              className="input text-center font-display py-4"
              style={{ fontSize: '2rem', letterSpacing: '0.4em' }}
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-white/30 uppercase tracking-widest block mb-2">
              Ton prénom
            </label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value.slice(0, 20))}
              placeholder="Ex : Marie"
              maxLength={20}
              onKeyDown={e => e.key === 'Enter' && join()}
              className="input text-lg font-semibold"
            />
          </div>

          {error && (
            <div className="card-red p-3 text-red-300 text-sm text-center rounded-xl">
              {error}
            </div>
          )}

          <button onClick={join} disabled={loading} className="btn btn-primary btn-lg w-full">
            {loading ? <span className="dot-pulse">Connexion…</span> : '🚀 Rejoindre la partie'}
          </button>
        </div>

        <button onClick={() => nav('/')} className="mt-5 w-full text-center text-white/20 hover:text-white/50 text-sm transition-colors">
          ← Retour à l'accueil
        </button>
      </div>
    </div>
  );
}
