import { useEffect, useState } from 'react'

const STEPS = 12
const DURATION = 1200

/**
 * Tiny BIOS-style loading block. Not lazy — also used as a route fallback.
 * SSR-safe: no window access during render; motion preference is read in an effect.
 */
export default function BootScreen({ label = 'SYSTEM' }) {
  const [filled, setFilled] = useState(0)
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return undefined
    let mq = null
    try {
      mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    } catch {
      mq = null
    }
    if (mq && mq.matches) {
      setReduced(true)
      return undefined
    }
    const start = Date.now()
    const id = setInterval(() => {
      const n = Math.min(STEPS, Math.floor(((Date.now() - start) / DURATION) * STEPS))
      setFilled(n)
      if (n >= STEPS) clearInterval(id)
    }, DURATION / STEPS)
    return () => clearInterval(id)
  }, [])

  const bar = '▮'.repeat(filled) + '▯'.repeat(STEPS - filled)

  return (
    <div
      role="status"
      aria-live="polite"
      className="on-dark flex min-h-[40vh] w-full flex-col items-center justify-center gap-3 bg-surface-container-lowest px-6 py-16 font-mono text-xs text-on-surface-variant"
    >
      <div className="tracking-[0.3em] text-primary-container">CODECRAFTERS BIOS v2.0</div>
      {reduced ? (
        <div>Loading…</div>
      ) : (
        <>
          <div aria-hidden="true" className="tracking-[0.15em] text-primary">
            {bar}
          </div>
          <div>
            LOADING {String(label).toUpperCase()}
            <span aria-hidden="true" className="ml-1 inline-block animate-blink">
              _
            </span>
          </div>
        </>
      )}
    </div>
  )
}
