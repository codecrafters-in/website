// Small browser-only helpers shared by the R3F scenes. Never call during render.

/** true when a WebGL context can actually be created. Browser only. */
export function hasWebGL() {
  if (typeof window === 'undefined' || typeof document === 'undefined') return false
  if (!window.WebGLRenderingContext) return false
  try {
    const canvas = document.createElement('canvas')
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
    if (!gl) return false
    const lose = gl.getExtension && gl.getExtension('WEBGL_lose_context')
    if (lose) lose.loseContext()
    return true
  } catch {
    return false
  }
}

/** Clamped device pixel ratio for the canvases. Browser only. */
export function clampedDpr(max = 1.5) {
  if (typeof window === 'undefined') return 1
  return Math.min(window.devicePixelRatio || 1, max)
}

export const MOLTEN = '#f5c518'
export const MOLTEN_HI = '#ffe5a0'
export const MOLTEN_DEEP = '#695200'
export const MOLTEN_FIXED = '#ffe08b'
export const TEXT = '#e5e2e1'
