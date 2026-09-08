import Counter from '../../effects/Counter.jsx'

export default function Stat({ value, prefix = '', suffix = '', decimals = 0, label, size = 'md', tone = 'accent', className = '' }) {
  const numeric = typeof value === 'number'
  const sizes = {
    sm: 'text-2xl md:text-3xl',
    md: 'text-3xl md:text-5xl',
    lg: 'text-5xl md:text-7xl',
  }
  const color = tone === 'accent' ? 'text-primary-container' : 'text-on-surface'
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <p className={`font-display font-semibold tracking-tightest leading-none ${sizes[size]} ${color}`}>
        {numeric ? <Counter value={value} prefix={prefix} suffix={suffix} decimals={decimals} /> : `${prefix}${value}${suffix}`}
      </p>
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-on-surface-variant">{label}</p>
    </div>
  )
}
