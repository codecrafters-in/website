import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useFrame, useThree } from '@react-three/fiber'
import usePointer from './pointer.js'
import { MOLTEN, MOLTEN_HI } from './webgl.js'

/* ------------------------------------------------------------------ */
/* Palette                                                             */
/* ------------------------------------------------------------------ */

const FUR = '#efece4'
const INK = '#1b1c1f'
const SLATE = '#28303b'
const SLATE_HI = '#3b4553'
const BEAK = '#eda03f'
const PUPIL = '#0c0d0f'
const CHIP = '#0f1115'

/* ------------------------------------------------------------------ */
/* The story                                                           */
/*                                                                     */
/* A panda and a penguin sit facing each other, talking. The panda      */
/* speaks, the message travels through the AI core between them, the    */
/* penguin answers — then they hold each other's look while a "shipped" */
/* tick pops above them. Then it loops.                                 */
/* ------------------------------------------------------------------ */

const CYCLE = 15
const BEATS = {
  ask: [0.02, 0.3],
  send: [0.28, 0.5],
  think: [0.33, 0.49],
  answer: [0.5, 0.74],
  meet: [0.74, 0.97],
  ship: [0.8, 0.96],
}

function clamp01(x) {
  return Math.min(1, Math.max(0, x))
}

function smootherstep(x) {
  const v = clamp01(x)
  return v * v * (3 - 2 * v)
}

/** Smooth 0→1→0 envelope across a beat window. */
function beat(p, [start, end], fade = 0.06) {
  if (p <= start || p >= end) return 0
  return smootherstep(Math.min((p - start) / fade, (end - p) / fade))
}

/** 0→1 progress inside a window, clamped at both ends. */
function ramp(p, [start, end]) {
  return clamp01((p - start) / (end - start))
}

/** Frame-rate independent damping factor. */
function damp(dt, lambda) {
  return 1 - Math.exp(-lambda * dt)
}

/** Eye openness 1→0→1; each character gets its own offset so they never sync. */
function blink(t, seed) {
  const period = 3.7 + seed * 2.1
  const local = (t + seed * 3.1) % period
  const dur = 0.15
  if (local > dur) return 1
  return Math.abs(Math.cos((local / dur) * Math.PI))
}

/* ------------------------------------------------------------------ */
/* Materials                                                           */
/* ------------------------------------------------------------------ */

function useMat(color, roughness = 0.85, metalness = 0) {
  return useMemo(
    () => new THREE.MeshStandardMaterial({ color: new THREE.Color(color), roughness, metalness }),
    [color, roughness, metalness],
  )
}

/* ------------------------------------------------------------------ */
/* Shapes                                                              */
/* ------------------------------------------------------------------ */

function roundedRect(w, h, r) {
  const s = new THREE.Shape()
  const x = w / 2
  const y = h / 2
  s.moveTo(-x + r, -y)
  s.lineTo(x - r, -y)
  s.quadraticCurveTo(x, -y, x, -y + r)
  s.lineTo(x, y - r)
  s.quadraticCurveTo(x, y, x - r, y)
  s.lineTo(-x + r, y)
  s.quadraticCurveTo(-x, y, -x, y - r)
  s.lineTo(-x, -y + r)
  s.quadraticCurveTo(-x, -y, -x + r, -y)
  return s
}

/** Thick tick mark drawn as one closed outline. */
function checkShape() {
  const s = new THREE.Shape()
  const w = 0.05
  s.moveTo(-0.12, 0.01)
  s.lineTo(-0.045, -0.075)
  s.lineTo(0.12, 0.105)
  s.lineTo(0.12 - w * 0.6, 0.105 + w)
  s.lineTo(-0.045, -0.075 + w * 1.35)
  s.lineTo(-0.12 + w * 0.75, 0.01 + w)
  s.closePath()
  return s
}

/* ------------------------------------------------------------------ */
/* Speech bubble                                                       */
/* ------------------------------------------------------------------ */

const BUBBLE_W = 0.74
const BUBBLE_H = 0.4

/**
 * Chat bubble with three typing dots. `dir` points the tail back at the
 * speaker (1 tail on the right, -1 on the left). Lives in parent space so it
 * always faces the camera, whichever way the characters are turned.
 */
