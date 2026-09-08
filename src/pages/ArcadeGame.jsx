import { lazy, Suspense, useEffect, useMemo, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { ClientOnly, Head } from 'vite-react-ssg'
import SEO, { breadcrumb, webPage } from '../components/SEO.jsx'
import { Container } from '../components/ui/index.js'
import Aurora from '../components/Aurora.jsx'
import BootScreen from '../arcade/BootScreen.jsx'
import { findGame, games } from '../arcade/games.js'

/**
 * /arcade/:game — one cabinet, and only one.
 *
 * The game module is resolved from the route param and loaded through a lazy()
 * created per slug, so navigating here is the only thing that ever pulls a game
 * into the bundle. Leaving the route unmounts it, which is what stops the
 * shooter's window-level key handlers from following you around the site.
 *
 * Rendered client-only: the games need a canvas and timers, and there is nothing
 * meaningful to prerender inside the cabinet.
 */
export function Component() {
  const { game: slug } = useParams()
  const entry = findGame(slug)
  const [dark, setDark] = useState(false)

  // The cabinet follows the site — light by default, dark on request, remembered.
  useEffect(() => {
    try {
      setDark(localStorage.getItem('arcade_theme') === 'dark')
    } catch {
      /* private mode — stay light */
    }
  }, [])

  const toggleTheme = () => {
    setDark((prev) => {
      const next = !prev
      try {
        localStorage.setItem('arcade_theme', next ? 'dark' : 'light')
      } catch {
        /* private mode */
      }
      return next
    })
  }

  // One lazy component per slug. Recreated only when the slug changes.
  const Game = useMemo(() => (entry ? lazy(entry.load) : null), [entry])

  if (!entry) return <Navigate to="/arcade" replace />

  return (
    <>
      <SEO
        title={entry.name}
        description={entry.tagline}
        path={`/arcade/${entry.slug}`}
        noindex
        jsonLd={[
          webPage({
            name: entry.name,
            path: `/arcade/${entry.slug}`,
            description: entry.tagline,
          }),
          breadcrumb([
            { name: 'Home', path: '/' },
            { name: 'Arcade', path: '/arcade' },
            { name: entry.name, path: `/arcade/${entry.slug}` },
          ]),
        ]}
      />
      <Head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap"
        />
      </Head>

      {/* The page ground stays light on every route. CABINET: DARK scopes
          `on-dark` to the cabinet frame only — putting it on the page would
          leave the navbar, which is transparent at rest, dark-on-dark. */}
      <section className="relative overflow-hidden pt-[72px]">
        <Aurora variant="soft" />
        <Container className="relative py-10 md:py-14">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-baseline gap-3">
              <Link
                to="/arcade"
                className="font-mono text-[11px] uppercase tracking-[0.2em] text-outline transition hover:text-primary-container"
              >
                ← Arcade
              </Link>
              <span className="text-outline" aria-hidden="true">
                ·
              </span>
              <h1 className="font-arcade text-[11px] text-primary-container sm:text-[13px]">
                {entry.name}
              </h1>
            </div>

            <div className="flex items-center gap-2 font-mono text-[11px]">
              {games
                .filter((g) => g.slug !== entry.slug)
                .map((g) => (
                  <Link
                    key={g.slug}
                    to={`/arcade/${g.slug}`}
                    className="rounded border border-outline-variant px-2 py-1 text-on-surface-variant transition hover:border-primary-container hover:text-primary-container"
                  >
                    {g.name}
                  </Link>
                ))}
              <button
                type="button"
                onClick={toggleTheme}
                aria-pressed={dark}
                aria-label={dark ? 'Switch the cabinet to light' : 'Switch the cabinet to dark'}
                className="rounded border border-outline-variant px-2 py-1 text-on-surface transition hover:border-primary-container hover:text-primary-container focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-container"
              >
                {dark ? 'CABINET: DARK' : 'CABINET: LIGHT'}
              </button>
            </div>
          </div>

          {/* the cabinet */}
          <div
            className={`${dark ? 'on-dark' : ''} flex justify-center overflow-hidden rounded-xl border border-outline-variant bg-surface-container p-4 text-on-surface md:p-6`}
          >
            <ClientOnly>
              {() => (
                <Suspense fallback={<Cabinet label={entry.name} />}>
                  <Game dark={dark} />
                </Suspense>
              )}
            </ClientOnly>
          </div>

          <p className="mt-4 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-outline">
            {entry.specs.map((sp) => `${sp.k} ${sp.v}`).join('  ·  ')}
          </p>
        </Container>
      </section>
    </>
  )
}

function Cabinet({ label }) {
  return (
    <div className="flex min-h-[320px] w-full items-center justify-center">
      <BootScreen label={label} />
    </div>
  )
}

export default Component
