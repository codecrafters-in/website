import { useEffect, useRef, useState } from 'react'
import { createGame } from './game/engine.js'
import { createBeeper } from './audio/beeper.js'
import { getHighScores } from './storage/highscores.js'
import './crt.css'

/**
 * Bug Blaster — the shooter, as a self-contained cabinet.
 *
 * Everything here is mounted only when the player is on /arcade/bug-blaster, so
 * the engine, the sprite atlas and the audio never load for anyone who does not
 * ask for them. The engine binds `window` keydown and preventDefault()s the
 * arrow keys, which is exactly why it must not exist on any other page.
 */

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

export default function BugBlaster({ dark = false }) {
  const canvasRef = useRef(null)
  const gameRef = useRef(null)
  const [hud, setHud] = useState({ state: 'title', score: 0, hi: 0, wave: 0, lives: 3 })
  const [muted, setMuted] = useState(true)
  const [reduced, setReduced] = useState(false)
  const [coarse, setCoarse] = useState(false)
  const [topScore, setTopScore] = useState(0)
  const [announce, setAnnounce] = useState('')
  const [canvasOk, setCanvasOk] = useState(true)

  useEffect(() => {
    const reducedMotion = mq('(prefers-reduced-motion: reduce)')
    setReduced(reducedMotion)
    setCoarse(mq('(pointer: coarse)'))
    setTopScore((getHighScores()[0] || { score: 0 }).score)

    const beeper = createBeeper()
    setMuted(beeper.isMuted())

    const canvas = canvasRef.current
    let lastState = 'title'
    let lastWave = 0
    const game = createGame({
      canvas,
      audio: beeper,
      reducedMotion,
      theme: dark ? 'dark' : 'light',
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

    return () => {
      document.removeEventListener('visibilitychange', onHide)
      window.removeEventListener('blur', onBlur)
      game.destroy()
      gameRef.current = null
    }
    // `dark` seeds the palette; live changes go through setTheme below.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Palette swaps mid-run without restarting the game.
  useEffect(() => {
    gameRef.current?.setTheme?.(dark ? 'dark' : 'light')
  }, [dark])

  const play = () => gameRef.current && gameRef.current.play()
  const toggleSound = () => gameRef.current && gameRef.current.toggleMute()
  const showPlay = hud.state === 'title' || hud.state === 'gameover' || hud.state === 'leaderboard'

  return (
    <div className="flex flex-col items-center">
      <div
        className={'crt aspect-video w-full max-w-[960px] max-h-[70vh] ' + (reduced ? '' : 'crt-on')}
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

      <div className="mt-3 flex w-full max-w-[960px] flex-wrap items-center justify-between gap-3 font-mono text-[11px] text-on-surface-variant">
        <div className="hidden sm:block">← → move · SPACE fire · P pause · M sound</div>
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
        </div>
      </div>

      {showPlay && (
        <div className="mt-3">
          <button
            type="button"
            onClick={play}
            className="crt-text rounded border border-primary-container bg-primary-container px-4 py-2 font-arcade text-[10px] text-surface-container-lowest hover:bg-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            {hud.state === 'title' ? 'START' : 'PLAY AGAIN'}
          </button>
        </div>
      )}

      {coarse && (
        <div className="mt-3 flex w-full max-w-[960px] items-center gap-2">
          <TouchButton label="◀" name="left" game={gameRef} />
          <TouchButton label="▶" name="right" game={gameRef} />
          <TouchButton label="FIRE" name="fire" game={gameRef} wide />
        </div>
      )}

      {reduced && (
        <div className="mt-2 font-mono text-[10px] text-outline">
          Reduced motion: effects minimised
        </div>
      )}

      <div aria-live="polite" className="sr-only">
        {announce}
      </div>
    </div>
  )
}
