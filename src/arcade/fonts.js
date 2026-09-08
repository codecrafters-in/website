const HREF = 'https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap'
const ID = 'arcade-font'
let pending = null

/** Injects the Press Start 2P stylesheet once and resolves when the face is usable (or after 2s). SSR-safe. */
export function loadArcadeFont() {
  if (typeof document === 'undefined') return Promise.resolve(false)
  if (pending) return pending
  pending = new Promise((resolve) => {
    if (!document.getElementById(ID)) {
      const link = document.createElement('link')
      link.id = ID
      link.rel = 'stylesheet'
      link.href = HREF
      link.crossOrigin = 'anonymous'
      document.head.appendChild(link)
    }
    let done = false
    const finish = (ok) => {
      if (done) return
      done = true
      resolve(ok)
    }
    const timer = setTimeout(() => finish(false), 2000)
    if (document.fonts && typeof document.fonts.load === 'function') {
      document.fonts
        .load('12px "Press Start 2P"')
        .then((faces) => {
          clearTimeout(timer)
          finish(Array.isArray(faces) ? faces.length > 0 : true)
        })
        .catch(() => {
          clearTimeout(timer)
          finish(false)
        })
    }
  })
  return pending
}
