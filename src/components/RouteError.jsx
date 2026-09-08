import { Link, useRouteError } from 'react-router-dom'

export default function RouteError() {
  const error = useRouteError()
  const message = error?.statusText || error?.message || 'Something went wrong.'
  return (
    <div className="min-h-screen bg-surface flex items-center justify-center px-6">
      <div className="max-w-md text-center">
        <p className="font-mono text-eyebrow uppercase text-primary-container mb-4">System error</p>
        <h1 className="font-display text-display-sm text-on-surface mb-4">Something broke on our side.</h1>
        <p className="text-on-surface-variant text-sm mb-8 break-words">{String(message)}</p>
        <div className="flex gap-3 justify-center">
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="bg-molten text-on-primary font-bold text-xs uppercase tracking-widest px-5 py-3"
          >
            Refresh
          </button>
          <Link to="/" className="text-on-surface text-xs uppercase tracking-widest font-bold px-5 py-3 shadow-edge bg-surface-container-high">
            Go home
          </Link>
        </div>
      </div>
    </div>
  )
}
