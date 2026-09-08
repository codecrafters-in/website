// The arcade catalogue.
//
// Deliberately free of game imports so the hub page can list what is available
// without pulling a single line of game code into the bundle. Each entry's
// `load` is a dynamic import, called only once a player has picked that game —
// so exactly one cabinet is ever in memory.

export const games = [
  {
    slug: 'ai-run',
    name: 'AI//RUN',
    kicker: 'Story · 4 jobs · 8 min',
    tagline: 'Break in three ways. Discover they were the same way.',
    blurb:
      'You are the hands on a four-job breach: crack a password, inject a query, then talk an AI agent into doing it for you. The third one is the point — prompt injection is SQL injection wearing new clothes.',
    load: () => import('./airun/AiRun.jsx'),
  },
  {
    slug: 'bug-blaster',
    name: 'BUG BLASTER',
    kicker: 'Arcade · endless · 2 min',
    tagline: 'Shoot the bugs before they ship.',
    blurb:
      'A 320×180 pixel shooter with a CRT on top. No lesson, no pitch — it is here because every studio should have one thing on its site that exists purely because someone wanted to build it.',
    load: () => import('./BugBlaster.jsx'),
  },
]

export const gameSlugs = games.map((g) => g.slug)

export function findGame(slug) {
  return games.find((g) => g.slug === slug) || null
}

export default games
