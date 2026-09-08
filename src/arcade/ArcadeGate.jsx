import { lazy, Suspense, useCallback } from 'react'
import { toast } from 'sonner'
import { useArcade } from './index.js'
import useKonami from './useKonami.js'

const ArcadeOverlay = lazy(() => import('./ArcadeOverlay.jsx'))

function InsertCoin() {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Bug Blaster arcade loading"
      className="fixed inset-0 z-arcade flex items-center justify-center on-dark bg-black text-primary-container"
    >
      <span className="font-arcade animate-blink text-xs sm:text-sm">INSERT COIN</span>
    </div>
  )
}

/** Mount once near the app root. Renders nothing until the arcade is opened; the game chunk is lazy. */
export default function ArcadeGate() {
  const { open, openArcade } = useArcade()

  const onKonami = useCallback(() => {
    try {
      toast('CHEAT CODE ACCEPTED — INSERT COIN')
    } catch {
      /* toaster not mounted */
    }
    openArcade()
  }, [openArcade])

  useKonami(onKonami)

  if (!open) return null
  return (
    <Suspense fallback={<InsertCoin />}>
      <ArcadeOverlay />
    </Suspense>
  )
}
