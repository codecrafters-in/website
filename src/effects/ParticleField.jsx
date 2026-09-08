import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { PointMaterial } from '@react-three/drei'
import usePointer from './pointer.js'
import { MOLTEN } from './webgl.js'

/** Deterministic PRNG so server & client (and every render) agree. */
function mulberry32(seed) {
  let a = seed >>> 0
  return function next() {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/**
 * Sparse molten dust drifting through the hero. Must live inside a Canvas.
 * `count` 0 renders nothing. `motion=false` freezes drift + mouse influence.
 */
export default function ParticleField({ count = 1500, spread = 16, depth = 10, seed = 1337, motion = true }) {
  const ref = useRef(null)
  const mouse = useRef({ x: 0, y: 0 })
  const pointer = usePointer(motion)

  const positions = useMemo(() => {
    const n = Math.max(0, Math.floor(count))
    const arr = new Float32Array(n * 3)
    const rnd = mulberry32(seed)
    for (let i = 0; i < n; i += 1) {
      arr[i * 3] = (rnd() - 0.5) * spread
      arr[i * 3 + 1] = (rnd() - 0.5) * spread * 0.7
      arr[i * 3 + 2] = -rnd() * depth
    }
    return arr
  }, [count, spread, depth, seed])

  useFrame((_, delta) => {
    const pts = ref.current
    if (!pts || !motion) return
    const dt = Math.min(delta, 0.1)
    pts.rotation.y += dt * 0.02
    pts.rotation.z += dt * 0.006
    // pointer influence, exponentially damped so it stays smooth at any refresh rate
    const k = 1 - Math.exp(-1.2 * dt)
    mouse.current.x += (pointer.x - mouse.current.x) * k
    mouse.current.y += (pointer.y - mouse.current.y) * k
    pts.rotation.x = mouse.current.y * 0.06
    pts.position.x = mouse.current.x * 0.2
  })

  if (count <= 0) return null

  return (
    <points ref={ref} frustumCulled={false}>
      <bufferGeometry key={positions.length}>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <PointMaterial
        color={MOLTEN}
        size={0.02}
        sizeAttenuation
        transparent
        opacity={0.6}
        depthWrite={false}
      />
    </points>
  )
}
