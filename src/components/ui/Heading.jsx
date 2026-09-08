import SplitText from '../../effects/SplitText.jsx'

const SIZES = {
  xl: 'text-display-xl',
  lg: 'text-display-lg',
  md: 'text-display-md',
  sm: 'text-display-sm',
  xs: 'text-xl md:text-2xl tracking-tight',
}

export default function Heading({ as: Tag = 'h2', size = 'lg', split = false, className = '', children, ...rest }) {
  const base = `font-display font-semibold text-on-surface ${SIZES[size] || SIZES.lg} ${className}`
  if (split && typeof children === 'string') {
    return (
      <Tag className={base} {...rest}>
        <SplitText text={children} immediate />
      </Tag>
    )
  }
  return (
    <Tag className={base} {...rest}>
      {children}
    </Tag>
  )
}
