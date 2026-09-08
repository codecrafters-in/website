import { Link } from 'react-router-dom'
import Icon from './Icon.jsx'
import MagneticWrap from '../../effects/MagneticWrap.jsx'

const VARIANTS = {
  molten:
    'bg-brand text-on-primary-fixed shadow-edge hover:shadow-molten hover:brightness-110 active:brightness-95 active:shadow-[inset_0_2px_6px_rgba(61,47,0,0.35)]',
  ghost:
    'bg-surface-container-high/70 text-on-surface shadow-edge hover:bg-surface-container-highest hover:shadow-edge-strong',
  outline:
    'text-on-surface shadow-[inset_0_0_0_1px_rgb(var(--outline-variant))] hover:shadow-[inset_0_0_0_1px_rgb(var(--primary-container))] hover:text-primary',
  glass: 'glass-panel text-on-surface hover:shadow-edge-strong',
  link: 'text-primary-container hover:text-primary px-0 py-0',
  dark: 'bg-inverse-surface text-inverse-on-surface shadow-edge hover:brightness-125',
}

const SIZES = {
  sm: 'text-xs px-4 py-2.5 gap-2',
  md: 'text-sm px-6 py-3 gap-2.5',
  lg: 'text-base px-7 md:px-8 py-3.5 md:py-4 gap-3',
}

export default function Button({
  as,
  to,
  href,
  variant = 'molten',
  size = 'md',
  icon = 'arrow-right',
  iconPosition = 'right',
  magnetic = false,
  className = '',
  children,
  ...rest
}) {
  const isLink = variant === 'link'
  const classes = `group/btn inline-flex items-center justify-center font-semibold tracking-[-0.01em] rounded-lg transition-all duration-300 select-none whitespace-nowrap ${
    VARIANTS[variant] || VARIANTS.molten
  } ${isLink ? '' : SIZES[size] || SIZES.md} ${className}`

  const iconEl = icon ? (
    <Icon
      name={icon}
      size={size === 'lg' ? 18 : 15}
      className={`transition-transform duration-300 ${
        iconPosition === 'right' ? 'group-hover/btn:translate-x-1' : 'group-hover/btn:-translate-x-1'
      } ${icon === 'arrow-up-right' ? 'group-hover/btn:-translate-y-0.5' : ''}`}
    />
  ) : null

  const content = (
    <>
      {iconPosition === 'left' && iconEl}
      <span>{children}</span>
      {iconPosition === 'right' && iconEl}
    </>
  )

  let node
  if (to) {
    node = (
      <Link to={to} className={classes} {...rest}>
        {content}
      </Link>
    )
  } else if (href) {
    node = (
      <a href={href} className={classes} {...rest}>
        {content}
      </a>
    )
  } else {
    const Tag = as || 'button'
    node = (
      <Tag type={Tag === 'button' ? rest.type || 'button' : undefined} className={classes} {...rest}>
        {content}
      </Tag>
    )
  }

  if (magnetic) return <MagneticWrap className="inline-block">{node}</MagneticWrap>
  return node
}
