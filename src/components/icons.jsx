/* Iconos SVG inline — sustituyen emojis (🔥🍔📍) que en sistemas sin fuente
   de emoji a color se ven como cuadrados. 1em → heredan tamaño y color. */

const PATHS = {
  flame: (
    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
  ),
  burger: (
    <>
      <path d="M4 11a8 6 0 0 1 16 0" />
      <path d="M3 15h18" />
      <rect x="4" y="17" width="16" height="3" rx="1.5" />
    </>
  ),
  pin: (
    <>
      <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
      <circle cx="12" cy="10" r="3" />
    </>
  ),
}

export default function Icon({ name, size = '1em', strokeWidth = 2, ...rest }) {
  const children = PATHS[name]
  if (!children) return null
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={strokeWidth}
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
      style={{ display: 'inline-block', verticalAlign: '-0.125em' }} {...rest}>
      {children}
    </svg>
  )
}
