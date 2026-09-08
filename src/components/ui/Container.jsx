const SIZES = {
  default: 'site-container',
  narrow: 'site-container max-w-6xl',
  tight: 'site-container max-w-4xl',
  prose: 'site-container max-w-3xl',
}

export default function Container({ as: Tag = 'div', size = 'default', className = '', children, ...rest }) {
  return (
    <Tag className={`${SIZES[size] || SIZES.default} ${className}`} {...rest}>
      {children}
    </Tag>
  )
}
