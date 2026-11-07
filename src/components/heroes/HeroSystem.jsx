import Eyebrow from '../ui/Eyebrow.jsx'
import Icon from '../ui/Icon.jsx'
import Stat from '../ui/Stat.jsx'
import SplitText from '../../effects/SplitText.jsx'
import OdooApps from '../OdooApps.jsx'
import { HeroFrame, HeroCta } from './HeroShell.jsx'
import { statById } from '../../data/stats.js'

/**
 * Variant A (default) — Odoo-first.
 *
 * A visitor should know in one glance that we do Odoo, for growing businesses.
 * The headline says it in words; the app grid on the right says it in pictures.
 */
const heroStats = ['modules', 'migrations', 'projects'].map((id) => statById[id])

const FOR_WHO = ['Moving off Tally or spreadsheets', 'Fixing an Odoo that nobody uses', 'Upgrading an old Odoo version']

export default function HeroSystem() {
  return (
    <HeroFrame>
      <div className="grid items-center gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <Eyebrow className="mb-7">Odoo specialists for growing businesses</Eyebrow>
          <h1 className="font-display font-semibold text-display-xl text-on-surface">
            <SplitText text="Odoo that your team" immediate stagger={0.05} />{' '}
            <br />
            <span className="molten-text">
              <SplitText text="actually uses." immediate delay={0.25} stagger={0.05} />
            </span>
          </h1>
          <p className="mt-8 text-on-surface-variant text-lg md:text-xl leading-relaxed max-w-xl">
            We set up, migrate and customise Odoo for small and mid-sized businesses (20 to 500 people), then add AI where it saves real hours. You talk straight to the engineer who builds it.
          </p>
          <ul className="mt-6 flex flex-col gap-2">
            {FOR_WHO.map((t) => (
              <li key={t} className="flex items-center gap-2.5 text-on-surface text-base">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-tint text-primary-container">
                  <Icon name="check" size={13} strokeWidth={2.5} />
                </span>
                {t}
              </li>
            ))}
          </ul>
          <HeroCta label="Book a free 45-min diagnostic" secondaryLabel="See our Odoo services" secondaryTo="/solutions" />
          <div className="mt-12 flex flex-wrap gap-x-12 gap-y-6">
            {heroStats.map((s) => (
              <Stat key={s.label} size="sm" {...s} />
            ))}
          </div>
        </div>
        <div className="lg:col-span-5 relative">
          <div
            className="pointer-events-none absolute -inset-6 rounded-[2rem] bg-[radial-gradient(60%_50%_at_50%_40%,rgb(var(--brand)/0.22),transparent_75%)] blur-xl"
            aria-hidden="true"
          />
          <span className="absolute -top-3 right-4 z-[2] inline-flex items-center gap-1.5 rounded-full bg-brand px-3 py-1.5 text-[11px] font-semibold text-on-primary-fixed shadow-molten">
            <Icon name="circle-check" size={13} />
            120+ custom modules shipped
          </span>
          <OdooApps className="relative" />
          <div className="relative mt-4 flex items-center gap-3 rounded-xl bg-surface-container p-4 shadow-edge">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-tint text-primary-container">
              <Icon name="bot" size={18} />
            </span>
            <span className="text-sm leading-snug text-on-surface">
              <span className="font-semibold">Plus AI inside Odoo:</span> ask questions in plain English, read invoices automatically.
            </span>
          </div>
        </div>
      </div>
    </HeroFrame>
  )
}
