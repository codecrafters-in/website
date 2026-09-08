// Headless smoke test: node src/arcade/game/__smoke__.mjs
import assert from 'node:assert/strict'
import { createGame, W, H } from './engine.js'
import { layoutWave, waveCount, waveSpeed, hasBoss, scoreFor } from './waves.js'
import { hit } from './collision.js'
import { createPool, makeSpawn, ENEMY } from './entities.js'

// No-op 2D context + canvas stub.
const noop = () => {}
const ctx = new Proxy({}, { get: (_, key) => (key === 'canvas' ? canvas : noop) })
const canvas = { width: W, height: H, style: {}, parentElement: null, getContext: () => ctx }

let seed = 42
const random = () => {
  seed = (seed * 1664525 + 1013904223) >>> 0
  return seed / 4294967296
}

const audioCalls = {}
const audio = new Proxy({ isMuted: () => true }, { get: (t, k) => t[k] || (() => (audioCalls[k] = (audioCalls[k] || 0) + 1)) })

const states = []
const game = createGame({ canvas, random, audio, onState: (s) => states.push(s.state + ':' + s.wave) })
const g = game._g

// --- unit checks ---------------------------------------------------------
assert.equal(waveCount(1), 6)
assert.equal(waveCount(20), 24)
assert.ok(Math.abs(waveSpeed(5) - 1.4) < 1e-9)
assert.equal(hasBoss(5), true)
assert.equal(hasBoss(4), false)
assert.equal(scoreFor(100, 12), 800)
assert.equal(scoreFor(100, 0), 100)
assert.ok(hit({ x: 0, y: 0, w: 4, h: 4 }, { x: 3, y: 3, w: 4, h: 4 }))
assert.ok(!hit({ x: 0, y: 0, w: 4, h: 4 }, { x: 4, y: 0, w: 4, h: 4 }))
const spawns = createPool(32, makeSpawn)
assert.equal(layoutWave(1, spawns, W), 6)
assert.equal(layoutWave(5, spawns, W), 7)
assert.equal(spawns[0].type, 'boss')

// --- title → playing -----------------------------------------------------
assert.equal(game.getState().state, 'title')
game.play()
assert.equal(g.state, 'playing')
assert.equal(g.wave, 1)

// Simple auto-pilot: chase the nearest active enemy on x, hold fire.
function autopilot() {
  let best = null
  for (const e of g.enemies) if (e.active && e.y > 0 && (!best || e.y > best.y)) best = e
  const p = g.player
  const tx = best ? best.x + best.w / 2 : W / 2
  game.input.state.left = tx < p.x + p.w / 2 - 3
  game.input.state.right = tx > p.x + p.w / 2 + 3
  game.input.state.fire = true
  p.inv = 5000 // keep the pilot alive: we are testing mechanics, not skill
}

const wavesSeen = new Set()
let scoreBefore = 0
let sawIncrease = false
for (let i = 0; i < 600; i++) {
  autopilot()
  game.step()
  wavesSeen.add(g.wave)
  if (g.score > scoreBefore) sawIncrease = true
  scoreBefore = g.score
}
console.log('after 600 ticks: wave', g.wave, 'score', g.score, 'combo', g.combo, 'lives', g.player.lives)
assert.ok(sawIncrease, 'score should increase when bullets hit')
assert.ok(g.score > 0)
assert.ok(audioCalls.shoot > 0 && audioCalls.explode > 0, 'audio hooks fired')

// Force waves 2 and 3 and run 600 more ticks each.
for (const n of [2, 3]) {
  game.setWave(n)
  assert.equal(g.wave, n)
  const before = g.score
  for (let i = 0; i < 600; i++) {
    autopilot()
    game.step()
  }
  wavesSeen.add(n)
  console.log('wave', n, 'run: score', before, '->', g.score)
  assert.ok(g.score > before, 'score increases in wave ' + n)
}
const siloSeen = spawns.some((s) => s.type === 'silo') || layoutWave(3, spawns, W) && spawns.some((s) => s.type === 'silo')
assert.ok(siloSeen, 'silos appear from wave 2')

// Boss at wave 5 when forced.
game.setWave(5)
game.input.state.fire = false
for (let i = 0; i < 120; i++) game.step()
assert.ok(g.boss && g.boss.active, 'boss present at wave 5')
assert.equal(g.boss.type, 'boss')
assert.equal(g.boss.maxHp, ENEMY.boss.hp)
for (let i = 0; i < 300; i++) game.step()
assert.ok(g.ebullets.some((b) => b.active) || g.enemies.filter((e) => e.active).length > 1, 'boss shoots or spawns bugs')
console.log('wave 5: boss hp', g.boss.hp, 'enemies', g.enemies.filter((e) => e.active).length, 'boss bullets', g.ebullets.filter((b) => b.active).length)

// Pause / resume / game over flow.
game.pause()
assert.equal(g.state, 'paused')
game.resume()
assert.equal(g.state, 'playing')
g.player.inv = 0
g.player.lives = 1
g.player.dead = 0
game.input.reset()
// Slam the player into the boss.
g.player.x = g.boss.x
g.player.y = g.boss.y
game.step()
for (let i = 0; i < 200; i++) game.step()
assert.equal(g.state, 'gameover', 'reaches gameover after last life')
for (let i = 0; i < 400; i++) game.step()
assert.ok(g.state === 'initials' || g.state === 'leaderboard', 'advances past gameover, got ' + g.state)
console.log('flow:', [...new Set(states.map((s) => s.split(':')[0]))].join(' → '), '| waves seen:', [...wavesSeen].join(','))

game.destroy()
console.log('SMOKE OK')
