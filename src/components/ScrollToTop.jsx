import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Icon from './ui/Icon.jsx'
import { scrollToTarget } from '../lib/scrollLock.js'

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          onClick={() => scrollToTarget(0, { offset: 0 })}
          aria-label="Scroll to top"
          className="fixed bottom-6 right-5 z-40 w-11 h-11 rounded-sm glass-panel text-on-surface hover:text-primary-container shadow-edge flex items-center justify-center transition-colors"
        >
          <Icon name="arrow-up" size={18} />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
