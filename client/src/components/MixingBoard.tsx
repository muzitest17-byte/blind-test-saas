export default function MixingBoard() {
  return (
    <div className="pointer-events-none fixed inset-0 flex items-end justify-center overflow-hidden" style={{ zIndex: 0 }}>
      <svg
        viewBox="0 0 900 420"
        preserveAspectRatio="xMidYMax meet"
        style={{ width: '100%', maxWidth: 1100, opacity: 0.13, filter: 'blur(0.3px)' }}
      >
        <style>{`
          @keyframes spin-left  { from { transform: rotate(0deg);   } to { transform: rotate(360deg);  } }
          @keyframes spin-right { from { transform: rotate(0deg);   } to { transform: rotate(-360deg); } }
          @keyframes fader1  { 0%,100%{transform:translateY(0)}  50%{transform:translateY(38px)} }
          @keyframes fader2  { 0%,100%{transform:translateY(20px)} 50%{transform:translateY(-10px)} }
          @keyframes fader3  { 0%,100%{transform:translateY(10px)} 50%{transform:translateY(40px)} }
          @keyframes fader4  { 0%,100%{transform:translateY(30px)} 50%{transform:translateY(0px)} }
          @keyframes fader5  { 0%,100%{transform:translateY(5px)}  50%{transform:translateY(35px)} }
          @keyframes crossfade { 0%,100%{transform:translateX(0)} 50%{transform:translateX(60px)} }
          @keyframes knob1 { 0%,100%{transform:rotate(-40deg)} 50%{transform:rotate(40deg)} }
          @keyframes knob2 { 0%,100%{transform:rotate(30deg)}  50%{transform:rotate(-50deg)} }
          @keyframes knob3 { 0%,100%{transform:rotate(-20deg)} 50%{transform:rotate(60deg)} }
          @keyframes eq1 { 0%,100%{transform:scaleY(0.4)} 50%{transform:scaleY(1)} }
          @keyframes eq2 { 0%,100%{transform:scaleY(1)}   50%{transform:scaleY(0.3)} }
          @keyframes eq3 { 0%,100%{transform:scaleY(0.6)} 50%{transform:scaleY(0.9)} }
          @keyframes eq4 { 0%,100%{transform:scaleY(0.8)} 50%{transform:scaleY(0.2)} }
          @keyframes eq5 { 0%,100%{transform:scaleY(0.5)} 50%{transform:scaleY(1)} }
          @keyframes ledpulse { 0%,100%{opacity:0.3} 50%{opacity:1} }
          .spin-l { transform-origin:155px 180px; animation:spin-left 4s linear infinite; }
          .spin-r { transform-origin:745px 180px; animation:spin-right 4.5s linear infinite; }
        `}</style>

        {/* ── Corps de la table ── */}
        <rect x="30" y="260" width="840" height="160" rx="18" fill="#0d0d1a" stroke="#2a2a4a" strokeWidth="2"/>
        <rect x="50" y="240" width="800" height="185" rx="14" fill="#111128" stroke="#1e1e3a" strokeWidth="1.5"/>

        {/* ── Platine gauche ── */}
        <g>
          {/* Plateau */}
          <circle cx="155" cy="180" r="130" fill="#0a0a18" stroke="#1a1a30" strokeWidth="2"/>
          <circle cx="155" cy="180" r="125" fill="#0e0e22" stroke="#222240" strokeWidth="1"/>
          {/* Vinyle */}
          <g className="spin-l">
            <circle cx="155" cy="180" r="118" fill="#0a0812"/>
            {[108,95,82,70,58,46,34,22].map((r,i) => (
              <circle key={i} cx="155" cy="180" r={r} fill="none" stroke="#1a1830" strokeWidth="1.2"/>
            ))}
            <circle cx="155" cy="180" r="18" fill="#1a0a2e"/>
            <circle cx="155" cy="180" r="10" fill="#a855f7" opacity="0.6"/>
            <circle cx="155" cy="180" r="4"  fill="#fbbf24"/>
            {/* Reflet lumière */}
            <ellipse cx="125" cy="140" rx="22" ry="14" fill="rgba(255,255,255,0.04)" transform="rotate(-30,125,140)"/>
          </g>
          {/* Bras de lecture */}
          <line x1="255" y1="90" x2="185" y2="200" stroke="#c084fc" strokeWidth="3" strokeLinecap="round"/>
          <circle cx="255" cy="90" r="7" fill="#7c3aed"/>
          <circle cx="182" cy="203" r="4" fill="#fbbf24"/>
        </g>

        {/* ── Platine droite ── */}
        <g>
          <circle cx="745" cy="180" r="130" fill="#0a0a18" stroke="#1a1a30" strokeWidth="2"/>
          <circle cx="745" cy="180" r="125" fill="#0e0e22" stroke="#222240" strokeWidth="1"/>
          <g className="spin-r">
            <circle cx="745" cy="180" r="118" fill="#0a0812"/>
            {[108,95,82,70,58,46,34,22].map((r,i) => (
              <circle key={i} cx="745" cy="180" r={r} fill="none" stroke="#1a1830" strokeWidth="1.2"/>
            ))}
            <circle cx="745" cy="180" r="18" fill="#0a1a2e"/>
            <circle cx="745" cy="180" r="10" fill="#06b6d4" opacity="0.6"/>
            <circle cx="745" cy="180" r="4"  fill="#fbbf24"/>
            <ellipse cx="715" cy="140" rx="22" ry="14" fill="rgba(255,255,255,0.04)" transform="rotate(-30,715,140)"/>
          </g>
          <line x1="645" y1="90" x2="715" y2="200" stroke="#67e8f9" strokeWidth="3" strokeLinecap="round"/>
          <circle cx="645" cy="90" r="7" fill="#0891b2"/>
          <circle cx="718" cy="203" r="4" fill="#fbbf24"/>
        </g>

        {/* ── Console centrale ── */}
        <rect x="310" y="80" width="280" height="310" rx="10" fill="#0c0c20" stroke="#1e1e38" strokeWidth="1.5"/>

        {/* ── EQ bars gauche ── */}
        {[0,1,2,3,4].map(i => (
          <g key={i} style={{ transformOrigin:`${330+i*14}px 200px`, animation:`eq${i+1} ${1.2+i*0.3}s ease-in-out infinite`, animationDelay:`${i*0.15}s` }}>
            <rect x={327+i*14} y="150" width="8" height="80" rx="3" fill={['#7c3aed','#a855f7','#c084fc','#a855f7','#7c3aed'][i]} opacity="0.8"/>
          </g>
        ))}

        {/* ── EQ bars droite ── */}
        {[0,1,2,3,4].map(i => (
          <g key={i} style={{ transformOrigin:`${520+i*14}px 200px`, animation:`eq${5-i} ${1.4+i*0.25}s ease-in-out infinite`, animationDelay:`${i*0.2+0.1}s` }}>
            <rect x={517+i*14} y="150" width="8" height="80" rx="3" fill={['#0891b2','#06b6d4','#22d3ee','#06b6d4','#0891b2'][i]} opacity="0.8"/>
          </g>
        ))}

        {/* ── Knobs ── */}
        {[
          { cx:350, cy:290, a:'knob1', c:'#7c3aed', d:1.5 },
          { cx:390, cy:290, a:'knob2', c:'#a855f7', d:0 },
          { cx:430, cy:290, a:'knob3', c:'#c084fc', d:0.8 },
          { cx:470, cy:290, a:'knob1', c:'#06b6d4', d:0.4 },
          { cx:510, cy:290, a:'knob2', c:'#22d3ee', d:1.1 },
          { cx:550, cy:290, a:'knob3', c:'#0891b2', d:0.2 },
        ].map((k,i) => (
          <g key={i} style={{ transformOrigin:`${k.cx}px ${k.cy}px`, animation:`${k.a} ${2+i*0.4}s ease-in-out infinite`, animationDelay:`${k.d}s` }}>
            <circle cx={k.cx} cy={k.cy} r="14" fill="#0a0a1e" stroke={k.c} strokeWidth="2"/>
            <line x1={k.cx} y1={k.cy-6} x2={k.cx} y2={k.cy-12} stroke={k.c} strokeWidth="2.5" strokeLinecap="round"/>
          </g>
        ))}

        {/* ── Faders (5) ── */}
        {[
          { x:335, anim:'fader1', d:0,   c:'#7c3aed' },
          { x:375, anim:'fader2', d:0.4, c:'#a855f7' },
          { x:415, anim:'fader3', d:0.8, c:'#fbbf24' },
          { x:495, anim:'fader4', d:0.3, c:'#06b6d4' },
          { x:535, anim:'fader5', d:0.7, c:'#22d3ee' },
        ].map((f,i) => (
          <g key={i}>
            <rect x={f.x+4} y="335" width="2" height="60" rx="1" fill="#1e1e38"/>
            <g style={{ animation:`${f.anim} ${2.2+i*0.3}s ease-in-out infinite`, animationDelay:`${f.d}s` }}>
              <rect x={f.x} y="335" width="10" height="20" rx="3" fill={f.c} opacity="0.85"/>
            </g>
          </g>
        ))}

        {/* ── Crossfader ── */}
        <rect x="360" y="378" width="180" height="6" rx="3" fill="#0a0a1e" stroke="#222240" strokeWidth="1"/>
        <g style={{ animation:'crossfade 3s ease-in-out infinite' }}>
          <rect x="355" y="372" width="28" height="18" rx="4" fill="#fbbf24" opacity="0.9"/>
        </g>

        {/* ── LEDs ── */}
        {[340,360,380,400,420,440,460,480,500,520,540,560].map((x,i) => (
          <circle key={i} cx={x} cy="115" r="3"
            fill={i%3===0?'#a855f7':i%3===1?'#06b6d4':'#fbbf24'}
            style={{ animation:`ledpulse ${0.8+i*0.15}s ease-in-out infinite`, animationDelay:`${i*0.1}s` }}
          />
        ))}

        {/* ── VU-mètres ── */}
        {[0,1,2,3,4,5,6].map(i => (
          <g key={i} style={{ transformOrigin:`${455}px ${248-i*6}px`, animation:`eq${(i%5)+1} ${1+i*0.2}s ease-in-out infinite`, animationDelay:`${i*0.12}s` }}>
            <rect x="440" y={246-i*6} width="30" height="4" rx="1"
              fill={i<3?'#22c55e':i<5?'#fbbf24':'#ef4444'} opacity={0.6+i*0.05}/>
          </g>
        ))}
      </svg>
    </div>
  );
}
