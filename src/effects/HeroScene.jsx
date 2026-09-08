import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, Environment, Lightformer } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import ParticleField from './ParticleField.jsx'
import Buddies from './Buddies.jsx'
import usePointer from './pointer.js'
import useReducedMotion from '../hooks/useReducedMotion.js'
import useMediaQuery from '../hooks/useMediaQuery.js'
import { hasWebGL, clampedDpr, MOLTEN, MOLTEN_HI, MOLTEN_DEEP, MOLTEN_FIXED, TEXT } from './webgl.js'

const GLOW_STYLE = {
  background:
    'radial-gradient(46% 46% at 26% 34%, rgba(245,197,24,0.10), transparent 72%),' +
    'radial-gradient(42% 38% at 74% 78%, rgba(245,197,24,0.14), transparent 70%)',
}

/** Frame-rate independent damping factor for exponential easing. */
function damp(dt, lambda) {
  return 1 - Math.exp(-lambda * dt)
}

/* ------------------------------------------------------------------ */
/* Ambient shapes                                                      */
/* ------------------------------------------------------------------ */

/**
 * Soft backdrop form. Everything here is a smooth, high-segment surface —
 * faceted low-poly solids read as jagged behind text, so they are gone.
 * `kind`: 'orb' (glass bead), 'ring' (thin torus), 'shell' (wire globe).
 */
