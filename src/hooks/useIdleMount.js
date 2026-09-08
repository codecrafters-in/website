import { useEffect, useState } from 'react'
import useHydrated from './useHydrated.js'

/**
 * Returns true once the component is hydrated, the browser has gone idle
 * (`requestIdleCallback`, falling back to a 1ms timeout) and an optional
 * extra `delay` (ms) has elapsed. Use it to defer heavy, non-critical
 * subtrees (WebGL, particles) off the critical hydration path.
 */
export default function useIdleMount(delay = 0) {
  const hydrated = useHydrated()
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (!hydrated || typeof window === 'undefined') return undefined
    let cancelled = false
    let idleId = null
    let timer = null
    let delayTimer = null

    const fire = () => {
      if (cancelled) return
      if (delay > 0) {
        delayTimer = window.setTimeout(() => {
          if (!cancelled) setReady(true)
        }, delay)
      } else {
        setReady(true)
      }
    }

    if (typeof window.requestIdleCallback === 'function') {
      idleId = window.requestIdleCallback(fire, { timeout: 2000 })
    } else {
      timer = window.setTimeout(fire, 1)
    }

    return () => {
      cancelled = true
      if (idleId !== null && typeof window.cancelIdleCallback === 'function') window.cancelIdleCallback(idleId)
      if (timer !== null) window.clearTimeout(timer)
      if (delayTimer !== null) window.clearTimeout(delayTimer)
    }
  }, [hydrated, delay])

  return ready
}
