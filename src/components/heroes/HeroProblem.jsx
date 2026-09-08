import Eyebrow from '../ui/Eyebrow.jsx'
import Icon from '../ui/Icon.jsx'
import SplitText from '../../effects/SplitText.jsx'
import { HeroFrame, HeroCta } from './HeroShell.jsx'

/**
 * Variant B — problem-led.
 *
 * The default hero opens with a claim about us ("ERP and AI that actually
 * ship"). This opens with a sentence the visitor recognises about themselves,
 * which is the same move that made the work cards land: name the pain in the
 * buyer's operational vocabulary before naming the capability.
 *
 * The three symptoms are the fastest self-qualification on the page — a reader
 * either nods at one of them or leaves, and both outcomes are useful.
 */
const SYMPTOMS = [
  {
    icon: 'clock',
    text: 'Month-end close still takes days because three people are reconciling by hand.',
  },
  {
    icon: 'server-crash',
    text: 'Half your Odoo modules were customised by someone who left, and nobody documented it.',
  },
  {
    icon: 'eye-off',
    text: 'Your data is in there somewhere, but nobody can get an answer without a developer.',
  },
]

export default function HeroProblem() {
  return (
    <HeroFrame>
      <div className="grid items-center gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <Eyebrow className="mb-7">Odoo ERP · AI automation · Ahmedabad</Eyebrow>
          <h1 className="font-display text-display-xl font-semibold text-on-surface">
            <SplitText text="Your ERP works." immediate stagger={0.05} />
            <br />
            <span className="molten-text">
              <SplitText text="Your team still doesn't." immediate delay={0.25} stagger={0.05} />
            </span>
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-on-surface-variant md:text-xl">
            Most ERP pain is not a software problem. It is the process around the software, and the
            data underneath it. We fix that first — then wire the AI layer on top.
          </p>
          <HeroCta variant="problem" />
        </div>

        <div className="lg:col-span-5">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary-container">
            Sound familiar?
          </p>
          <ul className="mt-5 flex flex-col gap-3">
            {SYMPTOMS.map((s) => (
              <li
                key={s.text}
                className="flex items-start gap-3.5 rounded-xl bg-surface-container p-4 shadow-edge"
              >
                <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-tint text-primary-container">
                  <Icon name={s.icon} size={18} />
                </span>
                <p className="text-sm leading-relaxed text-on-surface">{s.text}</p>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-sm text-on-surface-variant">
            If one of those is you, the next 45 minutes are free and specific.
          </p>
        </div>
      </div>
    </HeroFrame>
  )
}
