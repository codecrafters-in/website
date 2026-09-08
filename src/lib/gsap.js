import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Registering ScrollTrigger touches window/document; only do it in the browser.
if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger)

export { gsap, ScrollTrigger }

export const EASE = 'power3.out'
export const REDUCED = '(prefers-reduced-motion: reduce)'
export const NO_PREF = '(prefers-reduced-motion: no-preference)'

export function createMatchMedia() {
  return gsap.matchMedia()
}

export function refreshScrollTrigger() {
  if (typeof window !== 'undefined') ScrollTrigger.refresh()
}

/** Synchronous check usable inside effects (never during render). */
export function prefersReducedMotion() {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return false
  try {
    return window.matchMedia(REDUCED).matches
  } catch {
    return false
  }
}
