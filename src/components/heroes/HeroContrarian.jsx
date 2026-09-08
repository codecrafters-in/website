import Eyebrow from '../ui/Eyebrow.jsx'
import Icon from '../ui/Icon.jsx'
import SplitText from '../../effects/SplitText.jsx'
import { HeroFrame, HeroCta } from './HeroShell.jsx'

/**
 * Variant D — self-disqualifying.
 *
 * The thoughtbot move ("Don't hire thoughtbot to write code"). A headline that
 * argues against the obvious purchase reframes the buyer's problem, and the
 * reframe is the demonstration — you cannot fake having an opinion this
 * specific without having done the work.
 *
 * Highest risk of the four: it is memorable and filters hard, which is exactly
 * right for a studio with one delivery person and wrong for one that needs
 * volume. Worth testing precisely because it will not be neutral.
 */
const POSITION = [
  {
    icon: 'x',
    head: 'What we will not do',
    body: 'Rebuild what you already own because it is easier to quote. Most of the value is in the process around the system, not another module.',
  },
  {
    icon: 'circle-check',
    head: 'What we will do',
    body: 'Tell you which of your problems is actually a data problem, fix that first, and put the AI layer only where it survives contact with real users.',
  },
]

export default function HeroContrarian() {
  return (
    <HeroFrame>
      <div className="grid items-center gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <Eyebrow className="mb-7">Odoo ERP · AI automation · Ahmedabad</Eyebrow>
          <h1 className="font-display text-display-xl font-semibold text-on-surface">
            <SplitText text="Most Odoo problems" immediate stagger={0.05} />
            <br />
            <span className="molten-text">
              <SplitText text="are not Odoo problems." immediate delay={0.25} stagger={0.05} />
            </span>
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-on-surface-variant md:text-xl">
            They are process problems wearing a software costume. We will tell you which one you
            have before quoting a build — and quite often the answer is that you do not need one.
          </p>
          <HeroCta label="Tell us what is broken" variant="contrarian" />
        </div>

        <div className="lg:col-span-5 flex flex-col gap-4">
          {POSITION.map((p) => (
            <div key={p.head} className="rounded-xl bg-surface-container p-5 shadow-edge">
              <p className="flex items-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.22em] text-primary-container">
                <Icon name={p.icon} size={15} />
                {p.head}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-on-surface-variant">{p.body}</p>
            </div>
          ))}
          <p className="text-sm text-on-surface-variant">
            Free 45-minute diagnostic. If AI is the wrong tool, we say so.
          </p>
        </div>
      </div>
    </HeroFrame>
  )
}
