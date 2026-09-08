// Wave composition, formations, and the combo multiplier.

export const MAX_ENEMIES_PER_WAVE = 24
export const COMBO_CAP = 8
export const CLEAR_BANNER = 'SHIPPED ✓'
export const PATTERN = { ROW: 0, V: 1, SWEEP: 2 }

export function waveCount(n) {
  return Math.min(MAX_ENEMIES_PER_WAVE, 4 + n * 2)
}

export function waveSpeed(n) {
  return 1 + n * 0.08
}

export function hasSilos(n) {
  return n >= 2
}

export function hasBoss(n) {
  return n > 0 && n % 5 === 0
}

export function comboMultiplier(combo) {
  return Math.min(Math.max(combo, 1), COMBO_CAP)
}

export function scoreFor(base, combo) {
  return base * comboMultiplier(combo)
}

export function waveBanner(n) {
  if (hasBoss(n)) return 'LEGACY SYSTEM ONLINE'
  if (n === 1) return 'BUGS DETECTED'
  return 'DATA SILOS INCOMING'
}

/**
 * Fills `out` (pre-allocated spawn records) with the layout for wave `n`; returns the number used.
 * Records: { type, x, y, delay(ms), pattern, phase }.  W is the logical width.
 */
export function layoutWave(n, out, W) {
  const boss = hasBoss(n)
  let count = boss ? Math.min(6, waveCount(n)) : waveCount(n)
  const silos = hasSilos(n) ? Math.min(4, Math.floor(n / 2)) : 0
  const pattern = n % 3
  let used = 0

  const put = (type, x, y, delay, phase) => {
    if (used >= out.length) return
    const s = out[used++]
    s.type = type
    s.x = x
    s.y = y
    s.delay = delay
    s.pattern = pattern
    s.phase = phase
  }

  if (boss) put('boss', (W - 48) / 2, -30, 600, 0)

  count = Math.min(count, out.length - used)
  for (let i = 0; i < count; i++) {
    const type = i >= count - silos ? 'silo' : 'bug'
    if (pattern === PATTERN.ROW) {
      const cols = 8
      const gap = 36
      const col = i % cols
      const row = Math.floor(i / cols)
      const x = (W - Math.min(cols, count) * gap) / 2 + col * gap + 12
      put(type, x, -14 - row * 22, i * 120, col * 0.6)
    } else if (pattern === PATTERN.V) {
      const side = i % 2 === 0 ? 1 : -1
      const k = Math.ceil(i / 2)
      const x = W / 2 - 6 + side * k * 18
      put(type, x, -14 - k * 10, i * 100, k * 0.4)
    } else {
      // Sine sweep: everyone enters from the left in a conga line.
      put(type, -24 - i * 2, 20 + (i % 3) * 14, i * 260, i * 0.5)
    }
  }
  return used
}
