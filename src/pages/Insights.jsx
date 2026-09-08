import SEO, { breadcrumb, itemList, webPage } from '../components/SEO.jsx'
import CTASection from '../components/CTASection.jsx'
import LeadMagnet from '../components/LeadMagnet.jsx'
import InsightCard from '../components/cards/InsightCard.jsx'
import { Section, Container, Eyebrow } from '../components/ui/index.js'
import Reveal from '../effects/Reveal.jsx'
import SplitText from '../effects/SplitText.jsx'
import { insights } from '../data/insights.js'
import KeyPoints from '../components/KeyPoints.jsx'
import { keyPoints } from '../data/keyPoints.js'
import Aurora from '../components/Aurora.jsx'

export function Component() {
  const sorted = [...insights].sort((a, b) => (a.date < b.date ? 1 : -1))
  return (
    <>
      <SEO
        title="AI & ERP Insights for Business Leaders"
        description="Practical writing for CTOs and ops leaders: AI readiness, agents versus workflows, automation teardowns, and prompt-injection hardening for enterprise data agents."
        path="/insights"
        jsonLd={[
          webPage({ name: 'Insights', path: '/insights', description: 'Field notes on shipping ERP and AI systems.' }),
          breadcrumb([{ name: 'Home', path: '/' }, { name: 'Insights', path: '/insights' }]),
          itemList(
            'CodeCrafters insights',
            insights.map((a) => ({ name: a.title, path: `/insights/${a.slug}` })),
          ),
        ]}
      />
      <section className="relative pt-[72px] overflow-hidden">
        <Aurora variant="soft" />
        <Container className="relative py-24 md:py-32">
          <Eyebrow className="mb-7">Insights</Eyebrow>
          <h1 className="font-display font-semibold text-display-xl text-on-surface max-w-4xl">
            <SplitText text="Field notes from" immediate />
            <br />
            <span className="molten-text">
              <SplitText text="shipping AI." immediate delay={0.2} />
            </span>
          </h1>
          <p className="mt-8 text-on-surface-variant text-lg leading-relaxed max-w-xl">
            No trend pieces. Mechanisms, numbers and the mistakes we made so you can skip them.
          </p>
        </Container>
      </section>

      <KeyPoints items={keyPoints.insights} />
      <Section tone="low">
        <Container>
          <h2 className="sr-only">All articles</h2>
          <Reveal stagger={90} className="grid md:grid-cols-2 gap-5">
            {sorted.map((a) => (
              <InsightCard key={a.slug} item={a} />
            ))}
          </Reveal>
        </Container>
      </Section>
      <LeadMagnet source="Insights index" />
      <CTASection eyebrow="Apply it" title="Want this run on your systems?" secondary={{ label: 'Our solutions', to: '/solutions' }} />
    </>
  )
}

export default Component
