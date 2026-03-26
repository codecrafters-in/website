import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const STORAGE_KEY = 'cc_consent'

export default function PrivacyBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) {
        const timer = setTimeout(() => setVisible(true), 2000)
        return () => clearTimeout(timer)
      }
    } catch {
      // localStorage not available — skip banner
    }
  }, [])

  const dismiss = (value) => {
    try { localStorage.setItem(STORAGE_KEY, value) } catch { /* noop */ }
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
          className="fixed bottom-6 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-sm z-40 bg-[#1c1b1b] border border-[#4E4633]/40 shadow-2xl p-5"
          role="dialog"
          aria-label="Privacy notice"
        >
          <button
            onClick={() => dismiss('declined')}
            className="absolute top-3 right-3 text-[#4E4633] hover:text-white transition-colors"
            aria-label="Close"
          >
            <span className="material-symbols-outlined text-base">close</span>
          </button>
          <p className="text-[#D1C5AC] text-xs leading-relaxed mb-4 pr-4">
            We use cookies to improve your experience.{' '}
            <a href="/privacy" className="text-[#F5C518] hover:underline">Privacy Policy</a>
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => dismiss('declined')}
              className="flex-1 text-[#D1C5AC] text-xs uppercase tracking-widest font-black py-2 border border-[#4E4633]/40 hover:border-[#F5C518] hover:text-[#F5C518] transition-colors"
            >
              Decline
            </button>
            <button
              onClick={() => dismiss('accepted')}
              className="flex-1 bg-[#F5C518] text-[#131313] text-xs uppercase tracking-widest font-black py-2 hover:bg-white transition-colors"
            >
              Accept
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
