import { Link } from 'react-router-dom'

/** 36px pixel-art gamepad linking to the arcade. */
export default function ArcadeButton({ className = '' }) {
  return (
    <Link
      to="/arcade"
      aria-label="Open the arcade"
      title="Insert coin"
      className={
        'group inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-on-surface-variant ' +
        'transition-[color,box-shadow,transform] duration-200 hover:text-primary-container hover:shadow-[0_0_14px_rgba(245,197,24,0.45)] ' +
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-container active:translate-y-px ' +
        className
      }
    >
      <svg
        width="36"
        height="36"
        viewBox="0 0 18 18"
        shapeRendering="crispEdges"
        aria-hidden="true"
        focusable="false"
        className="h-9 w-9"
      >
        {/* pad body */}
        <path fill="currentColor" d="M3 6h12v1H3zM2 7h14v5H2zM3 12h12v1H3zM4 13h3v1H4zM11 13h3v1h-3z" />
        {/* body highlight */}
        <path fill="#ffe5a0" opacity="0.35" d="M3 7h12v1H3z" />
        {/* d-pad */}
        <path fill="#0e0e0e" d="M5 8h1v4H5zM4 9h3v2H4z" />
        <path fill="#f5c518" d="M5 9h1v2H5z" />
        {/* action buttons */}
        <path fill="#0e0e0e" d="M11 9h1v1h-1zM13 9h1v1h-1zM12 10h1v1h-1z" />
        <path fill="#f5c518" d="M12 8h1v1h-1z" />
        {/* start / select */}
        <path fill="#0e0e0e" d="M8 10h1v1H8zM9 10h1v1H9z" />
        {/* joystick shaft + ball on top */}
        <path fill="currentColor" d="M8 3h2v3H8z" />
        <path fill="#f5c518" d="M7 1h4v3H7z" />
        <path fill="#ffe5a0" d="M8 1h1v1H8z" />
      </svg>
    </Link>
  )
}
