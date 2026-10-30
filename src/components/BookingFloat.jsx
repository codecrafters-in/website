import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Icon from './ui/Icon.jsx'
import { site } from '../data/site.js'
import { track } from '../lib/analytics.js'

/**
 * Floating booking affordance. Renders only when a calendar URL is configured;
 * dismissing hides it for the rest of the session.
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

  if (!site.calUrl) return null

  const onBooking = () => track('booking_click', { location: 'float', path: pathname })

  return (
    <AnimatePresence>
      {visible && !collapsed && (
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 40 }}
          transition={{ duration: 0.35 }}
          className="fixed bottom-20 right-5 z-40 flex flex-col gap-2 items-end"
        >
          <button
            onClick={collapse}
            className="text-outline hover:text-on-surface transition-colors self-end mb-1"
            aria-label="Dismiss booking button"
          >
            <Icon name="x" size={14} />
          </button>
          <a
            href={site.calUrl}
            target="_blank"
            rel="noreferrer"
            onClick={onBooking}
            className="flex items-center gap-3 bg-molten text-on-primary font-bold px-4 py-3 text-[11px] uppercase tracking-[0.18em] rounded-sm shadow-molten hover:brightness-110 transition"
          >
            <Icon name="calendar" size={16} />
            <span className="hidden sm:inline">Book a call</span>
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
