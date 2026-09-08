import { useCallback, useSyncExternalStore } from 'react'

const cache = new Map()

function canMatch() {
  return typeof window !== 'undefined' && typeof window.matchMedia === 'function'
}

function getMql(query) {
  let mql = cache.get(query)
  if (!mql) {
    mql = window.matchMedia(query)
    cache.set(query, mql)
  }
  return mql
}

/**
 * Subscribes to a CSS media query. Returns `ssrDefault` on the server and
 * during hydration; the live value afterwards. Safe without `matchMedia`
 * (jsdom prerender) — it simply keeps returning `ssrDefault`.
 */
export default function useMediaQuery(query, ssrDefault = false) {
  const subscribe = useCallback(
    (onChange) => {
      if (!canMatch()) return () => {}
      const mql = getMql(query)
      if (typeof mql.addEventListener === 'function') {
        mql.addEventListener('change', onChange)
        return () => mql.removeEventListener('change', onChange)
      }
      mql.addListener(onChange) // Safari < 14
      return () => mql.removeListener(onChange)
    },
    [query],
  )
  const getSnapshot = useCallback(() => (canMatch() ? getMql(query).matches : ssrDefault), [query, ssrDefault])
  const getServerSnapshot = useCallback(() => ssrDefault, [ssrDefault])

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
