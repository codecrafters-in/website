import Eyebrow from '../ui/Eyebrow.jsx'
import Icon from '../ui/Icon.jsx'
import SplitText from '../../effects/SplitText.jsx'
import { HeroFrame, HeroCta } from './HeroShell.jsx'
import { statById } from '../../data/stats.js'
import { founder } from '../../data/founder.js'

/**
 * Variant E — centred, with the system panel full-width beneath the copy and
 * cropped against the fold.
 *
 * The two-column grid split attention across a vertical seam and squeezed the
 * pipeline into a narrow column, which is the wrong shape for it — a pipeline
 * reads left to right. Centring the message on one axis and giving the diagram
 * the full width fixes both, and the crop at the bottom edge is what pulls the
 * eye down instead of a scroll cue asking politely.
 *
 * This is the pattern Linear, Stripe and Metalab converged on: one column of
 * message, one full-bleed artefact below it.
 */
const paper = founder.publications.find((x) => x.url)

const FLOW = [
  { kind: 'input', step: 'Plain-English question', note: '"What shipped to Surat last week?"' },
  { kind: 'llm', step: 'Model writes the query', note: 'Claude MCP' },
  { kind: 'guard', step: 'Role checked first', note: 'Before anything runs' },
  { kind: 'code', step: 'ORM executes it', note: 'Never raw SQL' },
  { kind: 'output', step: 'Answer in seconds', note: 'Every call logged' },
]

const DOT = {
  llm: 'bg-brand',
  guard: 'bg-primary-container',
  input: 'bg-outline',
  code: 'bg-outline',
  output: 'bg-outline',
}

const PROOF = ['modules', 'migrations', 'projects'].map((id) => statById[id])

export default function HeroFocus() {
  return (
    <HeroFrame align="top" pad="pt-16 md:pt-20">
      <div className="mx-auto max-w-3xl text-center">
        <Eyebrow className="mb-7 justify-center">Odoo ERP · AI automation · Ahmedabad</Eyebrow>
        <h1 className="font-display text-display-xl font-semibold text-on-surface">
          <SplitText text="ERP and AI that" immediate stagger={0.05} />
          <br />
          <span className="molten-text">
            <SplitText text="actually ship." immediate delay={0.25} stagger={0.05} />
          </span>
        </h1>
        <p className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-on-surface-variant md:text-xl">
          We implement, migrate and extend Odoo — then wire the AI layer on top, built by the
          engineer who scoped it.
        </p>
        <HeroCta variant="focus" align="center" />

        <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-9 gap-y-3">
          {PROOF.map((s) => (
            <li key={s.id} className="inline-flex items-baseline gap-2">
              <span className="font-display text-2xl leading-none tracking-tightest text-on-surface">
                {s.value}
                {s.suffix || ''}
              </span>
              <span className="text-sm text-on-surface-variant">{s.label}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Full-width artefact, cropped by the fold. The negative bottom margin is
          deliberate: the panel should look like it continues past the viewport. */}
      <div className="relative mx-auto mt-14 max-w-5xl md:mt-16">
        <div className="on-dark rounded-t-2xl bg-surface px-6 pb-10 pt-7 shadow-[0_-8px_64px_-24px_rgb(60_52_34_/_0.5)] md:px-9 md:pt-9">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="inline-flex items-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.22em] text-primary-container">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand" />
              </span>
              In production · ERP agent
            </p>
            <ul className="flex items-center gap-4">
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
          </div>

          {/* Horizontal on desktop — a pipeline should read left to right. */}
          <ol className="mt-7 flex flex-col gap-3 md:flex-row md:items-stretch">
            {FLOW.map((f, i) => (
              <li key={f.step} className="flex flex-1 items-center gap-3">
                <div className="flex-1 rounded-xl bg-surface-container p-4">
                  <span className={`inline-block h-1.5 w-1.5 rounded-full ${DOT[f.kind]}`} />
                  <p className="mt-2.5 text-sm font-semibold leading-tight text-on-surface">{f.step}</p>
                  <p className="mt-1 text-xs leading-snug text-on-surface-variant">{f.note}</p>
                </div>
                {i < FLOW.length - 1 && (
                  <Icon
                    name="arrow-right"
                    size={15}
                    className="shrink-0 rotate-90 text-outline md:rotate-0"
                    aria-hidden="true"
                  />
                )}
              </li>
            ))}
          </ol>

          <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-outline-variant pt-6">
            <p className="text-base font-semibold text-primary-container">
              The model never touches the database.
            </p>
            {paper && (
              <a
                href={paper.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-on-surface-variant transition hover:text-primary-container"
              >
                Peer-reviewed · {paper.publisher}
                <Icon name="external-link" size={14} />
              </a>
            )}
          </div>
        </div>
      </div>
    </HeroFrame>
  )
}
