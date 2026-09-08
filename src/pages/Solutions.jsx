import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import SEO, { breadcrumb, faqNode } from '../components/SEO.jsx'
import SectionHeader from '../components/SectionHeader.jsx'
import CTASection from '../components/CTASection.jsx'
import FAQ from '../components/FAQ.jsx'
import WorkCard from '../components/cards/WorkCard.jsx'
import { Section, Container, Eyebrow, Heading, Button, GlassCard, Icon, Tag } from '../components/ui/index.js'
import Reveal from '../effects/Reveal.jsx'
import SplitText from '../effects/SplitText.jsx'
import { solutions } from '../data/solutions.js'
import { pricing } from '../data/pricing.js'
import { faq } from '../data/faq.js'
import { workBySlug } from '../data/work.js'
import KeyPoints from '../components/KeyPoints.jsx'
import { keyPoints } from '../data/keyPoints.js'
import Aurora from '../components/Aurora.jsx'

const solutionFaqs = faq.filter((f) => f.scope?.some((s) => s === 'solutions' || s.startsWith('solutions:'))).slice(0, 6)

function StickyNav() {
  const [active, setActive] = useState(solutions[0].slug)
  useEffect(() => {
    const els = solutions.map((s) => document.getElementById(s.slug)).filter(Boolean)
    if (!els.length || typeof IntersectionObserver === 'undefined') return undefined
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      { rootMargin: '-30% 0px -60% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
  return (
    <nav className="sticky top-[72px] z-30 bg-surface/80 glass-blur shadow-edge hidden md:block" aria-label="Solutions sections">
      <Container className="flex items-center gap-1 overflow-x-auto scrollbar-hide py-2">
        {solutions.map((s) => (
          <a
            key={s.slug}
            href={`#${s.slug}`}
            className={`whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.2em] px-3 py-2 rounded-sm transition-colors ${
              active === s.slug ? 'text-primary-container bg-surface-container-low' : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            {s.num} {s.title}
          </a>
        ))}
        <a href="#engagement" className="ml-auto whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.2em] px-3 py-2 text-on-surface-variant hover:text-primary-container">
          Engagement models
        </a>
      </Container>
    </nav>
  )
}

export function Component() {
  return (
    <>
      <SEO
        title="AI, ERP & Business Solutions"
        description="AI solutions, Odoo ERP solutions and business solutions from one accountable team: agents and RAG, ERP implementation and migration, dashboards, cloud and security."
        path="/solutions"
        jsonLd={[breadcrumb([{ name: 'Home', path: '/' }, { name: 'Solutions', path: '/solutions' }]), faqNode(solutionFaqs)]}
      />

      <section className="relative pt-[72px] overflow-hidden">
        <Aurora variant="soft" />
        <Container className="relative py-24 md:py-32 grid lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-8">
            <Eyebrow className="mb-7">Solutions</Eyebrow>
            <h1 className="font-display font-semibold text-display-xl text-on-surface">
              <SplitText text="One partner." immediate />
              <br />
              <span className="molten-text">
                <SplitText text="Every layer of the stack." immediate delay={0.2} />
              </span>
            </h1>
          </div>
          <p className="lg:col-span-4 text-on-surface-variant text-lg leading-relaxed lg:pb-3">
            Most AI projects fail on the boring layers: data, platforms, infrastructure, security. We own all of them, so the intelligent part actually reaches production.
          </p>
        </Container>
      </section>

      <KeyPoints items={keyPoints.solutions} />

      <StickyNav />

      {solutions.map((s, i) => (
        <Section key={s.slug} id={s.slug} tone={i % 2 === 0 ? 'base' : 'low'} className="scroll-mt-32">
          <Container className="grid lg:grid-cols-12 gap-10 lg:gap-16">
            <div className="lg:col-span-5">
              <Reveal>
                <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-outline">
                  {s.num} <span className="text-primary-container">/</span> {s.eyebrow}
                </p>
                <span className="mt-6 w-12 h-12 rounded-sm bg-surface-container-lowest shadow-edge flex items-center justify-center text-primary-container">
                  <Icon name={s.icon} size={22} />
                </span>
                <Heading size="md" className="mt-6">
                  {s.headline}
                </Heading>
                <p className="text-on-surface-variant mt-5 leading-relaxed">{s.intro}</p>
                <ul className="mt-7 flex flex-col gap-2.5">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex gap-3 text-sm text-on-surface-variant">
                      <span className="mt-[0.6em] w-1.5 h-1.5 shrink-0 bg-primary-container" aria-hidden="true" />
                      {b}
                    </li>
                  ))}
                </ul>
                <div className="mt-8 flex flex-wrap gap-2">
                  {s.tech.slice(0, 8).map((t) => (
                    <Tag key={t}>{t}</Tag>
                  ))}
                </div>
                <Button to={`/solutions/${s.slug}`} variant="link" icon="arrow-right" className="mt-8">
                  {s.title} in depth
                </Button>
              </Reveal>
            </div>
            <div className="lg:col-span-7">
              <Reveal stagger={80} className="grid sm:grid-cols-2 gap-4">
                {s.deliverables.slice(0, 4).map((d) => (
                  <GlassCard key={d.title} padding="p-6">
                    <h3 className="font-display text-base text-on-surface leading-snug">{d.title}</h3>
                    <p className="text-on-surface-variant text-sm leading-relaxed mt-2">{d.desc}</p>
                  </GlassCard>
                ))}
              </Reveal>
              <Reveal delay={150} className="mt-4 grid grid-cols-3 gap-4">
                {s.stats.map((st) => (
                  <div key={st.label} className="bg-surface-container-lowest rounded-lg p-5 shadow-edge">
                    <p className="font-display text-2xl md:text-3xl text-primary-container tracking-tightest">{st.value}</p>
                    <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-on-surface-variant mt-2">{st.label}</p>
                  </div>
                ))}
              </Reveal>
              {s.related?.length > 0 && (
                <Reveal delay={200} className="mt-6 flex flex-wrap gap-3 items-center">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-outline">Related work</span>
                  {s.related.map((slug) => {
                    const w = workBySlug[slug]
                    if (!w) return null
                    return w.body ? (
                      <Link key={slug} to={`/work/${slug}`} className="text-sm text-on-surface hover:text-primary-container transition-colors underline-offset-4 hover:underline">
                        {w.title}
                      </Link>
                    ) : (
                      <span key={slug} className="text-sm text-on-surface-variant">{w.title}</span>
                    )
                  })}
                </Reveal>
              )}
            </div>
          </Container>
        </Section>
      ))}

      {/* Engagement models */}
      <Section id="engagement" tone="lowest" className="scroll-mt-24 overflow-hidden">
        <Container className="relative">
          <SectionHeader eyebrow="Engagement models" title="Start free. Scale when it works." lede="Every engagement begins with a diagnostic we do not charge for. From there you choose the shape that fits." align="center" />
          <Reveal stagger={100} className="mt-14 grid md:grid-cols-3 gap-5 items-stretch">
            {pricing.map((p) => (
              <div key={p.id} className={`rounded-lg p-7 md:p-8 flex flex-col ${p.highlight ? 'bg-molten text-on-primary shadow-molten-lg' : 'glass-card'}`}>
                <p className={`font-mono text-[10px] uppercase tracking-[0.22em] ${p.highlight ? 'text-on-primary/80' : 'text-primary-container'}`}>{p.tier}</p>
                <p className={`font-display text-3xl mt-3 ${p.highlight ? 'text-on-primary' : 'text-on-surface'}`}>{p.price}</p>
                <p className={`text-sm mt-3 leading-relaxed ${p.highlight ? 'text-on-primary/85' : 'text-on-surface-variant'}`}>{p.tagline}</p>
                <ul className="mt-6 flex flex-col gap-2.5 flex-1">
                  {p.items.map((it) => (
                    <li key={it} className={`flex gap-2.5 text-sm ${p.highlight ? 'text-on-primary/90' : 'text-on-surface-variant'}`}>
                      <Icon name="check" size={14} className={`mt-1 shrink-0 ${p.highlight ? 'text-on-primary' : 'text-primary-container'}`} />
                      {it}
                    </li>
                  ))}
                </ul>
                <Button to={p.cta.to} variant={p.highlight ? 'dark' : 'outline'} className="mt-8 w-full">
                  {p.cta.label}
                </Button>
              </div>
            ))}
          </Reveal>
        </Container>
      </Section>

      <FAQ items={solutionFaqs} tone="base" />

      {/* Related featured work strip */}
      <Section tone="low">
        <Container>
          <SectionHeader eyebrow="In practice" title="What this looks like when it ships." size="md" />
          <Reveal stagger={100} className="mt-10 grid md:grid-cols-3 gap-5">
            {['conversational-ai-agent-erp', 'line-of-credit-platform', 'forecasting-traceability-dashboards']
              .map((slug) => workBySlug[slug])
              .filter(Boolean)
              .map((w, i) => (
                <WorkCard key={w.slug} item={w} index={i} />
              ))}
          </Reveal>
        </Container>
      </Section>

      <CTASection />
    </>
  )
}

export default Component
