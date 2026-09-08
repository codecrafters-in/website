import { useCallback } from 'react'

export default function GlassCard({
  as: Tag = 'div',
  lift = true,
  padding = 'p-6 md:p-8',
  className = '',
  children,
  ...rest
}) {
  const onMove = useCallback((e) => {
    const el = e.currentTarget
    const r = el.getBoundingClientRect()
    el.style.setProperty('--mx', `${e.clientX - r.left}px`)
    el.style.setProperty('--my', `${e.clientY - r.top}px`)
  }, [])
  return (
    <Tag
      className={`glass-card rounded-lg ${lift ? 'glass-card-lift' : ''} ${padding} ${className}`}
      onMouseMove={onMove}
      {...rest}
    >
      <div className="relative z-[1] h-full">{children}</div>
    </Tag>
  )
}