function AmbientShape({
  kind = 'orb',
  position,
  color,
  scale = 1,
  spin = 0.06,
  tilt = [0, 0, 0],
  opacity = 1,
  lite = false,
  motion = true,
}) {
  const meshRef = useRef(null)

  useFrame((_, delta) => {
    const m = meshRef.current
    if (!m || !motion) return
    const dt = Math.min(delta, 0.1)
    m.rotation.y += dt * spin
    m.rotation.x += dt * spin * 0.45
  })

  const detail = lite ? 0.6 : 1
  const seg = (n) => Math.max(10, Math.round(n * detail))

  const geometry = useMemo(() => {
    if (kind === 'ring') return <torusGeometry args={[1, 0.045, seg(20), seg(160)]} />
    if (kind === 'shell') return <sphereGeometry args={[1, seg(28), seg(18)]} />
    return <sphereGeometry args={[1, seg(48), seg(32)]} />
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [kind, detail])

  const material =
    kind === 'shell' ? (
      <meshBasicMaterial color={color} wireframe transparent opacity={opacity * 0.07} depthWrite={false} />
    ) : (
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={kind === 'ring' ? 0.32 : 0.14}
        metalness={0.86}
        roughness={0.18}
        transparent={opacity < 1}
        opacity={opacity}
      />
    )

  const mesh = (
    <mesh ref={meshRef} position={position} rotation={tilt} scale={scale}>
      {geometry}
      {material}
    </mesh>
  )

  if (!motion) return mesh
  // gentle, long-period drift — the old settings tumbled hard enough to look glitchy
  return (
    <Float speed={0.7} rotationIntensity={0.12} floatIntensity={0.45} floatingRange={[-0.12, 0.12]}>
      {mesh}
    </Float>
  )
}

/* ------------------------------------------------------------------ */
/* Scene                                                               */
/* ------------------------------------------------------------------ */

function Scene({ lite, motion, scrollRef }) {
  const groupRef = useRef(null)
  const target = useRef({ x: 0, y: 0, scroll: 0 })
  const pointer = usePointer(motion)

  useFrame((_, delta) => {
    const g = groupRef.current
    if (!g || !motion) return
    const dt = Math.min(delta, 0.1)
    const k = damp(dt, 1.6)
    target.current.x += (pointer.x * 0.14 - target.current.x) * k
    target.current.y += (pointer.y * 0.08 - target.current.y) * k
    target.current.scroll += ((scrollRef?.current || 0) * 0.0016 - target.current.scroll) * damp(dt, 3)
    g.rotation.y = target.current.x
    g.rotation.x = target.current.y
    g.position.y = target.current.scroll
  })

  return (
    <group ref={groupRef}>
      {/* upper-left cluster — kept clear of the headline and of the characters */}
      <AmbientShape kind="orb" position={[-4.3, 2.1, -3.4]} color={MOLTEN_HI} scale={0.78} spin={0.05} opacity={0.92} lite={lite} motion={motion} />
      <AmbientShape kind="ring" position={[-3.1, -1.5, -3.8]} color={MOLTEN} scale={1.15} spin={0.09} tilt={[0.9, 0.3, 0.2]} lite={lite} motion={motion} />
      <AmbientShape kind="orb" position={[0.6, 3.0, -5]} color={MOLTEN_DEEP} scale={0.62} spin={0.04} opacity={0.85} lite={lite} motion={motion} />

      {!lite && (
        <>
          {/* wire globes: smooth latitude/longitude, no facet edges */}
          <AmbientShape kind="shell" position={[-1.9, 0.6, -6.5]} color={MOLTEN} scale={2.2} spin={0.02} lite={lite} motion={motion} />
          <AmbientShape kind="shell" position={[4.6, 2.6, -7]} color={MOLTEN} scale={1.5} spin={0.03} lite={lite} motion={motion} />
          {/* small sparks */}
          <AmbientShape kind="orb" position={[-2.4, -0.6, -1.6]} color={MOLTEN_FIXED} scale={0.14} spin={0.2} lite={lite} motion={motion} />
          <AmbientShape kind="orb" position={[2.9, 2.2, -2.4]} color={MOLTEN_FIXED} scale={0.11} spin={0.16} lite={lite} motion={motion} />
          <AmbientShape kind="ring" position={[5.2, -0.8, -5.2]} color={MOLTEN_HI} scale={0.7} spin={0.07} tilt={[0.4, 0.8, 0]} opacity={0.8} lite={lite} motion={motion} />
        </>
      )}

      <ambientLight intensity={0.4} color={TEXT} />
      <hemisphereLight args={['#ffe5a0', '#1a1a1c', 0.5]} />
      <directionalLight position={[5, 5, 5]} color={MOLTEN_HI} intensity={1.1} />
      <pointLight position={[-4, 3, 3]} color={MOLTEN} intensity={2.2} />
      <pointLight position={[4, -3, 3]} color={MOLTEN_FIXED} intensity={1.1} />
    </group>
  )
}

/** Procedural forge environment: warm strip above, cool grey floor below. No HDR fetch. */
function ForgeEnvironment() {
  return (
    <Environment resolution={64} frames={1}>
      <Lightformer form="rect" intensity={2.5} color={MOLTEN_HI} position={[0, 4, -2]} scale={[10, 1.2, 1]} rotation={[Math.PI / 2, 0, 0]} />
      <Lightformer form="rect" intensity={0.6} color="#3a3939" position={[0, -4, 0]} scale={[10, 3, 1]} rotation={[-Math.PI / 2, 0, 0]} />
    </Environment>
  )
}

/** Under reduced motion the loop is 'never': push exactly one frame after mount. */
function OneFrame({ enabled }) {
  const advance = useThree((s) => s.advance)
  useEffect(() => {
    if (!enabled || typeof window === 'undefined') return undefined
    let raf = window.requestAnimationFrame((t) => advance(t))
    // second pass once materials / env have compiled
    const timer = window.setTimeout(() => {
      raf = window.requestAnimationFrame((t) => advance(t))
    }, 400)
    return () => {
      window.cancelAnimationFrame(raf)
      window.clearTimeout(timer)
    }
  }, [enabled, advance])
  return null
}

/* ------------------------------------------------------------------ */
/* Public component                                                    */
/* ------------------------------------------------------------------ */

/**
 * Hero background: CSS glow (always, even without JS/WebGL) + R3F canvas once
 * mounted in a capable browser. Absolutely positioned, pointer-events none.
 */
export default function HeroScene({ lite = false, className = '' }) {
  const wrapRef = useRef(null)
  const scrollRef = useRef(0)
  const [ready, setReady] = useState(false)
  const [dpr, setDpr] = useState(1)
  const [inView, setInView] = useState(true)
  const [pageVisible, setPageVisible] = useState(true)

  const reduced = useReducedMotion()
  const coarse = useMediaQuery('(pointer: coarse)', false)
  const narrow = useMediaQuery('(max-width: 767px)', false)

  // Mount-time guard: `ready` is only ever true in a real browser with WebGL.
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

  // Visibility + scroll tracking (only once the canvas exists).
  useEffect(() => {
    if (!ready || typeof window === 'undefined') return undefined
    const el = wrapRef.current
    let io = null
    if (el && 'IntersectionObserver' in window) {
      io = new IntersectionObserver(
        (entries) => setInView(entries.some((e) => e.isIntersecting)),
        { threshold: 0 },
      )
      io.observe(el)
    }
    const onVisibility = () => setPageVisible(document.visibilityState !== 'hidden')
    const onScroll = () => {
      scrollRef.current = window.scrollY || window.pageYOffset || 0
    }
    onVisibility()
    onScroll()
    document.addEventListener('visibilitychange', onVisibility)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      if (io) io.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
      window.removeEventListener('scroll', onScroll)
    }
  }, [ready])

  const isLite = lite || coarse || narrow
  const motion = !reduced
  const active = ready && inView && pageVisible && motion
  const frameloop = active ? 'always' : 'never'

  return (
    <div
      ref={wrapRef}
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
      aria-hidden="true"
      data-hero-scene={ready ? 'gl' : 'css'}
    >
      <div className="hero-glow absolute inset-0" style={GLOW_STYLE} />
      {ready && (
        <div className="absolute inset-0">
          <Canvas
            dpr={[1, dpr]}
            camera={{ position: [0, 0, 7], fov: 60 }}
            gl={{ antialias: !isLite, alpha: true, powerPreference: 'high-performance' }}
            frameloop={frameloop}
            flat={false}
            style={{ background: 'transparent' }}
          >
            <Suspense fallback={null}>
              <Scene lite={isLite} motion={motion} scrollRef={scrollRef} />
              <Buddies lite={isLite} motion={motion} />
              <ParticleField count={isLite ? 350 : 1100} motion={motion} />
              {!isLite && <ForgeEnvironment />}
              {!isLite && (
                <EffectComposer disableNormalPass multisampling={0}>
                  <Bloom intensity={0.42} luminanceThreshold={0.78} luminanceSmoothing={0.85} mipmapBlur />
                </EffectComposer>
              )}
            </Suspense>
            <OneFrame enabled={reduced} />
          </Canvas>
        </div>
      )}
    </div>
  )
}