function Bubble({ position, dir = 1, storyRef, phaseKey, motion }) {
  const groupRef = useRef(null)
  const panelRef = useRef(null)
  const edgeRef = useRef(null)
  const tailRef = useRef(null)
  const dotsRef = useRef([])

  const panelGeo = useMemo(() => new THREE.ShapeGeometry(roundedRect(BUBBLE_W, BUBBLE_H, 0.14), 12), [])
  const edgeGeo = useMemo(() => new THREE.ShapeGeometry(roundedRect(BUBBLE_W + 0.03, BUBBLE_H + 0.03, 0.152), 12), [])
  const tailGeo = useMemo(() => {
    const s = new THREE.Shape()
    s.moveTo(-0.06 * dir, 0.02)
    s.lineTo(0.075 * dir, 0.02)
    s.lineTo(0.15 * dir, -0.16)
    s.closePath()
    return new THREE.ShapeGeometry(s)
  }, [dir])
  const dotGeo = useMemo(() => new THREE.CircleGeometry(0.038, 18), [])

  useFrame(() => {
    const g = groupRef.current
    if (!g) return
    const st = storyRef.current
    const a = st[phaseKey]
    const t = st.time

    g.visible = a > 0.004
    if (!g.visible) return

    // small overshoot on the way in, so it pops rather than fades
    g.scale.setScalar(0.72 + a * 0.28 + Math.sin(a * Math.PI) * 0.06)
    g.position.y = position[1] - (1 - a) * 0.06

    if (panelRef.current) panelRef.current.opacity = a * 0.92
    if (edgeRef.current) edgeRef.current.opacity = a * 0.55
    if (tailRef.current) tailRef.current.opacity = a * 0.92

    for (let i = 0; i < 3; i += 1) {
      const d = dotsRef.current[i]
      if (!d) continue
      const lift = motion ? Math.max(0, Math.sin(t * 6.4 - i * 0.7)) : 0.3
      d.position.y = lift * 0.04
      d.scale.setScalar(0.76 + lift * 0.34)
      if (d.material) d.material.opacity = a * (0.4 + lift * 0.6)
    }
  })

  return (
    <group ref={groupRef} position={position} visible={false}>
      <mesh geometry={edgeGeo} position={[0, 0, -0.004]} renderOrder={2}>
        <meshBasicMaterial ref={edgeRef} color={MOLTEN} transparent opacity={0} depthWrite={false} toneMapped={false} />
      </mesh>
      <mesh geometry={panelGeo} renderOrder={3}>
        <meshBasicMaterial ref={panelRef} color={CHIP} transparent opacity={0} depthWrite={false} />
      </mesh>
      <mesh geometry={tailGeo} position={[dir * 0.2, -BUBBLE_H / 2 + 0.01, 0.001]} renderOrder={3}>
        <meshBasicMaterial ref={tailRef} color={CHIP} transparent opacity={0} depthWrite={false} />
      </mesh>
      {[0, 1, 2].map((i) => (
        <mesh
          key={i}
          ref={(el) => {
            dotsRef.current[i] = el
          }}
          geometry={dotGeo}
          position={[(i - 1) * 0.15, 0, 0.004]}
          renderOrder={4}
        >
          <meshBasicMaterial
            color={i === 1 ? MOLTEN_HI : MOLTEN}
            transparent
            opacity={0}
            depthWrite={false}
            toneMapped={false}
          />
        </mesh>
      ))}
    </group>
  )
}

/* ------------------------------------------------------------------ */
/* Eyes                                                                */
/* ------------------------------------------------------------------ */

function Eye({ position, radius = 0.045, innerRef, color = PUPIL }) {
  return (
    <group ref={innerRef} position={position}>
      <mesh>
        <sphereGeometry args={[radius, 20, 16]} />
        <meshStandardMaterial color={color} roughness={0.22} metalness={0.08} />
      </mesh>
      <mesh position={[radius * 0.33, radius * 0.36, radius * 0.8]}>
        <sphereGeometry args={[radius * 0.3, 10, 8]} />
        <meshBasicMaterial color="#ffffff" toneMapped={false} />
      </mesh>
    </group>
  )
}

/* ------------------------------------------------------------------ */
/* Panda                                                               */
/* ------------------------------------------------------------------ */

const PANDA_HEAD_Y = 1.14

