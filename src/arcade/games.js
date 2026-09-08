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
    genre: 'Story',
    tagline: 'Break in three ways. Find out they were one way.',
    // Read like a cabinet spec plate. Time is first on purpose — it is the
    // thing a visitor actually needs before deciding to start.
    specs: [
      { k: 'Time', v: '8 min' },
      { k: 'Chapters', v: '4' },
      { k: 'Players', v: '1' },
      { k: 'Input', v: 'Mouse' },
    ],
    load: () => import('./airun/AiRun.jsx'),
  },
  {
    slug: 'bug-blaster',
    name: 'BUG BLASTER',
    genre: 'Arcade',
    tagline: 'Shoot the bugs before they ship.',
    specs: [
      { k: 'Time', v: '2 min' },
      { k: 'Mode', v: 'Endless' },
      { k: 'Players', v: '1' },
      { k: 'Input', v: '← → SPACE' },
    ],
    load: () => import('./BugBlaster.jsx'),
  },
]

export const gameSlugs = games.map((g) => g.slug)

export function findGame(slug) {
  return games.find((g) => g.slug === slug) || null
}

export default games
