import { useCallback, useEffect, useRef, useState } from 'react'
import { useArcade } from './index.js'
import { lockScroll, unlockScroll } from '../lib/scrollLock.js'
import { loadArcadeFont } from './fonts.js'
import { createGame } from './game/engine.js'
import { createBeeper } from './audio/beeper.js'
import { getHighScores } from './storage/highscores.js'
import './crt.css'

const FOCUSABLE = 'button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'

function mq(query) {
  try {
    return typeof window !== 'undefined' && window.matchMedia(query).matches
  } catch {
    return false
  }
}

function TouchButton({ label, name, game, wide }) {
  const set = (v) => () => game.current && game.current.setTouch(name, v)
  return (
    <button
      type="button"
      aria-label={label}
      onPointerDown={set(true)}
      onPointerUp={set(false)}
      onPointerLeave={set(false)}
      onPointerCancel={set(false)}
      onContextMenu={(e) => e.preventDefault()}
      className={
        'select-none touch-none rounded-md border border-outline-variant bg-surface-container font-arcade text-[11px] text-on-surface ' +
        'active:bg-primary-container active:text-surface-container-lowest ' +
        (wide ? 'h-14 flex-1' : 'h-14 w-16')
      }
    >
      {label}
    </button>
  )
}

export default function ArcadeOverlay() {
  const { closeArcade } = useArcade()
  const rootRef = useRef(null)
  const canvasRef = useRef(null)
  const gameRef = useRef(null)
  const beeperRef = useRef(null)
  const [hud, setHud] = useState({ state: 'title', score: 0, hi: 0, wave: 0, lives: 3 })
  const [muted, setMuted] = useState(true)
  // The cabinet follows the site: light by default, dark on request. Persisted
  // so a player who prefers the dark cabinet keeps it.
  const [dark, setDark] = useState(false)
  const [reduced, setReduced] = useState(false)
  const [coarse, setCoarse] = useState(false)
  const [topScore, setTopScore] = useState(0)
  const [announce, setAnnounce] = useState('')
  const [canvasOk, setCanvasOk] = useState(true)

  useEffect(() => {
    const prevFocus = typeof document !== 'undefined' ? document.activeElement : null
    const reducedMotion = mq('(prefers-reduced-motion: reduce)')
    setReduced(reducedMotion)
    setCoarse(mq('(pointer: coarse)'))
    setTopScore((getHighScores()[0] || { score: 0 }).score)
    lockScroll()
    loadArcadeFont()

    // Cabinet defaults to light, matching the site. A player who prefers the
    // dark cabinet keeps it across sessions.
    let startDark = false
    try {
      startDark = localStorage.getItem('arcade_theme') === 'dark'
    } catch {
      /* private mode — default to light */
    }
    setDark(startDark)

    const beeper = createBeeper()
    beeperRef.current = beeper
    setMuted(beeper.isMuted())

    const canvas = canvasRef.current
    let lastState = 'title'
    let lastWave = 0
    const game = createGame({
      canvas,
      audio: beeper,
      reducedMotion,
      theme: startDark ? 'dark' : 'light',
      onState: (s) => {
        setHud({ state: s.state, score: s.score, hi: s.hi, wave: s.wave, lives: s.lives })
        setMuted(s.muted)
        if (s.wave !== lastWave && s.state === 'playing') {
          lastWave = s.wave
          setAnnounce('Wave ' + s.wave)
        }
        if (s.state !== lastState) {
          lastState = s.state
          if (s.state === 'gameover') setAnnounce('Game over. Score ' + s.score)
          else if (s.state === 'leaderboard') setTopScore((getHighScores()[0] || { score: 0 }).score)
        }
      },
    })
    gameRef.current = game
    if (!canvas || !canvas.getContext || !canvas.getContext('2d')) setCanvasOk(false)
    game.start()

    const onHide = () => {
      if (document.hidden) game.pause()
    }
    const onBlur = () => game.pause()
    document.addEventListener('visibilitychange', onHide)
    window.addEventListener('blur', onBlur)

    if (rootRef.current) rootRef.current.focus({ preventScroll: true })

    return () => {
      document.removeEventListener('visibilitychange', onHide)
      window.removeEventListener('blur', onBlur)
      game.destroy()
      gameRef.current = null
      unlockScroll()
      if (prevFocus && typeof prevFocus.focus === 'function') prevFocus.focus({ preventScroll: true })
    }
  }, [])

  const toggleTheme = () => {
    setDark((prev) => {
      const next = !prev
      try {
        localStorage.setItem('arcade_theme', next ? 'dark' : 'light')
      } catch {
        /* private mode */
      }
      // Swaps the palette mid-run — the game does not restart.
      gameRef.current?.setTheme?.(next ? 'dark' : 'light')
      return next
    })
  }

  const onKeyDown = useCallback(
    (e) => {
      if (e.key === 'Escape') {
        e.stopPropagation()
        closeArcade()
        return
      }
      // Cabinet light/dark. Handled here rather than in the engine input map
      // because the theme is overlay state, not game state.
      if (e.key === 't' || e.key === 'T') {
        e.stopPropagation()
        toggleTheme()
        return
      }
      if (e.key !== 'Tab' || !rootRef.current) return
      const items = rootRef.current.querySelectorAll(FOCUSABLE)
      if (!items.length) return
      const first = items[0]
      const last = items[items.length - 1]
      const active = document.activeElement
      if (e.shiftKey && (active === first || active === rootRef.current)) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && active === last) {
        e.preventDefault()
        first.focus()
      }
    },
    [closeArcade],
  )

  const toggleSound = () => gameRef.current && gameRef.current.toggleMute()

  const play = () => gameRef.current && gameRef.current.play()
  const showPlay = hud.state === 'title' || hud.state === 'gameover' || hud.state === 'leaderboard'

  return (
    <div
      ref={rootRef}
      role="dialog"
      aria-modal="true"
      aria-label="Bug Blaster arcade"
      tabIndex={-1}
      {...{ onKeyDown }}
      className={`${dark ? 'on-dark' : ''} fixed inset-0 z-arcade flex flex-col items-center justify-center overflow-y-auto bg-surface-container-lowest/95 px-3 py-6 text-on-surface outline-none backdrop-blur-sm`}
    >
      <button
        type="button"
        onClick={closeArcade}
        className="crt-text absolute right-3 top-3 z-10 rounded border border-outline-variant bg-surface-container-lowest px-3 py-2 font-arcade text-[10px] text-primary-container hover:bg-surface-container focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-container"
      >
        EXIT [ESC]
      </button>

      <div className="mb-3 font-mono text-[11px] uppercase tracking-[0.3em] text-on-surface-variant">
        CODECRAFTERS ARCADE · BUG BLASTER
      </div>

      <div
        className={'crt aspect-video w-[min(92vw,960px)] max-h-[70vh] ' + (reduced ? '' : 'crt-on')}
        style={{ aspectRatio: '16 / 9' }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <canvas
            ref={canvasRef}
            width={320}
            height={180}
            aria-label="Bug Blaster game"
            className="block"
            style={{ imageRendering: 'pixelated', touchAction: 'none' }}
          />
        </div>
        {!reduced && <div className="crt-flicker" />}
        {!canvasOk && (
          <div className="absolute inset-0 z-[5] flex items-center justify-center p-6 text-center font-mono text-xs text-on-surface-variant">
            Canvas is unavailable in this browser. Bug Blaster needs a 2D canvas to run.
          </div>
        )}
      </div>

      <div className="mt-3 flex w-[min(92vw,960px)] flex-wrap items-center justify-between gap-3 font-mono text-[11px] text-on-surface-variant">
        <div className="hidden sm:block">← → move · SPACE fire · P pause · M sound · T theme · ESC exit</div>
        <div className="sm:hidden">drag to move · hold to fire</div>
        <div className="flex items-center gap-3">
          <span>Top score {String(Math.max(topScore, hud.hi)).padStart(6, '0')}</span>
          <button
            type="button"
            onClick={toggleSound}
            aria-pressed={!muted}
            aria-label={muted ? 'Turn sound on' : 'Turn sound off'}
            className="rounded border border-outline-variant px-2 py-1 text-on-surface hover:border-primary-container hover:text-primary-container focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-container"
          >
            {muted ? 'SOUND: OFF' : 'SOUND: ON'}
          </button>
          <button
            type="button"
            onClick={toggleTheme}
            aria-pressed={dark}
            aria-label={dark ? 'Switch the cabinet to light' : 'Switch the cabinet to dark'}
            className="rounded border border-outline-variant px-2 py-1 text-on-surface hover:border-primary-container hover:text-primary-container focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-container"
          >
            {dark ? 'CABINET: DARK' : 'CABINET: LIGHT'}
          </button>
        </div>
      </div>

      {showPlay && (
        <div className="mt-3 flex items-center gap-3">
          <button
            type="button"
            onClick={play}
            className="crt-text rounded border border-primary-container bg-primary-container px-4 py-2 font-arcade text-[10px] text-surface-container-lowest hover:bg-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            {hud.state === 'title' ? 'START' : 'PLAY AGAIN'}
          </button>
          <button
            type="button"
            onClick={closeArcade}
            className="rounded border border-outline-variant px-4 py-2 font-arcade text-[10px] text-on-surface-variant hover:text-on-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-container"
          >
            EXIT
          </button>
        </div>
      )}

      {coarse && (
        <div className="mt-3 flex w-[min(92vw,960px)] items-center gap-2">
          <TouchButton label="◀" name="left" game={gameRef} />
          <TouchButton label="▶" name="right" game={gameRef} />
          <TouchButton label="FIRE" name="fire" game={gameRef} wide />
        </div>
      )}

      {reduced && (
        <div className="mt-2 font-mono text-[10px] text-outline-variant">Reduced motion: effects minimised</div>
      )}

      <div aria-live="polite" className="sr-only">
        {announce}
      </div>
    </div>
  )
}
