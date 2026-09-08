import { useEffect, useRef, useState } from 'react'
import Tag from './Tag.jsx'
import Icon from './Icon.jsx'
import Reveal from '../../effects/Reveal.jsx'

export default function Timeline({ items }) {
  const wrapRef = useRef(null)
  const fillRef = useRef(null)
  const [expanded, setExpanded] = useState(0)

  useEffect(() => {
    let ctx
    let cancelled = false
    ;(async () => {
      if (typeof window === 'undefined') return
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        if (fillRef.current) fillRef.current.style.transform = 'scaleY(1)'
        return
      }
      const { gsap, ScrollTrigger } = await import('../../lib/gsap.js')
      if (cancelled || !wrapRef.current || !fillRef.current) return
      ctx = gsap.context(() => {
        gsap.fromTo(
          fillRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: { trigger: wrapRef.current, start: 'top 70%', end: 'bottom 60%', scrub: 0.8 },
          },
        )
        ScrollTrigger.refresh()
      }, wrapRef)
    })()
    return () => {
      cancelled = true
      ctx?.revert()
    }
  }, [])

  return (
    <div ref={wrapRef} className="relative">
      <div className="absolute left-[11px] md:left-1/2 md:-translate-x-1/2 top-2 bottom-2 w-px bg-outline-variant/30" aria-hidden="true">
        <div ref={fillRef} className="w-full h-full bg-molten origin-top" style={{ transform: 'scaleY(0)' }} />
      </div>
      <ol className="flex flex-col gap-10 md:gap-14">
        {items.map((it, i) => {
          const left = i % 2 === 0
          const isOpen = expanded === i
          return (
            <li key={it.id || i} className="relative md:grid md:grid-cols-2 md:gap-16">
              <span
                className="absolute left-[7px] md:left-1/2 md:-translate-x-1/2 top-2 w-[9px] h-[9px] rounded-full bg-brand shadow-[0_0_0_4px_rgb(var(--brand)/0.35)]"
                aria-hidden="true"
              />
              <div className={`pl-10 md:pl-0 ${left ? 'md:pr-4 md:text-right' : 'md:col-start-2 md:pl-4'}`}>
                <Reveal>
                  <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary-container mb-2">{it.date}</p>
                  <h3 className="font-display text-lg md:text-xl text-on-surface leading-snug">{it.title}</h3>
                  <p className="text-on-surface-variant text-sm mt-1">
                    {it.company} · {it.location} · {it.type}
                  </p>
                  {it.metrics?.length > 0 && (
                    <div className={`flex flex-wrap gap-2 mt-4 ${left ? 'md:justify-end' : ''}`}>
                      {it.metrics.map((m) => (
                        <Tag key={m}>{m}</Tag>
                      ))}
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => setExpanded(isOpen ? -1 : i)}
                    aria-expanded={isOpen}
                    className="mt-4 inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-outline hover:text-primary transition-colors"
                  >
                    {isOpen ? 'Hide details' : 'Show details'}
                    <Icon name="chevron-down" size={14} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  <div className="grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]" style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}>
                    <div className="overflow-hidden">
                      <ul className={`mt-4 flex flex-col gap-2 text-sm text-on-surface-variant leading-relaxed ${left ? 'md:items-end' : ''}`}>
                        {it.bullets?.map((b) => (
                          <li key={b} className="max-w-md">{b}</li>
                        ))}
                      </ul>
                      {it.tech?.length > 0 && (
                        <p className={`mt-4 font-mono text-[10px] uppercase tracking-[0.16em] text-outline ${left ? 'md:text-right' : ''}`}>
                          {it.tech.join(' · ')}
                        </p>
                      )}
                    </div>
                  </div>
                </Reveal>
              </div>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
