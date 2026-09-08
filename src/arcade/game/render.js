import { createSprites } from './sprites.js'

const STACK = '"Press Start 2P","DM Mono",ui-monospace,monospace'
const F8 = '8px ' + STACK
const F16 = '16px ' + STACK
// Two schemes. On light the amber darkens so it holds against the page, and
// every near-white flips to ink — otherwise the HUD disappears.
const SCHEMES = {
  dark: {
    YEL: '#f5c518', PALE: '#ffe5a0', TXT: '#e5e2e1', DIM: '#d1c5ac',
    OUT: '#4e4633', RED: '#ff5c5c', BG: '#0e0e0e',
    STARS: ['#2f2b20', '#4e4633', '#8a7a52'],
  },
  light: {
    YEL: '#c98f00', PALE: '#e0af00', TXT: '#1a1917', DIM: '#6b6357',
    OUT: '#ded8c9', RED: '#c62828', BG: '#f7f5f1',
    STARS: ['#e4dfd2', '#cfc7b6', '#b3a98f'],
  },
}

export const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
// Shared with the engine for pointer hit-testing on the initials screen.
export const INITIALS_LAYOUT = { xs: [126, 150, 174], y: 66, w: 20, h: 30, okX: 124, okY: 116, okW: 72, okH: 16 }

