// Asserts vercel.json redirects match src/data/redirects.js (single source of truth).
import { readFile } from 'node:fs/promises'
import { redirects } from '../src/data/redirects.js'

const vercel = JSON.parse(await readFile(new URL('../vercel.json', import.meta.url), 'utf8'))
const fromVercel = new Map((vercel.redirects || []).map((r) => [r.source, r.destination]))
let ok = true
for (const r of redirects) {
  if (fromVercel.get(r.from) !== r.to) {
    ok = false
    console.error(`✗ ${r.from} → expected ${r.to}, vercel.json has ${fromVercel.get(r.from) ?? 'nothing'}`)
  }
}
for (const [src] of fromVercel) {
  if (!redirects.some((r) => r.from === src)) {
    ok = false
    console.error(`✗ vercel.json redirect ${src} is not in src/data/redirects.js`)
  }
}
if (ok) console.log(`✓ ${redirects.length} redirects in sync`)
process.exit(ok ? 0 : 1)
