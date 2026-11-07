// Generates dist/sitemap.xml after vite-react-ssg finishes prerendering.
import { writeFile } from 'node:fs/promises'
import { join } from 'node:path'

const BASE = 'https://www.codecrafters.in'
const today = () => new Date().toISOString().slice(0, 10)

/**
 * lastmod should reflect when the CONTENT changed, not when we last deployed.
 * Stamping every URL with the build date trains crawlers to ignore the field.
 * Index pages derive theirs from the newest item they list; detail pages carry
 * their own date; the rest fall back to the git commit date of their source.
 */
async function gitDate(file) {
  try {
    const { execFile } = await import('node:child_process')
    const { promisify } = await import('node:util')
    const { stdout } = await promisify(execFile)('git', ['log', '-1', '--format=%cs', '--', file])
    const d = stdout.trim()
    return /^\d{4}-\d{2}-\d{2}$/.test(d) ? d : null
  } catch {
    return null
  }
}

const newest = (dates) => dates.filter(Boolean).sort().at(-1)

export async function buildSitemapEntries() {
  const [{ solutions }, { work }, { insights }, { careers }] = await Promise.all([
    import('../src/data/solutions.js'),
    import('../src/data/work.js'),
    import('../src/data/insights.js'),
    import('../src/data/careers.js'),
  ])
  const d = today()
  const insightDates = insights.map((a) => a.updated || a.date)
  const [homeD, solD, workD, aboutD, contactD, legalD] = await Promise.all([
    gitDate('src/pages/Home.jsx'),
    gitDate('src/data/solutions.js'),
    gitDate('src/data/work.js'),
    gitDate('src/data/founder.js'),
    gitDate('src/pages/Contact.jsx'),
    gitDate('src/pages/legalContent.js'),
  ])
  // The hub only. The two game pages are noindex — thin, and nothing to rank for.
  const arcadeD = await gitDate('src/arcade/games.js')
  const entries = [
    { loc: '/', changefreq: 'weekly', priority: '1.0', lastmod: homeD || d },
    { loc: '/solutions', changefreq: 'weekly', priority: '0.9', lastmod: solD || d },
    { loc: '/work', changefreq: 'weekly', priority: '0.9', lastmod: workD || d },
    { loc: '/about', changefreq: 'monthly', priority: '0.7', lastmod: aboutD || d },
    { loc: '/insights', changefreq: 'weekly', priority: '0.8', lastmod: newest(insightDates) || d },
    { loc: '/careers', changefreq: 'weekly', priority: '0.6', lastmod: newest(careers.map((c) => c.posted)) || d },
    { loc: '/contact', changefreq: 'monthly', priority: '0.8', lastmod: contactD || d },
    { loc: '/privacy', changefreq: 'yearly', priority: '0.3', lastmod: legalD || d },
    { loc: '/terms', changefreq: 'yearly', priority: '0.3', lastmod: legalD || d },
    { loc: '/arcade', changefreq: 'yearly', priority: '0.3', lastmod: arcadeD || d },
    ...solutions.map((s) => ({ loc: `/solutions/${s.slug}`, changefreq: 'monthly', priority: '0.85', lastmod: solD || d })),
    ...work.filter((w) => w.body).map((w) => ({ loc: `/work/${w.slug}`, changefreq: 'monthly', priority: '0.8', lastmod: workD || d })),
    ...careers.map((c) => ({ loc: `/careers/${c.slug}`, changefreq: 'monthly', priority: '0.6', lastmod: c.posted || d })),
    ...insights.map((a) => ({ loc: `/insights/${a.slug}`, changefreq: 'monthly', priority: '0.7', lastmod: a.updated || a.date || d })),
  ]
  return entries
}

export function renderSitemap(entries) {
  const body = entries
    .map(
      (e) => `  <url>\n    <loc>${BASE}${e.loc}</loc>\n    <lastmod>${e.lastmod}</lastmod>\n    <changefreq>${e.changefreq}</changefreq>\n    <priority>${e.priority}</priority>\n  </url>`,
    )
    .join('\n')
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`
}

const xmlEscape = (v) => String(v ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

/** RSS 2.0 feed of the Insights articles, newest first. */
export function renderRss(insights, site) {
  const items = [...insights]
    .sort((a, b) => String(b.date).localeCompare(String(a.date)))
    .map((a) => {
      const url = `${BASE}/insights/${a.slug}`
      return `    <item>\n      <title>${xmlEscape(a.title)}</title>\n      <link>${url}</link>\n      <guid isPermaLink="true">${url}</guid>\n      <pubDate>${new Date(`${a.date}T09:00:00+05:30`).toUTCString()}</pubDate>\n      <description>${xmlEscape(a.excerpt || a.seo?.description || '')}</description>\n    </item>`
    })
    .join('\n')
  return `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">\n  <channel>\n    <title>${xmlEscape(site.name)} Insights</title>\n    <link>${BASE}/insights</link>\n    <atom:link href="${BASE}/rss.xml" rel="self" type="application/rss+xml" />\n    <description>Field notes from Odoo and AI projects for growing businesses.</description>\n    <language>en</language>\n${items}\n  </channel>\n</rss>\n`
}

/** llms.txt (llmstxt.org): a plain map of the site for AI assistants and agents. */
export function renderLlms({ site, solutions, work, insights }) {
  const line = (title, path, note) => `- [${title}](${BASE}${path})${note ? `: ${note}` : ''}`
  return [
    `# ${site.name}`,
    '',
    `> ${site.description}`,
    '',
    `${site.name} (codecrafters.in) is an Odoo implementation and AI automation company based in ${site.location.label}. It is not the codecrafters.io coding platform. Contact: ${site.email}. Free 45-minute diagnostic: ${BASE}/contact`,
    '',
    '## Odoo services',
    ...solutions.filter((s) => s.core).map((s) => line(s.title, `/solutions/${s.slug}`, s.short)),
    '',
    '## Case studies',
    ...work.filter((w) => w.body).map((w) => line(w.title, `/work/${w.slug}`, w.summary)),
    '',
    '## Insights',
    ...insights.map((a) => line(a.title, `/insights/${a.slug}`, a.excerpt)),
    '',
    '## Optional',
    ...solutions.filter((s) => !s.core).map((s) => line(s.title, `/solutions/${s.slug}`, s.short)),
    line('About', '/about'),
    line('Careers', '/careers'),
    '',
  ].join('\n')
}

export async function writeSitemap(dir) {
  const entries = await buildSitemapEntries()
  await writeFile(join(dir, 'sitemap.xml'), renderSitemap(entries), 'utf8')
  console.log(`[sitemap] wrote ${entries.length} urls → ${join(dir, 'sitemap.xml')}`)

  const [{ site }, { solutions }, { work }, { insights }] = await Promise.all([
    import('../src/data/site.js'),
    import('../src/data/solutions.js'),
    import('../src/data/work.js'),
    import('../src/data/insights.js'),
  ])
  await writeFile(join(dir, 'rss.xml'), renderRss(insights, site), 'utf8')
  await writeFile(join(dir, 'llms.txt'), renderLlms({ site, solutions, work, insights }), 'utf8')
  console.log(`[feeds] wrote rss.xml (${insights.length} items) and llms.txt`)
}
