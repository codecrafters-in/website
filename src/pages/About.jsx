import { useEffect, useRef } from 'react'
import SEO, { breadcrumb, PERSON_ID, ORG_ID } from '../components/SEO.jsx'
import SectionHeader from '../components/SectionHeader.jsx'
import CTASection from '../components/CTASection.jsx'
import {Section, Container, Eyebrow, Heading, GlassCard, Icon, Stat} from '../components/ui/index.js'
import Reveal from '../effects/Reveal.jsx'
import SplitText from '../effects/SplitText.jsx'
import { site } from '../data/site.js'
import { founder } from '../data/founder.js'
import { stats } from '../data/stats.js'
import KeyPoints from '../components/KeyPoints.jsx'
import { keyPoints } from '../data/keyPoints.js'
import Aurora from '../components/Aurora.jsx'

const VALUES = [
  { icon: 'briefcase', title: 'Business first, code second', body: 'We start from the P&L line you want to move, then pick the technology. Never the other way round.' },
  { icon: 'trending-up', title: 'Compound value', body: 'Every system we ship is built to be extended. Month twelve should be cheaper than month one, not more expensive.' },
  { icon: 'shield-check', title: 'Boringly reliable', body: 'Exciting demos are easy. Quiet production is the job — systems still running years after handover, with no one thinking about them.' },
  { icon: 'users', title: 'Forward-deployed, not thrown over the wall', body: 'The people on the diagnostic call are the people writing the code. No offshore relay, no juniors learning on your account.' },
]