function Panda({ storyRef, seg = 1, motion = true }) {
  const headRef = useRef(null)
  const bodyRef = useRef(null)
  const armL = useRef(null)
  const armR = useRef(null)
  const mouthRef = useRef(null)
  const eyes = useRef([])
  const nod = useRef(0)

  const fur = useMat(FUR, 0.94)
  const ink = useMat(INK, 0.8)
  const s = (n) => Math.max(12, Math.round(n * seg))

  useFrame((_, delta) => {
    const st = storyRef.current
    const t = st.time
    const dt = Math.min(delta, 0.08)
    const talk = st.ask

    if (bodyRef.current) {
      const breathe = Math.sin(t * 1.05) * 0.013
      bodyRef.current.scale.set(1 + breathe * 0.55, 1 - breathe, 1 + breathe * 0.55)
      // leans in a touch while speaking, settles back while listening
      bodyRef.current.rotation.x = talk * 0.05 - st.meet * 0.015
    }

    // nods along while the penguin is answering
    const nodTarget = st.answer * Math.sin(t * 3) * 0.07
    nod.current += (nodTarget - nod.current) * damp(dt, 5)

    const head = headRef.current
    if (head) {
      // head stays pointed at the penguin the whole time — they are talking to
      // each other, so the eyeline never wanders
      head.rotation.y = -0.18
      head.rotation.x = -0.02 + nod.current + talk * Math.sin(t * 6.2) * 0.035
      head.rotation.z = Math.sin(t * 0.7) * 0.022 + talk * Math.sin(t * 7.6) * 0.03
      head.position.y = PANDA_HEAD_Y + talk * Math.abs(Math.sin(t * 6.2)) * 0.014
    }
    if (mouthRef.current) {
      const open = talk * (0.5 + 0.5 * Math.sin(t * 9.4))
      mouthRef.current.scale.set(1 + open * 0.18 + st.meet * 0.3, 1 + open * 1.4 + st.meet * 0.45, 1)
    }
    // the near arm gestures while speaking, both settle otherwise
    if (armL.current) armL.current.rotation.z = -0.4 - talk * (0.2 + Math.sin(t * 4.6) * 0.22)
    if (armR.current) armR.current.rotation.z = 0.4 + st.ship * 0.25

    const open = motion ? blink(t, 0.3) : 1
    for (let i = 0; i < 2; i += 1) {
      const e = eyes.current[i]
      if (e) e.scale.set(1, Math.max(0.07, open), 1)
    }
  })

  return (
    <group>
      <group ref={bodyRef}>
        <mesh position={[0, 0.48, 0]} scale={[1, 0.96, 0.9]} material={fur}>
          <sphereGeometry args={[0.5, s(56), s(40)]} />
        </mesh>
        {/* black yoke: a band of the torso sphere itself, so it hugs the
            shoulders instead of flaring out as a separate disc */}
        <mesh position={[0, 0.48, 0]} scale={[1.006, 0.966, 0.906]} material={ink}>
          <sphereGeometry args={[0.5, s(48), s(32), 0, Math.PI * 2, 0.4, 0.52]} />
        </mesh>
      </group>

      {/* haunches, tucked in front */}
      <mesh position={[-0.29, 0.13, 0.26]} rotation={[0, -0.22, 0]} scale={[1, 0.66, 1.5]} material={ink}>
        <sphereGeometry args={[0.185, s(30), s(22)]} />
      </mesh>
      <mesh position={[0.29, 0.13, 0.26]} rotation={[0, 0.22, 0]} scale={[1, 0.66, 1.5]} material={ink}>
        <sphereGeometry args={[0.185, s(30), s(22)]} />
      </mesh>

      {/* arms hinge from the shoulder so a gesture swings correctly */}
      <group position={[-0.4, 0.7, 0.1]}>
        <group ref={armL} rotation={[0.26, 0, -0.4]}>
          <mesh position={[0, -0.21, 0]} material={ink}>
            <capsuleGeometry args={[0.105, 0.24, 6, s(24)]} />
          </mesh>
          <mesh position={[0, -0.37, 0.03]} scale={[1, 0.9, 1]} material={ink}>
            <sphereGeometry args={[0.105, s(24), s(18)]} />
          </mesh>
        </group>
      </group>
      <group position={[0.4, 0.7, 0.1]}>
        <group ref={armR} rotation={[0.26, 0, 0.4]}>
          <mesh position={[0, -0.21, 0]} material={ink}>
            <capsuleGeometry args={[0.105, 0.24, 6, s(24)]} />
          </mesh>
          <mesh position={[0, -0.37, 0.03]} scale={[1, 0.9, 1]} material={ink}>
            <sphereGeometry args={[0.105, s(24), s(18)]} />
          </mesh>
        </group>
      </group>

      {/* head */}
      <group ref={headRef} position={[0, PANDA_HEAD_Y, 0]}>
        <mesh scale={[1, 0.95, 0.93]} material={fur}>
          <sphereGeometry args={[0.38, s(56), s(40)]} />
        </mesh>
        <mesh position={[-0.275, 0.29, -0.04]} scale={[1, 1, 0.6]} material={ink}>
          <sphereGeometry args={[0.13, s(28), s(20)]} />
        </mesh>
        <mesh position={[0.275, 0.29, -0.04]} scale={[1, 1, 0.6]} material={ink}>
          <sphereGeometry args={[0.13, s(28), s(20)]} />
        </mesh>
        {/* eye patches, angled inwards the way real markings sit */}
        <mesh position={[-0.15, 0.04, 0.278]} rotation={[0, -0.22, 0.44]} scale={[1, 1.42, 0.38]} material={ink}>
          <sphereGeometry args={[0.108, s(28), s(20)]} />
        </mesh>
        <mesh position={[0.15, 0.04, 0.278]} rotation={[0, 0.22, -0.44]} scale={[1, 1.42, 0.38]} material={ink}>
          <sphereGeometry args={[0.108, s(28), s(20)]} />
        </mesh>
        <Eye position={[-0.145, 0.045, 0.325]} radius={0.04} innerRef={(el) => { eyes.current[0] = el }} />
        <Eye position={[0.145, 0.045, 0.325]} radius={0.04} innerRef={(el) => { eyes.current[1] = el }} />
        {/* muzzle */}
        <mesh position={[0, -0.115, 0.275]} scale={[1.3, 0.9, 0.62]} material={fur}>
          <sphereGeometry args={[0.128, s(32), s(24)]} />
        </mesh>
        <mesh position={[0, -0.072, 0.362]} scale={[1.35, 0.85, 0.75]} material={ink}>
          <sphereGeometry args={[0.044, s(20), s(16)]} />
        </mesh>
        <group ref={mouthRef} position={[0, -0.152, 0.362]}>
          <mesh rotation={[0, 0, Math.PI]} material={ink}>
            <torusGeometry args={[0.05, 0.013, 8, s(28), Math.PI]} />
          </mesh>
        </group>
      </group>
    </group>
  )
}

