import { useEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '../lib/gsap.js'
import useReducedMotion from '../hooks/useReducedMotion.js'

export function formatNumber(n, decimals = 0) {
  const fixed = Number(n || 0).toFixed(decimals)
  const [int, frac] = fixed.split('.')
  const grouped = int.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return frac ? `${grouped}.${frac}` : grouped
}

/**
 * Animated statistic. The final value is in the prerendered HTML; on the
 * client it counts up from 0 once scrolled into view.
 */
export default function Counter({
  value,
  prefix = '',
  suffix = '',
  decimals = 0,
  duration = 1.8,
  className = '',
  ...rest
}) {
  const numRef = useRef(null)
  const reduced = useReducedMotion()
  const target = Number(value) || 0
  const finalText = formatNumber(target, decimals)

  useEffect(() => {
    if (reduced || prefersReducedMotion() || typeof window === 'undefined') return undefined
    const el = numRef.current
    if (!el) return undefined

    const obj = { v: 0 }
    const step = decimals > 0 ? 1 / 10 ** decimals : 1
    el.textContent = formatNumber(0, decimals)

    const tween = gsap.to(obj, {
      v: target,
      duration,
      ease: 'power2.out',
      snap: { v: step },
      onUpdate: () => {
        el.textContent = formatNumber(obj.v, decimals)
      },
      onComplete: () => {
        el.textContent = formatNumber(target, decimals)
      },
      scrollTrigger: { trigger: el, start: 'top 90%', once: true },
    })

    return () => {
      if (tween.scrollTrigger) tween.scrollTrigger.kill()
      tween.kill()
      el.textContent = formatNumber(target, decimals)
    }
  }, [reduced, target, decimals, duration])

  return (
    <span className={`tabular-nums ${className}`} aria-label={`${prefix}${finalText}${suffix}`} {...rest}>
      <span aria-hidden="true">
        {prefix}
        <span ref={numRef}>{finalText}</span>
        {suffix}
      </span>
    </span>
  )
}
