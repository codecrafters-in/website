import { lazy, Suspense } from 'react'
import { ClientOnly } from 'vite-react-ssg'
import useIdleMount from '../hooks/useIdleMount.js'

const ScrollScene = lazy(() => import('../effects/ScrollScene.jsx'))

function Inner(props) {
  const ready = useIdleMount(200)
  if (!ready) return null
  return (
    <Suspense fallback={null}>
      <ScrollScene {...props} />
    </Suspense>
  )
}

export default function ForgeCore(props) {
  return <ClientOnly>{() => <Inner {...props} />}</ClientOnly>
}