/* ------------------------------------------------------------------ */
/* Penguin                                                             */
/* ------------------------------------------------------------------ */

const PENGUIN_HEAD_Y = 1.06

function Penguin({ storyRef, seg = 1, motion = true }) {
  const headRef = useRef(null)
  const bodyRef = useRef(null)
  const flipperL = useRef(null)
  const flipperR = useRef(null)
  const jawRef = useRef(null)
  const eyes = useRef([])
  const nod = useRef(0)

  const slate = useMat(SLATE, 0.6)
  const slateHi = useMat(SLATE_HI, 0.52)
  const belly = useMat(FUR, 0.82)
  const beak = useMat(BEAK, 0.4)
  const s = (n) => Math.max(12, Math.round(n * seg))

  useFrame((_, delta) => {
    const st = storyRef.current
    const t = st.time
    const dt = Math.min(delta, 0.08)
    const talk = st.answer

    if (bodyRef.current) {
      const breathe = Math.sin(t * 1.2 + 1.5) * 0.014
      bodyRef.current.scale.set(1 + breathe * 0.55, 1 - breathe, 1 + breathe * 0.55)
      bodyRef.current.rotation.x = talk * 0.05 - st.meet * 0.015
    }

    // nods along while the panda is speaking — listening, not idling
    const nodTarget = st.ask * Math.sin(t * 3.1) * 0.08
    nod.current += (nodTarget - nod.current) * damp(dt, 5)

    const head = headRef.current
    if (head) {
      head.rotation.y = 0.19
      head.rotation.x = -0.02 + nod.current + talk * Math.sin(t * 6.9) * 0.04
      head.rotation.z = Math.sin(t * 0.8 + 2) * 0.022 + talk * Math.sin(t * 8.3) * 0.035
      head.position.y = PENGUIN_HEAD_Y + talk * Math.abs(Math.sin(t * 6.9)) * 0.016
    }
    if (jawRef.current) {
      const open = talk * (0.14 + 0.16 * Math.abs(Math.sin(t * 9.8))) + st.meet * (0.08 + 0.08 * Math.sin(t * 4.2))
      jawRef.current.rotation.x = -open
    }
    if (flipperL.current) flipperL.current.rotation.z = 0.22 + talk * Math.sin(t * 5.2) * 0.26 + st.ship * 0.4
    if (flipperR.current) flipperR.current.rotation.z = -0.22 - st.ship * 0.4

    const open = motion ? blink(t, 0.85) : 1
    for (let i = 0; i < 2; i += 1) {
      const e = eyes.current[i]
      if (e) e.scale.set(1, Math.max(0.07, open), 1)
    }
  })

  return (
    <group>
      <group ref={bodyRef}>
        <mesh position={[0, 0.46, 0]} scale={[0.95, 1.1, 0.9]} material={slate}>
          <sphereGeometry args={[0.45, s(56), s(40)]} />
        </mesh>
        {/* belly panel, pushed forward so it reads as a front, not a stripe */}
        <mesh position={[0, 0.42, 0.12]} scale={[0.82, 0.95, 0.72]} material={belly}>
          <sphereGeometry args={[0.42, s(44), s(30)]} />
        </mesh>
      </group>

      {/* feet */}
      <mesh position={[-0.16, 0.055, 0.3]} rotation={[0, -0.18, 0]} scale={[1, 0.38, 1.6]} material={beak}>
        <sphereGeometry args={[0.11, s(24), s(18)]} />
      </mesh>
      <mesh position={[0.16, 0.055, 0.3]} rotation={[0, 0.18, 0]} scale={[1, 0.38, 1.6]} material={beak}>
        <sphereGeometry args={[0.11, s(24), s(18)]} />
      </mesh>

      {/* flippers hinge at the shoulder */}
      <group position={[-0.4, 0.68, 0.04]}>
        <group ref={flipperL} rotation={[0, 0, 0.22]}>
          <mesh position={[0, -0.22, 0]} scale={[0.45, 1.5, 0.85]} material={slateHi}>
            <sphereGeometry args={[0.14, s(26), s(20)]} />
          </mesh>
        </group>
      </group>
      <group position={[0.4, 0.68, 0.04]}>
        <group ref={flipperR} rotation={[0, 0, -0.22]}>
          <mesh position={[0, -0.22, 0]} scale={[0.45, 1.5, 0.85]} material={slateHi}>
            <sphereGeometry args={[0.14, s(26), s(20)]} />
          </mesh>
        </group>
      </group>

      <group ref={headRef} position={[0, PENGUIN_HEAD_Y, 0]}>
        <mesh scale={[1, 0.98, 0.95]} material={slate}>
          <sphereGeometry args={[0.335, s(52), s(36)]} />
        </mesh>
        {/* white face mask */}
        <mesh position={[0, -0.03, 0.105]} scale={[0.85, 0.93, 0.66]} material={belly}>
          <sphereGeometry args={[0.315, s(40), s(28)]} />
        </mesh>
        {/* two-part beak, so it can open while talking */}
        <mesh position={[0, -0.035, 0.285]} rotation={[Math.PI / 2, 0, 0]} material={beak}>
          <coneGeometry args={[0.078, 0.2, s(24)]} />
        </mesh>
        <group ref={jawRef} position={[0, -0.075, 0.195]}>
          <mesh position={[0, -0.008, 0.088]} rotation={[Math.PI / 2, 0, 0]} scale={[1, 1, 0.55]} material={beak}>
            <coneGeometry args={[0.073, 0.19, s(20)]} />
          </mesh>
        </group>
        <Eye position={[-0.118, 0.082, 0.26]} radius={0.044} innerRef={(el) => { eyes.current[0] = el }} />
        <Eye position={[0.118, 0.082, 0.26]} radius={0.044} innerRef={(el) => { eyes.current[1] = el }} />
      </group>
    </group>
  )
}

