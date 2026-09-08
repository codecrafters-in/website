import { motion, useScroll, useSpring } from 'framer-motion'

/** 2px molten bar pinned to the top, scaled by page scroll progress. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })

  return (
    <motion.div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 h-[2px] origin-left z-progress pointer-events-none bg-molten"
      style={{ scaleX }}
    />
  )
}
