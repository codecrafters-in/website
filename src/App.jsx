import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Toaster } from 'sonner'
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ErrorBoundary from './components/ErrorBoundary'
import PageLoader from './components/PageLoader'
import ScrollToTop from './components/ScrollToTop'
import PrivacyBanner from './components/PrivacyBanner'

const Home = lazy(() => import('./pages/Home'))
const Services = lazy(() => import('./pages/Services'))
const AIForge = lazy(() => import('./pages/AIForge'))
const OdooSolutions = lazy(() => import('./pages/OdooSolutions'))
const Portfolio = lazy(() => import('./pages/Portfolio'))
const About = lazy(() => import('./pages/About'))
const Contact = lazy(() => import('./pages/Contact'))
const Privacy = lazy(() => import('./pages/Privacy'))
const Terms = lazy(() => import('./pages/Terms'))
const NotFound = lazy(() => import('./pages/NotFound'))

const pageVariants = {
  initial: { opacity: 0, y: 16 },
  enter: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.25, ease: 'easeIn' } },
}

function ScrollHandler() {
  const location = useLocation()
  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        const el = document.querySelector(location.hash)
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 350)
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' })
    }
  }, [location])
  return null
}

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        variants={pageVariants}
        initial="initial"
        animate="enter"
        exit="exit"
      >
        <Suspense fallback={<PageLoader />}>
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/ai-forge" element={<AIForge />} />
            <Route path="/odoo-solutions" element={<OdooSolutions />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </motion.div>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <div className="bg-background min-h-screen overflow-x-hidden">
          <a href="#main-content" className="skip-nav">Skip to main content</a>
          <ScrollHandler />
          <Navbar />
          <main id="main-content">
            <AnimatedRoutes />
          </main>
          <Footer />
          <ScrollToTop />
          <PrivacyBanner />
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: '#1c1b1b',
                border: '1px solid rgba(78,70,51,0.3)',
                color: '#D1C5AC',
              },
            }}
          />
        </div>
      </ErrorBoundary>
    </BrowserRouter>
  )
}
