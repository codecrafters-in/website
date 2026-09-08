import { useParams, Link } from 'react-router-dom'
import SEO, { breadcrumb, faqNode, ORG_ID } from '../components/SEO.jsx'
import SectionHeader from '../components/SectionHeader.jsx'
import CTASection from '../components/CTASection.jsx'
import FAQ from '../components/FAQ.jsx'
import WorkCard from '../components/cards/WorkCard.jsx'
import NotFoundView from '../components/NotFoundView.jsx'
import { Section, Container, Eyebrow, Button, GlassCard, Icon, Tag } from '../components/ui/index.js'
import Reveal from '../effects/Reveal.jsx'
import SplitText from '../effects/SplitText.jsx'
import { solutions, solutionBySlug } from '../data/solutions.js'
import { faq } from '../data/faq.js'
import { workBySlug } from '../data/work.js'
import KeyPoints from '../components/KeyPoints.jsx'
import Aurora from '../components/Aurora.jsx'

export function Component() {
  const { slug } = useParams()
  const s = solutionBySlug[slug]
  if (!s) return <NotFoundView />

  const faqs = faq.filter((f) => f.scope?.includes(`solutions:${s.slug}`) || (s.faq || []).includes(f.id)).slice(0, 5)
  const related = (s.related || []).map((k) => workBySlug[k]).filter(Boolean)
  const idx = solutions.findIndex((x) => x.slug === s.slug)
  const next = solutions[(idx + 1) % solutions.length]

  const jsonLd = [
    breadcrumb([{ name: 'Home', path: '/' }, { name: 'Solutions', path: '/solutions' }, { name: s.title, path: `/solutions/${s.slug}` }]),
    {
      '@type': 'Service',
      name: s.title,
      description: s.seo?.description || s.intro,
      provider: { '@id': ORG_ID },
      areaServed: 'Worldwide',
      serviceType: s.title,
      url: `https://codecrafters.in/solutions/${s.slug}`,
    },
    faqs.length ? faqNode(faqs) : null,
  ]

  return (
    <>
      <SEO title={s.seo?.title || s.title} description={s.seo?.description || s.intro} path={`/solutions/${s.slug}`} jsonLd={jsonLd} />

      <section className="relative pt-[72px] overflow-hidden">
        <Aurora variant="soft" />
        <Container className="relative py-24 md:py-32">
          <Link to="/solutions" className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-on-surface-variant hover:text-primary-container transition-colors">
            <Icon name="arrow-left" size={13} /> All solutions
          </Link>
          <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.25em] text-outline">
            {s.num} <span className="text-primary-container">/</span> {s.eyebrow}
          </p>
          <h1 className="mt-5 font-display font-semibold text-display-lg text-on-surface max-w-4xl">
            <SplitText text={s.headline} immediate />
          </h1>
          <div className="mt-10 grid lg:grid-cols-12 gap-10">
            <p className="lg:col-span-7 text-on-surface-variant text-lg leading-relaxed">{s.intro}</p>
            <div className="lg:col-span-5 lg:pl-8 flex flex-wrap gap-8 items-start">
              {s.stats.map((st) => (
                <div key={st.label}>
                  <p className="font-display text-3xl md:text-4xl text-primary-container tracking-tightest">{st.value}</p>
                  <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-on-surface-variant mt-2">{st.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button to="/contact" size="lg" magnetic>
              Book a free diagnostic
            </Button>
            <Button href="#deliverables" variant="outline" size="lg" icon="chevron-down">
              What we deliver
            </Button>
          </div>
        </Container>
      </section>

      <KeyPoints
        items={s.stats.map((st) => ({ icon: 'circle-check', value: st.value, label: st.label }))}
      />

      <Section id="deliverables" tone="low" className="scroll-mt-20">
        <Container>
          <SectionHeader eyebrow="What we deliver" title="Concrete outputs, not a slide deck." size="md" />
          <Reveal stagger={80} className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {s.deliverables.map((d, i) => (
              <GlassCard key={d.title} padding="p-6 md:p-7">
                <p className="font-mono text-[10px] text-outline">{String(i + 1).padStart(2, '0')}</p>
                <h3 className="font-display text-lg text-on-surface leading-snug mt-4">{d.title}</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed mt-2">{d.desc}</p>
              </GlassCard>
            ))}
          </Reveal>
        </Container>
      </Section>

      <Section tone="base">
        <Container className="grid lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeader eyebrow="How it runs" title={s.process?.length ? 'Phase by phase.' : 'What you can expect.'} size="md" />
          </div>
          <div className="lg:col-span-7">
            {s.process?.length ? (
              <Reveal stagger={90} className="flex flex-col">
                {s.process.map((p) => (
                  <div key={p.num} className="grid grid-cols-[3rem_1fr] gap-4 py-5 hover:bg-surface-container-low/60 transition-colors rounded-sm px-2">
                    <span className="font-mono text-xs text-primary-container pt-1">{p.num}</span>
                    <div>
                      <h3 className="font-display text-lg text-on-surface">{p.title}</h3>
                      <p className="text-on-surface-variant text-sm leading-relaxed mt-1.5">{p.desc}</p>
                    </div>
                  </div>
                ))}
              </Reveal>
            ) : (
              <Reveal>
                <ul className="flex flex-col gap-3">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex gap-3 text-on-surface-variant leading-relaxed">
                      <Icon name="circle-check" size={16} className="mt-1 text-primary-container shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}
            <Reveal delay={120} className="mt-10">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-outline mb-3">Stack we reach for</p>
              <div className="flex flex-wrap gap-2">
                {s.tech.map((t) => (
                  <Tag key={t}>{t}</Tag>
                ))}
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {related.length > 0 && (
        <Section tone="lowest">
          <Container>
            <SectionHeader eyebrow="Related work" title="Where we have done this before." size="md" />
            <Reveal stagger={100} className="mt-10 grid md:grid-cols-3 gap-5">
              {related.slice(0, 3).map((w, i) => (
                <WorkCard key={w.slug} item={w} index={i} />
              ))}
            </Reveal>
          </Container>
        </Section>
      )}

      <FAQ items={faqs} tone="base" title={`Questions about ${s.title.toLowerCase()}.`} />

      <Section tone="low" padded={false} className="py-8">
        <Container className="flex items-center justify-between gap-6">
          <Eyebrow tone="muted">Next</Eyebrow>
          <Link to={`/solutions/${next.slug}`} className="group inline-flex items-center gap-3 font-display text-lg md:text-2xl text-on-surface hover:text-primary-container transition-colors">
            {next.title}
            <Icon name="arrow-right" size={20} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </Container>
      </Section>

      <CTASection />
    </>
  )
}

export default Component
