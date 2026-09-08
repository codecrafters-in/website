import { useEffect, useMemo, useRef } from 'react'
import { gsap, ScrollTrigger, EASE, prefersReducedMotion } from '../lib/gsap.js'
import useReducedMotion from '../hooks/useReducedMotion.js'

/**
 * Word-by-word masked reveal. Real text is in the DOM at all times (SEO /
 * prerender safe); GSAP only hides + animates after mount, never before.
 *  - `immediate`: animate on mount instead of waiting for the viewport.
 *  - `mask`: wrap each word in overflow-hidden (yPercent reveal). When false,
 *    words slide up by `y` px instead.
 */
export default function SplitText({
  text,
  as: Tag = 'span',
  className = '',
  delay = 0,
  stagger = 0.06,
  y = 40,
  once = true,
  immediate = false,
  mask = true,
  duration = 0.9,
  ...rest
}) {
  const ref = useRef(null)
  const reduced = useReducedMotion()
  const words = useMemo(() => String(text ?? '').split(/\s+/).filter(Boolean), [text])

  useEffect(() => {
    if (reduced || prefersReducedMotion() || typeof window === 'undefined') return undefined
    const el = ref.current
    if (!el) return undefined
    const targets = el.querySelectorAll('.split-word')
    if (!targets.length) return undefined

    const from = mask ? { yPercent: 100, opacity: 0 } : { y, opacity: 0 }
    const to = mask ? { yPercent: 0, opacity: 1 } : { y: 0, opacity: 1 }

    gsap.set(targets, from)
    const tween = gsap.to(targets, {
      ...to,
      duration,
      ease: EASE,
      delay,
      stagger,
      overwrite: 'auto',
      ...(immediate
        ? {}
        : {
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              once,
              toggleActions: once ? 'play none none none' : 'play none none reverse',
            },
          }),
    })

    return () => {
      if (tween.scrollTrigger) tween.scrollTrigger.kill()
      tween.kill()
      gsap.set(targets, { clearProps: 'transform,opacity' })
    }
  }, [reduced, words, delay, stagger, y, once, immediate, mask, duration])

  // Refresh trigger positions after fonts/images settle.
  useEffect(() => {
    if (typeof window === 'undefined' || immediate) return undefined
    const id = window.setTimeout(() => ScrollTrigger.refresh(), 250)
    return () => window.clearTimeout(id)
  }, [immediate])

  return (
    <Tag ref={ref} className={`split-text ${className}`} aria-label={words.join(' ')} {...rest}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} aria-hidden="true">
          <span className={`inline-block align-bottom ${mask ? 'overflow-hidden' : ''}`}>
            <span className="split-word inline-block will-change-transform">{word}</span>
          </span>
          {i < words.length - 1 ? ' ' : null}
        </span>
      ))}
    </Tag>
  )
}
