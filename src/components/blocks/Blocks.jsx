import Inline from './Inline.jsx'
import Icon from '../ui/Icon.jsx'

// Renders a content body (array of typed blocks) from src/data.
export default function Blocks({ blocks = [] }) {
  return blocks.map((b, i) => {
    switch (b.type) {
      case 'h2':
        return (
          <h2 key={i} id={b.id} className="font-display text-display-sm text-on-surface mt-14 mb-5 scroll-mt-28">
            {b.text}
          </h2>
        )
      case 'h3':
        return (
          <h3 key={i} id={b.id} className="font-display text-lg md:text-xl text-on-surface mt-9 mb-3 scroll-mt-28">
            {b.text}
          </h3>
        )
      case 'p':
        return (
          <p key={i} className="text-on-surface-variant text-base leading-[1.8] mb-5">
            <Inline text={b.text} />
          </p>
        )
      case 'ul':
        return (
          <ul key={i} className="mb-6 flex flex-col gap-2.5">
            {b.items.map((it, j) => (
              <li key={j} className="flex gap-3 text-on-surface-variant text-base leading-relaxed">
                <span className="mt-[0.7em] w-1.5 h-1.5 shrink-0 bg-primary-container" aria-hidden="true" />
                <span><Inline text={it} /></span>
              </li>
            ))}
          </ul>
        )
      case 'ol':
        return (
          <ol key={i} className="mb-6 flex flex-col gap-3">
            {b.items.map((it, j) => (
              <li key={j} className="flex gap-4 text-on-surface-variant text-base leading-relaxed">
                <span className="font-mono text-xs text-primary-container pt-1 w-6 shrink-0">{String(j + 1).padStart(2, '0')}</span>
                <span><Inline text={it} /></span>
              </li>
            ))}
          </ol>
        )
      case 'quote':
        return (
          <blockquote key={i} className="my-9 pl-6 relative">
            <span className="absolute left-0 top-0 bottom-0 w-px bg-molten" aria-hidden="true" />
            <p className="font-display text-xl md:text-2xl text-on-surface leading-snug"><Inline text={b.text} /></p>
            {b.cite && <cite className="block mt-3 not-italic font-mono text-[11px] uppercase tracking-[0.2em] text-on-surface-variant">— {b.cite}</cite>}
          </blockquote>
        )
      case 'callout':
        return (
          <aside key={i} className="my-8 glass-card rounded-lg p-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary-container mb-2 flex items-center gap-2">
              <Icon name="zap" size={12} /> {b.title}
            </p>
            <p className="text-on-surface text-sm leading-relaxed"><Inline text={b.text} /></p>
          </aside>
        )
      case 'code':
        return (
          <pre key={i} className="my-8 bg-surface-container-lowest rounded-lg p-5 overflow-x-auto shadow-edge text-[13px] leading-relaxed">
            <code className="font-mono text-on-surface">{b.code}</code>
          </pre>
        )
      case 'stat':
        return (
          <div key={i} className="my-10 grid grid-cols-2 md:grid-cols-3 gap-6">
            {b.items.map((s, j) => (
              <div key={j} className="bg-surface-container-lowest rounded-lg p-5 shadow-edge">
                <p className="font-display text-3xl md:text-4xl text-primary-container tracking-tightest">{s.value}</p>
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-on-surface-variant mt-2">{s.label}</p>
              </div>
            ))}
          </div>
        )
      default:
        return null
    }
  })
}
