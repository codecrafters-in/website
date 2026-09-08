export default function Eyebrow({ children, tone = 'accent', diamond = true, className = '', as: Tag = 'p' }) {
  const color = tone === 'muted' ? 'text-outline' : tone === 'light' ? 'text-on-surface-variant' : 'text-primary-container'
  return (
    <Tag className={`font-mono text-eyebrow uppercase ${color} inline-flex items-center gap-2.5 ${className}`}>
      {diamond && <span aria-hidden="true" className="text-[8px] leading-none">◆</span>}
      <span>{children}</span>
    </Tag>
  )
}
