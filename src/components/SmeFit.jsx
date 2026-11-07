import { Link } from 'react-router-dom'
import SectionHeader from './SectionHeader.jsx'
import Reveal from '../effects/Reveal.jsx'
import { Section, Container, GlassCard, Icon } from './ui/index.js'
import { site } from '../data/site.js'

// "Is this for me?" in one screen: who we build Odoo for, the industries we
// have shipped in, and the moments people usually call us.
const INDUSTRY_ICONS = {
  'Logistics & Supply Chain': 'truck',
  'Financial Services': 'briefcase',
  Healthcare: 'heart-pulse',
  'Retail & eCommerce': 'shopping-bag',
  Manufacturing: 'factory',
  'Textiles & Wholesale': 'shirt',
}

const MOMENTS = [
  { icon: 'sheet', title: 'You have outgrown Tally and spreadsheets', body: 'Orders, stock and invoices live in different files, and month-end takes days.' },
  { icon: 'wrench', title: 'Your Odoo is half-finished', body: 'Workarounds nobody documented, modules that break, and staff back on Excel.' },
  { icon: 'refresh', title: 'You are stuck on an old version', body: 'Your Odoo is several versions behind and the upgrade feels too risky to start.' },
  { icon: 'puzzle', title: 'Odoo does 80% of what you need', body: 'The last 20% (an approval, a portal, a commission rule) needs a custom module.' },
]

export default function SmeFit() {
  return (
    <Section tone="base">
      <Container>
        <SectionHeader
          eyebrow="Who we help"
          title="Built for growing businesses, not big enterprises."
          lede="Most of our clients have 20 to 500 people, one or two warehouses, and a small team that cannot afford a system nobody uses. We keep it practical: the Odoo apps you need, set up the way you work."
        />

        <Reveal stagger={80} className="mt-12 grid sm:grid-cols-2 gap-4 md:gap-5">
          {MOMENTS.map((m) => (
            <GlassCard key={m.title} padding="p-6" className="flex gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-tint text-primary-container">
                <Icon name={m.icon} size={20} />
              </span>
              <span>
                <h3 className="font-display text-lg leading-snug text-on-surface">{m.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-on-surface-variant">{m.body}</p>
              </span>
            </GlassCard>
          ))}
        </Reveal>

        <div className="mt-14">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-outline">Industries we have worked in</p>
          <ul className="mt-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {site.industries.map((name) => (
              <li key={name} className="flex items-center gap-3 rounded-xl bg-surface-container-low px-4 py-3 shadow-edge">
                <Icon name={INDUSTRY_ICONS[name] || 'building'} size={18} className="shrink-0 text-primary-container" />
                <span className="text-sm font-semibold leading-tight text-on-surface">{name}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-on-surface-variant">
            Want to talk it through first?{' '}
            <a href={site.whatsappUrl} target="_blank" rel="noreferrer" className="font-semibold text-primary-container underline underline-offset-4">
              Talk to an engineer on WhatsApp
            </a>
            . Not sure where to start?{' '}
            <Link to="/contact" className="font-semibold text-primary-container underline underline-offset-4">
              Book a free 45-minute diagnostic
            </Link>{' '}
            and we will tell you which Odoo apps you actually need.
          </p>
        </div>
      </Container>
    </Section>
  )
}
