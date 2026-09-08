import { Link } from 'react-router-dom'
import GlassCard from '../ui/GlassCard.jsx'
import Icon from '../ui/Icon.jsx'
import FactChips from '../FactChips.jsx'
import { whatsappUrl } from '../BookingFloat.jsx'
import { coverSources } from '../../lib/format.js'
import { track } from '../../lib/analytics.js'

// Warm brand washes. The previous set mixed dark-theme greys with
// `mix-blend-multiply`, which darkens rather than tints on a light ground.
const GRADIENTS = [
  'from-[#f5c518]/30 via-[#f5c518]/5 to-transparent',
  'from-[#e0af00]/25 via-[#ffe5a0]/10 to-transparent',
  'from-[#c97f00]/25 via-[#f5c518]/8 to-transparent',
]

export default function WorkCard({ item, index = 0, featured = false, className = '' }) {
  const hasDetail = Boolean(item.body)
  // Cards without a write-up used to end nowhere. A prefilled WhatsApp opener
  // is more useful than a page we would have to invent.
  const ask = hasDetail || item.link ? null : whatsappUrl(`/work#${item.slug}`)
  const cover = coverSources(item.image)
  const sizes = featured ? '(min-width: 1024px) 900px, 100vw' : '(min-width: 1024px) 440px, 100vw'
  const inner = (
    <GlassCard padding="p-0" className={`group h-full overflow-hidden ${className}`}>
      <div className={`relative ${featured ? 'aspect-[16/9]' : 'aspect-[16/10]'} bg-surface-container-lowest overflow-hidden`}>
        {cover && (
          <picture>
            <source type="image/avif" srcSet={cover.avif} sizes={sizes} />
            <source type="image/webp" srcSet={cover.webp} sizes={sizes} />
            <img
              src={cover.jpg}
              alt={`${item.title} — ${item.industry}`}
              width="1280"
              height="800"
              loading={featured ? 'eager' : 'lazy'}
              fetchPriority={featured ? 'high' : 'auto'}
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
            />
          </picture>
        )}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${GRADIENTS[index % GRADIENTS.length]} ${item.image ? 'opacity-60 mix-blend-multiply' : ''}`}
          aria-hidden="true"
        />
        <div className={`absolute inset-0 ${item.image ? 'opacity-25' : 'opacity-70'}`} aria-hidden="true" />
        {cover && (
          <div
            className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent"
            aria-hidden="true"
          />
        )}
        <span className="absolute top-4 left-4 font-mono text-[10px] uppercase tracking-[0.22em] text-white/85 drop-shadow">
          {item.industry}
        </span>
        {item.client === 'In-house product' && (
          <span className="absolute top-4 right-4 bg-primary-container text-on-primary-container font-mono text-[9px] uppercase tracking-[0.2em] px-2 py-1">
            In-house product
          </span>
        )}
        <div className="absolute left-5 right-5 bottom-5 flex items-end justify-between gap-4">
          <div className="flex gap-6">
            {item.metrics?.slice(0, featured ? 3 : 2).map((m) => (
              <div key={m.label}>
                <p className={`font-display ${featured ? 'text-3xl md:text-4xl' : 'text-2xl'} text-brand tracking-tightest leading-none drop-shadow`}>{m.value}</p>
                <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/80 mt-1.5">{m.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="p-6 md:p-7">
        {/* The problem leads, not the project name. "QuoteMaker" means nothing
            to a buyer; "quotes sent as WhatsApp messages" is recognised
            instantly. The name is kept as a small label for reference. */}
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-outline">{item.title}</p>
        <h3 className={`font-display ${featured ? 'text-xl md:text-2xl' : 'text-lg'} text-on-surface leading-snug mt-2`}>
          {item.challenge || item.title}
        </h3>
        {item.hardPart && (
          <div className="mt-4 flex items-start gap-2.5 rounded-lg bg-surface-container-low p-3.5">
            <Icon name="zap" size={15} className="mt-0.5 shrink-0 text-primary-container" />
            <p className="text-sm leading-snug text-on-surface">
              <span className="font-semibold">The hard part:</span>{' '}
              <span className="text-on-surface-variant">{item.hardPart}</span>
            </p>
          </div>
        )}
        <p className="text-on-surface-variant text-sm leading-relaxed mt-4">{item.summary}</p>
        {/* Scannable spec strip — where it ran, when, on what. The details a
            buyer checks before they read a word of the summary. */}
        <FactChips item={item} max={featured ? 4 : 3} className="mt-5" />
        {hasDetail && (
          <p className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary-container">
            Read case study <Icon name="arrow-right" size={16} />
          </p>
        )}
        {!hasDetail && item.link && (
          <a href={item.link} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary-container hover:text-primary">
            Read the paper <Icon name="external-link" size={15} />
          </a>
        )}
        {!hasDetail && !item.link && ask && (
          <a
            href={ask}
            target="_blank"
            rel="noreferrer"
            onClick={() => track('whatsapp_click', { location: 'work_card', slug: item.slug })}
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary-container hover:text-primary"
          >
            Ask about this build <Icon name="message-circle" size={15} />
          </a>
        )}
      </div>
    </GlassCard>
  )
  return hasDetail ? (
    <Link to={`/work/${item.slug}`} className="block h-full rounded-lg focus-visible:outline-primary-container">
      {inner}
    </Link>
  ) : (
    inner
  )
}
