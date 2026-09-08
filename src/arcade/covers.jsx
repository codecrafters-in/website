import { PixelHead } from './airun/crew.jsx'

/**
 * Cabinet artwork.
 *
 * Drawn rather than photographed: two 160×100 pixel scenes built from rects, so
 * they cost nothing to load, stay crisp at any size, and cannot drift out of
 * sync with the games the way a screenshot would. Scanlines and a vignette sit
 * on top so each one reads as a screen rather than a picture.
 */

const AMBER = '#f5c518'
const BRONZE = '#6b5300'
const DIM = '#3a3939'

function Screen({ children, className = '' }) {
  return (
    <div className={`relative overflow-hidden rounded-md bg-[#131313] ${className}`}>
      <svg viewBox="0 0 160 100" shapeRendering="crispEdges" className="block w-full">
        {children}
      </svg>
      {/* scanlines + vignette — the screen, not the art */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, rgba(0,0,0,.55) 0 1px, transparent 1px 3px)',
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(ellipse at center, transparent 45%, rgba(0,0,0,.6))' }}
      />
    </div>
  )
}

/** AI//RUN — a terminal mid-crack, with the crew watching. */
function AiRunCover() {
  // Six tiles: the first three have locked, the rest are still scrambling.
  const tiles = [
    { c: 'S', on: true },
    { c: 'u', on: true },
    { c: 'm', on: true },
    { c: '#', on: false },
    { c: '4', on: false },
    { c: '!', on: false },
  ]
  return (
    <div className="relative">
      <Screen>
        {/* prompt lines */}
        <rect x="10" y="12" width="4" height="3" fill={AMBER} />
        <rect x="17" y="12" width="52" height="3" fill={DIM} />
        <rect x="10" y="19" width="72" height="3" fill={DIM} />
        <rect x="10" y="26" width="40" height="3" fill={BRONZE} />

        {/* the password, resolving left to right */}
        {tiles.map((t, k) => (
          <g key={k}>
            <rect
              x={10 + k * 20}
              y={40}
              width="15"
              height="20"
              fill={t.on ? '#2a2200' : 'none'}
              stroke={t.on ? AMBER : DIM}
              strokeWidth="1"
            />
            <rect
              x={15 + k * 20}
              y={47}
              width="5"
              height="6"
              fill={t.on ? AMBER : DIM}
            />
          </g>
        ))}

        {/* progress bar */}
        <rect x="10" y="70" width="140" height="3" fill={DIM} />
        <rect x="10" y="70" width="70" height="3" fill={AMBER} />
      </Screen>

      {/* the crew, sitting on the bezel */}
      <div className="absolute -bottom-2 right-3 flex gap-1.5">
        <PixelHead who="ghost" size={22} />
        <PixelHead who="you" size={22} />
        <PixelHead who="wren" size={22} />
      </div>
    </div>
  )
}

/** BUG BLASTER — the shooter, mid-wave. */
function BugBlasterCover() {
  const rows = [0, 1, 2]
  const cols = [0, 1, 2, 3, 4, 5]
  return (
    <Screen>
      {rows.map((r) =>
        cols.map((c) => {
          const x = 18 + c * 22
          const y = 14 + r * 16
          const fill = r === 0 ? AMBER : r === 1 ? '#e0af00' : BRONZE
          return (
            <g key={`${r}-${c}`} fill={fill}>
              {/* body */}
              <rect x={x} y={y} width="10" height="6" />
              {/* legs */}
              <rect x={x - 2} y={y + 2} width="2" height="2" />
              <rect x={x + 10} y={y + 2} width="2" height="2" />
              {/* eyes */}
              <rect x={x + 2} y={y + 2} width="2" height="2" fill="#131313" />
              <rect x={x + 6} y={y + 2} width="2" height="2" fill="#131313" />
            </g>
          )
        }),
      )}

      {/* bullets */}
      <rect x="76" y="66" width="2" height="6" fill={AMBER} />
      <rect x="76" y="76" width="2" height="4" fill={BRONZE} />

      {/* ship */}
      <g fill={AMBER}>
        <rect x="74" y="86" width="6" height="4" />
        <rect x="70" y="90" width="14" height="4" />
        <rect x="66" y="92" width="22" height="2" />
      </g>
    </Screen>
  )
}

const COVERS = {
  'ai-run': AiRunCover,
  'bug-blaster': BugBlasterCover,
}

export default function GameCover({ slug }) {
  const Cover = COVERS[slug]
  return Cover ? <Cover /> : null
}
