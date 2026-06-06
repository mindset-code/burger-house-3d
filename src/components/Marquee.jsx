// Marquee de fuego — banda entre secciones
const items = ['FRESH', '🔥', 'ARTISAN', '⭐', 'HAND-MADE', '🍔', 'FIRE-GRILLED', '✦', 'SINCE 1987', '🔥', 'NO FROZEN', '✦']

export default function Marquee({ reverse = false }) {
  const content = [...items, ...items]
  return (
    <div className="overflow-hidden py-4 border-y border-amber-800/30 bg-[#0d0400]/60 backdrop-blur-sm">
      <div
        className="flex gap-8 whitespace-nowrap"
        style={{
          animation: `marquee${reverse ? 'R' : ''} 22s linear infinite`,
          width: 'max-content',
        }}>
        {content.map((item, i) => (
          <span key={i}
            className="text-amber-500/80 text-sm font-mono tracking-[0.3em] uppercase
                       hover:text-amber-300 transition-colors">
            {item}
          </span>
        ))}
      </div>
      <style>{`
        @keyframes marquee  { from { transform: translateX(0) } to { transform: translateX(-50%) } }
        @keyframes marqueeR { from { transform: translateX(-50%) } to { transform: translateX(0) } }
      `}</style>
    </div>
  )
}
