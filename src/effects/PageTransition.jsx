import { useEffect, useRef, useState } from 'react'
import { useLocation, useOutlet } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { pageVariants, pageVariantsReduced } from '../lib/motion.js'
import useReducedMotion from '../hooks/useReducedMotion.js'

/** Holds on to the outlet element it was first given so the exiting page keeps rendering. */
function FrozenOutlet({ outlet }) {
  const [frozen] = useState(outlet)
  return frozen
}

/**
 * Drop-in replacement for <Outlet /> that cross-fades between routes.
 * `initial={false}` guarantees the prerendered page never carries opacity:0.
 */
export default function AnimatedOutlet({ className = '' }) {
  const location = useLocation()
  const outlet = useOutlet()
  const reduced = useReducedMotion()
  const locationRef = useRef(location)

  useEffect(() => {
    locationRef.current = location
  }, [location])

  const onExitComplete = () => {
    if (typeof window === 'undefined') return
    if (locationRef.current.hash) return
    const lenis = window.__lenis
    if (lenis && typeof lenis.scrollTo === 'function') lenis.scrollTo(0, { immediate: true, force: true })
    else window.scrollTo(0, 0)
  }

  return (
    <AnimatePresence mode="wait" initial={false} onExitComplete={onExitComplete}>
      <motion.div
        key={location.pathname}
        className={className}
        variants={reduced ? pageVariantsReduced : pageVariants}
        initial="initial"
        animate="enter"
        exit="exit"
      >
        <FrozenOutlet outlet={outlet} />
      </motion.div>
    </AnimatePresence>
  )
}