/* ------------------------------------------------------------------ */
/* AI core — the message passes through it                             */
/* ------------------------------------------------------------------ */

function AICore({ storyRef, motion, lite, seg = 1 }) {
  const coreRef = useRef(null)
  const ringA = useRef(null)
  const ringB = useRef(null)
  const orbitRef = useRef(null)
  const haloRef = useRef(null)
  const rippleRef = useRef(null)
  const rippleMat = useRef(null)
  const spin = useRef(0.4)
  const s = (n) => Math.max(12, Math.round(n * seg))

  const orbiters = useMemo(
    () =>
      [0, 1, 2, 3, 4, 5].map((i) => ({
        key: i,
        a: (i / 6) * Math.PI * 2,
        r: 0.28 + (i % 2) * 0.07,
        y: ((i % 3) - 1) * 0.065,
      })),
    [],
  )

  useFrame((_, delta) => {
    if (!motion) return
    const st = storyRef.current
    const t = st.time
    const dt = Math.min(delta, 0.08)

    // spins up while it is working, coasts back down afterwards
    const target = 0.35 + st.think * 3.2 + st.ask * 0.4
    spin.current += (target - spin.current) * damp(dt, 2.4)

    if (coreRef.current) {
      coreRef.current.scale.setScalar(1 + Math.sin(t * 2.1) * 0.045 + st.think * 0.2)
      coreRef.current.rotation.y += dt * spin.current
      coreRef.current.rotation.x += dt * spin.current * 0.38
    }
    if (ringA.current) {
      ringA.current.rotation.z += dt * spin.current * 0.85
      ringA.current.rotation.x = Math.PI / 2.6 + Math.sin(t * 0.38) * 0.09
    }
    if (ringB.current) {
      ringB.current.rotation.z -= dt * spin.current * 0.6
      ringB.current.rotation.y = Math.PI / 3 + Math.cos(t * 0.33) * 0.11
    }
    if (orbitRef.current) {
      orbitRef.current.rotation.y += dt * (0.55 + st.think * 2)
      orbitRef.current.scale.setScalar(1 - st.think * 0.26)
    }
    if (haloRef.current) haloRef.current.opacity = 0.12 + Math.sin(t * 2.1) * 0.035 + st.think * 0.16

    // a single ripple leaves the core the moment it finishes thinking
    if (rippleRef.current && rippleMat.current) {
      const win = [BEATS.think[1] - 0.02, BEATS.think[1] + 0.12]
      const a = beat(st.phase, win, 0.12)
      rippleRef.current.visible = !lite && a > 0.01
      rippleRef.current.scale.setScalar(0.6 + ramp(st.phase, win) * 2.6)
      rippleMat.current.opacity = a * 0.4
    }
  })

  return (
    <group>
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[0.13, 3]} />
        <meshStandardMaterial color={MOLTEN_HI} emissive={MOLTEN} emissiveIntensity={1.9} roughness={0.2} metalness={0.15} />
      </mesh>
      {/* halo on back faces only, so the core stays crisp inside it */}
      <mesh>
        <sphereGeometry args={[0.36, s(24), s(18)]} />
        <meshBasicMaterial
          ref={haloRef}
          color={MOLTEN}
          transparent
          opacity={0.12}
          depthWrite={false}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      <mesh ref={ringA} rotation={[Math.PI / 2.6, 0, 0]}>
        <torusGeometry args={[0.31, 0.006, 8, s(64)]} />
        <meshBasicMaterial color={MOLTEN} transparent opacity={0.8} toneMapped={false} />
      </mesh>
      <mesh ref={ringB} rotation={[0, Math.PI / 3, 0]}>
        <torusGeometry args={[0.24, 0.0045, 8, s(56)]} />
        <meshBasicMaterial color={MOLTEN_HI} transparent opacity={0.55} toneMapped={false} />
      </mesh>
      <group ref={orbitRef}>
        {orbiters.map((o) => (
          <mesh key={o.key} position={[Math.cos(o.a) * o.r, o.y, Math.sin(o.a) * o.r]}>
            <sphereGeometry args={[0.018, 12, 8]} />
            <meshBasicMaterial color={MOLTEN_HI} transparent opacity={0.9} toneMapped={false} />
          </mesh>
        ))}
      </group>
      <mesh ref={rippleRef} rotation={[Math.PI / 2.4, 0, 0]} visible={false}>
        <torusGeometry args={[0.28, 0.005, 8, s(56)]} />
        <meshBasicMaterial ref={rippleMat} color={MOLTEN} transparent opacity={0} depthWrite={false} toneMapped={false} />
      </mesh>
    </group>
  )
}

