// Generates dist/sitemap.xml after vite-react-ssg finishes prerendering.
import { writeFile } from 'node:fs/promises'
import { join } from 'node:path'

const BASE = 'https://codecrafters.in'
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
  const [{ solutions }, { work }, { insights }] = await Promise.all([
    import('../src/data/solutions.js'),
    import('../src/data/work.js'),
    import('../src/data/insights.js'),
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
  const entries = [
    { loc: '/', changefreq: 'weekly', priority: '1.0', lastmod: homeD || d },
    { loc: '/solutions', changefreq: 'weekly', priority: '0.9', lastmod: solD || d },
    { loc: '/work', changefreq: 'weekly', priority: '0.9', lastmod: workD || d },
    { loc: '/about', changefreq: 'monthly', priority: '0.7', lastmod: aboutD || d },
    { loc: '/insights', changefreq: 'weekly', priority: '0.8', lastmod: newest(insightDates) || d },
    { loc: '/contact', changefreq: 'monthly', priority: '0.8', lastmod: contactD || d },
    { loc: '/privacy', changefreq: 'yearly', priority: '0.3', lastmod: legalD || d },
    { loc: '/terms', changefreq: 'yearly', priority: '0.3', lastmod: legalD || d },
    ...solutions.map((s) => ({ loc: `/solutions/${s.slug}`, changefreq: 'monthly', priority: '0.85', lastmod: solD || d })),
    ...work.filter((w) => w.body).map((w) => ({ loc: `/work/${w.slug}`, changefreq: 'monthly', priority: '0.8', lastmod: workD || d })),
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

export async function writeSitemap(dir) {
  const entries = await buildSitemapEntries()
  await writeFile(join(dir, 'sitemap.xml'), renderSitemap(entries), 'utf8')
  console.log(`[sitemap] wrote ${entries.length} urls → ${join(dir, 'sitemap.xml')}`)
}
