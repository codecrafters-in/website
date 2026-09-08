import { lazy, Suspense, useEffect } from 'react'
import useIdleMount from '../hooks/useIdleMount.js'
import { initAnalytics } from '../lib/analytics.js'
import { captureAttribution } from '../lib/attribution.js'

const SmoothScroll = lazy(() => import('../effects/SmoothScroll.jsx'))
const GrainOverlay = lazy(() => import('../effects/GrainOverlay.jsx'))
const ScrollProgress = lazy(() => import('../effects/ScrollProgress.jsx'))

// Mounted only on the client (via <ClientOnly>) and only after the browser is idle,
// so none of the motion/3D code competes with the first paint.
export default function ClientEffects() {
  const ready = useIdleMount(120)

  // Consent-mode defaults must be declared before the container can load.
  useEffect(() => {
    captureAttribution()
    initAnalytics()
  }, [])

  if (!ready) return null
  return (
    <Suspense fallback={null}>
      <SmoothScroll />
      <ScrollProgress />
      <GrainOverlay />
    </Suspense>
  )
}