/* ------------------------------------------------------------------ */
/* The message itself                                                  */
/* ------------------------------------------------------------------ */

/**
 * A small packet that leaves the panda's bubble, dips through the AI core and
 * lands where the penguin answers — the beat that makes the scene legible as
 * "these two are talking, with the AI in the middle".
 */
function FlyingMessage({ storyRef, from, via, to }) {
  const groupRef = useRef(null)
  const panelRef = useRef(null)
  const edgeRef = useRef(null)
  const dotsRef = useRef([])

  const curve = useMemo(
    () =>
      new THREE.CatmullRomCurve3(
        [new THREE.Vector3(...from), new THREE.Vector3(...via), new THREE.Vector3(...to)],
        false,
        'catmullrom',
        0.5,
      ),
    [from, via, to],
  )

  const panelGeo = useMemo(() => new THREE.ShapeGeometry(roundedRect(0.3, 0.18, 0.07), 10), [])
  const edgeGeo = useMemo(() => new THREE.ShapeGeometry(roundedRect(0.33, 0.21, 0.082), 10), [])
  const dotGeo = useMemo(() => new THREE.CircleGeometry(0.022, 14), [])

  useFrame(() => {
    const st = storyRef.current
    const g = groupRef.current
    if (!g) return
    const a = beat(st.phase, BEATS.send, 0.07)
    g.visible = a > 0.01
    if (!g.visible) return

    const travel = smootherstep(ramp(st.phase, BEATS.send))
    curve.getPoint(travel, g.position)
    g.scale.setScalar(0.55 + Math.sin(travel * Math.PI) * 0.45)
    g.rotation.z = Math.sin(travel * Math.PI * 2) * 0.14

    if (panelRef.current) panelRef.current.opacity = a * 0.95
    if (edgeRef.current) edgeRef.current.opacity = a * 0.6
    for (let i = 0; i < 3; i += 1) {
      const d = dotsRef.current[i]
      if (d && d.material) {
        d.material.opacity = a * (0.55 + 0.45 * Math.max(0, Math.sin(st.time * 7 - i * 0.7)))
      }
    }
  })

  return (
    <group ref={groupRef} visible={false}>
      <mesh geometry={edgeGeo} position={[0, 0, -0.004]} renderOrder={3}>
        <meshBasicMaterial ref={edgeRef} color={MOLTEN} transparent opacity={0} depthWrite={false} toneMapped={false} />
      </mesh>
      <mesh geometry={panelGeo} renderOrder={4}>
        <meshBasicMaterial ref={panelRef} color={CHIP} transparent opacity={0} depthWrite={false} />
      </mesh>
      {[0, 1, 2].map((i) => (
        <mesh
          key={i}
          ref={(el) => {
            dotsRef.current[i] = el
          }}
          geometry={dotGeo}
          position={[(i - 1) * 0.078, 0, 0.004]}
          renderOrder={5}
        >
          <meshBasicMaterial color={MOLTEN} transparent opacity={0} depthWrite={false} toneMapped={false} />
        </mesh>
      ))}
    </group>
  )
}

