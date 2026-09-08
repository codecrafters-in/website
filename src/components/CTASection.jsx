import { useLocation } from 'react-router-dom'
import Aurora from './Aurora.jsx'
import Section from './ui/Section.jsx'
import Container from './ui/Container.jsx'
import Eyebrow from './ui/Eyebrow.jsx'
import Heading from './ui/Heading.jsx'
import Button from './ui/Button.jsx'
import Reveal from '../effects/Reveal.jsx'
import Icon from './ui/Icon.jsx'
import KeyPoints from './KeyPoints.jsx'
import { reassurance } from '../data/keyPoints.js'
import { site } from '../data/site.js'
import { whatsappUrl } from './BookingFloat.jsx'
import { track } from '../lib/analytics.js'

export default function CTASection({
  eyebrow = 'Next step',
  title = 'Your competitors are already automating.',
  lede = 'A free 45-minute diagnostic. We map your biggest bottleneck, estimate the ROI, and tell you honestly whether AI belongs there. No pitch deck.',
  primary = { label: 'Book a free diagnostic', to: '/contact' },
  secondary = { label: 'See the work', to: '/work' },
}) {
  // WhatsApp is the primary conversion channel, so it appears at the bottom of
  // every page — not just behind a floating button someone may have dismissed.
  const { pathname } = useLocation()
  // Contextual prefill: the first message already names the page they came from.
  const wa = whatsappUrl(pathname)
  return (
    <Section tone="base" className="overflow-hidden">
      <Aurora />
      <Container className="relative text-center">
        <Reveal>
          <Eyebrow className="mb-6 justify-center">{eyebrow}</Eyebrow>
          <Heading size="lg" className="mx-auto max-w-4xl">
            {title}
          </Heading>
          <p className="mt-6 text-on-surface-variant text-base md:text-lg max-w-2xl mx-auto leading-relaxed">{lede}</p>
          <div className="mt-10 flex flex-wrap gap-4 justify-center">
            {wa && (
              <a
                href={wa}
                target="_blank"
                rel="noreferrer"
                onClick={() => track('whatsapp_click', { location: 'cta_section', path: pathname })}
                className="group/btn inline-flex items-center justify-center gap-3 font-semibold tracking-[-0.01em] rounded-lg transition-all duration-300 select-none whitespace-nowrap text-base px-7 md:px-8 py-3.5 md:py-4 bg-brand text-on-primary-fixed shadow-edge hover:shadow-molten hover:brightness-110"
              >
                <Icon name="message-circle" size={18} />
                WhatsApp us
              </a>
            )}
            <Button to={primary.to} variant={wa ? 'outline' : 'molten'} size="lg" magnetic={!wa}>
              {primary.label}
            </Button>
            {secondary && (
              <Button to={secondary.to} variant="ghost" size="lg" icon="arrow-up-right">
                {secondary.label}
              </Button>
            )}
          </div>
          {wa && (
            <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-outline">
              Straight to the engineer. No form, no gatekeeper.
            </p>
          )}
          <KeyPoints items={reassurance} variant="strip" className="mt-10 justify-center" />
          <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.2em] text-outline">
            {site.availability.label} · {site.availability.period}
          </p>
        </Reveal>
      </Container>
    </Section>
  )
}
