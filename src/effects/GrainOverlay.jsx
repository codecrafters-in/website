import useReducedMotion from '../hooks/useReducedMotion.js'

const NOISE =
  "url(\"data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n' x='0' y='0'><feTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/></filter><rect width='200' height='200' filter='url(%23n)'/></svg>\")"

/** Fixed film-grain layer. `hidden` unmounts it (used while the arcade is open). */
export default function GrainOverlay({ hidden = false, opacity = 0.035 }) {
  const reduced = useReducedMotion()
  if (hidden) return null
  return (
    <div
      aria-hidden="true"
      className={`fixed pointer-events-none z-grain ${reduced ? '' : 'animate-grain'}`}
      style={{
        inset: '-200%',
        width: '400%',
        height: '400%',
        opacity,
        backgroundImage: NOISE,
        willChange: reduced ? 'auto' : 'transform',
      }}
    />
  )
}