/* ------------------------------------------------------------------ */
/* Shipped chip — the payoff                                           */
/* ------------------------------------------------------------------ */

function ShippedChip({ storyRef, position }) {
  const groupRef = useRef(null)
  const plateRef = useRef(null)
  const edgeRef = useRef(null)
  const tickRef = useRef(null)

  const plateGeo = useMemo(() => new THREE.ShapeGeometry(roundedRect(0.4, 0.4, 0.12), 10), [])
  const edgeGeo = useMemo(() => new THREE.ShapeGeometry(roundedRect(0.44, 0.44, 0.135), 10), [])
  const tickGeo = useMemo(() => new THREE.ShapeGeometry(checkShape()), [])

  useFrame(() => {
    const g = groupRef.current
    if (!g) return
    const a = storyRef.current.ship
    g.visible = a > 0.005
    if (!g.visible) return
    g.scale.setScalar(0.5 + a * 0.5 + Math.sin(a * Math.PI) * 0.09)
    g.position.y = position[1] + smootherstep(a) * 0.12
    g.rotation.z = (1 - a) * 0.2
    if (plateRef.current) plateRef.current.opacity = a * 0.95
    if (edgeRef.current) edgeRef.current.opacity = a * 0.7
    if (tickRef.current) tickRef.current.opacity = a
  })

  return (
    <group ref={groupRef} position={position} visible={false}>
      <mesh geometry={edgeGeo} position={[0, 0, -0.004]} renderOrder={3}>
        <meshBasicMaterial ref={edgeRef} color={MOLTEN} transparent opacity={0} depthWrite={false} toneMapped={false} />
      </mesh>
      <mesh geometry={plateGeo} renderOrder={4}>
        <meshBasicMaterial ref={plateRef} color={CHIP} transparent opacity={0} depthWrite={false} />
      </mesh>
      <mesh geometry={tickGeo} position={[0, 0, 0.004]} renderOrder={5}>
        <meshBasicMaterial ref={tickRef} color={MOLTEN} transparent opacity={0} depthWrite={false} toneMapped={false} />
      </mesh>
    </group>
  )
}

/* ------------------------------------------------------------------ */
/* Ground pool of light                                                */
/* ------------------------------------------------------------------ */

const GLOW_VERT = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const GLOW_FRAG = `
  uniform vec3 uColor;
  uniform float uOpacity;
  varying vec2 vUv;
  void main() {
    float d = distance(vUv, vec2(0.5)) * 2.0;
    float a = smoothstep(1.0, 0.0, d);
    a = pow(a, 2.6);
    gl_FragColor = vec4(uColor, a * uOpacity);
  }
`

function GroundGlow() {
  const uniforms = useMemo(
    () => ({ uColor: { value: new THREE.Color(MOLTEN) }, uOpacity: { value: 0.28 } }),
    [],
  )
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.006, 0.14]}>
      <planeGeometry args={[4, 2.4]} />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={GLOW_VERT}
        fragmentShader={GLOW_FRAG}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  )
}

/* ------------------------------------------------------------------ */
/* Public component                                                    */
/* ------------------------------------------------------------------ */

const PANDA_X = -0.86
const PENGUIN_X = 0.88
const TURN = 0.6
const CORE_Y = 1.66

