import { useEffect, useState } from 'react'
import { useNavigation } from 'react-router-dom'
import { ClientOnly } from 'vite-react-ssg'
import { Toaster } from 'sonner'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import ErrorBoundary from './components/ErrorBoundary.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'
import PrivacyBanner from './components/PrivacyBanner.jsx'
import BookingFloat from './components/BookingFloat.jsx'
import ClientEffects from './components/ClientEffects.jsx'
import AnimatedOutlet from './effects/PageTransition.jsx'
import { ArcadeProvider } from './arcade/index.js'
import ArcadeGate from './arcade/ArcadeGate.jsx'
import BootScreen from './arcade/BootScreen.jsx'

function RouteLoading() {
  const navigation = useNavigation()
  const [show, setShow] = useState(false)
  useEffect(() => {
    if (navigation.state !== 'loading') {
      setShow(false)
      return undefined
    }
    const t = setTimeout(() => setShow(true), 250)
    return () => clearTimeout(t)
  }, [navigation.state])
  if (!show) return null
  return (
    <div className="on-dark fixed inset-0 z-[90] bg-surface-container-lowest/95 flex items-center justify-center">
      <BootScreen label="NEXT LEVEL" />
    </div>
  )
}

export default function Layout() {
  return (
    <ArcadeProvider>
      <ErrorBoundary>
        <div className="bg-surface min-h-screen overflow-x-clip">
          <a href="#main-content" className="skip-nav">Skip to main content</a>
          <Navbar />
          <main id="main-content">
            <AnimatedOutlet />
          </main>
          <Footer />
          <ScrollToTop />
          <BookingFloat />
          <PrivacyBanner />
          <RouteLoading />
          <ArcadeGate />
          <ClientOnly>{() => <ClientEffects />}</ClientOnly>
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: '#ffffff',
                border: '1px solid #ded8c9',
                boxShadow: '0 12px 32px -16px rgba(60,52,34,0.18)',
                color: '#544f46',
                fontFamily: '"DM Sans", sans-serif',
              },
            }}
          />
        </div>
      </ErrorBoundary>
    </ArcadeProvider>
  )
}
