import { Link } from 'react-router-dom'
import { Icon } from './ui/index.js'
import { useCaseSolutions } from '../data/solutions.js'

// "Odoo for your business" links: POS, retail, manufacturing, billing, Ahmedabad.
export default function UseCaseLinks({ className = '', title = 'Odoo for your business' }) {
  return (
    <div className={className}>
      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-outline">{title}</p>
      <ul className="mt-4 flex flex-wrap gap-3">
        {useCaseSolutions.map((s) => (
          <li key={s.slug}>
            <Link
              to={`/solutions/${s.slug}`}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-surface-container-lowest px-4 py-2 text-sm font-semibold text-on-surface shadow-edge transition hover:text-primary hover:shadow-edge-strong"
            >
              <Icon name={s.icon} size={16} className="text-primary-container" />
              {s.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