const PANDA_BUBBLE = [-1.48, 1.6, 0.32]
const PENGUIN_BUBBLE = [1.5, 1.52, 0.32]

/**
 * A panda and a penguin sitting face to face, talking to each other through a
 * small AI core between them. Sits in the lower corner of the hero, sized to
 * stay clear of the copy. Canvas child; renders no DOM.
 */
export default function Buddies({ lite = false, motion = true }) {
  const swayRef = useRef(null)
  const pointer = usePointer(motion)
  const damped = useRef({ x: 0, y: 0 })

  // One story object, written once per frame and read by every child — no
  // React state, so nothing re-renders while the loop plays.
  const story = useRef({
    time: 0,
    phase: 0,
    ask: motion ? 0 : 1,
    think: 0,
    answer: 0,
    meet: 0,
    ship: 0,
  })

  const { viewport } = useThree()
  const seg = lite ? 0.55 : 1

  // Corner vignette, not a centrepiece: anchored to the visible frustum and
  // kept small enough that it never sits under the headline.
  const { position, scale } = useMemo(() => {
    const w = viewport.width
    const h = viewport.height
    if (w / h > 1.05) {
      const unit = Math.min(w * 0.17, h * 0.26)
      return {
        position: [w * 0.29, -h * 0.5 + 0.16, 0],
        scale: Math.max(0.5, Math.min(unit * 0.56, 0.9)),
      }
    }
    const unit = Math.min(w * 0.3, h * 0.2)
    return {
      position: [w * 0.19, -h * 0.5 + 0.12, 0],
      scale: Math.max(0.32, Math.min(unit * 0.4, 0.54)),
    }
  }, [viewport.width, viewport.height])

  useFrame(({ clock }, delta) => {
    const dt = Math.min(delta, 0.08)
    const t = clock.getElapsedTime()
    const st = story.current
    st.time = t

    if (motion) {
      const p = (t % CYCLE) / CYCLE
      st.phase = p
      st.ask = beat(p, BEATS.ask)
      st.think = beat(p, BEATS.think, 0.05)
      st.answer = beat(p, BEATS.answer)
      st.meet = beat(p, BEATS.meet, 0.08)
      st.ship = beat(p, BEATS.ship, 0.07)
    }

    damped.current.x += (pointer.x - damped.current.x) * damp(dt, 2)
    damped.current.y += (pointer.y - damped.current.y) * damp(dt, 2)

    const g = swayRef.current
    if (!g) return
    const idle = motion ? Math.sin(t * 0.26) * 0.035 : 0
    g.rotation.y = idle + damped.current.x * 0.12
    g.rotation.x = -damped.current.y * 0.045
    g.position.y = motion ? Math.sin(t * 0.48) * 0.01 : 0
  })

  return (
    <group position={position} scale={scale}>
      <group ref={swayRef}>
        <GroundGlow />

        {/* both turned inwards, so they are looking at each other throughout */}
        <group position={[PANDA_X, 0, 0.04]} rotation={[0, TURN, 0]}>
          <Panda storyRef={story} seg={seg} motion={motion} />
        </group>
        <group position={[PENGUIN_X, 0, 0.04]} rotation={[0, -TURN, 0]}>
          <Penguin storyRef={story} seg={seg} motion={motion} />
        </group>

        <group position={[0, CORE_Y, -0.06]}>
          <AICore storyRef={story} motion={motion} lite={lite} seg={seg} />
        </group>

        {!lite && (
          <FlyingMessage
            storyRef={story}
            from={[PANDA_BUBBLE[0] + 0.3, PANDA_BUBBLE[1] - 0.06, 0.2]}
            via={[0, CORE_Y - 0.02, 0.16]}
            to={[PENGUIN_BUBBLE[0] - 0.3, PENGUIN_BUBBLE[1] - 0.06, 0.2]}
          />
        )}

        <ShippedChip storyRef={story} position={[0, CORE_Y + 0.5, 0.3]} />

        <Bubble position={PANDA_BUBBLE} dir={1} storyRef={story} phaseKey="ask" motion={motion} />
        <Bubble position={PENGUIN_BUBBLE} dir={-1} storyRef={story} phaseKey="answer" motion={motion} />

        {/* key + rims, so the fur separates cleanly from the dark hero */}
        <pointLight position={[0.3, 2, 2.3]} intensity={5} distance={9} decay={2} color="#fff4de" />
        <pointLight position={[-2.5, 1.3, 1.1]} intensity={2.6} distance={8} decay={2} color={MOLTEN} />
        <pointLight position={[2.3, 1.1, -1.7]} intensity={2.2} distance={7} decay={2} color="#93b6ff" />
      </group>
    </group>
  )
}
