import Icon from '../ui/Icon.jsx'

export default function TestimonialCard({ item, className = '' }) {
  return (
    <figure className={`w-[320px] md:w-[400px] glass-card rounded-lg p-6 md:p-7 flex flex-col ${className}`}>
      <Icon name="quote" size={18} className="text-primary-container" />
      <blockquote className="mt-4 text-on-surface text-sm md:text-base leading-relaxed">“{item.quote}”</blockquote>
      <figcaption className="mt-6 flex items-end justify-between gap-4">
        <div>
          <p className="text-on-surface text-sm font-semibold">{item.name}</p>
          <p className="text-on-surface-variant text-xs mt-0.5">{item.title}</p>
        </div>
        {item.metric && <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-primary-container text-right max-w-[45%]">{item.metric}</p>}
      </figcaption>
    </figure>
  )
}
