import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import SEO, { breadcrumb, faqNode, webPage } from '../components/SEO.jsx'
import SectionHeader from '../components/SectionHeader.jsx'
import LeadMagnet from '../components/LeadMagnet.jsx'
import FAQ from '../components/FAQ.jsx'
import IntentRouter from '../components/IntentRouter.jsx'
import TrustBar from '../components/TrustBar.jsx'
import Aurora from '../components/Aurora.jsx'
import Hero from '../components/heroes/index.jsx'
import KeyPoints from '../components/KeyPoints.jsx'
import AIStack from '../components/AIStack.jsx'
import CTASection from '../components/CTASection.jsx'
import WorkCard from '../components/cards/WorkCard.jsx'
import SolutionCard from '../components/cards/SolutionCard.jsx'
import InsightCard from '../components/cards/InsightCard.jsx'
import TestimonialCard from '../components/cards/TestimonialCard.jsx'
import { Section, Container, Eyebrow, Button, GlassCard, Stat, Marquee, DragScroller, Icon } from '../components/ui/index.js'
import Reveal from '../effects/Reveal.jsx'
import { site } from '../data/site.js'
import { solutions } from '../data/solutions.js'
import { featuredWork } from '../data/work.js'
import { testimonials, testimonialNote } from '../data/testimonials.js'
import { painPoints } from '../data/painPoints.js'
import { process } from '../data/process.js'
import { stats } from '../data/stats.js'
import { insights } from '../data/insights.js'
import { faqByScope } from '../data/faq.js'
import { credentials, deRisk } from '../data/keyPoints.js'
import { founder } from '../data/founder.js'

// Measured work only — see src/data/stats.js. No ROI or "enterprises served" claims.


function ProcessLine() {
  const ref = useRef(null)
  const fill = useRef(null)
  useEffect(() => {
    let ctx
    let cancelled = false
    ;(async () => {
      if (typeof window === 'undefined') return
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        if (fill.current) fill.current.style.transform = 'scaleX(1)'
        return
      }
      const { gsap } = await import('../lib/gsap.js')
      if (cancelled || !ref.current) return
      ctx = gsap.context(() => {
        gsap.fromTo(fill.current, { scaleX: 0 }, { scaleX: 1, ease: 'none', scrollTrigger: { trigger: ref.current, start: 'top 75%', end: 'bottom 45%', scrub: 0.6 } })
      }, ref)
    })()
    return () => {
      cancelled = true
      ctx?.revert()
    }
  }, [])
  return (
    <div ref={ref} className="absolute left-0 right-0 top-[22px] h-px bg-outline-variant/30 hidden lg:block" aria-hidden="true">
      <div ref={fill} className="h-full w-full bg-molten origin-left" style={{ transform: 'scaleX(0)' }} />
    </div>
  )
}

