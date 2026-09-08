// Shared framer-motion variants & transitions. Pure data — no window access.

export const easeOut = [0.22, 1, 0.36, 1]

export const spring = {
  soft: { type: 'spring', stiffness: 120, damping: 20, mass: 0.8 },
  snappy: { type: 'spring', stiffness: 400, damping: 30, mass: 0.6 },
  gentle: { type: 'spring', stiffness: 80, damping: 18, mass: 1 },
  bouncy: { type: 'spring', stiffness: 300, damping: 14, mass: 0.7 },
}

export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } },
}

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, ease: easeOut } },
}

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: easeOut } },
}

export function stagger(delayChildren = 0, staggerChildren = 0.08) {
  return {
    hidden: {},
    visible: { transition: { delayChildren, staggerChildren } },
  }
}

export const hoverLift = { y: -4, transition: { duration: 0.25, ease: easeOut } }
export const tapPress = { scale: 0.97 }

export const pageVariants = {
  initial: { opacity: 0, y: 8 },
  enter: { opacity: 1, y: 0, transition: { duration: 0.35, ease: easeOut } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.2, ease: easeOut } },
}

/** Instant variant set for prefers-reduced-motion. */
export const pageVariantsReduced = {
  initial: { opacity: 1, y: 0 },
  enter: { opacity: 1, y: 0, transition: { duration: 0 } },
  exit: { opacity: 1, y: 0, transition: { duration: 0 } },
}
