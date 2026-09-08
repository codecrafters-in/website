/**
 * WCAG contrast gate for the colour tokens.
 *
 * You cannot resolve an element's real ancestor background statically, but the
 * palette only has a handful of plausible page backgrounds. So: check every
 * foreground token that is actually used against the WORST of them. Passing the
 * worst case passes everywhere.
 *
 *   node scripts/check-contrast.mjs
 */
import { readFile, readdir } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

/* ── colour maths ────────────────────────────────────────────────────────── */

const srgb = (c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4)
const luminance = ([r, g, b]) => 0.2126 * srgb(r / 255) + 0.7152 * srgb(g / 255) + 0.0722 * srgb(b / 255)

function contrast(fg, bg) {
  const [a, b] = [luminance(fg), luminance(bg)].sort((x, y) => y - x)
  return (a + 0.05) / (b + 0.05)
}

/** Composite a translucent foreground over an opaque background. */
const over = (fg, bg, alpha) => fg.map((c, i) => Math.round(c * alpha + bg[i] * (1 - alpha)))

/* ── read the token layer straight out of src/index.css ──────────────────── */

async function readTokens() {
  const css = await readFile(path.join(ROOT, 'src/index.css'), 'utf8')
  const start = css.indexOf(':root {')
  const end = css.indexOf('.on-dark {', start)
  if (start < 0 || end < 0) throw new Error('could not locate the :root token block in src/index.css')
  const root = css.slice(start, end)
  const tokens = {}
  for (const m of root.matchAll(/--([a-z-]+):\s*(\d+)\s+(\d+)\s+(\d+);/g)) {
    tokens[m[1]] = [Number(m[2]), Number(m[3]), Number(m[4])]
  }
  return tokens
}

/* ── which foreground tokens are actually used, and at what size ─────────── */

async function* walk(dir) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name)
    if (e.isDirectory()) yield* walk(full)
    else if (/\.(jsx?|mjs)$/.test(e.name)) yield full
  }
}

const SMALL_TEXT = /text-\[(9|10|11|12|13)px\]|text-xs|text-sm|text-eyebrow/

async function collectUsages() {
  const usages = new Map() // token -> { small: bool }
  for await (const file of walk(path.join(ROOT, 'src'))) {
    if (file.includes(`${path.sep}arcade${path.sep}`)) continue // scoped .on-dark
    const src = await readFile(file, 'utf8')
    for (const m of src.matchAll(/className=(?:"([^"]*)"|\{`([^`]*)`\})/g)) {
      const cls = m[1] || m[2] || ''
      const small = SMALL_TEXT.test(cls)
      for (const t of cls.matchAll(/\btext-(on-surface-variant|on-surface|outline-variant|outline|primary-container|primary|on-primary-container|on-primary|brand|error)\b(?:\/(\d+))?/g)) {
        const key = t[1] + (t[2] ? `/${t[2]}` : '')
        const prev = usages.get(key) || { small: false, files: new Set() }
        prev.small = prev.small || small
        prev.files.add(path.relative(ROOT, file))
        usages.set(key, prev)
      }
    }
  }
  return usages
}

/* ── run ─────────────────────────────────────────────────────────────────── */

const tokens = await readTokens()
const usages = await collectUsages()

// Every realistic opaque page/card background a foreground can land on.
const BACKGROUNDS = ['surface', 'surface-container-low', 'surface-container-lowest', 'surface-container']

// Foregrounds that only ever sit on a known dark scrim or a coloured fill.
const EXEMPT = new Set(['on-primary', 'on-primary-container', 'brand'])

let failures = 0
const rows = []

for (const [key, meta] of [...usages].sort()) {
  const [name, alphaStr] = key.split('/')
  if (EXEMPT.has(name)) continue
  const fg = tokens[name]
  if (!fg) continue
  const alpha = alphaStr ? Number(alphaStr) / 100 : 1

  let worst = Infinity
  let worstBg = ''
  for (const bgName of BACKGROUNDS) {
    const bg = tokens[bgName]
    if (!bg) continue
    const ratio = contrast(alpha < 1 ? over(fg, bg, alpha) : fg, bg)
    if (ratio < worst) {
      worst = ratio
      worstBg = bgName
    }
  }
  const required = meta.small ? 4.5 : 3
  const ok = worst >= required
  if (!ok) failures += 1
  rows.push(
    `  ${ok ? 'ok  ' : 'FAIL'}  ${key.padEnd(26)} ${worst.toFixed(2).padStart(6)}:1  (needs ${required}, worst on ${worstBg})`,
  )
}

// Non-text floors: hairlines must be visible, the focus ring must clear 3:1.
const hairline = contrast(tokens['outline-variant'], tokens.surface)
const focus = contrast(tokens['primary-container'], tokens.surface)
rows.push(`  ${hairline >= 1.15 ? 'ok  ' : 'FAIL'}  ${'outline-variant (hairline)'.padEnd(26)} ${hairline.toFixed(2).padStart(6)}:1  (needs 1.15)`)
rows.push(`  ${focus >= 3 ? 'ok  ' : 'FAIL'}  ${'focus ring'.padEnd(26)} ${focus.toFixed(2).padStart(6)}:1  (needs 3.0)`)
if (hairline < 1.15) failures += 1
if (focus < 3) failures += 1

console.log('Contrast check — worst-case background per foreground token\n')
console.log(rows.join('\n'))
console.log(`\n${failures ? `${failures} FAILED` : 'All pairings pass.'}`)
process.exitCode = failures ? 1 : 0
