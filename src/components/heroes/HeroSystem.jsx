import { useEffect, useState } from 'react'
import Eyebrow from '../ui/Eyebrow.jsx'
import Icon from '../ui/Icon.jsx'
import Stat from '../ui/Stat.jsx'
import SplitText from '../../effects/SplitText.jsx'
import { HeroFrame, HeroCta } from './HeroShell.jsx'
import { statById } from '../../data/stats.js'
import { founder } from '../../data/founder.js'

/**
 * Variant A (default) — mechanism-led.
 *
 * An ink panel on a light page is the highest-contrast object on screen, so the
 * eye lands there first — and what it lands on is the actual pipeline, with the
 * model's position relative to the guardrails made visible. "The model never
 * touches the database" is the whole pitch in seven words.
 */
const heroStats = ['modules', 'migrations', 'projects'].map((id) => statById[id])
const paper = founder.publications.find((x) => x.url)

const QUESTIONS = [
  '"What did we ship to Surat last week?"',
  '"Which invoices are more than 30 days overdue?"',
  '"Stock on hand for SKU 4471, all warehouses?"',
  '"Which agent earned the most commission in March?"',
]

const HERO_FLOW = [
  { kind: 'input', step: 'Someone asks in plain English', note: '"What did we ship to Surat last week?"' },
  { kind: 'llm', step: 'Model turns it into a query', note: 'Claude MCP' },
  { kind: 'guard', step: 'Their role is checked first', note: 'Before anything executes' },
  { kind: 'code', step: 'ORM runs it — never raw SQL', note: 'Scoped to what they could already see' },
  { kind: 'output', step: 'Answer in seconds', note: 'Every call logged' },
]

export default function HeroSystem() {
  const [q, setQ] = useState(0)

  useEffect(() => {
    // Paused for anyone who has asked the OS for reduced motion.
    if (typeof window === 'undefined') return undefined
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return undefined
    const t = setInterval(() => setQ((i) => (i + 1) % QUESTIONS.length), 3800)
    return () => clearInterval(t)
  }, [])

  return (
    <HeroFrame>
      <div className="grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <Eyebrow className="mb-7">Odoo ERP · AI automation · Ahmedabad</Eyebrow>
            <h1 className="font-display font-semibold text-display-xl text-on-surface">
              <SplitText text="ERP and AI that" immediate stagger={0.05} />
              <br />
              <span className="molten-text">
                <SplitText text="actually ship." immediate delay={0.25} stagger={0.05} />
              </span>
            </h1>
            <p className="mt-8 text-on-surface-variant text-lg md:text-xl leading-relaxed max-w-xl">
              We implement, migrate and extend Odoo — then wire the AI layer on top. Agents, RAG and LLM pipelines running against your live business data, built by the engineer who scopes them.
            </p>
            <HeroCta variant="system" />
            <div className="mt-12 flex flex-wrap gap-x-12 gap-y-6">
              {heroStats.map((s) => (
                <Stat key={s.label} size="sm" {...s} />
              ))}
            </div>
          </div>
          {/* Visual anchor. An ink panel on a light page is the highest-contrast
              thing on the screen, so the eye lands here first — and what it
              lands on is the actual mechanism, which is the differentiator. */}
          <div className="lg:col-span-4 relative">
            {/* Soft amber bloom behind the panel — gives it depth without a
                pattern, and picks up the aurora backdrop. */}
            <div
              className="pointer-events-none absolute -inset-6 rounded-[2rem] bg-[radial-gradient(60%_50%_at_50%_40%,rgb(var(--brand)/0.22),transparent_75%)] blur-xl"
              aria-hidden="true"
            />
            {/* Floating credential, overlapping the panel edge so the two read
                as layered rather than stacked. */}
            <span className="absolute -top-3 right-4 z-[2] inline-flex items-center gap-1.5 rounded-full bg-brand px-3 py-1.5 text-[11px] font-semibold text-on-primary-fixed shadow-molten">
              <Icon name="circle-check" size={13} />
              Live in production
            </span>
            <div className="relative on-dark rounded-2xl bg-surface p-6 shadow-[0_28px_64px_-24px_rgb(60_52_34_/_0.45)]">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-brand" />
                </span>
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary-container">
                  In production · ERP agent
                </p>
              </div>

              <ul className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 border-t border-outline-variant pt-4">
                {[
                  ['bg-brand', 'Model'],
                  ['bg-primary-container', 'Guardrail'],
                  ['bg-outline', 'Deterministic'],
                ].map(([c, l]) => (
                  <li
                    key={l}
                    className="inline-flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.16em] text-outline"
                  >
                    <span className={`h-2 w-2 rounded-sm ${c}`} />
                    {l}
                  </li>
                ))}
              </ul>

              <ol className="mt-4 flex flex-col gap-2.5">
                {HERO_FLOW.map((f) => (
                  <li key={f.step} className="flex items-start gap-3">
                    <span
                      className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${
                        f.kind === 'llm' ? 'bg-brand' : f.kind === 'guard' ? 'bg-primary-container' : 'bg-outline'
                      }`}
                    />
                    <span className="min-w-0">
                      <span className="block text-sm font-semibold leading-tight text-on-surface">{f.step}</span>
                      <span
                        key={f.kind === 'input' ? q : f.step}
                        className={`block truncate text-xs leading-snug text-on-surface-variant ${
                          f.kind === 'input' ? 'animate-pulse-trail motion-reduce:animate-none' : ''
                        }`}
                      >
                        {f.kind === 'input' ? QUESTIONS[q] : f.note}
                      </span>
                    </span>
                  </li>
                ))}
              </ol>

              <p className="mt-5 border-t border-outline-variant pt-4 text-sm font-semibold text-primary-container">
                The model never touches the database.
              </p>
            </div>

            <a
              href={paper.url}
              target="_blank"
              rel="noreferrer"
              className="mt-4 flex items-center justify-between gap-4 rounded-xl bg-surface-container p-4 shadow-edge transition hover:shadow-edge-strong"
            >
              <span>
                <span className="block font-mono text-[10px] uppercase tracking-[0.22em] text-primary-container">
                  Peer-reviewed
                </span>
                <span className="mt-1 block text-sm leading-snug text-on-surface">
                  {paper.publisher} · {paper.journal}, {paper.year}
                </span>
              </span>
              <Icon name="external-link" size={16} className="shrink-0 text-primary-container" />
            </a>
          </div>
      </div>    </HeroFrame>
  )
}
