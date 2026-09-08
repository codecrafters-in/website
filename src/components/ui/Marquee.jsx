// Pure-CSS infinite marquee. Children are rendered twice; the copy is aria-hidden.
export default function Marquee({ children, reverse = false, duration = 40, gap = 'gap-10', className = '', itemClassName = '' }) {
  const items = Array.isArray(children) ? children : [children]
  const render = (hidden) =>
    items.map((child, i) => (
      <div key={`${hidden ? 'b' : 'a'}-${i}`} className={`shrink-0 ${itemClassName}`} aria-hidden={hidden || undefined}>
        {child}
      </div>
    ))
  return (
    <div className={`overflow-hidden marquee-mask ${className}`}>
      <div
        className={`marquee-track flex w-max ${gap} ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'} motion-reduce:animate-none`}
        style={{ animationDuration: `${duration}s` }}
      >
        {render(false)}
        {render(true)}
      </div>
    </div>
  )
}