export function createRenderer(ctx, W, H, theme = 'dark') {
  const S = SCHEMES[theme] || SCHEMES.dark
  const { YEL, PALE, TXT, DIM, OUT, RED, BG } = S
  const STAR_COLORS = S.STARS
  const sprites = createSprites(theme)

  function text(str, x, y, font, color, align) {
    ctx.font = font
    ctx.fillStyle = color
    ctx.textAlign = align || 'left'
    ctx.textBaseline = 'top'
    ctx.fillText(str, x, y)
  }

  function title(str, y, color) {
    text(str, W / 2 + 2, y + 2, F16, OUT, 'center')
    text(str, W / 2, y, F16, color, 'center')
  }

  function blit(s, x, y) {
    if (s.canvas) ctx.drawImage(s.canvas, x | 0, y | 0)
    else {
      ctx.fillStyle = s.color
      ctx.fillRect(x | 0, y | 0, s.w, s.h)
    }
  }

  function blink(g, period) {
    return g.reducedMotion || Math.floor(g.t / period) % 2 === 0
  }

  function stars(g) {
    const list = g.stars
    for (let i = 0; i < list.length; i++) {
      const s = list[i]
      ctx.fillStyle = STAR_COLORS[s.layer]
      ctx.fillRect(s.x | 0, s.y | 0, 1, 1)
    }
  }

  function world(g) {
    const bugFrame = g.reducedMotion ? 0 : Math.floor(g.t / 180) % 2
    let i
    const pk = g.pickups
    for (i = 0; i < pk.length; i++) if (pk[i].active) blit(sprites.shield, pk[i].x, pk[i].y)

    const en = g.enemies
    for (i = 0; i < en.length; i++) {
      const e = en[i]
      if (!e.active) continue
      const s = e.type === 'bug' ? sprites.bug[bugFrame] : e.type === 'silo' ? sprites.silo : sprites.boss
      blit(s, e.x, e.y)
      if (e.flash > 0) {
        ctx.fillStyle = 'rgba(255,229,160,0.7)'
        ctx.fillRect(e.x | 0, e.y | 0, e.w, e.h)
      }
    }

    const eb = g.ebullets
    for (i = 0; i < eb.length; i++) if (eb[i].active) blit(sprites.ebullet, eb[i].x, eb[i].y)
    const bl = g.bullets
    for (i = 0; i < bl.length; i++) if (bl[i].active) blit(sprites.bullet, bl[i].x, bl[i].y)

    const p = g.player
    if (p.dead <= 0) {
      const visible = p.inv <= 0 || Math.floor(g.t / (g.reducedMotion ? 250 : 80)) % 2 === 0
      if (visible) blit(sprites.ship, p.x, p.y)
      if (p.shield) {
        ctx.strokeStyle = PALE
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.arc(p.x + p.w / 2, p.y + p.h / 2, p.w / 2 + 4, 0, Math.PI * 2)
        ctx.stroke()
      }
    }

    const pa = g.particles
    for (i = 0; i < pa.length; i++) {
      const q = pa[i]
      if (!q.active) continue
      ctx.globalAlpha = q.life / q.max
      ctx.fillStyle = q.color
      ctx.fillRect(q.x | 0, q.y | 0, q.size, q.size)
    }
    ctx.globalAlpha = 1
  }

  function hud(g) {
    const t = g.texts
    text(t.score, 4, 3, F8, TXT)
    text(t.hi, W / 2, 3, F8, DIM, 'center')
    text(t.wave, W - 4, 3, F8, TXT, 'right')
    // Lives as mini ships.
    const s = sprites.ship
    for (let i = 0; i < g.player.lives; i++) {
      if (s.canvas) ctx.drawImage(s.canvas, 4 + i * 14, 14, 12, 7)
      else {
        ctx.fillStyle = YEL
        ctx.fillRect(4 + i * 14, 14, 12, 7)
      }
    }
    text(g.muted ? 'SND OFF' : 'SND ON', W / 2, 14, F8, OUT, 'center')
    if (g.combo > 1) text(t.combo, W - 4, 14, F8, YEL, 'right')
    const b = g.boss
    if (b && b.active) {
      ctx.fillStyle = OUT
      ctx.fillRect(100, 26, 120, 4)
      ctx.fillStyle = RED
      ctx.fillRect(100, 26, Math.max(0, (120 * b.hp) / b.maxHp) | 0, 4)
    }
    if (g.bannerT > 0) text(g.banner, W / 2, 60, F8, YEL, 'center')
  }

  function dim() {
    ctx.fillStyle = 'rgba(14,14,14,0.72)'
    ctx.fillRect(0, 0, W, H)
  }

  function titleScreen(g) {
    blit(sprites.bug[g.reducedMotion ? 0 : Math.floor(g.t / 250) % 2], 60, 40)
    blit(sprites.silo, 240, 34)
    blit(sprites.ship, W / 2 - 12, 150)
    title('BUG BLASTER', 40, YEL)
    text('CODECRAFTERS ARCADE', W / 2, 66, F8, DIM, 'center')
    if (blink(g, 500)) text('PRESS START / TAP TO PLAY', W / 2, 96, F8, TXT, 'center')
    text(g.texts.hi, W / 2, 116, F8, DIM, 'center')
    text('ARROWS MOVE  SPACE FIRE', W / 2, 134, F8, OUT, 'center')
  }

  function pausedScreen(g) {
    dim()
    title('PAUSED', 64, PALE)
    if (blink(g, 700)) text('P TO RESUME', W / 2, 96, F8, TXT, 'center')
  }

  function gameOverScreen(g) {
    dim()
    title('GAME OVER', 52, RED)
    text(g.texts.score, W / 2, 86, F8, TXT, 'center')
    if (g.isHigh) {
      text('NEW HIGH SCORE!', W / 2, 104, F8, PALE, 'center')
      if (blink(g, 500)) text('ENTER INITIALS', W / 2, 122, F8, YEL, 'center')
    } else if (blink(g, 500)) text('PRESS START', W / 2, 114, F8, YEL, 'center')
  }

  function triangle(x, y, up, color) {
    ctx.fillStyle = color
    for (let i = 0; i < 3; i++) {
      const w = i * 2 + 1
      ctx.fillRect(x - i, up ? y + i : y - i, w, 1)
    }
  }

  function initialsScreen(g) {
    const L = INITIALS_LAYOUT
    text('ENTER INITIALS', W / 2, 26, F8, PALE, 'center')
    text(g.texts.score, W / 2, 42, F8, DIM, 'center')
    for (let i = 0; i < 3; i++) {
      const x = L.xs[i]
      const cur = i === g.cursor
      ctx.strokeStyle = cur ? YEL : OUT
      ctx.lineWidth = 1
      ctx.strokeRect(x + 0.5, L.y + 0.5, L.w - 1, L.h - 1)
      text(LETTERS[g.initials[i]], x + L.w / 2, L.y + 7, F16, cur ? YEL : TXT, 'center')
      if (cur && blink(g, 400)) {
        triangle(x + L.w / 2, L.y - 6, false, YEL)
        triangle(x + L.w / 2, L.y + L.h + 3, true, YEL)
      }
    }
    ctx.strokeStyle = OUT
    ctx.strokeRect(L.okX + 0.5, L.okY + 0.5, L.okW - 1, L.okH - 1)
    text('OK', L.okX + L.okW / 2, L.okY + 4, F8, TXT, 'center')
    text('UP/DOWN CHANGE - ENTER OK', W / 2, 150, F8, OUT, 'center')
  }

  function leaderboardScreen(g) {
    title('HIGH SCORES', 8, YEL)
    const rows = g.scoreRows
    if (!rows.length) text('NO SCORES YET', W / 2, 80, F8, DIM, 'center')
    for (let i = 0; i < rows.length; i++) {
      text(rows[i], W / 2, 36 + i * 12, F8, i === g.rank ? PALE : TXT, 'center')
    }
    if (blink(g, 600)) text('PRESS START', W / 2, 162, F8, DIM, 'center')
  }

  function render(g, k) {
    ctx.setTransform(k, 0, 0, k, 0, 0)
    ctx.imageSmoothingEnabled = false
    ctx.fillStyle = BG
    ctx.fillRect(0, 0, W, H)
    if (g.shake > 0 && !g.reducedMotion) {
      const a = g.t * 0.05
      ctx.translate(Math.round(Math.sin(a * 7) * 2), Math.round(Math.cos(a * 5) * 2))
    }
    stars(g)
    switch (g.state) {
      case 'title':
        titleScreen(g)
        break
      case 'playing':
        world(g)
        hud(g)
        break
      case 'paused':
        world(g)
        hud(g)
        pausedScreen(g)
        break
      case 'gameover':
        world(g)
        hud(g)
        gameOverScreen(g)
        break
      case 'initials':
        initialsScreen(g)
        break
      case 'leaderboard':
        leaderboardScreen(g)
        break
      default:
    }
  }

  return { render }
}
