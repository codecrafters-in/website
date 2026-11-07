import { Link } from 'react-router-dom'
import { Container, Icon } from './ui/index.js'
import { clients } from '../data/clients.js'
import { workBySlug } from '../data/work.js'

// Named proof directly under the hero: real businesses and what we built for them.
export default function ClientStrip() {
  return (
    <section aria-labelledby="clients-heading" className="bg-surface py-10">
      <Container>
        <h2 id="clients-heading" className="font-mono text-[10px] uppercase tracking-[0.22em] text-outline">
          Businesses running on systems we built
        </h2>
        <ul className="mt-5 grid gap-3 sm:grid-cols-3">
          {clients.map((c) => {
            const href = c.workSlug && workBySlug[c.workSlug]?.body ? `/work/${c.workSlug}` : null
            const inner = (
              <>
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-tint text-primary-container">
                  <Icon name={c.icon} size={18} />
                </span>
                <span className="min-w-0">
                  <span className="block font-display text-lg leading-tight text-on-surface">{c.name}</span>
                  <span className="block text-sm text-on-surface-variant">{c.work}</span>
                </span>
                {href && <Icon name="arrow-up-right" size={16} className="ml-auto shrink-0 text-primary-container" />}
              </>
            )
            return (
              <li key={c.name}>
                {href ? (
                  <Link to={href} className="flex items-center gap-4 rounded-xl bg-surface-container-low p-4 shadow-edge transition hover:shadow-edge-strong">
                    {inner}
                  </Link>
                ) : (
                  <div className="flex items-center gap-4 rounded-xl bg-surface-container-low p-4 shadow-edge">{inner}</div>
                )}
              </li>
            )
          })}
        </ul>
      </Container>
    </section>
  )
}
