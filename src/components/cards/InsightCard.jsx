import { Link } from 'react-router-dom'
import GlassCard from '../ui/GlassCard.jsx'
import Tag from '../ui/Tag.jsx'
import Icon from '../ui/Icon.jsx'

const fmt = (d) => new Date(d).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })

export default function InsightCard({ item, className = '' }) {
  return (
    <Link to={`/insights/${item.slug}`} className={`block h-full ${className}`}>
      <GlassCard className="h-full flex flex-col" padding="p-6 md:p-7">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-outline flex items-center gap-3">
          <span>{fmt(item.date)}</span>
          <span aria-hidden="true">·</span>
          <span>{item.readingTime}</span>
        </p>
        <h3 className="font-display text-lg md:text-xl text-on-surface leading-snug mt-4">{item.title}</h3>
        <p className="text-on-surface-variant text-sm leading-relaxed mt-3">{item.excerpt}</p>
        <div className="mt-auto pt-6 flex items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {item.tags?.slice(0, 2).map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </div>
          <Icon name="arrow-up-right" size={16} className="text-primary-container shrink-0" />
        </div>
      </GlassCard>
    </Link>
  )
}
