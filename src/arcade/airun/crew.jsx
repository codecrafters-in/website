import './crew.css'

/**
 * The crew, as 8×8 pixel heads.
 *
 * Minecraft-style front faces: one 8×8 grid per character, drawn at whatever
 * size the caller asks for with `shapeRendering="crispEdges"` so the pixels stay
 * pixels. Each grid is compiled once at module load into one <path> per colour —
 * about four nodes per head instead of sixty-four — because these render beside
 * every line in the chat log.
 *
 * Legend:
 *   .  transparent   h  hood / hair   b  beanie   l  goggle lens
 *   s  skin          d  shadowed face under a hood
 *   e  eye           g  glowing eye   m  mouth
 */

const FACES = {
  ghost: {
    // Hooded, no face, two amber points where eyes should be.
    grid: [
      '.hhhhhh.',
      'hhhhhhhh',
      'hddddddh',
      'hdgddgdh',
      'hddddddh',
      'hddddddh',
      '.hddddh.',
      '..hhhh..',
    ],
    colors: { h: '#1a1917', d: '#3a3939', g: '#f5c518' },
  },
  wren: {
    // Beanie with goggles pushed up on the forehead.
    grid: [
      '.bbbbbb.',
      'bbbbbbbb',
      'bllllllb',
      '.ssssss.',
      '.sesses.',
      '.ssssss.',
      '.smmmms.',
      '..ssss..',
    ],
    colors: { b: '#6b5300', l: '#f5c518', s: '#d9a066', e: '#1a1917', m: '#8a5a3b' },
  },
  you: {
    // Grey hoodie, face visible. You are the one doing the typing.
    grid: [
      '.hhhhhh.',
      'hhhhhhhh',
      'hssssssh',
      'hsessesh',
      'hssssssh',
      'hsmmmmsh',
      '.hssssh.',
      '..hhhh..',
    ],
    colors: { h: '#544f46', s: '#d9a066', e: '#1a1917', m: '#8a5a3b' },
  },
}

/** Merges horizontal runs of one colour into a single path command. */
function compile({ grid, colors }) {
  const byChar = {}
  grid.forEach((row, y) => {
    let x = 0
    while (x < row.length) {
      const ch = row[x]
      if (!colors[ch]) {
        x += 1
        continue
      }
      let run = 1
      while (row[x + run] === ch) run += 1
      byChar[ch] = (byChar[ch] || '') + `M${x} ${y}h${run}v1h-${run}z`
      x += run
    }
  })
  // Eyes and mouths are animated, so they stay separate from the flat pixels.
  return Object.entries(byChar).map(([ch, d]) => ({
    d,
    fill: colors[ch],
    part: ch === 'e' || ch === 'g' ? 'eye' : ch === 'm' ? 'mouth' : null,
  }))
}

const PATHS = Object.fromEntries(Object.entries(FACES).map(([k, v]) => [k, compile(v)]))

/**
 * One pixel head. `talking` animates the mouth (or, for a character with no
 * mouth, the eyes); `flip` mirrors it so two heads can face each other.
 */
export function PixelHead({ who, size = 18, talking = false, flip = false, className = '' }) {
  const paths = PATHS[who]
  if (!paths) return null
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 8 8"
      shapeRendering="crispEdges"
      aria-hidden="true"
      focusable="false"
      className={`${talking ? 'ph-talk' : ''} ${className}`}
      style={flip ? { transform: 'scaleX(-1)' } : undefined}
    >
      {paths.map((p) => (
        <path
          key={p.fill}
          d={p.d}
          fill={p.fill}
          className={p.part ? `ph-${p.part}` : undefined}
        />
      ))}
    </svg>
  )
}

/**
 * The three of you, above the chat log. Heads stay front-on — that is how a
 * Minecraft head reads — and whoever is speaking lights up, leans in and gets a
 * bubble. Everyone else dims and waits.
 */
export function CrewScene({ typing, last }) {
  const active = typing || last
  return (
    <div className="flex items-end justify-center gap-6 border-b border-outline-variant bg-surface-container px-3 pb-3 pt-6 sm:gap-8">
      <Figure who="ghost" active={active === 'ghost'} talking={typing === 'ghost'} />
      <Figure who="you" active={active === 'you'} talking={typing === 'you'} />
      <Figure who="wren" active={active === 'wren'} talking={typing === 'wren'} />
    </div>
  )
}

function Figure({ who, active, talking }) {
  return (
    <div
      className={`relative flex flex-col items-center gap-1 transition-opacity ${
        active ? 'opacity-100' : 'opacity-40'
      }`}
    >
      {talking && <Bubble />}
      <span className={talking ? 'ph-bob' : undefined}>
        <PixelHead who={who} size={38} talking={talking} />
      </span>
      <span
        className={`font-mono text-[9px] uppercase tracking-[0.15em] ${
          active ? 'text-primary-container' : 'text-outline'
        }`}
      >
        {who}
      </span>
    </div>
  )
}

/** A blocky speech bubble — square corners, one pixel tail. */
function Bubble() {
  return (
    <span
      aria-hidden="true"
      className="absolute -top-5 left-1/2 flex -translate-x-1/2 items-center gap-[3px] border border-primary-container bg-surface-container px-1.5 py-1"
    >
      {[0, 1, 2].map((n) => (
        <span
          key={n}
          className="ph-dot h-[3px] w-[3px] bg-primary-container"
          style={{ animationDelay: `${n * 0.16}s` }}
        />
      ))}
    </span>
  )
}

export default PixelHead
