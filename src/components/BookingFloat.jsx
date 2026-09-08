import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Icon from './ui/Icon.jsx'
import { site } from '../data/site.js'
import { solutions } from '../data/solutions.js'
import { track } from '../lib/analytics.js'

const WA_NUMBER = site.whatsapp ? site.whatsapp.replace(/\D/g, '') : ''

/**
 * Context-aware prefill, so the first message already says why they are writing.
 * Falls back to a plain opener on pages we have no specific line for.
 */
function prefillFor(pathname) {
  if (pathname.startsWith('/work#')) {
    const slug = pathname.split('#')[1].replace(/-/g, ' ')
    return `Hi CodeCrafters — tell me more about the ${slug} build. We have something similar.`
  }
  if (pathname.startsWith('/work/')) {
    return `Hi CodeCrafters — I read your case study (${pathname}) and I have something similar. Can we talk?`
  }
  if (pathname.startsWith('/solutions/')) {
    const slug = pathname.replace('/solutions/', '')
    const name = solutions.find((s) => s.slug === slug)?.title || slug.replace(/-/g, ' ')
    return `Hi CodeCrafters — I'm looking at ${name}. Can we talk?`
  }
  if (pathname.startsWith('/insights/')) {
    return 'Hi CodeCrafters — I read one of your articles and want to discuss doing this on our systems.'
  }
  return 'Hi CodeCrafters — I have an ERP/AI problem I want to talk through.'
}

export function whatsappUrl(pathname = '/') {
  if (!WA_NUMBER) return null
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(prefillFor(pathname))}`
}

/**
 * Floating contact affordance. WhatsApp is the primary conversion channel, so
 * it leads and it does not disappear — dismissing collapses the panel to a
 * compact button rather than removing the channel entirely.
 */
export default function BookingFloat() {
  const [visible, setVisible] = useState(false)
  const [collapsed, setCollapsed] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    try {
      if (sessionStorage.getItem('booking_float_collapsed')) setCollapsed(true)
    } catch {
      /* noop */
    }
    // short delay only so it does not compete with LCP
    const t = setTimeout(() => setVisible(true), 1200)
    return () => clearTimeout(t)
  }, [])

  const collapse = () => {
    try {
      sessionStorage.setItem('booking_float_collapsed', '1')
    } catch {
      /* noop */
    }
    setCollapsed(true)
  }

  const wa = whatsappUrl(pathname)
  if (!site.calUrl && !wa) return null

  const onWhatsApp = () => track('whatsapp_click', { location: 'float', path: pathname })
  const onBooking = () => track('booking_click', { location: 'float', path: pathname })

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 40 }}
          transition={{ duration: 0.35 }}
          className="fixed bottom-20 right-5 z-40 flex flex-col gap-2 items-end"
        >
          {!collapsed && (
            <>
              <button
                onClick={collapse}
                className="text-outline hover:text-on-surface transition-colors self-end mb-1"
                aria-label="Collapse contact buttons"
              >
                <Icon name="x" size={14} />
              </button>
              {site.calUrl && (
                <a
                  href={site.calUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={onBooking}
                  className="flex items-center gap-3 glass-panel text-on-surface px-4 py-3 font-bold text-[11px] uppercase tracking-[0.18em] rounded-sm hover:text-primary transition"
                >
                  <Icon name="calendar" size={16} />
                  <span className="hidden sm:inline">Book a call</span>
                </a>
              )}
            </>
          )}
          {wa && (
            <a
              href={wa}
              target="_blank"
              rel="noreferrer"
              onClick={onWhatsApp}
              aria-label="Message us on WhatsApp"
              className={`flex items-center gap-3 bg-molten text-on-primary font-bold text-[11px] uppercase tracking-[0.18em] rounded-sm shadow-molten hover:brightness-110 transition ${
                collapsed ? 'p-4' : 'px-4 py-3'
              }`}
            >
              <Icon name="message-circle" size={collapsed ? 20 : 16} />
              {!collapsed && <span className="hidden sm:inline">WhatsApp us</span>}
            </a>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
