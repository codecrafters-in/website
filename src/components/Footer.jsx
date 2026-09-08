import { useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import Icon from './ui/Icon.jsx'
import { site, footerColumns } from '../data/site.js'
import { track } from '../lib/analytics.js'

const WA_URL = site.whatsapp ? `https://wa.me/${site.whatsapp.replace(/\D/g, '')}` : null

export default function Footer() {
  const [email, setEmail] = useState('')
  const [state, setState] = useState('idle')

  const handleSubscribe = async (e) => {
    e.preventDefault()
    if (!email || state === 'loading') return
    setState('loading')
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'Footer newsletter' }),
      })
      if (!res.ok) throw new Error('bad status')
      setState('done')
      track('lead_magnet_submit', { location: 'Footer newsletter' })
      toast.success("You're in. Watch your inbox.")
    } catch {
      setState('idle')
      toast.error('Could not subscribe right now. Try again in a minute.')
    }
  }

  return (
    <footer className="relative bg-surface-container-lowest w-full pt-20 pb-8 overflow-hidden">
      <div className="site-container relative">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          <div className="lg:col-span-4">
            <Link to="/" className="inline-block mb-6 hover:opacity-80 transition-opacity" aria-label={`${site.name} home`}>
              <img src="/images/light_logo.png" alt={site.name} width="220" height="56" className="h-14 w-auto object-contain" />
            </Link>
            <p className="text-on-surface-variant text-sm leading-relaxed mb-6 max-w-xs">{site.tagline}. {site.description}</p>
            <div className="flex items-center gap-3">
              {[
                { href: site.socials.linkedin, icon: 'linkedin', label: 'LinkedIn' },
                { href: site.socials.github, icon: 'github', label: 'GitHub' },
                { href: `mailto:${site.email}`, icon: 'mail', label: 'Email' },
                ...(WA_URL ? [{ href: WA_URL, icon: 'message-circle', label: 'WhatsApp' }] : []),
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                  aria-label={s.label}
                  className="w-10 h-10 rounded-sm bg-surface-container-low shadow-edge flex items-center justify-center text-on-surface-variant hover:text-primary-container hover:shadow-edge-strong transition"
                >
                  <Icon name={s.icon} size={16} />
                </a>
              ))}
            </div>
          </div>

          {footerColumns.map((col) => (
            <div key={col.title} className="lg:col-span-2">
              <h2 className="font-mono text-[10px] uppercase tracking-[0.22em] text-on-surface mb-5">{col.title}</h2>
              <ul className="space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    {l.to.startsWith('http') ? (
                      <a href={l.to} className="text-on-surface-variant hover:text-primary-container text-sm transition-colors">{l.label}</a>
                    ) : (
                      <Link to={l.to} className="text-on-surface-variant hover:text-primary-container text-sm transition-colors">{l.label}</Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="sm:col-span-2 lg:col-span-2">
            <h2 className="font-mono text-[10px] uppercase tracking-[0.22em] text-on-surface mb-5">Insights, monthly</h2>
            <p className="text-on-surface-variant text-xs leading-relaxed mb-5">
              One email a month on shipping AI inside real companies. No newsletters-about-newsletters.
            </p>
            {state === 'done' ? (
              <p className="text-primary-container text-sm font-semibold flex items-center gap-2">
                <Icon name="circle-check" size={16} /> You&apos;re in.
              </p>
            ) : (
              <form onSubmit={handleSubscribe} className="flex rounded-sm bg-surface-container-low shadow-edge focus-within:shadow-edge-strong transition">
                <label htmlFor="footer-email" className="sr-only">Work email</label>
                <input
                  id="footer-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Work email"
                  required
                  className="bg-transparent text-sm text-on-surface flex-1 py-3 px-3 focus:outline-none placeholder:text-outline min-w-0"
                />
                <button
                  type="submit"
                  disabled={state === 'loading'}
                  aria-label="Subscribe"
                  className="px-3 text-primary-container hover:text-on-surface transition-colors disabled:opacity-50"
                >
                  <Icon name="arrow-right" size={16} />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* A verifiable legal identity — registered name, GST, address, phone —
            is one of the cheapest trust signals there is. Renders only once the
            fields in site.legal are filled in. */}
        {(site.legal?.registeredName || site.legal?.gstin || site.legal?.addressLine || site.legal?.phone) && (
          <div className="mt-16 pt-6 shadow-[inset_0_1px_0_rgb(var(--outline-variant))] flex flex-wrap gap-x-8 gap-y-2 font-mono text-[10px] uppercase tracking-[0.18em] text-outline">
            {site.legal.registeredName && <span>{site.legal.registeredName}</span>}
            {site.legal.gstin && <span>GSTIN {site.legal.gstin}</span>}
            {site.legal.addressLine && <span>{site.legal.addressLine}</span>}
            {site.legal.phone && (
              <a href={`tel:${site.legal.phone.replace(/\s/g, '')}`} className="hover:text-primary-container transition-colors">
                {site.legal.phone}
              </a>
            )}
          </div>
        )}

        <div className="mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 shadow-[inset_0_1px_0_rgb(var(--outline-variant))]">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-outline">
            © {new Date().getFullYear()} {site.name} · {site.location.label}
          </p>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="font-mono text-[10px] uppercase tracking-[0.18em] text-outline hover:text-primary-container transition-colors">Privacy</Link>
            <Link to="/terms" className="font-mono text-[10px] uppercase tracking-[0.18em] text-outline hover:text-primary-container transition-colors">Terms</Link>
            <span className="font-mono text-[10px] tracking-[0.3em] text-outline select-none" title="Try it" aria-hidden="true">
              {site.konamiHint}
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
