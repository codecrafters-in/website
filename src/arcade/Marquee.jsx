import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { marquee } from './marquee.js'

/**
 * The cabinet marquee — the lit strip above the screen.
 *
 * Deliberately quiet. The arcade signal comes from the pixel-font coin plate,
 * the star separators and a faint scanline wash; the copy itself is set in the
 * site's mono face, because Press Start 2P is a signage font and a sentence set
 * in it is something you decode rather than read. Pixel type for the two-word
 * labels, readable type for the sentence — which is how real cabinets split it.
 *
 * It sits above the screen and never takes a pixel from the game. The list
 * scrolls, which WCAG 2.2.2 only allows with a way to stop it: hover pauses it,
 * the ❚❚ button pauses it for keyboard users, reduced motion stops it outright.
 *
 * Every line is checkable against the repo — see `marquee.js`.
 */
export default function Marquee({ className = '' }) {
  const [paused, setPaused] = useState(false)
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    try {
      setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
    } catch {
      /* no matchMedia — keep it moving */
    }
  }, [])

  // The track holds the list twice so the loop has no seam. Reduced motion
  // shows one copy, sitting still.
  const runs = reduced ? [0] : [0, 1]

  return (
    <div
      className={`cabinet-marquee relative flex w-full items-stretch overflow-hidden rounded border border-primary-container/30 bg-brand-tint/70 ${className}`}
    >
      <span className="relative z-[2] flex shrink-0 items-center gap-1.5 bg-brand px-2.5 font-arcade text-[8px] text-on-primary-fixed">
        <span aria-hidden="true">◉</span>
        <span className="hidden sm:inline">CODECRAFTERS</span>
        <span className="sm:hidden">CC</span>
      </span>

      <div className="ticker-window relative z-[2] min-w-0 flex-1 overflow-hidden">
        <div className="ticker-track" data-paused={paused ? 'true' : 'false'}>
          {runs.map((run) => (
            <ul key={run} className="flex shrink-0 items-center" aria-hidden={run === 1}>
              {marquee.map((m) => (
                <li key={m.text} className="flex items-center whitespace-nowrap py-1.5">
                  <span className="px-3.5 text-[9px] text-primary-container" aria-hidden="true">
                    ★
                  </span>
                  <span className="font-mono text-[12px] text-on-surface">{m.text}</span>
                  {m.to && (
                    <Link
                      to={m.to}
                      tabIndex={run === 1 ? -1 : 0}
                      className="ml-2.5 rounded-sm border border-primary-container/40 px-2 py-0.5 font-mono text-[11px] text-primary-container transition hover:bg-brand hover:text-on-primary-fixed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-container"
                    >
                      {m.label} →
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>

      {!reduced && (
        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          aria-pressed={paused}
          aria-label={paused ? 'Resume the marquee' : 'Pause the marquee'}
          className="relative z-[2] flex shrink-0 items-center border-l border-primary-container/25 px-2 font-mono text-[10px] text-primary-container transition hover:bg-brand hover:text-on-primary-fixed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-container"
        >
          {paused ? '▶' : '❚❚'}
        </button>
      )}

      {/* a hint of the lit panel, not the whole CRT */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[3] opacity-[0.07]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, rgba(0,0,0,.6) 0 1px, transparent 1px 3px)',
        }}
      />
    </div>
  )
}
