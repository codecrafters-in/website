import Icon from './ui/Icon.jsx'

// The Odoo apps we set up most, drawn as an app-launcher grid so a visitor sees
// "this is an Odoo company" before reading a word. Our own illustration, not
// Odoo's artwork or logo (we are not an official Odoo partner, so no marks).
export const ODOO_APPS = [
  { name: 'Sales', icon: 'cart', color: '#E46F57' },
  { name: 'CRM', icon: 'handshake', color: '#3C9F9A' },
  { name: 'Inventory', icon: 'warehouse', color: '#D9A23B' },
  { name: 'Accounting', icon: 'calculator', color: '#5B7FC7' },
  { name: 'Purchase', icon: 'package', color: '#8A6FB8' },
  { name: 'Manufacturing', icon: 'factory', color: '#C25B7A' },
  { name: 'Point of Sale', icon: 'store', color: '#4E9E62' },
  { name: 'eCommerce', icon: 'shopping-bag', color: '#2F8FC4' },
  { name: 'Helpdesk', icon: 'headset', color: '#B4733A' },
]

export default function OdooApps({ className = '' }) {
  return (
    <figure
      className={`relative rounded-2xl bg-surface-container-lowest p-5 md:p-6 shadow-[0_28px_64px_-24px_rgb(60_52_34_/_0.35)] ${className}`}
      aria-label="Odoo apps we set up: Sales, CRM, Inventory, Accounting, Purchase, Manufacturing, Point of Sale, eCommerce and Helpdesk"
    >
      <div className="flex items-center justify-between gap-3">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-outline">Your Odoo, set up for you</p>
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="h-2 w-2 rounded-full bg-outline-variant" />
          <span className="h-2 w-2 rounded-full bg-outline-variant" />
          <span className="h-2 w-2 rounded-full bg-outline-variant" />
        </span>
      </div>

      <ul className="mt-5 grid grid-cols-3 gap-x-3 gap-y-5">
        {ODOO_APPS.map((app) => (
          <li key={app.name} className="flex flex-col items-center text-center gap-2">
            <span
              className="flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-xl text-white shadow-edge"
              style={{ backgroundColor: app.color }}
            >
              <Icon name={app.icon} size={22} strokeWidth={2} />
            </span>
            <span className="text-[11px] md:text-xs font-semibold leading-tight text-on-surface">{app.name}</span>
          </li>
        ))}
      </ul>

      <figcaption className="mt-6 flex flex-wrap items-center gap-2 border-t border-outline-variant pt-4">
        {['Odoo 14 – 19', 'Community & Enterprise'].map((t) => (
          <span key={t} className="inline-flex items-center gap-1.5 rounded-full bg-brand-tint px-2.5 py-1 text-[11px] font-semibold text-primary-container">
            <Icon name="check" size={12} strokeWidth={2.5} />
            {t}
          </span>
        ))}
      </figcaption>
    </figure>
  )
}
