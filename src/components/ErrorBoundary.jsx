import { Component } from 'react'
import { Link } from 'react-router-dom'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, info) {
    console.error('ErrorBoundary caught:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-surface flex items-center justify-center px-8">
          <div className="max-w-lg text-center">
            <p className="font-mono text-eyebrow uppercase text-primary-container mb-4">System error</p>
            <h1 className="font-display text-display-sm text-on-surface mb-4">Something went wrong.</h1>
            <p className="text-on-surface-variant mb-8 leading-relaxed text-sm">
              An unexpected error occurred. Try refreshing, or head back home.
            </p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => window.location.reload()}
                className="bg-molten text-on-primary px-6 py-3 text-xs font-bold uppercase tracking-[0.18em] rounded-sm hover:brightness-110 transition"
              >
                Refresh
              </button>
              <Link
                to="/"
                onClick={() => this.setState({ hasError: false, error: null })}
                className="text-on-surface px-6 py-3 text-xs font-bold uppercase tracking-[0.18em] rounded-sm shadow-[inset_0_0_0_1px_rgb(var(--outline-variant))] hover:text-primary transition-colors"
              >
                Go home
              </Link>
            </div>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}
