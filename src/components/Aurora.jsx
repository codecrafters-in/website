/**
 * Animated backdrop — soft colour fields that drift.
 *
 * Built as three separately-transformed blurred blobs rather than an animated
 * multi-stop gradient. Animating `background-position` on a gradient forces a
 * repaint of the whole layer every frame; transforming a blurred div is
 * GPU-composited and effectively free.
 *
 * Deliberately slow (26–34s) and low-contrast. A backdrop that draws attention
 * has failed at being a backdrop.
 *
 * `motion-reduce:animate-none` stops the drift for anyone who has asked the OS
 * for less motion — the composition still holds, it just sits still.
 */
export default function Aurora({ variant = 'default', className = '' }) {
  const soft = variant === 'soft'

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      <div
        className={`absolute -left-[15%] -top-[25%] h-[55vw] w-[55vw] animate-drift rounded-full blur-3xl will-change-transform motion-reduce:animate-none ${
          soft ? 'bg-[rgb(var(--brand)/0.10)]' : 'bg-[rgb(var(--brand)/0.18)]'
        }`}
      />
      <div
        className={`absolute -right-[12%] top-[5%] h-[45vw] w-[45vw] animate-drift-slow rounded-full blur-3xl will-change-transform motion-reduce:animate-none ${
          soft ? 'bg-[rgb(var(--shadow)/0.05)]' : 'bg-[rgb(var(--brand-dim)/0.14)]'
        }`}
      />
      {!soft && (
        <div
          className="absolute -bottom-[30%] left-[20%] h-[50vw] w-[50vw] animate-drift rounded-full bg-[rgb(var(--shadow)/0.07)] blur-3xl [animation-delay:-12s] will-change-transform motion-reduce:animate-none"
        />
      )}
    </div>
  )
}
