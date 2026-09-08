import { lazy, Suspense } from 'react'
import { ClientOnly, Head } from 'vite-react-ssg'
import { Link } from 'react-router-dom'
import { Container, Button } from './ui/index.js'

const GameOverCountdown = lazy(() => import('./GameOverCountdown.jsx'))

export default function NotFoundView() {
  return (
    <>
      <Head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" />
      </Head>
      <section className="on-dark relative min-h-[100svh] pt-[72px] flex items-center overflow-hidden bg-surface-container-lowest">
        <div className="absolute inset-0 pointer-events-none opacity-[0.35]" aria-hidden="true" style={{ backgroundImage: 'repeating-linear-gradient(0deg, rgba(0,0,0,.35) 0 1px, transparent 1px 3px)' }} />
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true" style={{ background: 'radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,.75))' }} />
        <Container className="relative text-center py-24">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-outline">Error 404 · Level not found</p>
          <h1 className="font-arcade text-4xl sm:text-6xl md:text-7xl text-primary-container mt-8 leading-tight" style={{ textShadow: '0 0 12px rgba(245,197,24,.55), 4px 4px 0 #695200' }}>
            GAME OVER
          </h1>
          <p className="font-arcade text-xs sm:text-sm text-on-surface mt-10 animate-blink">
            CONTINUE?{' '}
            <ClientOnly>
              {() => (
                <Suspense fallback={<span>9</span>}>
                  <GameOverCountdown />
                </Suspense>
              )}
            </ClientOnly>
          </p>
          <p className="text-on-surface-variant text-sm mt-8 max-w-md mx-auto">The page you were looking for got zapped, moved, or never existed. Pick a door.</p>
          <div className="mt-10 flex flex-wrap gap-4 justify-center">
            <Button to="/" size="lg">
              Continue → Home
            </Button>
            <Button to="/arcade" variant="outline" size="lg" icon="gamepad">
              Insert coin
            </Button>
            <Button to="/contact" variant="link" icon="arrow-right">
              Talk to a human
            </Button>
          </div>
          <p className="mt-16 font-mono text-[9px] uppercase tracking-[0.3em] text-outline">
            <Link to="/work" className="hover:text-primary-container">Work</Link> · <Link to="/solutions" className="hover:text-primary-container">Solutions</Link> · <Link to="/insights" className="hover:text-primary-container">Insights</Link>
          </p>
        </Container>
      </section>
    </>
  )
}
