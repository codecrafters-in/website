// Konami handling only. The arcade itself lives at /arcade, so there is no
// overlay state to hold and no provider to mount — the cheat code is now just a
// shortcut to a URL that already exists.
import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import useKonami from './useKonami.js'

export const ARCADE_PATH = '/arcade'

/** Mount once near the app root. Renders nothing; listens for ↑↑↓↓←→←→BA. */
export default function KonamiJump() {
  const navigate = useNavigate()

  const onKonami = useCallback(() => {
    try {
      toast('CHEAT CODE ACCEPTED — INSERT COIN')
    } catch {
      /* toaster not mounted */
    }
    navigate(ARCADE_PATH)
  }, [navigate])

  useKonami(onKonami)
  return null
}
