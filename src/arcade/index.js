// Arcade context — deliberately tiny and free of game imports so it can live in the main bundle.
import { createContext, createElement, useCallback, useContext, useEffect, useMemo, useState } from 'react'

// window CustomEvent name. Dispatch `new CustomEvent(ARCADE_EVENT, { detail: { action: 'open' | 'close' | 'toggle' } })`
// from anywhere (no React needed) to drive the arcade; the provider also emits it with `{ open }` on every change.
export const ARCADE_EVENT = 'cc:arcade'

const ArcadeContext = createContext(null)

export function ArcadeProvider({ children }) {
  const [open, setOpen] = useState(false)

  const openArcade = useCallback(() => setOpen(true), [])
  const closeArcade = useCallback(() => setOpen(false), [])
  const toggleArcade = useCallback(() => setOpen((v) => !v), [])

  // External control + broadcast.
  useEffect(() => {
    if (typeof window === 'undefined') return undefined
    const onEvent = (e) => {
      const action = e && e.detail && e.detail.action
      if (action === 'open') setOpen(true)
      else if (action === 'close') setOpen(false)
      else if (action === 'toggle') setOpen((v) => !v)
    }
    window.addEventListener(ARCADE_EVENT, onEvent)
    return () => window.removeEventListener(ARCADE_EVENT, onEvent)
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return
    try {
      window.dispatchEvent(new CustomEvent(ARCADE_EVENT, { detail: { open } }))
    } catch {
      /* CustomEvent unavailable — nothing to broadcast */
    }
  }, [open])

  const value = useMemo(
    () => ({ open, openArcade, closeArcade, toggleArcade }),
    [open, openArcade, closeArcade, toggleArcade],
  )

  return createElement(ArcadeContext.Provider, { value }, children)
}

const NOOP = () => {}
const FALLBACK = { open: false, openArcade: NOOP, closeArcade: NOOP, toggleArcade: NOOP }

export function useArcade() {
  // Fallback keeps ArcadeButton/ArcadeGate harmless if mounted outside the provider.
  return useContext(ArcadeContext) || FALLBACK
}
