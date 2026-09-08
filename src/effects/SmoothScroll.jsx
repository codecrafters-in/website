import { createContext, useContext, useEffect, useState, useSyncExternalStore } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger } from '../lib/gsap.js'
import useReducedMotion from '../hooks/useReducedMotion.js'
import useMediaQuery from '../hooks/useMediaQuery.js'
import useHydrated from '../hooks/useHydrated.js'

/** Minimal external store so consumers re-render when Lenis appears/disappears. */
function createLenisStore() {
  let instance = null
  const listeners = new Set()
  return {
    get: () => instance,
    set: (next) => {
      instance = next
      listeners.forEach((l) => l())
    },
    subscribe: (l) => {
      listeners.add(l)
      return () => listeners.delete(l)
    },
  }
}

const noopStore = createLenisStore()
const LenisContext = createContext(noopStore)
const getNull = () => null

/** The live Lenis instance, or null (SSR, reduced motion, touch devices, outside the provider). */
export function useLenis() {
  const store = useContext(LenisContext)
  return useSyncExternalStore(store.subscribe, store.get, getNull)
}

/**
 * Wraps the app in Lenis smooth scrolling driven by gsap.ticker, wired to
 * ScrollTrigger. Publishes the instance on `window.__lenis` for scrollLock.js.
 * Skipped entirely (window.__lenis stays undefined) under reduced motion or
 * on coarse pointers.
 */
export default function SmoothScroll({ children }) {
  const hydrated = useHydrated()
  const reduced = useReducedMotion()
  const coarse = useMediaQuery('(pointer: coarse)', false)
  const [store] = useState(createLenisStore)

  useEffect(() => {
    if (!hydrated || reduced || coarse || typeof window === 'undefined') return undefined

    const instance = new Lenis({ lerp: 0.1, smoothWheel: true, syncTouch: false })
    const tick = (time) => instance.raf(time * 1000)

    instance.on('scroll', ScrollTrigger.update)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)
    window.__lenis = instance
    store.set(instance)

    return () => {
      gsap.ticker.remove(tick)
      gsap.ticker.lagSmoothing(500, 33)
      instance.off('scroll', ScrollTrigger.update)
      instance.destroy()
      if (window.__lenis === instance) window.__lenis = undefined
      store.set(null)
    }
  }, [hydrated, reduced, coarse, store])

  return <LenisContext.Provider value={store}>{children}</LenisContext.Provider>
}
