import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * `const [copied, copy] = useCopyToClipboard()`
 * `copy(text)` writes to the clipboard (with an execCommand fallback) and
 * flips `copied` to true for 2 seconds. Resolves to a boolean success flag.
 */
export default function useCopyToClipboard(resetAfter = 2000) {
  const [copied, setCopied] = useState(false)
  const timer = useRef(null)

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current)
  }, [])

  const copy = useCallback(
    async (text) => {
      if (typeof window === 'undefined') return false
      const value = String(text ?? '')
      let ok = false
      try {
        if (typeof navigator !== 'undefined' && navigator.clipboard && window.isSecureContext !== false) {
          await navigator.clipboard.writeText(value)
          ok = true
        }
      } catch {
        ok = false
      }
      if (!ok) {
        try {
          const ta = document.createElement('textarea')
          ta.value = value
          ta.setAttribute('readonly', '')
          ta.style.position = 'fixed'
          ta.style.top = '-1000px'
          ta.style.opacity = '0'
          document.body.appendChild(ta)
          ta.select()
          ok = document.execCommand('copy')
          document.body.removeChild(ta)
        } catch {
          ok = false
        }
      }
      if (ok) {
        setCopied(true)
        if (timer.current) clearTimeout(timer.current)
        timer.current = setTimeout(() => setCopied(false), resetAfter)
      }
      return ok
    },
    [resetAfter],
  )

  return [copied, copy]
}