export function Component() {
  const progressRef = useRef(0)
  const trackRef = useRef(null)

  useEffect(() => {
    let ctx
    let cancelled = false
    ;(async () => {
      if (typeof window === 'undefined' || !trackRef.current) return
      const { gsap, ScrollTrigger } = await import('../lib/gsap.js')
      if (cancelled) return
      ctx = gsap.context(() => {
        ScrollTrigger.create({
          trigger: trackRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          onUpdate: (self) => {
            progressRef.current = self.progress
          },
        })
      })
    })()
    return () => {
      cancelled = true
      ctx?.revert()
    }
  }, [])

  const measured = stats.slice(0, 8)

  const jsonLd = [
    breadcrumb([{ name: 'Home', path: '/' }, { name: 'About', path: '/about' }]),
    {
      '@type': 'Person',
      '@id': PERSON_ID,
      name: founder.name,
      jobTitle: founder.role,
      worksFor: { '@id': ORG_ID },
      url: `${site.url}/about`,
    },
  ]

  return (
    <>
      <SEO
        title="AI & ERP Solutions Company in Ahmedabad"
        description={`CodeCrafters is an Odoo ERP and AI engineering studio in Ahmedabad, India. ${site.claims.modules} custom modules, ${site.claims.migrations} ERP migrations, and published research behind the work.`}
        path="/about"
        jsonLd={jsonLd}
      />

      <section className="relative pt-[72px] overflow-hidden">
        <Aurora variant="soft" />
        <Container className="relative py-24 md:py-32 grid lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-8">
            <Eyebrow className="mb-7">About</Eyebrow>
            <h1 className="font-display font-semibold text-display-xl text-on-surface">
              <SplitText text="We build systems" immediate />
              <br />
              <span className="molten-text">
                <SplitText text="that last." immediate delay={0.2} />
              </span>
            </h1>
          </div>
          <p className="lg:col-span-4 text-on-surface-variant text-lg leading-relaxed lg:pb-3">
            “The best system is the one your team never has to think about.” That line has guided every build since day one.
          </p>
        </Container>
      </section>

      <KeyPoints items={keyPoints.about} />

      {/* Why we exist */}
      <Section tone="low">
        <Container className="grid lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-4">
            <SectionHeader eyebrow="Why we exist" title="Most enterprise AI never leaves the demo." size="md" />
          </div>
          <Reveal className="lg:col-span-8 flex flex-col gap-5 text-on-surface-variant text-base md:text-lg leading-relaxed max-w-3xl">
            <p>
              CodeCrafters started inside the systems most agencies avoid: ERPs with a decade of customisations, finance teams reconciling by hand, warehouses running on spreadsheets. We learned that the intelligent part of an AI project is the easy part. The hard part is the data underneath it, the platform around it, and the people who have to trust it on a Monday morning.
            </p>
            <p>
              So we built a company that owns every layer. We design the agent and the pipeline, but we also fix the data model, harden the infrastructure, and sit with the operations team until the new workflow is boring. That is why our deployments are still running years later.
            </p>
            <p>
              We stay small on purpose. Founder-led, senior-only, {site.availability.note.toLowerCase()}. It is the only way we know to keep the promise in the headline.
            </p>
          </Reveal>
        </Container>
      </Section>

      {/* Values */}
      <Section tone="base">
        <Container>
          <SectionHeader eyebrow="How we work" title="Four rules we do not bend." align="center" size="md" />
          <Reveal stagger={90} className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {VALUES.map((v) => (
              <GlassCard key={v.title} padding="p-6 md:p-7" className="h-full">
                <span className="w-10 h-10 rounded-sm bg-surface-container-lowest shadow-edge flex items-center justify-center text-primary-container">
                  <Icon name={v.icon} size={18} />
                </span>
                <h3 className="font-display text-lg text-on-surface mt-6 leading-snug">{v.title}</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed mt-3">{v.body}</p>
              </GlassCard>
            ))}
          </Reveal>
        </Container>
      </Section>

      {/* Founder */}
      <Section tone="lowest" className="overflow-hidden">
        <Container className="relative grid lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <Reveal>
                <Eyebrow className="mb-5">Led by</Eyebrow>
                <Heading as="h2" size="md">
                  {founder.name}
                </Heading>
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-on-surface-variant mt-3">{founder.role} · {site.location.label}</p>
                <p className="text-on-surface text-lg leading-relaxed mt-6">{founder.tagline}</p>
                <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-8">
                  {founder.stats.map((s) => (
                    <Stat key={s.label} value={s.value} label={s.label} size="sm" />
                  ))}
                </div>
              </Reveal>
              <div className="relative mt-10 h-[260px] hidden lg:block rounded-lg overflow-hidden bg-surface-container-lowest shadow-edge">
                <p className="absolute bottom-4 left-4 font-mono text-[9px] uppercase tracking-[0.25em] text-outline">Forge core · scroll to heat</p>
              </div>
            </div>
          </div>
          <div className="lg:col-span-7">
            <Reveal className="flex flex-col gap-5 text-on-surface-variant leading-relaxed">
              {founder.bio.map((p, i) => (
                <p key={i} className={i === 0 ? 'text-on-surface text-lg' : ''}>
                  {p}
                </p>
              ))}
            </Reveal>

            <Reveal className="mt-12">
              <Eyebrow className="mb-5">Publications</Eyebrow>
              <ul className="flex flex-col gap-3">
                {founder.publications.map((p) => (
                  <li key={p.title} className="glass-card rounded-lg p-5 flex items-start gap-4">
                    <Icon name="book-open" size={18} className="text-primary-container mt-0.5 shrink-0" />
                    <div>
                      <p className="text-on-surface text-sm font-semibold leading-snug">{p.title}</p>
                      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-on-surface-variant mt-2">
                        {p.publisher}
                        {p.journal ? ` · ${p.journal}` : ''}
                        {p.year ? ` · ${p.year}` : ''}
                      </p>
                      {p.url && (
                        <a href={p.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-primary-container hover:text-primary mt-2">
                          doi:{p.doi} <Icon name="external-link" size={11} />
                        </a>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal stagger={80} className="mt-14 grid sm:grid-cols-2 gap-4">
              {founder.achievements.map((a) => (
                <GlassCard key={a.title} padding="p-5" lift={false}>
                  <div className="flex items-center justify-between">
                    <span className="text-primary-container">
                      <Icon name={a.icon} size={18} />
                    </span>
                    <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-outline">{a.category}</span>
                  </div>
                  <h3 className="font-display text-base text-on-surface mt-4 leading-snug">{a.title}</h3>
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-primary-container mt-1">{a.subtitle}</p>
                  <p className="text-on-surface-variant text-sm leading-relaxed mt-3">{a.description}</p>
                </GlassCard>
              ))}
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Real numbers */}
      <Section tone="low">
        <Container>
          <SectionHeader eyebrow="Measured" title="The numbers we can stand behind." size="md" />
          <Reveal stagger={70} className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
            {measured.map((s) => (
              <div key={s.id}>
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-brand-tint text-primary-container">
                  <Icon name={s.icon || 'circle-check'} size={17} />
                </span>
                <div className="mt-3">
                  <Stat value={s.value} prefix={s.prefix} suffix={s.suffix} decimals={s.decimals} label={s.label} tone="plain" size="sm" />
                </div>
              </div>
            ))}
          </Reveal>
        </Container>
      </Section>

      <CTASection title="Work with people who have shipped it before." secondary={{ label: 'See the work', to: '/work' }} />
    </>
  )
}

export default Component
