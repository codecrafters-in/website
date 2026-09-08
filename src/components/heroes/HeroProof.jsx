import Eyebrow from '../ui/Eyebrow.jsx'
import Icon from '../ui/Icon.jsx'
import SplitText from '../../effects/SplitText.jsx'
import { HeroFrame, HeroCta } from './HeroShell.jsx'
import { statById } from '../../data/stats.js'
import { founder } from '../../data/founder.js'

/**
 * Variant C — proof-led, centred.
 *
 * Puts the verifiable numbers above the fold instead of a paragraph, on the
 * argument that for an NDA-bound firm the evidence *is* the pitch. Centred and
 * single-column, so it reads as a statement rather than a sales layout.
 *
 * Every figure links somewhere it can be checked — a dead number is just a
 * claim, and claims are what we spent this project removing.
 */
const paper = founder.publications.find((p) => p.url)

const PROOF = [
  { ...statById.modules, icon: 'database', to: '/solutions/enterprise-platforms' },
  { ...statById.migrations, icon: 'workflow', to: '/work' },
  { ...statById.projects, icon: 'circle-check', to: '/work' },
  { value: '2', label: 'Peer-reviewed papers', icon: 'book-open', href: paper?.url },
]

export default function HeroProof() {
  return (
    <HeroFrame>
      <div className="mx-auto max-w-4xl text-center">
        <Eyebrow className="mb-7 justify-center">Odoo ERP · AI automation · Ahmedabad</Eyebrow>
        <h1 className="font-display text-display-xl font-semibold text-on-surface">
          <SplitText text="Fifteen ERP migrations." immediate stagger={0.05} />
          <br />
          <span className="molten-text">
            <SplitText text="Zero records lost." immediate delay={0.25} stagger={0.05} />
          </span>
        </h1>
        <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-on-surface-variant md:text-xl">
          Odoo implementation, migration and custom modules — with the AI layer built on top by the
          same engineer who scoped it.
        </p>
        <HeroCta variant="proof" align="center" />
      </div>

      <ul className="mx-auto mt-16 grid max-w-4xl grid-cols-2 gap-4 lg:grid-cols-4">
        {PROOF.map((p) => {
          const body = (
            <>
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-tint text-primary-container">
                <Icon name={p.icon} size={21} />
              </span>
              <span className="mt-4 block font-display text-4xl leading-none tracking-tightest text-on-surface">
                {p.value}
                {p.suffix || ''}
              </span>
              <span className="mt-2 block text-sm leading-snug text-on-surface-variant">{p.label}</span>
            </>
          )
          const cls =
            'group flex h-full flex-col rounded-2xl bg-surface-container p-5 shadow-edge transition hover:-translate-y-1'
          return (
            <li key={p.label}>
              {p.href ? (
                <a href={p.href} target="_blank" rel="noreferrer" className={cls}>
                  {body}
                </a>
              ) : (
                <a href={p.to} className={cls}>
                  {body}
                </a>
              )}
            </li>
          )
        })}
      </ul>
    </HeroFrame>
  )
}
