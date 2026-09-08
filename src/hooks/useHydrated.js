import { useSyncExternalStore } from 'react'

const subscribe = () => () => {}
const clientSnapshot = () => true
const serverSnapshot = () => false

/**
 * false on the server and during hydration (so markup matches the prerendered
 * HTML), true on the client afterwards. Client-only mounts (ClientOnly /
 * React.lazy after hydration) get true on their very first render.
 */
export default function useHydrated() {
  return useSyncExternalStore(subscribe, clientSnapshot, serverSnapshot)
}
