// Bug Blaster core: fixed-timestep loop, state machine, pooled entities. No DOM access at import time.
import {
  PLAYER, ENEMY, POOL, createPlayer, resetPlayer, makeBullet, makeEnemy, makeParticle, makePickup, makeStar,
  makeSpawn, createPool, spawnBullet, spawnEnemy, spawnParticles, spawnPickup, countActive, clearPool,
} from './entities.js'
import { createRenderer, INITIALS_LAYOUT, LETTERS } from './render.js'
import { createInput } from './input.js'
import { layoutWave, waveSpeed, scoreFor, waveBanner, CLEAR_BANNER, PATTERN } from './waves.js'
import { hit, clamp } from './collision.js'
import { getHighScores, addHighScore, isHighScore } from '../storage/highscores.js'

export const W = 320
export const H = 180
const STEP = 1000 / 60
const MAX_STEPS = 5
const BANNER_MS = 1600
const CLEAR_MS = 1500
const GAMEOVER_MS = 3000

const pad = (n) => String(n).padStart(6, '0')
const now = () => (typeof performance !== 'undefined' ? performance.now() : Date.now())

export function createGame({ canvas, onState, onScore, audio, reducedMotion = false, theme = 'dark', random = Math.random } = {}) {
  let ctx = null
  try {
    ctx = canvas && typeof canvas.getContext === 'function' ? canvas.getContext('2d') : null
  } catch {
    ctx = null
  }
  let renderer = ctx ? createRenderer(ctx, W, H, theme) : null

  const g = {
    state: 'title',
    stateT: 0,
    t: 0,
    score: 0,
    hi: 0,
    wave: 0,
    combo: 0,
    muted: !!(audio && audio.isMuted && audio.isMuted()),
    banner: '',
    bannerT: 0,
    waveT: 0,
    waveActive: false,
    clearT: 0,
    spawnIdx: 0,
    spawnCount: 0,
    shake: 0,
    isHigh: false,
    rank: -1,
    cursor: 0,
    initials: [0, 0, 0],
    scores: [],
    scoreRows: [],
    reducedMotion: !!reducedMotion,
    player: createPlayer(),
    bullets: createPool(POOL.bullets, makeBullet),
    ebullets: createPool(POOL.ebullets, makeBullet),
    enemies: createPool(POOL.enemies, makeEnemy),
    particles: createPool(POOL.particles, makeParticle),
    pickups: createPool(POOL.pickups, makePickup),
    stars: createPool(POOL.stars, makeStar),
    spawns: createPool(POOL.spawns, makeSpawn),
    boss: null,
    texts: { score: 'SCORE 000000', hi: 'HI 000000', wave: 'WAVE 01', combo: 'COMBO x1' },
  }
  const snapshot = { state: 'title', score: 0, hi: 0, wave: 0, lives: PLAYER.lives, combo: 0, muted: g.muted, isHigh: false }

  for (let i = 0; i < g.stars.length; i++) {
    const s = g.stars[i]
    s.x = random() * W
    s.y = random() * H
    s.layer = i % 3
  }
  resetPlayer(g.player, W, H)
  g.player.inv = 0
  {
    const best = getHighScores()
    g.hi = best.length ? best[0].score : 0
    g.texts.hi = 'HI ' + pad(g.hi)
  }

  // ---------- helpers ----------
  function sfx(name) {
    if (!audio || typeof audio[name] !== 'function') return
    try {
      audio[name]()
    } catch {
      /* audio is best-effort */
    }
  }

  function emit() {
    snapshot.state = g.state
    snapshot.score = g.score
    snapshot.hi = g.hi
    snapshot.wave = g.wave
    snapshot.lives = g.player.lives
    snapshot.combo = g.combo
    snapshot.muted = g.muted
    snapshot.isHigh = g.isHigh
    if (typeof onState === 'function') onState(snapshot)
  }

  function setState(s) {
    g.state = s
    g.stateT = 0
    emit()
  }

  function setBanner(str) {
    g.banner = str
    g.bannerT = BANNER_MS
  }

  function setCombo(c) {
    if (c === g.combo) return
    g.combo = c
    g.texts.combo = 'COMBO x' + Math.min(Math.max(c, 1), 8)
  }

  function addScore(n) {
    g.score += n
    g.texts.score = 'SCORE ' + pad(g.score)
    if (g.score > g.hi) {
      g.hi = g.score
      g.texts.hi = 'HI ' + pad(g.hi)
    }
    if (typeof onScore === 'function') onScore(g.score, n)
  }

  function burst(x, y, n, color, speed) {
    spawnParticles(g.particles, x, y, g.reducedMotion ? Math.ceil(n / 3) : n, color, speed, random)
  }

  // ---------- flow ----------
  function startGame() {
    g.score = 0
    g.texts.score = 'SCORE 000000'
    setCombo(0)
    g.wave = 0
    g.boss = null
    g.isHigh = false
    g.rank = -1
    g.shake = 0
    clearPool(g.bullets)
    clearPool(g.ebullets)
    clearPool(g.enemies)
    clearPool(g.particles)
    clearPool(g.pickups)
    resetPlayer(g.player, W, H, false)
    g.state = 'playing'
    g.stateT = 0
    startWave(1)
  }

  function startWave(n) {
    g.wave = n
    g.texts.wave = 'WAVE ' + String(n).padStart(2, '0')
    g.spawnCount = layoutWave(n, g.spawns, W)
    g.spawnIdx = 0
    g.waveT = 0
    g.waveActive = true
    g.boss = null
    setBanner(waveBanner(n))
    emit()
  }

  function gameOver() {
    g.isHigh = isHighScore(g.score)
    sfx('gameOver')
    setState('gameover')
  }

  function afterGameOver() {
    if (g.isHigh) {
      g.cursor = 0
      g.initials[0] = g.initials[1] = g.initials[2] = 0
      setState('initials')
    } else showLeaderboard()
  }

  function showLeaderboard() {
    g.scores = getHighScores()
    g.scoreRows = g.scores.map(
      (e, i) => String(i + 1).padStart(2, ' ') + '. ' + e.initials + '  ' + pad(e.score) + '  W' + String(e.wave).padStart(2, '0'),
    )
    setState('leaderboard')
  }

  function confirmInitials() {
    const initials = LETTERS[g.initials[0]] + LETTERS[g.initials[1]] + LETTERS[g.initials[2]]
    const list = addHighScore({ initials, score: g.score, wave: g.wave })
    g.rank = list.findIndex((e) => e.initials === initials && e.score === g.score)
    showLeaderboard()
  }

  function toggleMute() {
    g.muted = !g.muted
    if (audio && typeof audio.setMuted === 'function') audio.setMuted(g.muted)
    emit()
  }

  function pause() {
    if (g.state !== 'playing') return
    setState('paused')
    render()
    stopLoop()
  }

  function resume() {
    if (g.state !== 'paused') return
    setState('playing')
    startLoop()
  }

  // ---------- discrete input ----------
  function handle(type, a, b) {
    if (audio && typeof audio.unlock === 'function') audio.unlock()
    if (type === 'mute' && g.state !== 'initials') return toggleMute()
    switch (g.state) {
      case 'title':
        if (type === 'start' || type === 'tap') startGame()
        break
      case 'playing':
        if (type === 'pause') pause()
        break
      case 'paused':
        if (type === 'pause' || type === 'start' || type === 'tap') resume()
        break
      case 'gameover':
        if ((type === 'start' || type === 'tap') && g.stateT > 600) afterGameOver()
        break
      case 'initials':
        initialsInput(type, a, b)
        break
      case 'leaderboard':
        if ((type === 'start' || type === 'tap') && g.stateT > 400) setState('title')
        break
      default:
    }
    return undefined
  }

  function initialsInput(type, a, b) {
    const L = INITIALS_LAYOUT
    switch (type) {
      case 'left':
      case 'back':
        g.cursor = Math.max(0, g.cursor - 1)
        break
      case 'right':
        g.cursor = Math.min(2, g.cursor + 1)
        break
      case 'up':
        g.initials[g.cursor] = (g.initials[g.cursor] + 1) % 26
        break
      case 'down':
        g.initials[g.cursor] = (g.initials[g.cursor] + 25) % 26
        break
      case 'char': {
        const idx = LETTERS.indexOf(a)
        if (idx >= 0) {
          g.initials[g.cursor] = idx
          g.cursor = Math.min(2, g.cursor + 1)
        }
        break
      }
      case 'start':
        confirmInitials()
        break
      case 'tap': {
        if (a >= L.okX && a <= L.okX + L.okW && b >= L.okY && b <= L.okY + L.okH) return confirmInitials()
        for (let i = 0; i < 3; i++) {
          const x = L.xs[i]
          if (a >= x - 2 && a <= x + L.w + 2 && b >= L.y - 12 && b <= L.y + L.h + 12) {
            g.cursor = i
            const delta = b < L.y + L.h / 2 ? 1 : 25
            g.initials[i] = (g.initials[i] + delta) % 26
          }
        }
        break
      }
      default:
    }
    return undefined
  }

  const input = createInput({ canvas, W, H, onEvent: handle })

  // ---------- update ----------
  function updateStars(dt) {
    const f = g.reducedMotion ? 0.15 : 1
    for (let i = 0; i < g.stars.length; i++) {
      const s = g.stars[i]
      s.y += (s.layer + 1) * 14 * dt * f
      if (s.y >= H) {
        s.y -= H
        s.x = random() * W
      }
    }
  }

  function updateParticles(ms, dt) {
    const pa = g.particles
    for (let i = 0; i < pa.length; i++) {
      const p = pa[i]
      if (!p.active) continue
      p.life -= ms
      if (p.life <= 0) {
        p.active = false
        continue
      }
      p.x += p.vx * dt
      p.y += p.vy * dt
      p.vy += 40 * dt
    }
  }

  function updatePlayer(ms, dt) {
    const p = g.player
    if (p.dead > 0) {
      p.dead -= ms
      if (p.dead <= 0) {
        if (p.lives <= 0) gameOver()
        else {
          resetPlayer(p, W, H, true)
          clearPool(g.ebullets)
        }
      }
      return
    }
    if (p.inv > 0) p.inv -= ms
    if (p.fireCd > 0) p.fireCd -= ms
    const st = input.state
    const tc = input.touch
    let dir = 0
    if (st.left || tc.left) dir -= 1
    if (st.right || tc.right) dir += 1
    if (dir !== 0) p.x += dir * PLAYER.speed * dt
    else if (st.pointerX >= 0) p.x += (st.pointerX - p.w / 2 - p.x) * Math.min(1, dt * 16)
    p.x = clamp(p.x, 0, W - p.w)
    if ((st.fire || tc.fire) && p.fireCd <= 0) {
      if (spawnBullet(g.bullets, p.x + p.w / 2 - 1, p.y - 6, 0, -260, 1, 6)) {
        p.fireCd = PLAYER.fireRate
        sfx('shoot')
      }
    }
  }

  function updateBullets(dt) {
    const bl = g.bullets
    for (let i = 0; i < bl.length; i++) {
      const b = bl[i]
      if (!b.active) continue
      b.y += b.vy * dt
      if (b.y + b.h < 0) {
        b.active = false
        setCombo(0) // a shot that leaves the screen breaks the combo
      }
    }
    const eb = g.ebullets
    for (let i = 0; i < eb.length; i++) {
      const b = eb[i]
      if (!b.active) continue
      b.x += b.vx * dt
      b.y += b.vy * dt
      if (b.y > H || b.x < -4 || b.x > W + 4) b.active = false
    }
  }

  function updateEnemies(ms, dt) {
    const en = g.enemies
    for (let i = 0; i < en.length; i++) {
      const e = en[i]
      if (!e.active) continue
      e.t += dt
      if (e.flash > 0) e.flash -= ms
      if (e.type === 'boss') {
        if (e.y < 34) e.y += 24 * dt
        else {
          e.entered = true
          e.x = (W - e.w) / 2 + Math.sin(e.t * 0.7) * (W / 2 - e.w / 2 - 8)
        }
        e.spawnCd -= ms
        if (e.spawnCd <= 0) {
          e.spawnCd = 2200
          if (countActive(en) < 12) spawnEnemy(en, 'bug', e.x + e.w / 2 - 6, e.y + e.h, e.speed, PATTERN.ROW, random() * 6)
        }
        e.fireCd -= ms
        if (e.fireCd <= 0 && e.entered) {
          e.fireCd = 1600
          for (let k = -1; k <= 1; k++) spawnBullet(g.ebullets, e.x + e.w / 2 - 1, e.y + e.h, k * 36, 80, 3, 3)
        }
        continue
      }
      if (e.type === 'silo') {
        e.y += 9 * e.speed * dt
        e.x = e.baseX + Math.sin(e.t * 0.8 + e.phase) * 12
      } else if (e.pattern === PATTERN.SWEEP) {
        e.baseX += 46 * e.speed * dt
        if (e.baseX > W + 12) {
          e.baseX = -24
          e.y += 16
        }
        e.x = e.baseX
        e.y += (6 + Math.sin(e.t * 3 + e.phase) * 30) * dt * e.speed
      } else {
        e.y += 20 * e.speed * dt
        e.x = e.baseX + Math.sin(e.t * 2.5 + e.phase) * 26
      }
      if (e.y > H + 12) e.y = -e.h - 4
      if (e.type !== 'bug' || e.pattern !== PATTERN.SWEEP) e.x = clamp(e.x, 0, W - e.w)
    }
  }

  function updatePickups(dt) {
    const pk = g.pickups
    for (let i = 0; i < pk.length; i++) {
      const k = pk[i]
      if (!k.active) continue
      k.t += dt
      k.y += k.vy * dt
      if (k.y > H) k.active = false
    }
  }

  function damage(e, x, y) {
    e.hp -= 1
    e.flash = 80
    setCombo(g.combo + 1)
    if (e.hp <= 0) kill(e, true)
    else {
      sfx('hit')
      burst(x, y, 4, '#ffe5a0', 60)
    }
  }

  function kill(e, byPlayer) {
    e.active = false
    const cx = e.x + e.w / 2
    const cy = e.y + e.h / 2
    if (e.type === 'boss') {
      g.boss = null
      g.shake = 400
      burst(cx, cy, 40, '#ff5c5c', 120)
      burst(cx, cy, 20, '#f5c518', 80)
    } else burst(cx, cy, e.type === 'silo' ? 16 : 10, e.type === 'silo' ? '#d1c5ac' : '#f5c518', 70)
    if (!byPlayer) return
    addScore(scoreFor(e.pts, g.combo))
    sfx('explode')
    if (e.type === 'silo' && random() < ENEMY.silo.dropChance) spawnPickup(g.pickups, cx - 5, cy)
  }

  function playerHit() {
    const p = g.player
    if (p.shield) {
      p.shield = false
      p.inv = 800
      sfx('hit')
      burst(p.x + p.w / 2, p.y + p.h / 2, 8, '#ffe5a0', 90)
      return
    }
    p.lives -= 1
    p.dead = PLAYER.deadMs
    g.shake = 250
    setCombo(0)
    sfx('explode')
    burst(p.x + p.w / 2, p.y + p.h / 2, 24, '#f5c518', 110)
    emit()
  }

  function collide() {
    const bl = g.bullets
    const en = g.enemies
    let i
    let j
    for (i = 0; i < bl.length; i++) {
      const b = bl[i]
      if (!b.active) continue
      for (j = 0; j < en.length; j++) {
        const e = en[j]
        if (!e.active || e.y + e.h < 0) continue
        if (hit(b, e)) {
          b.active = false
          damage(e, b.x, b.y)
          break
        }
      }
    }
    const p = g.player
    if (p.dead > 0) return
    const pk = g.pickups
    for (i = 0; i < pk.length; i++) {
      if (pk[i].active && hit(pk[i], p)) {
        pk[i].active = false
        p.shield = true
        sfx('pickup')
      }
    }
    if (p.inv > 0) return
    for (j = 0; j < en.length; j++) {
      const e = en[j]
      if (e.active && hit(e, p)) {
        if (e.type !== 'boss') kill(e, false)
        playerHit()
        return
      }
    }
    const eb = g.ebullets
    for (i = 0; i < eb.length; i++) {
      if (eb[i].active && hit(eb[i], p)) {
        eb[i].active = false
        playerHit()
        return
      }
    }
  }

  function updatePlaying(ms, dt) {
    g.waveT += ms
    while (g.spawnIdx < g.spawnCount && g.spawns[g.spawnIdx].delay <= g.waveT) {
      const s = g.spawns[g.spawnIdx++]
      const e = spawnEnemy(g.enemies, s.type, s.x, s.y, waveSpeed(g.wave), s.pattern, s.phase)
      if (e && s.type === 'boss') g.boss = e
    }
    updatePlayer(ms, dt)
    if (g.state !== 'playing') return
    updateBullets(dt)
    updateEnemies(ms, dt)
    updatePickups(dt)
    collide()
    if (g.waveActive && g.spawnIdx >= g.spawnCount && countActive(g.enemies) === 0) {
      g.waveActive = false
      g.clearT = CLEAR_MS
      setBanner(CLEAR_BANNER)
      sfx('waveClear')
    } else if (!g.waveActive) {
      g.clearT -= ms
      if (g.clearT <= 0) startWave(g.wave + 1)
    }
  }

  function update(ms) {
    const dt = ms / 1000
    g.t += ms
    g.stateT += ms
    if (g.bannerT > 0) g.bannerT -= ms
    if (g.shake > 0) g.shake -= ms
    updateStars(dt)
    updateParticles(ms, dt)
    if (g.state === 'playing') updatePlaying(ms, dt)
    else if (g.state === 'gameover' && g.stateT >= GAMEOVER_MS) afterGameOver()
  }

  // ---------- sizing / rendering ----------
  let k = 1
  function resize() {
    if (!canvas || typeof window === 'undefined') return
    const parent = canvas.parentElement
    const cw = parent ? parent.clientWidth : W * 2
    const ch = parent ? parent.clientHeight : H * 2
    const s = Math.min(cw / W, ch / H) || 1
    const dpr = window.devicePixelRatio || 1
    k = Math.max(1, Math.min(6, Math.round(s * dpr)))
    canvas.width = W * k
    canvas.height = H * k
    canvas.style.width = Math.floor(W * s) + 'px'
    canvas.style.height = Math.floor(H * s) + 'px'
    if (ctx) ctx.imageSmoothingEnabled = false
    if (!running) render()
  }

  function render() {
    if (renderer) renderer.render(g, k)
  }

  // ---------- loop ----------
  let running = false
  let raf = 0
  let last = 0
  let acc = 0
  function frame(t) {
    if (!running) return
    raf = requestAnimationFrame(frame)
    let delta = t - last
    last = t
    if (delta > STEP * MAX_STEPS) delta = STEP * MAX_STEPS
    acc += delta
    while (acc >= STEP) {
      update(STEP)
      acc -= STEP
    }
    render()
  }

  function startLoop() {
    if (running || typeof requestAnimationFrame === 'undefined') return
    running = true
    last = now()
    acc = 0
    raf = requestAnimationFrame(frame)
  }

  function stopLoop() {
    running = false
    if (raf && typeof cancelAnimationFrame !== 'undefined') cancelAnimationFrame(raf)
    raf = 0
  }

  let ro = null
  if (typeof window !== 'undefined' && canvas) {
    if (typeof ResizeObserver !== 'undefined' && canvas.parentElement) {
      ro = new ResizeObserver(resize)
      ro.observe(canvas.parentElement)
    } else window.addEventListener('resize', resize)
    resize()
  }

  return {
    /** Boots the loop on the title screen (idempotent). */
    start() {
      startLoop()
    },
    /** Starts a new game immediately (used by the START / PLAY AGAIN buttons). */
    play() {
      if (g.state === 'playing') return
      if (audio && typeof audio.unlock === 'function') audio.unlock()
      startGame()
      startLoop()
    },
    pause,
    resume,
    stop: stopLoop,
    destroy() {
      stopLoop()
      input.destroy()
      if (ro) ro.disconnect()
      else if (typeof window !== 'undefined') window.removeEventListener('resize', resize)
    },
    getState: () => {
      emit()
      return snapshot
    },
    toggleMute,
    setTouch: input.setTouch,
    input,
    /** Advances the simulation by `ms` without rAF (tests / debugging). */
    step(ms = STEP) {
      update(ms)
      render()
    },
    /** Jumps to wave n mid-game (debug). */
    setWave(n) {
      clearPool(g.enemies)
      clearPool(g.ebullets)
      startWave(n)
    },
    /** Raw access for tests. */
    _g: g,
  }
}
