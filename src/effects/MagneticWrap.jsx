import { useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import usePointerFine from '../hooks/usePointerFine.js'

/**
 * Pulls its child toward the cursor on fine pointers; a no-op elsewhere.
 * Wrap a button/link: <MagneticWrap><a .../></MagneticWrap>
 */
export default function MagneticWrap({ children, strength = 0.25, className = '', style, ...rest }) {
  const ref = useRef(null)
  const fine = usePointerFine()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 })

  const onPointerMove = (e) => {
    if (!fine || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * strength)
    y.set((e.clientY - (r.top + r.height / 2)) * strength)
  }
  const onPointerLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      className={`inline-block ${className}`}
      style={{ x: sx, y: sy, ...style }}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      {...rest}
    >
      {children}
    </motion.div>
  )
}
