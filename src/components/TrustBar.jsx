import { Link } from 'react-router-dom'
import Container from './ui/Container.jsx'
import Icon from './ui/Icon.jsx'
import Reveal from '../effects/Reveal.jsx'
import { founder } from '../data/founder.js'

/**
 * The spec bar.
 *
 * Same job as the row of specs under a phone launch — chip, camera, battery.
 * Not a description a visitor has to read, but four large, scannable facts that
 * answer the questions a buyer is actually deciding on, in the first screen.
 *
 * Deliberately big: the earlier version of this was 11px chips, which is a
 * footnote, not a decision aid. The number leads, the label explains, the line
 * underneath qualifies it. Two of the four are independently verifiable.
 */
const paper = founder.publications.find((p) => p.url)

const SPECS = [
  {
    id: 'production',
    icon: 'circle-check',
    value: '30+',
    label: 'Systems in production',
    note: 'Still running. Not pilots, not demos.',
    to: '/work',
    cta: 'See the work',
  },
  {
    id: 'odoo',
    icon: 'database',
    value: '120+',
    label: 'Odoo modules shipped',
    note: '15+ ERP migrations, zero records lost.',
    to: '/solutions/enterprise-platforms',
    cta: 'Odoo work',
  },
  {
    id: 'research',
    icon: 'book-open',
    value: '2',
    label: 'Peer-reviewed papers',
    note: `Published in ${paper?.publisher || 'Elsevier'}. Check it yourself.`,
    href: paper?.url,
    cta: 'Read the paper',
  },
  {
    id: 'access',
    icon: 'message-circle',
    value: 'FDE',
    label: 'Forward-deployed engineering',
    note: 'One engineer, embedded, start to finish. No account managers.',
    to: '/about',
    cta: 'How we work',
  },
]

function SpecCard({ s }) {
  const inner = (
    <>
      <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-tint text-primary-container">
        <Icon name={s.icon} size={24} />
      </span>
      <p className="mt-5 font-display text-5xl leading-none tracking-tightest text-on-surface">{s.value}</p>
      <p className="mt-3 text-base font-semibold leading-snug text-on-surface">{s.label}</p>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-on-surface-variant">{s.note}</p>
      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-container">
        {s.cta}
        <Icon
          name={s.href ? 'external-link' : 'arrow-right'}
          size={15}
          className="transition-transform group-hover:translate-x-1"
        />
      </span>
    </>
  )

  const cls =
    'group flex flex-col rounded-2xl bg-surface-container p-6 shadow-edge transition duration-300 hover:-translate-y-1 hover:shadow-[inset_0_0_0_1.5px_rgb(var(--brand)),0_24px_48px_-24px_rgb(var(--shadow)/0.25)]'

  return s.href ? (
    <a href={s.href} target="_blank" rel="noreferrer" className={cls}>
      {inner}
    </a>
  ) : (
    <Link to={s.to} className={cls}>
      {inner}
    </Link>
  )
}

export default function TrustBar() {
  return (
    <section aria-label="Why teams trust us" className="relative bg-surface-container-low pb-16 pt-14 md:pb-20">
      <Container>
        <Reveal stagger={70} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SPECS.map((s) => (
            <SpecCard key={s.id} s={s} />
          ))}
        </Reveal>
      </Container>
    </section>
  )
}
