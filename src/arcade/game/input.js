// Keyboard + pointer input. Continuous state is polled by the engine; discrete actions are pushed via `onEvent`.
// Safe to construct without a DOM (returns an inert input with the same shape).

function isTyping(el) {
  if (!el) return false
  const tag = el.tagName
  return tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || el.isContentEditable === true
}

export function createInput({ canvas, W = 320, H = 180, onEvent } = {}) {
  const state = { left: false, right: false, fire: false, pointerX: -1, pointerY: -1, pointerDown: false }
  // On-screen buttons (rendered by ArcadeOverlay on coarse pointers).
  const touch = { left: false, right: false, fire: false }
  const emit = (type, a, b) => {
    if (typeof onEvent === 'function') onEvent(type, a, b)
  }

  function setTouch(name, value) {
    if (name in touch) touch[name] = !!value
  }

  function reset() {
    state.left = state.right = state.fire = state.pointerDown = false
    state.pointerX = state.pointerY = -1
    touch.left = touch.right = touch.fire = false
  }

  // The overlay hosts two cabinets on one window. While the other one is on
  // screen this input must go quiet — it binds `window` keydown and calls
  // preventDefault(), so a live listener would eat the other game's keys.
  let enabled = true
  function setEnabled(v) {
    enabled = !!v
    if (!enabled) reset()
  }

  const hasDom = typeof window !== 'undefined' && typeof document !== 'undefined'
  if (!hasDom) return { state, touch, setTouch, setEnabled, reset, destroy() {} }

  function onKeyDown(e) {
    if (!enabled) return
    if (isTyping(document.activeElement)) return
    const key = e.key
    let handled = true
    switch (key) {
      case 'ArrowLeft':
        state.left = true
        if (!e.repeat) emit('left')
        break
      case 'ArrowRight':
        state.right = true
        if (!e.repeat) emit('right')
        break
      case 'ArrowUp':
        state.fire = true
        if (!e.repeat) emit('up')
        break
      case 'ArrowDown':
        if (!e.repeat) emit('down')
        break
      case ' ':
        state.fire = true
        if (!e.repeat) emit('start')
        break
      case 'Enter':
        if (!e.repeat) emit('start')
        break
      case 'Backspace':
        if (!e.repeat) emit('back')
        break
      default:
        handled = false
    }
    if (key === 'a' || key === 'A') state.left = true
    else if (key === 'd' || key === 'D') state.right = true
    if (!e.repeat && typeof key === 'string' && key.length === 1) {
      if (key === 'p' || key === 'P') emit('pause')
      else if (key === 'm' || key === 'M') emit('mute')
      if (/[a-z]/i.test(key)) emit('char', key.toUpperCase())
    }
    if (handled) e.preventDefault()
  }

  function onKeyUp(e) {
    if (!enabled) return
    switch (e.key) {
      case 'ArrowLeft':
      case 'a':
      case 'A':
        state.left = false
        break
      case 'ArrowRight':
      case 'd':
      case 'D':
        state.right = false
        break
      case 'ArrowUp':
      case ' ':
        state.fire = false
        break
      default:
    }
  }

  function toLogical(e) {
    const r = canvas.getBoundingClientRect()
    if (!r.width || !r.height) return
    state.pointerX = ((e.clientX - r.left) / r.width) * W
    state.pointerY = ((e.clientY - r.top) / r.height) * H
  }

  function onPointerDown(e) {
    if (!enabled) return
    if (e.button !== undefined && e.button !== 0) return
    e.preventDefault()
    try {
      canvas.setPointerCapture(e.pointerId)
    } catch {
      /* ignore */
    }
    toLogical(e)
    state.pointerDown = true
    state.fire = true
    emit('tap', state.pointerX, state.pointerY)
  }

  function onPointerMove(e) {
    if (!state.pointerDown) return
    toLogical(e)
  }

  function onPointerUp() {
    state.pointerDown = false
    state.fire = false
    state.pointerX = state.pointerY = -1
  }

  window.addEventListener('keydown', onKeyDown)
  window.addEventListener('keyup', onKeyUp)
  window.addEventListener('blur', reset)
  if (canvas && canvas.addEventListener) {
    canvas.addEventListener('pointerdown', onPointerDown)
    canvas.addEventListener('pointermove', onPointerMove)
    canvas.addEventListener('pointerup', onPointerUp)
    canvas.addEventListener('pointercancel', onPointerUp)
    canvas.addEventListener('lostpointercapture', onPointerUp)
    canvas.addEventListener('contextmenu', onPointerDown)
  }

  function destroy() {
    window.removeEventListener('keydown', onKeyDown)
    window.removeEventListener('keyup', onKeyUp)
    window.removeEventListener('blur', reset)
    if (canvas && canvas.removeEventListener) {
      canvas.removeEventListener('pointerdown', onPointerDown)
      canvas.removeEventListener('pointermove', onPointerMove)
      canvas.removeEventListener('pointerup', onPointerUp)
      canvas.removeEventListener('pointercancel', onPointerUp)
      canvas.removeEventListener('lostpointercapture', onPointerUp)
      canvas.removeEventListener('contextmenu', onPointerDown)
    }
    reset()
  }

  return { state, touch, setTouch, setEnabled, reset, destroy }
}