export function Component() {
  const proofStats = stats.slice(0, 8)
  const faqs = faqByScope('home')

  const jsonLd = [
    webPage({ name: 'Odoo ERP & AI Automation', path: '/', description: site.description }),
    breadcrumb([{ name: 'Home', path: '/' }]),
    faqs.length ? faqNode(faqs) : null,
  ]

  return (
    <>
      <SEO
        title="AI & Odoo ERP Solutions, Built to Ship"
        description={site.description}
        path="/"
        jsonLd={jsonLd}
      />

      <Hero />

      <TrustBar />

      <IntentRouter />

      {/* ── CREDENTIAL TICKER ──
          Was a scroll of industry/capability keywords, which proved nothing.
          Now the things a technical buyer can actually check. */}
      <div className="bg-surface-container-lowest py-5 shadow-edge">
        <Marquee duration={55} gap="gap-10">
          {credentials.map((c) => (
            <span key={c.label} className="flex items-center gap-10">
              <span className="inline-flex items-center gap-2.5 whitespace-nowrap">
                <Icon name={c.icon} size={17} className="text-primary-container shrink-0" />
                <span className="text-sm font-semibold text-on-surface">{c.label}</span>
              </span>
              <span className="text-outline text-[8px]" aria-hidden="true">◆</span>
            </span>
          ))}
        </Marquee>
      </div>

      {/* ── PAIN POINTS ── */}
      <Section tone="base" className="overflow-hidden">
        <Container>
          <SectionHeader eyebrow="Sound familiar?" title="The expensive stuff is rarely the dramatic stuff." lede="It is the daily manual work, the data nobody can find, and the systems that only one person understands. Here is what we usually find in the first week." />
        </Container>
        <div className="mt-12 -mx-0">
          <DragScroller>
            {painPoints.map((p, i) => (
              <GlassCard key={p.id} className="w-[300px] md:w-[340px] shrink-0 snap-start" padding="p-6">
                <div className="flex items-center justify-between">
                  <span className="w-10 h-10 rounded-sm bg-surface-container-lowest shadow-edge flex items-center justify-center text-primary-container">
                    <Icon name={p.icon} size={18} />
                  </span>
                  <span className="font-mono text-[10px] text-outline">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <h3 className="font-display text-lg text-on-surface mt-6 leading-snug">{p.title}</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed mt-2">{p.body}</p>
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-primary-container mt-5">{p.cost}</p>
              </GlassCard>
            ))}
          </DragScroller>
        </div>
      </Section>

      {/* ── SOLUTIONS BENTO ── */}
      <Section tone="low">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <SectionHeader eyebrow="What we do" title="One partner. Every layer of the stack." lede="AI on top, platforms in the middle, cloud and security underneath. We own the whole thing so nothing falls between vendors." />
            <Reveal delay={100}>
              <Button to="/solutions" variant="link" icon="arrow-right">
                All solutions
              </Button>
            </Reveal>
          </div>
          <Reveal stagger={90} className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {solutions.map((s, i) => (
              <div key={s.slug} className={i === 0 ? 'md:col-span-2' : ''}>
                <SolutionCard item={s} size={i === 0 ? 'lg' : 'md'} />
              </div>
            ))}
          </Reveal>
        </Container>
      </Section>

      <AIStack />

      {/* ── PROCESS ── */}
      <Section tone="base">
        <Container>
          <SectionHeader eyebrow="How it runs" title="Diagnose. Blueprint. Forge. Scale." lede="Four stages, one accountable team. Your first measurable win lands inside two weeks, or we tell you why it will not." align="center" />
          <div className="relative mt-16">
            <ProcessLine />
            <Reveal stagger={110} className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
              {process.map((step) => (
                <div key={step.num} className="relative pt-2">
                  <span className="relative z-[1] inline-flex w-11 h-11 rounded-full bg-surface-container-lowest shadow-edge items-center justify-center text-primary-container">
                    <Icon name={step.icon} size={18} />
                  </span>
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-outline mt-6">
                    {step.num} · {step.duration}
                  </p>
                  <h3 className="font-display text-xl text-on-surface mt-2">{step.title}</h3>
                  <p className="text-on-surface-variant text-sm leading-relaxed mt-3">{step.body}</p>
                </div>
              ))}
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ── PROOF ── */}
      <Section tone="lowest" className="overflow-hidden">
        <Aurora variant="soft" />
        <Container className="relative">
          <SectionHeader eyebrow="Proof, not promises" title="Numbers from real deployments." />
          <Reveal stagger={80} className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
            {proofStats.map((s) => (
              <div key={s.id}>
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand-tint text-primary-container">
                  <Icon name={s.icon || 'circle-check'} size={19} />
                </span>
                <div className="mt-4">
                  <Stat value={s.value} prefix={s.prefix} suffix={s.suffix} decimals={s.decimals} label={s.label} tone="accent" />
                </div>
              </div>
            ))}
          </Reveal>

          <div className="mt-24 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <SectionHeader eyebrow="Selected work" title="Built for teams that measure." size="md" />
            <Reveal delay={100}>
              <Button to="/work" variant="link" icon="arrow-right">
                All case studies
              </Button>
            </Reveal>
          </div>
          <Reveal stagger={100} className="mt-10 grid md:grid-cols-3 gap-5">
            {featuredWork.slice(0, 3).map((w, i) => (
              <WorkCard key={w.slug} item={w} index={i} />
            ))}
          </Reveal>
        </Container>

        <div className="mt-20">
          <Marquee duration={70} gap="gap-5" className="py-2">
            {testimonials.map((t) => (
              <TestimonialCard key={t.id} item={t} />
            ))}
          </Marquee>
          <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-outline text-center mt-5">{testimonialNote}</p>
        </div>
      </Section>

      {/* ── FOUNDER STRIP ── */}
      <Section tone="base">
        <Container>
          <GlassCard className="grid lg:grid-cols-3 gap-10 items-center" padding="p-8 md:p-12">
            <Reveal className="lg:col-span-2">
              <Eyebrow className="mb-5">How we work</Eyebrow>
              <h2 className="font-display text-display-sm text-on-surface">{founder.tagline}</h2>
              <p className="text-on-surface-variant mt-4 leading-relaxed max-w-2xl">{founder.bio[0]}</p>
              <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
                {founder.stats.map((s) => (
                  <p key={s.label} className="font-mono text-[11px] uppercase tracking-[0.18em] text-on-surface-variant">
                    <span className="text-primary-container font-bold">{s.value}</span> {s.label}
                  </p>
                ))}
              </div>
            </Reveal>
            <Reveal delay={120} className="flex lg:justify-end">
              <Button to="/about" variant="ghost" icon="arrow-up-right">
                How we work
              </Button>
            </Reveal>
          </GlassCard>
        </Container>
      </Section>

      {/* ── INSIGHTS ── */}
      <Section tone="low">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <SectionHeader eyebrow="Insights" title="Field notes from shipping AI." size="md" />
            <Reveal delay={100}>
              <Link to="/insights" className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-primary-container hover:text-primary">
                All articles <Icon name="arrow-right" size={13} />
              </Link>
            </Reveal>
          </div>
          <Reveal stagger={100} className="mt-10 grid md:grid-cols-3 gap-5">
            {insights.slice(0, 3).map((a) => (
              <InsightCard key={a.slug} item={a} />
            ))}
          </Reveal>
        </Container>
      </Section>

      <FAQ items={faqs} />

      <KeyPoints
        items={deRisk}
        eyebrow="How we de-risk it"
        title="What you are actually agreeing to."
        tone="base"
      />

      <LeadMagnet source="Home checklist" />
      <CTASection />
    </>
  )
}

export default Component
