// Pixel-map strings → cached offscreen canvases. Guarded so the module can be imported in Node.

// Two palettes, same keys. On light the amber stays (it reads fine as a fill)
// but every near-white becomes ink, or the sprites vanish against the page.
export const PALETTES = {
  dark: {
    '#': '#f5c518', // molten yellow
    o: '#ffe5a0', // pale yellow
    '=': '#d1c5ac', // warm grey
    '-': '#4e4633', // outline
    w: '#e5e2e1', // near white
    r: '#ff5c5c', // boss red
  },
  light: {
    '#': '#c98f00', // amber, darkened so it holds on off-white
    o: '#e0af00', // pale amber
    '=': '#6b6357', // warm grey, inverted
    '-': '#3c352a', // outline
    w: '#1a1917', // ink, replaces near-white
    r: '#c62828', // boss red, darkened
  },
}

export const PALETTE = PALETTES.dark

const SHIP = [
  '.....##.....',
  '.....oo.....',
  '....#oo#....',
  '....####....',
  '.#.######.#.',
  '.###o##o###.',
  '##=-....-=##',
]

const BUG_A = [
  '..=......=..',
  '...=....=...',
  '..========..',
  '.==.====.==.',
  '.==r====r==.',
  '============',
  '=.========.=',
  '=.=......=.=',
  '...==..==...',
  '..=......=..',
]

const BUG_B = [
  '..=......=..',
  '..=......=..',
  '..========..',
  '.==.====.==.',
  '.==r====r==.',
  '============',
  '=.========.=',
  '=.=......=.=',
  '..==....==..',
  '.=........=.',
]

const SILO = [
  '....############....',
  '..##------------##..',
  '.##==============##.',
  '.##================.',
  '.##------------##-#.',
  '.##==============##.',
  '.##================.',
  '.##------------##-#.',
  '.##==============##.',
  '.##================.',
  '.##------------##-#.',
  '.##==============##.',
  '.##==============##.',
  '..##------------##..',
  '....############....',
  '...-#..-#..-#..-#...',
]

const BOSS = [
  '......------------......',
  '....----========----....',
  '...--====r====r====--...',
  '..--=====rr==rr=====--..',
  '..--=======--=======--..',
  '.--========--========--.',
  '.--===r==========r===--.',
  '.--====rrrrrrrrrr====--.',
  '..--=====------=====--..',
  '...--===-=-=-=-=-===--..',
  '.....-==-=-=-=-=-==-....',
  '.......--.-.-.-.--......',
]

const BULLET = ['o', '#', '#', '#', '#', '-']
const EBULLET = ['.r.', 'rrr', '.r.']
const SHIELD = [
  '...oooo...',
  '..o....o..',
  '.o..##..o.',
  'o..####..o',
  'o..####..o',
  '.o..##..o.',
  '..o....o..',
  '...oooo...',
]

function build(rows, scale, pal = PALETTES.dark) {
  const h = rows.length
  const w = rows[0].length
  const sprite = { w: w * scale, h: h * scale, canvas: null, color: pal['#'] }
  if (typeof document === 'undefined') return sprite
  try {
    const c = document.createElement('canvas')
    c.width = sprite.w
    c.height = sprite.h
    const ctx = c.getContext('2d')
    if (!ctx) return sprite
    for (let y = 0; y < h; y++) {
      const row = rows[y]
      for (let x = 0; x < w; x++) {
        const col = PALETTE[row[x]]
        if (!col) continue
        ctx.fillStyle = col
        ctx.fillRect(x * scale, y * scale, scale, scale)
      }
    }
    sprite.canvas = c
  } catch {
    sprite.canvas = null
  }
  return sprite
}

// Cached per theme — sprite canvases bake their colours in, so a shared cache
// would hand back dark sprites after a switch to light.
const caches = {}

/** Returns the cached sprite set. Canvases are null in non-DOM environments (render falls back to rects). */
export function createSprites(theme = 'dark') {
  if (caches[theme]) return caches[theme]
  const pal = PALETTES[theme] || PALETTES.dark
  const cache = {
    ship: build(SHIP, 2, pal),
    bug: [build(BUG_A, 1, pal), build(BUG_B, 1, pal)],
    silo: build(SILO, 1, pal),
    boss: build(BOSS, 2, pal),
    bullet: build(BULLET, 1, pal),
    ebullet: build(EBULLET, 1, pal),
    shield: build(SHIELD, 1, pal),
  }
  cache.bug[0].color = cache.bug[1].color = pal['=']
  cache.boss.color = pal.r
  cache.ebullet.color = pal.r
  cache.shield.color = pal.o
  return cache
}
