import { useState, useMemo } from 'react'
import SEO, { breadcrumb, itemList, webPage } from '../components/SEO.jsx'
import SectionHeader from '../components/SectionHeader.jsx'
import CTASection from '../components/CTASection.jsx'
import WorkCard from '../components/cards/WorkCard.jsx'
import { Section, Container, Eyebrow, Tag, Stat, Icon } from '../components/ui/index.js'
import Reveal from '../effects/Reveal.jsx'
import SplitText from '../effects/SplitText.jsx'
import { work, workCategories } from '../data/work.js'
import { stats } from '../data/stats.js'
import KeyPoints from '../components/KeyPoints.jsx'
import { keyPoints } from '../data/keyPoints.js'
import Aurora from '../components/Aurora.jsx'

export function Component() {
  const [cat, setCat] = useState('all')
  const filtered = useMemo(() => (cat === 'all' ? work : work.filter((w) => w.category?.includes(cat))), [cat])
  const featured = filtered.filter((w) => w.featured)
  const rest = filtered.filter((w) => !w.featured)
  const measured = stats.slice(0, 4)

  return (
    <>
      <SEO
        title="AI & ERP Solutions — Case Studies"
        description="Odoo ERP solutions and AI solutions shipped to production: agents over live ERP data, claims automation, lending platforms and forecasting dashboards. Measured outcomes."
        path="/work"
        jsonLd={[
          webPage({ name: 'Work — Case Studies', path: '/work', description: 'Odoo ERP and AI systems shipped to production.' }),
          breadcrumb([{ name: 'Home', path: '/' }, { name: 'Work', path: '/work' }]),
          itemList(
            'CodeCrafters case studies',
            work.filter((w) => w.body).map((w) => ({ name: w.title, path: `/work/${w.slug}` })),
          ),
        ]}
      />

      <section className="relative pt-[72px] overflow-hidden">
        <Aurora variant="soft" />
        <Container className="relative py-24 md:py-32 grid lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-7">
            <Eyebrow className="mb-7">Work</Eyebrow>
            <h1 className="font-display font-semibold text-display-xl text-on-surface">
              <SplitText text="Proof," immediate />
              <br />
              <span className="molten-text">
                <SplitText text="not promises." immediate delay={0.2} />
              </span>
            </h1>
            <p className="mt-8 text-on-surface-variant text-lg leading-relaxed max-w-xl">
              Each of these led with a problem, not a product. Every one shipped to production and is still running. Where we can share numbers, we do; where clients asked for anonymity, we kept it.
            </p>
          </div>
          <Reveal stagger={80} className="lg:col-span-5 grid grid-cols-2 gap-x-6 gap-y-8">
            {measured.map((s) => (
              <div key={s.id}>
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-brand-tint text-primary-container">
                  <Icon name={s.icon || 'circle-check'} size={17} />
                </span>
                <div className="mt-3">
                  <Stat value={s.value} prefix={s.prefix} suffix={s.suffix} decimals={s.decimals} label={s.label} size="sm" />
                </div>
              </div>
            ))}
          </Reveal>
        </Container>
      </section>

      <Section tone="low" padded={false} className="py-6 sticky top-[72px] z-30 bg-surface-container-low/85 glass-blur shadow-edge">
        <Container className="flex items-center gap-2 overflow-x-auto scrollbar-hide" role="group" aria-label="Filter case studies">
          {workCategories.map((c) => (
            <Tag key={c.id} as="button" type="button" active={cat === c.id} onClick={() => setCat(c.id)} aria-pressed={cat === c.id} className="cursor-pointer">
              {c.label}
              <span className="ml-2 opacity-60">{c.id === 'all' ? work.length : work.filter((w) => w.category?.includes(c.id)).length}</span>
            </Tag>
          ))}
        </Container>
      </Section>

      <KeyPoints items={keyPoints.work} />

      <Section tone="base">
        <Container>
          {featured.length > 0 && (
            <div key={`f-${cat}`} className="grid md:grid-cols-2 gap-5 mb-5">
              <h2 className="sr-only md:col-span-2">Featured case studies</h2>
              {featured.map((w, i) => (
                <Reveal key={w.slug} delay={i * 60} className={i === 0 ? 'md:col-span-2' : ''}>
                  <WorkCard item={w} index={i} featured={i === 0} />
                </Reveal>
              ))}
            </div>
          )}
          {rest.length > 0 && (
            <div key={`r-${cat}`} className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              <h2 className="sr-only md:col-span-2 lg:col-span-3">More work</h2>
              {rest.map((w, i) => (
                <Reveal key={w.slug} delay={(i % 3) * 70}>
                  <WorkCard item={w} index={i + 1} />
                </Reveal>
              ))}
            </div>
          )}
          {filtered.length === 0 && <p className="text-on-surface-variant text-center py-20">Nothing in this category yet.</p>}
        </Container>
      </Section>

      <Section tone="lowest">
        <Container>
          <SectionHeader eyebrow="In-house" title="We build for ourselves, too." lede="QuoteMaker started as an internal tool for sending proposals. It is now a product. Building our own SaaS keeps us honest about what enterprise software should feel like." size="md" />
        </Container>
      </Section>

      <CTASection title="Have a system that should be on this page?" secondary={{ label: 'Our solutions', to: '/solutions' }} />
    </>
  )
}

export default Component
