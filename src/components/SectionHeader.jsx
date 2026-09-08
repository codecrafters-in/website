import Eyebrow from './ui/Eyebrow.jsx'
import Heading from './ui/Heading.jsx'
import Reveal from '../effects/Reveal.jsx'

export default function SectionHeader({ eyebrow, title, lede, align = 'left', size = 'lg', as = 'h2', className = '', children }) {
  const center = align === 'center'
  return (
    <Reveal className={`${center ? 'text-center mx-auto' : ''} max-w-3xl ${className}`}>
      {eyebrow && <Eyebrow className="mb-5">{eyebrow}</Eyebrow>}
      <Heading as={as} size={size}>
        {title}
      </Heading>
      {lede && <p className={`mt-5 text-on-surface-variant text-base md:text-lg leading-relaxed ${center ? 'mx-auto' : ''} max-w-2xl`}>{lede}</p>}
      {children}
    </Reveal>
  )
}
