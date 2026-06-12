const OPTS = [
  { letter: 'A', border: 'rgba(59,130,246,0.35)',  bg: 'rgba(59,130,246,0.08)',  hover: 'rgba(59,130,246,0.16)',  lblBg: 'rgba(59,130,246,0.2)',  lblTxt: '#93c5fd' },
  { letter: 'B', border: 'rgba(249,115,22,0.35)',  bg: 'rgba(249,115,22,0.08)',  hover: 'rgba(249,115,22,0.16)',  lblBg: 'rgba(249,115,22,0.2)',  lblTxt: '#fdba74' },
  { letter: 'C', border: 'rgba(139,92,246,0.35)',  bg: 'rgba(139,92,246,0.08)',  hover: 'rgba(139,92,246,0.16)',  lblBg: 'rgba(139,92,246,0.2)',  lblTxt: '#c4b5fd' },
  { letter: 'D', border: 'rgba(236,72,153,0.35)',  bg: 'rgba(236,72,153,0.08)',  hover: 'rgba(236,72,153,0.16)',  lblBg: 'rgba(236,72,153,0.2)',  lblTxt: '#f9a8d4' },
];

interface Props {
  options: string[];
  correctOption: string;
  selected: string | null;
  onSelect: (opt: string) => void;
}

export default function QCMOptions({ options, correctOption, selected, onSelect }: Props) {
  const revealed = selected !== null;

  return (
    <div className="grid grid-cols-1 gap-2.5">
      {options.map((opt, i) => {
        const o = OPTS[i];
        const isSelected = selected === opt;
        const isCorrect  = opt === correctOption;

        let style: React.CSSProperties;
        if (!revealed) {
          style = { background: o.bg, border: `1px solid ${o.border}`, cursor: 'pointer' };
        } else if (isCorrect) {
          style = { background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.5)', boxShadow: '0 0 12px rgba(16,185,129,0.2)' };
        } else if (isSelected) {
          style = { background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.4)', opacity: 0.9 };
        } else {
          style = { background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', opacity: 0.4 };
        }

        const [title, ...artistParts] = opt.split(' — ');
        const artist = artistParts.join(' — ');

        return (
          <button
            key={opt}
            onClick={() => !revealed && onSelect(opt)}
            disabled={revealed}
            className="flex items-center gap-3 p-3.5 rounded-2xl text-left transition-all duration-200 active:scale-[0.98] w-full"
            style={style}
            onMouseEnter={e => { if (!revealed) (e.currentTarget as HTMLElement).style.background = o.hover; }}
            onMouseLeave={e => { if (!revealed) (e.currentTarget as HTMLElement).style.background = o.bg; }}
          >
            {/* Letter */}
            <span className="w-8 h-8 rounded-xl flex-shrink-0 flex items-center justify-center text-xs font-black"
                  style={!revealed ? { background: o.lblBg, color: o.lblTxt }
                       : isCorrect   ? { background: 'rgba(16,185,129,0.25)', color: '#6ee7b7' }
                       : isSelected  ? { background: 'rgba(239,68,68,0.25)', color: '#fca5a5' }
                       : { background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.25)' }}>
              {o.letter}
            </span>

            {/* Text */}
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-white text-sm truncate leading-tight">{title}</p>
              {artist && <p className="text-white/35 text-xs truncate mt-0.5">{artist}</p>}
            </div>

            {/* Icon */}
            {revealed && isCorrect  && <span className="text-emerald-400 text-lg flex-shrink-0">✓</span>}
            {revealed && isSelected && !isCorrect && <span className="text-red-400 text-lg flex-shrink-0">✗</span>}
          </button>
        );
      })}
    </div>
  );
}
