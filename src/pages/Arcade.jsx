import { Link } from 'react-router-dom'
import { Head } from 'vite-react-ssg'
import SEO, { breadcrumb, itemList, webPage } from '../components/SEO.jsx'
import { Container, Section } from '../components/ui/index.js'
import Aurora from '../components/Aurora.jsx'
import { games } from '../arcade/games.js'
import GameCover from '../arcade/covers.jsx'

/**
 * /arcade — the cabinet room.
 *
 * A real page rather than a modal, so the arcade is linkable, shareable and
 * back-button-able. Nothing here imports a game: the catalogue in
 * `arcade/games.js` is plain data and the cover art is drawn, so the engine only
 * loads once a player has picked a cabinet on /arcade/:game.
 *
 * Written as a cabinet row, not as prose. The only decision on this page is
 * "which one, and how long will it take me", so each card carries artwork, a
 * one-line hook, a spec plate and a single play button — and nothing else.
 */
export function Component() {
  return (
    <>
      <SEO
        title="Arcade"
        description="Two playable things we built: AI//RUN, a four-chapter breach that ends in a prompt injection, and Bug Blaster, a pixel shooter. Free play, no download."
        path="/arcade"
        jsonLd={[
          webPage({
            name: 'Arcade',
            path: '/arcade',
            description: 'Playable demos built by CodeCrafters.',
          }),
          breadcrumb([
            { name: 'Home', path: '/' },
            { name: 'Arcade', path: '/arcade' },
          ]),
          itemList(
            'CodeCrafters arcade',
            games.map((g) => ({ name: g.name, path: `/arcade/${g.slug}` })),
          ),
        ]}
      />
      <Head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap"
        />
      </Head>

      {/* marquee — the dark is a contained sign, never a band under the navbar,
          which is transparent at rest and would lose all its contrast on one. */}
      <section className="relative overflow-hidden pt-[72px]">
        <Aurora variant="soft" />
        <Container className="relative py-14 md:py-20">
          <div className="on-dark relative mx-auto max-w-2xl overflow-hidden rounded-xl border border-outline-variant bg-surface-container-lowest px-6 py-12 text-center">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-30"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(0deg, rgba(0,0,0,.5) 0 1px, transparent 1px 3px)',
              }}
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  'radial-gradient(70% 90% at 50% 0%, rgba(245,197,24,.20), transparent 70%)',
              }}
            />
            <h1
              className="relative font-arcade text-2xl text-primary-container sm:text-3xl md:text-4xl"
              style={{ textShadow: '0 0 14px rgba(245,197,24,.5), 4px 4px 0 #695200' }}
            >
              ARCADE
            </h1>
            <p className="relative mt-6 animate-blink font-arcade text-[10px] text-on-surface">
              INSERT COIN
            </p>
          </div>

          <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-mono text-[10px] uppercase tracking-[0.2em] text-outline">
            <li>2 cabinets</li>
            <li aria-hidden="true">·</li>
            <li>free play</li>
            <li aria-hidden="true">·</li>
            <li>no download</li>
            <li aria-hidden="true">·</li>
            <li>no network</li>
          </ul>
        </Container>
      </section>

      {/* cabinets */}
      <Section tone="low">
        <Container>
          <ul className="grid gap-6 md:grid-cols-2">
            {games.map((g) => (
              <li key={g.slug}>
                <Link
                  to={`/arcade/${g.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-xl border border-outline-variant bg-surface-container transition hover:border-primary-container focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-container"
                >
                  {/* artwork */}
                  <div className="relative p-3 pb-5">
                    <GameCover slug={g.slug} />
                    <span className="absolute left-5 top-5 border border-primary-container bg-[#131313] px-2 py-1 font-mono text-[9px] uppercase tracking-[0.2em] text-primary-container">
                      {g.genre}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col px-5 pb-5">
                    <h2 className="font-arcade text-sm text-on-surface sm:text-base">{g.name}</h2>
                    <p className="mt-3 text-[15px] leading-snug text-on-surface-variant">
                      {g.tagline}
                    </p>

                    {/* spec plate */}
                    <dl className="mt-5 grid grid-cols-4 gap-px overflow-hidden rounded border border-outline-variant bg-outline-variant">
                      {g.specs.map((s) => (
                        <div key={s.k} className="bg-surface-container-low px-2 py-2.5 text-center">
                          <dt className="font-mono text-[9px] uppercase tracking-[0.15em] text-outline">
                            {s.k}
                          </dt>
                          <dd className="mt-1 font-mono text-[11px] text-on-surface">{s.v}</dd>
                        </div>
                      ))}
                    </dl>

                    <span className="mt-5 inline-flex items-center justify-center gap-2 rounded border border-primary-container px-4 py-2.5 font-arcade text-[10px] text-primary-container transition group-hover:bg-brand group-hover:text-on-primary-fixed">
                      ▶ PLAY
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>

          <p className="mx-auto mt-10 max-w-xl text-center text-[13px] leading-relaxed text-on-surface-variant">
            Both run in your browser. AI//RUN contacts nothing and calls no model — every result in
            it is scripted, which is the only responsible way to put an attack walkthrough on a
            public site.
          </p>
        </Container>
      </Section>
    </>
  )
}

export default Component
