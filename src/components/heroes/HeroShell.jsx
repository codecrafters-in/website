import Container from '../ui/Container.jsx'
import Aurora from '../Aurora.jsx'
import Icon from '../ui/Icon.jsx'
import KeyPoints from '../KeyPoints.jsx'
import { whatsappUrl } from '../BookingFloat.jsx'
import { track } from '../../lib/analytics.js'
import { heroAssurance } from '../../data/keyPoints.js'

/**
 * Shared chrome for every hero variant: the section frame, the glow, the
 * scroll cue, and the CTA pair. Only the message changes between variants, so
 * a comparison is a comparison of copy and structure — not of styling noise.
 */
export function HeroFrame({ children, align = 'center', pad = 'py-20 md:py-24' }) {
  // `align="top"` lets a variant place a full-width visual below the copy and
  // crop it against the fold, rather than vertically centring a column pair.
  return (
    <section
      className={`relative flex min-h-[100svh] overflow-hidden pt-[72px] ${
        align === 'top' ? 'items-start' : 'items-center'
      }`}
    >
      <Aurora />
      <Container className={`relative w-full ${pad}`}>{children}</Container>
      <div
        className="absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-outline"
        aria-hidden="true"
      >
        Scroll
        <span className="h-8 w-px bg-gradient-to-b from-primary-container to-transparent" />
      </div>
    </section>
  )
}

/** Primary WhatsApp CTA + secondary link + the assurance chips. */
export function HeroCta({ label = 'Tell us what is broken', variant = 'default', align = 'left' }) {
  const wa = whatsappUrl('/')
  return (
    <>
      <div className={`mt-10 flex flex-wrap items-center gap-4 ${align === 'center' ? 'justify-center' : ''}`}>
        {wa ? (
          <a
            href={wa}
            target="_blank"
            rel="noreferrer"
            onClick={() => track('whatsapp_click', { location: 'hero', variant })}
            className="inline-flex items-center justify-center gap-3 rounded-lg bg-brand px-8 py-4 text-base font-semibold text-on-primary-fixed shadow-molten transition hover:brightness-110"
          >
            <Icon name="message-circle" size={19} />
            {label}
          </a>
        ) : (
          <a
            href="/contact"
            className="inline-flex items-center justify-center gap-3 rounded-lg bg-brand px-8 py-4 text-base font-semibold text-on-primary-fixed shadow-molten transition hover:brightness-110"
          >
            {label}
          </a>
        )}
        <a
          href="/work"
          className="inline-flex items-center gap-2 text-base font-semibold text-on-surface underline decoration-outline-variant decoration-2 underline-offset-[6px] transition hover:decoration-primary-container"
        >
          See what we shipped <Icon name="arrow-right" size={17} />
        </a>
      </div>
      <KeyPoints
        items={heroAssurance}
        variant="strip"
        className={`mt-7 gap-x-6 ${align === 'center' ? 'justify-center' : ''}`}
      />
    </>
  )
}
