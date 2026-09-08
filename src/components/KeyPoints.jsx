import { Link } from 'react-router-dom'
import Container from './ui/Container.jsx'
import Icon from './ui/Icon.jsx'
import Reveal from '../effects/Reveal.jsx'

/**
 * The spec strip, reusable on any page.
 *
 * Same idea as the row of specs under a phone launch: a handful of large,
 * scannable facts that answer what the visitor is deciding on, before they read
 * a paragraph. Every page gets one, so no page is a dead scroll.
 *
 * `variant`:
 *   'cards'  — big number/icon cards. Use once per page, high up.
 *   'strip'  — compact single row. Use as a reassurance bar near a CTA.
 */
export default function KeyPoints({
  items = [],
  variant = 'cards',
  eyebrow,
  title,
  tone = 'low',
  className = '',
}) {
  if (!items.length) return null

  const bg = { low: 'bg-surface-container-low', base: 'bg-surface', none: '' }[tone] ?? ''

  if (variant === 'strip') {
    return (
      <div className={`flex flex-wrap items-center gap-x-8 gap-y-3 ${className}`}>
        {items.map((it) => (
          <span key={it.label} className="inline-flex items-center gap-2.5">
            <Icon name={it.icon || 'circle-check'} size={17} className="shrink-0 text-primary-container" />
            <span className="text-sm font-semibold text-on-surface">{it.label}</span>
            {it.note && <span className="text-sm text-on-surface-variant">{it.note}</span>}
          </span>
        ))}
      </div>
    )
  }

  const cols = items.length >= 4 ? 'sm:grid-cols-2 lg:grid-cols-4' : 'sm:grid-cols-2 lg:grid-cols-3'

  return (
    <section className={`${bg} py-14 md:py-16 ${className}`} aria-label={title || 'Key points'}>
      <Container>
        {(eyebrow || title) && (
          <div className="mb-9">
            {eyebrow && (
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary-container">{eyebrow}</p>
            )}
            {title && <h2 className="mt-3 font-display text-display-sm text-on-surface">{title}</h2>}
          </div>
        )}
        <Reveal stagger={70} className={`grid gap-4 ${cols}`}>
          {items.map((it) => {
            const body = (
              <>
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-tint text-primary-container">
                  <Icon name={it.icon || 'circle-check'} size={24} />
                </span>
                {it.value && (
                  <p className="mt-5 font-display text-4xl leading-none tracking-tightest text-on-surface">{it.value}</p>
                )}
                <p className={`${it.value ? 'mt-3' : 'mt-5'} text-base font-semibold leading-snug text-on-surface`}>
                  {it.label}
                </p>
                {it.note && <p className="mt-2 flex-1 text-sm leading-relaxed text-on-surface-variant">{it.note}</p>}
                {it.cta && (
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-container">
                    {it.cta}
                    <Icon
                      name={it.href ? 'external-link' : 'arrow-right'}
                      size={15}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </span>
                )}
              </>
            )
            const cls =
              'group flex flex-col rounded-2xl bg-surface-container p-6 shadow-edge transition duration-300' +
              (it.to || it.href
                ? ' hover:-translate-y-1 hover:shadow-[inset_0_0_0_1.5px_rgb(var(--brand)),0_24px_48px_-24px_rgb(var(--shadow)/0.25)]'
                : '')

            if (it.href) {
              return (
                <a key={it.label} href={it.href} target="_blank" rel="noreferrer" className={cls}>
                  {body}
                </a>
              )
            }
            if (it.to) {
              return (
                <Link key={it.label} to={it.to} className={cls}>
                  {body}
                </Link>
              )
            }
            return (
              <div key={it.label} className={cls}>
                {body}
              </div>
            )
          })}
        </Reveal>
      </Container>
    </section>
  )
}
