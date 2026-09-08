import { useEffect } from 'react'

/**
 * Shared normalised pointer position (-1..1, y up). The hero canvas is
 * `pointer-events: none`, so R3F's own `pointer` never updates — one window
 * listener feeds every scene instead.
 */
const pointer = { x: 0, y: 0 }
let subscribers = 0

function onMove(e) {
  pointer.x = (e.clientX / window.innerWidth - 0.5) * 2
  pointer.y = -(e.clientY / window.innerHeight - 0.5) * 2
}

/** Returns a stable object mutated on pointer move. Never triggers a render. */
export default function usePointer(enabled = true) {
  useEffect(() => {
    if (!enabled || typeof window === 'undefined') return undefined
    subscribers += 1
    if (subscribers === 1) window.addEventListener('mousemove', onMove, { passive: true })
    return () => {
      subscribers -= 1
      if (subscribers === 0) window.removeEventListener('mousemove', onMove)
    }
  }, [enabled])
  return pointer
}
