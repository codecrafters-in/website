import { Link } from 'react-router-dom'
import SEO, { breadcrumb, itemList, webPage } from '../components/SEO.jsx'
import { Section, Container, Eyebrow } from '../components/ui/index.js'
import Aurora from '../components/Aurora.jsx'
import { games } from '../arcade/games.js'

/**
 * /arcade — the cabinet room.
 *
 * A real page rather than a modal, so the arcade is linkable, shareable and
 * back-button-able. Nothing here imports a game: the catalogue in
 * `arcade/games.js` is plain data, and the engine only loads once a player has
 * picked a cabinet on /arcade/:game.
 */
export function Component() {
  return (
    <>
      <SEO
        title="Arcade"
        description="Two playable things we built for no commercial reason at all: AI//RUN, a four-job breach that ends in a prompt injection, and Bug Blaster, a pixel shooter."
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

      <section className="relative pt-[72px] overflow-hidden">
        <Aurora variant="soft" />
        <Container className="relative py-24 md:py-28">
          <Eyebrow className="mb-7">Arcade</Eyebrow>
          <h1 className="font-display font-semibold text-display-xl text-on-surface max-w-3xl">
            Insert coin.
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-on-surface-variant">
            Two cabinets. One of them makes an argument about how systems get broken; the other one
            is just a shooter. Pick a game and it loads — nothing runs until you choose.
          </p>
        </Container>
      </section>

      <Section tone="low">
        <Container>
          <ul className="grid gap-5 md:grid-cols-2">
            {games.map((g) => (
              <li key={g.slug}>
                <Link
                  to={`/arcade/${g.slug}`}
                  className="glass-card glass-card-lift group flex h-full flex-col rounded-xl p-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-container md:p-8"
                >
                  <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-outline">
                    {g.kicker}
                  </p>
                  <h2 className="mt-4 font-arcade text-base text-primary-container sm:text-lg">
                    {g.name}
                  </h2>
                  <p className="mt-4 text-on-surface">{g.tagline}</p>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-on-surface-variant">
                    {g.blurb}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.15em] text-primary-container">
                    Play
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <p className="mt-10 max-w-2xl text-sm leading-relaxed text-on-surface-variant">
            Both run entirely in your browser. AI//RUN contacts no network and calls no model —
            every result in it is scripted, which is the only responsible way to put an attack
            walkthrough on a public site.
          </p>
        </Container>
      </Section>
    </>
  )
}

export default Component
