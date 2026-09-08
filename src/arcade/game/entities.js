// Entity factories and fixed-size pools. Nothing here allocates after pool creation.

export const PLAYER = { w: 24, h: 14, lives: 3, speed: 170, fireRate: 140, invMs: 2000, deadMs: 1200 }

export const ENEMY = {
  bug: { hp: 1, pts: 100, w: 12, h: 10, name: 'BUG' },
  silo: { hp: 3, pts: 300, w: 20, h: 16, name: 'DATA SILO', dropChance: 0.3 },
  boss: { hp: 20, pts: 2000, w: 48, h: 24, name: 'LEGACY_SYS v1.0' },
}

export const POOL = { bullets: 24, ebullets: 24, enemies: 32, particles: 96, pickups: 4, stars: 48, spawns: 32 }

export function createPlayer() {
  return { x: 0, y: 0, w: PLAYER.w, h: PLAYER.h, targetX: -1, fireCd: 0, inv: 0, dead: 0, shield: false, lives: PLAYER.lives }
}

export function resetPlayer(p, W, H, keepLives) {
  p.x = (W - p.w) / 2
  p.y = H - p.h - 8
  p.targetX = -1
  p.fireCd = 0
  p.inv = PLAYER.invMs
  p.dead = 0
  p.shield = false
  if (!keepLives) p.lives = PLAYER.lives
}

export function makeBullet() {
  return { active: false, x: 0, y: 0, w: 1, h: 6, vx: 0, vy: 0 }
}

export function makeEnemy() {
  return {
    active: false,
    type: 'bug',
    x: 0,
    y: 0,
    w: 12,
    h: 10,
    baseX: 0,
    hp: 1,
    maxHp: 1,
    pts: 100,
    speed: 1,
    pattern: 0,
    phase: 0,
    t: 0,
    flash: 0,
    spawnCd: 0,
    fireCd: 0,
    entered: false,
  }
}

export function makeParticle() {
  return { active: false, x: 0, y: 0, vx: 0, vy: 0, life: 0, max: 0, color: '#f5c518', size: 1 }
}

export function makePickup() {
  return { active: false, x: 0, y: 0, w: 10, h: 8, vy: 30, t: 0 }
}

export function makeStar() {
  return { x: 0, y: 0, layer: 0 }
}

export function makeSpawn() {
  return { type: 'bug', x: 0, y: 0, delay: 0, pattern: 0, phase: 0 }
}

export function createPool(n, factory) {
  const arr = new Array(n)
  for (let i = 0; i < n; i++) arr[i] = factory()
  return arr
}

export function acquire(pool) {
  for (let i = 0; i < pool.length; i++) if (!pool[i].active) return pool[i]
  return null
}

export function countActive(pool) {
  let n = 0
  for (let i = 0; i < pool.length; i++) if (pool[i].active) n++
  return n
}

export function clearPool(pool) {
  for (let i = 0; i < pool.length; i++) pool[i].active = false
}

export function spawnBullet(pool, x, y, vx, vy, w, h) {
  const b = acquire(pool)
  if (!b) return null
  b.active = true
  b.x = x
  b.y = y
  b.vx = vx
  b.vy = vy
  b.w = w
  b.h = h
  return b
}

export function spawnEnemy(pool, type, x, y, speed, pattern, phase) {
  const e = acquire(pool)
  if (!e) return null
  const def = ENEMY[type] || ENEMY.bug
  e.active = true
  e.type = type
  e.x = x
  e.baseX = x
  e.y = y
  e.w = def.w
  e.h = def.h
  e.hp = def.hp
  e.maxHp = def.hp
  e.pts = def.pts
  e.speed = speed
  e.pattern = pattern
  e.phase = phase
  e.t = 0
  e.flash = 0
  e.spawnCd = 2200
  e.fireCd = 1600
  e.entered = false
  return e
}

/** Spawns up to `n` particles in a burst. `rand` is injectable for deterministic tests. */
export function spawnParticles(pool, x, y, n, color, speed, rand = Math.random) {
  for (let i = 0; i < n; i++) {
    const p = acquire(pool)
    if (!p) return
    const a = rand() * Math.PI * 2
    const v = speed * (0.4 + rand() * 0.8)
    p.active = true
    p.x = x
    p.y = y
    p.vx = Math.cos(a) * v
    p.vy = Math.sin(a) * v
    p.max = 300 + rand() * 300
    p.life = p.max
    p.color = color
    p.size = rand() < 0.3 ? 2 : 1
  }
}

export function spawnPickup(pool, x, y) {
  const k = acquire(pool)
  if (!k) return null
  k.active = true
  k.x = x
  k.y = y
  k.t = 0
  return k
}
