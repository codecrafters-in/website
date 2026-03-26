import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const CAL_URL = import.meta.env.VITE_CAL_URL || 'https://cal.com'
const WA_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || ''
const WA_URL = WA_NUMBER ? `https://wa.me/${WA_NUMBER.replace(/\D/g, '')}` : null

export default function BookingFloat() {
  const [visible, setVisible] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem('booking_float_dismissed')) return
    const t = setTimeout(() => setVisible(true), 4000)
    return () => clearTimeout(t)
  }, [])

  const dismiss = () => {
    sessionStorage.setItem('booking_float_dismissed', '1')
    setDismissed(true)
  }

  return (
    <AnimatePresence>
      {visible && !dismissed && (
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 40 }}
          transition={{ duration: 0.35 }}
          className="fixed bottom-24 right-5 z-40 flex flex-col gap-2 items-end"
        >
          {/* Dismiss */}
          <button
            onClick={dismiss}
            className="text-[#4E4633] hover:text-white transition-colors self-end mb-1"
            aria-label="Dismiss booking button"
          >
            <span className="material-symbols-outlined text-sm">close</span>
          </button>

          {/* Cal.com */}
          <a
            href={CAL_URL}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 bg-[#F5C518] text-[#131313] px-4 py-3 font-bold text-xs uppercase tracking-wider hover:bg-white transition-colors shadow-lg group"
          >
            <span className="material-symbols-outlined text-base">calendar_month</span>
            <span className="hidden sm:inline">Book a Call</span>
          </a>

          {/* WhatsApp — only render if number is configured */}
          {WA_URL && (
            <a
              href={WA_URL}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 bg-[#25D366] text-white px-4 py-3 font-bold text-xs uppercase tracking-wider hover:bg-[#1ebe5d] transition-colors shadow-lg"
            >
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              <span className="hidden sm:inline">WhatsApp</span>
            </a>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
