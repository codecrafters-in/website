export default function Tag({ children, active = false, as: Cmp = 'span', className = '', ...rest }) {
  return (
    <Cmp
      className={`inline-flex items-center font-mono text-[10px] uppercase tracking-[0.16em] px-2.5 py-1.5 rounded-sm transition-colors duration-300 ${
        active
          ? 'bg-primary-container text-on-primary-container'
          : 'text-on-surface-variant shadow-[inset_0_0_0_1px_rgb(var(--outline-variant))] hover:text-on-surface'
      } ${className}`}
      {...rest}
    >
      {children}
    </Cmp>
  )
}
