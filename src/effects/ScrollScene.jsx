import { Suspense, useEffect, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import useReducedMotion from '../hooks/useReducedMotion.js'
import useMediaQuery from '../hooks/useMediaQuery.js'
import { hasWebGL, clampedDpr, MOLTEN, MOLTEN_HI, MOLTEN_FIXED, TEXT } from './webgl.js'

const EMISSIVE_MIN = 0.18
const EMISSIVE_MAX = 0.9

function clamp01(v) {
  return v < 0 ? 0 : v > 1 ? 1 : v
}

/** The forge core: a torus knot that heats up and turns as the page scrolls. */
function ForgeCore({ progressRef, motion }) {
  const meshRef = useRef(null)
  const matRef = useRef(null)
  const spin = useRef(0)

  useFrame((_, delta) => {
    const m = meshRef.current
    if (!m) return
    const p = clamp01(progressRef && typeof progressRef.current === 'number' ? progressRef.current : 0)
    if (motion) spin.current += Math.min(delta, 0.1) * 0.12
    m.rotation.y = p * Math.PI * 2 + spin.current
    m.rotation.x = p * Math.PI * 0.5 + spin.current * 0.5
    const s = 1 + p * 0.15
    m.scale.set(s, s, s)
    if (matRef.current) matRef.current.emissiveIntensity = EMISSIVE_MIN + (EMISSIVE_MAX - EMISSIVE_MIN) * p
  })

  return (
    <mesh ref={meshRef}>
      <torusKnotGeometry args={[1, 0.32, 160, 24]} />
      <meshStandardMaterial
        ref={matRef}
        color={MOLTEN}
        emissive={MOLTEN}
        emissiveIntensity={EMISSIVE_MIN}
        metalness={0.9}
        roughness={0.22}
      />
    </mesh>
  )
}

/** In 'demand' mode (reduced motion) re-render whenever the page scrolls. */
function InvalidateOnScroll({ enabled }) {
  const invalidate = useThree((s) => s.invalidate)
  useEffect(() => {
    if (typeof window === 'undefined') return undefined
    invalidate()
    if (!enabled) return undefined
    const onScroll = () => invalidate()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [enabled, invalidate])
  return null
}

/**
 * Secondary canvas for the About page. `progressRef.current` (0..1) is driven
 * by the page's ScrollTrigger. Renders nothing on coarse pointers / < 1024px.
 */
export default function ScrollScene({ progressRef, className = '' }) {
  const wrapRef = useRef(null)
  const [ready, setReady] = useState(false)
  const [dpr, setDpr] = useState(1)
  const [inView, setInView] = useState(true)
  const [pageVisible, setPageVisible] = useState(true)

  const reduced = useReducedMotion()
  const coarse = useMediaQuery('(pointer: coarse)', false)
  const narrow = useMediaQuery('(max-width: 1023px)', false)

  useEffect(() => {
    if (typeof window === 'undefined') return undefined
    // Probe WebGL after first paint, never during render.
    const raf = window.requestAnimationFrame(() => {
      if (!hasWebGL()) return
      setDpr(clampedDpr(1.5))
      setReady(true)
    })
    return () => window.cancelAnimationFrame(raf)
  }, [])

  useEffect(() => {
    if (!ready || typeof window === 'undefined') return undefined
    const el = wrapRef.current
    let io = null
    if (el && 'IntersectionObserver' in window) {
      io = new IntersectionObserver((entries) => setInView(entries.some((e) => e.isIntersecting)), { threshold: 0 })
      io.observe(el)
    }
    const onVisibility = () => setPageVisible(document.visibilityState !== 'hidden')
    onVisibility()
    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      if (io) io.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [ready])

  if (coarse || narrow) return null

  const motion = !reduced
  const active = ready && inView && pageVisible
  const frameloop = !active ? 'never' : motion ? 'always' : 'demand'

  return (
    <div
      ref={wrapRef}
      className={`pointer-events-none ${className}`}
      aria-hidden="true"
      data-scroll-scene={ready ? 'gl' : 'css'}
    >
      {ready && (
        <Canvas
          dpr={[1, dpr]}
          camera={{ position: [0, 0, 6], fov: 45 }}
          gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
          frameloop={frameloop}
          style={{ background: 'transparent' }}
        >
          <Suspense fallback={null}>
            <ambientLight intensity={0.35} color={TEXT} />
            <directionalLight position={[5, 5, 5]} color={MOLTEN_HI} intensity={1.4} />
            <pointLight position={[-4, 3, 3]} color={MOLTEN} intensity={3} />
            <pointLight position={[4, -3, 3]} color={MOLTEN_FIXED} intensity={1.5} />
            <ForgeCore progressRef={progressRef} motion={motion} />
          </Suspense>
          <InvalidateOnScroll enabled={!motion} />
        </Canvas>
      )}
    </div>
  )
}
