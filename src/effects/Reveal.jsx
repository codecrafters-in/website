import { useEffect, useRef } from 'react'

/*
 * CSS-driven scroll reveal. The markup is plain (data-reveal + a CSS custom
 * property); a stylesheet elsewhere does:
 *   .js [data-reveal]       { opacity:0; transform:translateY(24px) }
 *   .js [data-reveal].is-in { opacity:1; transform:none; transition:... var(--reveal-delay) }
 * so prerendered HTML is fully visible without JS.
 */

let observer = null
const onceMap = new WeakMap()

function getObserver() {
  if (observer) return observer
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return null
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const el = entry.target
        if (entry.isIntersecting) {
          el.classList.add('is-in')
          if (onceMap.get(el) !== false) observer.unobserve(el)
        } else if (onceMap.get(el) === false) {
          el.classList.remove('is-in')
        }
      }
    },
    { threshold: 0.15, rootMargin: '0px 0px -10% 0px' },
  )
  return observer
}

export default function Reveal({
  as: Tag = 'div',
  children,
  delay = 0,
  stagger = 0,
  className = '',
  once = true,
  style,
  ...rest
}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return undefined
    const targets = [el]

    if (stagger > 0) {
      Array.from(el.children).forEach((child, i) => {
        if (!(child instanceof HTMLElement)) return
        child.setAttribute('data-reveal', '')
        child.style.setProperty('--reveal-delay', `${delay + (i + 1) * stagger}ms`)
        targets.push(child)
      })
    }

    const io = getObserver()
    if (!io) {
      targets.forEach((t) => t.classList.add('is-in'))
      return undefined
    }
    targets.forEach((t) => {
      onceMap.set(t, once)
      io.observe(t)
    })
    return () => {
      targets.forEach((t) => {
        io.unobserve(t)
        onceMap.delete(t)
      })
    }
  }, [delay, stagger, once])

  return (
    <Tag
      ref={ref}
      data-reveal=""
      className={className}
      style={{ '--reveal-delay': `${delay}ms`, ...style }}
      {...rest}
    >
      {children}
    </Tag>
  )
}

/** Reveal with a default 80ms stagger across direct children. */
export function RevealGroup({ stagger = 80, ...props }) {
  return <Reveal stagger={stagger} {...props} />
}
