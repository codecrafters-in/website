import { Link } from 'react-router-dom'
import GlassCard from '../ui/GlassCard.jsx'
import Icon from '../ui/Icon.jsx'

export default function SolutionCard({ item, size = 'md', className = '' }) {
  const big = size === 'lg'
  return (
    <Link to={`/solutions/${item.slug}`} className={`block h-full ${className}`}>
      <GlassCard className="h-full flex flex-col" padding={big ? 'p-7 md:p-10' : 'p-6 md:p-7'}>
        <div className="flex items-start justify-between gap-4">
          <span className="w-11 h-11 rounded-sm bg-surface-container-lowest shadow-edge flex items-center justify-center text-primary-container">
            <Icon name={item.icon} size={20} />
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-outline">{item.num}</span>
        </div>
        <h3 className={`font-display text-on-surface mt-7 ${big ? 'text-2xl md:text-3xl' : 'text-lg md:text-xl'} leading-snug`}>{item.title}</h3>
        <p className={`text-on-surface-variant leading-relaxed mt-3 ${big ? 'text-base max-w-xl' : 'text-sm'}`}>{big ? item.intro : item.short}</p>
        {big && (
          <ul className="mt-6 grid sm:grid-cols-2 gap-x-6 gap-y-2">
            {item.bullets?.slice(0, 4).map((b) => (
              <li key={b} className="flex gap-2.5 text-sm text-on-surface-variant">
                <span className="mt-2 w-1.5 h-1.5 shrink-0 bg-primary-container" aria-hidden="true" />
                {b}
              </li>
            ))}
          </ul>
        )}
        <p className="mt-auto pt-6 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-primary-container">
          Explore <Icon name="arrow-right" size={13} />
        </p>
      </GlassCard>
    </Link>
  )
}
