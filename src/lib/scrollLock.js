// Shared scroll lock used by the nav drawer and the arcade overlay.
// Works with Lenis (registered on window.__lenis by SmoothScroll) and falls back to body overflow.
let locks = 0

export function lockScroll() {
  locks += 1
  if (locks > 1) return
  if (typeof window === 'undefined') return
  const lenis = window.__lenis
  if (lenis && typeof lenis.stop === 'function') lenis.stop()
  document.documentElement.style.overflow = 'hidden'
  document.body.style.overflow = 'hidden'
}

export function unlockScroll() {
  locks = Math.max(0, locks - 1)
  if (locks > 0) return
  if (typeof window === 'undefined') return
  const lenis = window.__lenis
  if (lenis && typeof lenis.start === 'function') lenis.start()
  document.documentElement.style.overflow = ''
  document.body.style.overflow = ''
}

export function scrollToTarget(target, options = {}) {
  if (typeof window === 'undefined') return
  const lenis = window.__lenis
  if (lenis && typeof lenis.scrollTo === 'function') {
    lenis.scrollTo(target, { offset: options.offset ?? -80, immediate: options.immediate ?? false })
    return
  }
  if (typeof target === 'number') {
    window.scrollTo({ top: target, behavior: options.immediate ? 'instant' : 'smooth' })
    return
  }
  const el = typeof target === 'string' ? document.querySelector(target) : target
  if (el) {
    const top = el.getBoundingClientRect().top + window.scrollY + (options.offset ?? -80)
    window.scrollTo({ top, behavior: options.immediate ? 'instant' : 'smooth' })
  }
}
