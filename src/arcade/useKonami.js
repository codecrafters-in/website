import { useEffect, useRef } from 'react'

const SEQUENCE = ['arrowup', 'arrowup', 'arrowdown', 'arrowdown', 'arrowleft', 'arrowright', 'arrowleft', 'arrowright', 'b', 'a']

function isTyping(el) {
  if (!el) return false
  const tag = el.tagName
  return tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || el.isContentEditable === true
}

/** Fires `callback` when the Konami code is typed anywhere on the page (outside form fields). */
export default function useKonami(callback) {
  const cbRef = useRef(callback)
  useEffect(() => {
    cbRef.current = callback
  }, [callback])

  useEffect(() => {
    if (typeof window === 'undefined') return undefined
    let pos = 0
    const onKey = (e) => {
      if (!e.key || isTyping(document.activeElement)) return
      const key = e.key.toLowerCase()
      if (key === SEQUENCE[pos]) {
        pos += 1
        if (pos === SEQUENCE.length) {
          pos = 0
          if (typeof cbRef.current === 'function') cbRef.current()
        }
      } else {
        // Allow the first key of the sequence to restart it immediately.
        pos = key === SEQUENCE[0] ? 1 : 0
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])
}
