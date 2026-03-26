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
        <div className="min-h-screen bg-background flex items-center justify-center px-8">
          <div className="max-w-lg text-center">
            <div className="text-[#F5C518] text-xs uppercase tracking-widest mb-4 font-black">System Error</div>
            <h1 className="text-4xl font-black text-white mb-4 tracking-tighter">Something went wrong</h1>
            <p className="text-[#D1C5AC] mb-8 leading-relaxed">
              An unexpected error occurred. Our team has been notified. Please try refreshing the page or navigating home.
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => window.location.reload()}
                className="bg-[#F5C518] text-[#131313] px-6 py-3 text-xs font-black uppercase tracking-widest hover:bg-white transition-colors"
              >
                Refresh Page
              </button>
              <Link
                to="/"
                onClick={() => this.setState({ hasError: false, error: null })}
                className="border border-[#4E4633]/40 text-[#D1C5AC] px-6 py-3 text-xs font-black uppercase tracking-widest hover:border-[#F5C518] hover:text-[#F5C518] transition-colors"
              >
                Go Home
              </Link>
            </div>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}
