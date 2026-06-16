import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import MiniLogo from '../components/MiniLogo';

export default function QRAccess() {
  const nav = useNavigate();
  const [ip, setIp] = useState('');

  useEffect(() => {
    fetch('/api/local-ip')
      .then(r => r.json())
      .then(d => setIp(d.ip))
      .catch(() => setIp('localhost'));
  }, []);

  const url = ip ? `http://${ip}:5174` : '';

  return (
    <div className="min-h-screen bg-app flex flex-col items-center justify-center p-6">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[600px] h-[600px] rounded-full opacity-10"
               style={{ background: 'radial-gradient(circle, #7c3aed, transparent 65%)' }} />
        </div>
      </div>

      <div className="relative z-10 text-center fade-in max-w-sm w-full">
        <div className="flex items-center justify-center gap-3 mb-8">
          <MiniLogo size={28} />
          <button onClick={() => nav('/')} className="btn btn-ghost btn-sm">← Accueil</button>
        </div>

        <div className="vinyl vinyl-spin mx-auto mb-6" style={{ width: 60, height: 60 }}>
          <div className="vinyl-center" />
        </div>

        <h1 className="font-display text-5xl gradient-text mb-2">REJOINDRE</h1>
        <p className="text-white/30 text-sm mb-8">Scanne ce QR code avec ton téléphone</p>

        {/* QR Card */}
        <div className="card p-6 mb-6">
          {url ? (
            <>
              <div className="bg-white p-4 rounded-2xl inline-block mb-5 shadow-2xl">
                <QRCodeSVG
                  value={url}
                  size={200}
                  bgColor="#ffffff"
                  fgColor="#08090f"
                  level="M"
                />
              </div>
              <div className="card p-3 text-center">
                <p className="text-white/25 text-xs mb-1">URL d'accès</p>
                <p className="text-purple-300 font-mono text-sm font-bold">{url}</p>
              </div>
            </>
          ) : (
            <div className="py-12 text-center">
              <div className="animate-spin text-4xl mb-3">⏳</div>
              <p className="text-white/30 text-sm">Détection de l'IP locale…</p>
            </div>
          )}
        </div>

        {/* Instructions */}
        <div className="space-y-2 text-left">
          {[
            ['1', 'Ouvre l\'appli Caméra sur ton téléphone'],
            ['2', 'Pointe vers le QR code'],
            ['3', 'Ouvre le lien qui apparaît'],
            ['4', 'Rejoins une partie ou joue en solo'],
          ].map(([n, t]) => (
            <div key={n} className="flex items-center gap-3 card p-3">
              <span className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-black flex-shrink-0"
                    style={{ background: 'rgba(124,58,237,0.3)', color: '#c4b5fd' }}>{n}</span>
              <p className="text-white/50 text-sm">{t}</p>
            </div>
          ))}
        </div>

        <p className="text-white/15 text-xs mt-6">
          📶 Téléphone et ordinateur doivent être sur le même WiFi
        </p>
      </div>
    </div>
  );
}
