import Aurora from './Aurora.jsx'
import Section from './ui/Section.jsx'
import Container from './ui/Container.jsx'
import Eyebrow from './ui/Eyebrow.jsx'
import Heading from './ui/Heading.jsx'
import Button from './ui/Button.jsx'
import Reveal from '../effects/Reveal.jsx'
import KeyPoints from './KeyPoints.jsx'
import { reassurance } from '../data/keyPoints.js'
import { site } from '../data/site.js'

export default function CTASection({
  eyebrow = 'Next step',
  title = 'Your competitors are already automating.',
  lede = 'A free 45-minute diagnostic. We map your biggest bottleneck, estimate the ROI, and tell you honestly whether AI belongs there. No pitch deck.',
  primary = { label: 'Book a free diagnostic', to: '/contact' },
  secondary = { label: 'See the work', to: '/work' },
}) {
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
            <Button to={primary.to} variant="molten" size="lg" magnetic>
              {primary.label}
            </Button>
            {secondary && (
              <Button to={secondary.to} variant="ghost" size="lg" icon="arrow-up-right">
                {secondary.label}
              </Button>
            )}
          </div>
          <KeyPoints items={reassurance} variant="strip" className="mt-10 justify-center" />
          <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.2em] text-outline">
            {site.availability.label} · {site.availability.period}
          </p>
        </Reveal>
      </Container>
    </Section>
  )
}
