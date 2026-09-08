import { lazy, Suspense } from 'react'
import { ClientOnly } from 'vite-react-ssg'
import useIdleMount from '../hooks/useIdleMount.js'

const HeroScene = lazy(() => import('../effects/HeroScene.jsx'))

function Inner(props) {
  const ready = useIdleMount(60)
  if (!ready) return null
  return (
    <Suspense fallback={null}>
      <HeroScene {...props} />
    </Suspense>
  )
}

export default function HeroCanvas(props) {
  return (
    <>
      <div className="absolute inset-0 hero-glow pointer-events-none" aria-hidden="true" />
      <ClientOnly>{() => <Inner {...props} />}</ClientOnly>
    </>
  )
}
