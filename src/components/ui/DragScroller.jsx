import { useRef, useCallback } from 'react'

// Horizontal drag-to-scroll strip with snap points and edge fade.
export default function DragScroller({ children, className = '', gap = 'gap-5', snap = true }) {
  const ref = useRef(null)
  const state = useRef({ down: false, x: 0, left: 0, moved: false })

  const onDown = useCallback((e) => {
    const el = ref.current
    if (!el) return
    state.current = { down: true, x: e.clientX, left: el.scrollLeft, moved: false }
    el.classList.add('cursor-grabbing')
  }, [])
  const onMove = useCallback((e) => {
    const el = ref.current
    const s = state.current
    if (!el || !s.down) return
    const dx = e.clientX - s.x
    if (Math.abs(dx) > 4) s.moved = true
    el.scrollLeft = s.left - dx
  }, [])
  const onUp = useCallback(() => {
    const el = ref.current
    state.current.down = false
    el?.classList.remove('cursor-grabbing')
  }, [])
  const onClickCapture = useCallback((e) => {
    if (state.current.moved) {
      e.preventDefault()
      e.stopPropagation()
      state.current.moved = false
    }
  }, [])

  return (
    <div
      ref={ref}
      className={`flex ${gap} overflow-x-auto scrollbar-hide cursor-grab select-none marquee-mask px-5 sm:px-8 lg:px-10 xl:px-16 ${
        snap ? 'snap-x snap-proximity' : ''
      } ${className}`}
      onPointerDown={onDown}
      onPointerMove={onMove}
      onPointerUp={onUp}
      onPointerLeave={onUp}
      onClickCapture={onClickCapture}
      data-lenis-prevent
      role="region"
      aria-label="Scrollable cards"
    >
      {children}
    </div>
  )
}
