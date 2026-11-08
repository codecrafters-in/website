import { Link } from 'react-router-dom'
import SectionHeader from './SectionHeader.jsx'
import { Section, Container, Icon } from './ui/index.js'
import { odooPricing, implementationPricing } from '../data/pricing.js'

// "What does Odoo cost in India?" answered on every Odoo page: Odoo's own
// licence prices plus our implementation price, as a plain table.
export default function OdooPricing({ tone = 'lowest' }) {
  return (
    <Section tone={tone} id="pricing" className="scroll-mt-20">
      <Container className="grid lg:grid-cols-12 gap-10 lg:gap-16">
        <div className="lg:col-span-4 min-w-0">
          <SectionHeader eyebrow="Pricing" title="What Odoo costs in India." size="md" />
          <p className="mt-5 text-on-surface-variant leading-relaxed">
            Two separate costs: the Odoo licence, paid to Odoo S.A., and the implementation, paid to us.
          </p>
        </div>
        <div className="lg:col-span-8 min-w-0">
          <h3 className="font-display text-lg text-on-surface">Odoo licence, per user per month</h3>
          <div className="mt-4 overflow-x-auto rounded-lg bg-surface-container-lowest shadow-edge">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead>
                <tr>
                  {['Plan', 'Billed yearly', 'Billed monthly', 'What it includes'].map((h) => (
                    <th key={h} scope="col" className="px-4 py-3 font-mono text-[10px] uppercase tracking-[0.16em] text-outline border-b border-outline-variant/40">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {odooPricing.plans.map((p) => (
                  <tr key={p.name} className="border-b border-outline-variant/25 last:border-0">
                    <td className="px-4 py-3 font-semibold text-on-surface">{p.name}</td>
                    <td className="px-4 py-3 text-on-surface tabular-nums">{p.yearly}</td>
                    <td className="px-4 py-3 text-on-surface-variant tabular-nums">{p.monthly}</td>
                    <td className="px-4 py-3 text-on-surface-variant leading-relaxed">{p.includes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-sm text-on-surface-variant">
            <strong className="text-on-surface">Example:</strong> {odooPricing.example}
          </p>
          <p className="mt-1 text-xs text-outline">
            Odoo&apos;s introductory prices for India as listed on{' '}
            <a href={odooPricing.source} target="_blank" rel="noreferrer" className="underline underline-offset-2">odoo.com/pricing</a> on {odooPricing.checked}. Odoo
            Community is free and self-hosted. Prices change; check the current figures before you budget.
          </p>

          <div className="mt-8 rounded-lg bg-brand-tint/60 p-6">
            <h3 className="font-display text-lg text-on-surface">Implementation by CodeCrafters</h3>
            <p className="mt-1 font-display text-3xl text-primary-container">From {implementationPricing.from}</p>
            <p className="mt-3 text-sm leading-relaxed text-on-surface-variant">{implementationPricing.summary}</p>
            <p className="mt-2 flex gap-2 text-sm leading-relaxed text-on-surface-variant">
              <Icon name="circle-check" size={16} className="mt-0.5 shrink-0 text-primary-container" />
              {implementationPricing.noMarkup}
            </p>
            <Link to="/contact" className="mt-5 inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-brand px-5 py-2.5 text-sm font-semibold text-on-primary-fixed shadow-molten hover:brightness-110">
              Get a fixed quote <Icon name="arrow-right" size={15} />
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  )
}
