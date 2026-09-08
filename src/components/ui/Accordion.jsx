import { useState } from 'react'
import Icon from './Icon.jsx'

// Content stays in the DOM (SEO + no-JS safe); height animates via the CSS grid trick.
export default function Accordion({ items, defaultOpen = -1, className = '' }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className={`flex flex-col ${className}`}>
      {items.map((it, i) => {
        const isOpen = open === i
        return (
          <div key={it.id || i} className="bg-transparent hover:bg-surface-container-low/60 transition-colors rounded-sm">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? -1 : i)}
              aria-expanded={isOpen}
              aria-controls={`acc-${it.id || i}`}
              className="w-full flex items-start justify-between gap-6 text-left py-5 px-3"
            >
              <span className={`text-sm md:text-base font-semibold ${isOpen ? 'text-primary' : 'text-on-surface'}`}>{it.q}</span>
              <span className={`mt-0.5 shrink-0 text-primary-container transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}>
                <Icon name="plus" size={18} />
              </span>
            </button>
            <div
              id={`acc-${it.id || i}`}
              className="grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
            >
              <div className="overflow-hidden">
                <p className="text-on-surface-variant text-sm leading-relaxed px-3 pb-6 max-w-2xl">{it.a}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
