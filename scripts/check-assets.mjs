/**
 * Asserts that every image path referenced in the data actually exists on disk.
 *
 * Why this exists: the covers were regenerated to a responsive filename scheme
 * (`<slug>-480/960/1440.{avif,webp}` + `<slug>.jpg`) without repointing
 * `src/data/work.js`. Every one of the 19 covers 404'd, and the build stayed
 * green the whole time — missing images are a runtime failure, not a build one.
 * Nothing would have caught it but this.
 *
 *   node scripts/check-assets.mjs
 */
import { stat } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const PUBLIC = path.join(ROOT, 'public')

const exists = (rel) =>
  stat(path.join(PUBLIC, rel.replace(/^\//, ''))).then(
    () => true,
    () => false,
  )

const { work } = await import('../src/data/work.js')
const { site } = await import('../src/data/site.js')

const missing = []
const check = async (rel, label) => {
  if (!rel || rel.startsWith('http')) return
  if (!(await exists(rel))) missing.push(`${label}: ${rel}`)
}

for (const w of work) {
  if (!w.image) continue
  // the declared path, plus every responsive variant derived from it
  await check(w.image, `work/${w.slug} (fallback)`)
  const base = w.image.replace(/\.(jpg|webp|avif)$/, '')
  for (const width of [480, 960, 1440]) {
    for (const ext of ['avif', 'webp']) {
      await check(`${base}-${width}.${ext}`, `work/${w.slug}`)
    }
  }
}

// Site chrome referenced from components and structured data
for (const rel of ['/images/light_logo.png', '/images/og-default.jpg', '/favicon.ico']) {
  await check(rel, 'site')
}
void site

if (missing.length) {
  console.error(`Missing ${missing.length} referenced asset(s):\n`)
  for (const m of missing.slice(0, 40)) console.error('  ' + m)
  if (missing.length > 40) console.error(`  …and ${missing.length - 40} more`)
  process.exitCode = 1
} else {
  console.log('All referenced assets exist.')
}
