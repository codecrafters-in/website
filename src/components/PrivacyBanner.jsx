import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import Icon from './ui/Icon.jsx'
import { GTM_ID, getConsent, grantConsent, denyConsent } from '../lib/analytics.js'

export default function PrivacyBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Nothing to consent to when no analytics container is configured.
    if (!GTM_ID) return undefined
    if (getConsent()) return undefined
    // 3.5s, staggered ahead of BookingFloat so the two do not stack.
    const timer = setTimeout(() => setVisible(true), 3500)
    return () => clearTimeout(timer)
  }, [])

  const dismiss = (value) => {
    if (value === 'accepted') grantConsent()
    else denyConsent()
    setVisible(false)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 32 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-5 left-4 right-4 sm:left-5 sm:right-auto sm:max-w-sm z-40 vitreous-glass rounded-lg p-5"
          role="dialog"
          aria-label="Privacy notice"
        >
          <button
            onClick={() => dismiss('declined')}
            className="absolute top-3 right-3 text-outline hover:text-on-surface transition-colors"
            aria-label="Close"
          >
            <Icon name="x" size={14} />
          </button>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary-container mb-2">Cookies</p>
          <p className="text-on-surface-variant text-xs leading-relaxed mb-4 pr-4">
            We use a couple of cookies to remember your preferences and understand what works. No ad tracking.{' '}
            <Link to="/privacy" className="text-primary-container hover:underline">
              Privacy policy
            </Link>
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => dismiss('declined')}
              className="flex-1 text-on-surface-variant text-[10px] uppercase tracking-[0.18em] font-bold py-2.5 rounded-sm shadow-[inset_0_0_0_1px_rgb(var(--outline-variant))] hover:text-primary transition-colors"
            >
              Decline
            </button>
            <button
              onClick={() => dismiss('accepted')}
              className="flex-1 bg-molten text-on-primary text-[10px] uppercase tracking-[0.18em] font-bold py-2.5 rounded-sm hover:brightness-110 transition"
            >
              Accept
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
