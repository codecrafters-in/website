/**
 * Fetches the case-study cover images from Unsplash and writes optimised
 * WebP + JPEG into public/images/work/.
 *
 * Photo ids are pinned below so the build is reproducible — re-running this
 * always produces the same covers. Unsplash photos are free to use
 * commercially with no permission needed; credits are kept here and rendered
 * in the case-study page footer.
 *
 *   node scripts/work-images.mjs          # only fetch what is missing
 *   node scripts/work-images.mjs --force  # re-fetch everything
 */
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const OUT = path.join(ROOT, 'public/images/work')

// slug → { id: unsplash photo id, credit: photographer }
//
// Re-picked for the LIGHT theme. The first set were chosen dark on purpose for
// the old black page; on a light ground they read as holes no amount of grading
// can fix. These were selected by measuring candidate brightness and taking the
// brightest usable frame.
export const COVERS = {
  'conversational-ai-agent-erp': { id: '7-g5kpBbqmI', credit: 'Azwedo L.LC' },
  'healthcare-insurance-automation': { id: 'lLv_3fYDJIg', credit: 'Ahmed' },
  'line-of-credit-platform': { id: 'ec_6XVmIW_o', credit: 'Getty Images' },
  quotemaker: { id: 'e-uz4ozRqc0', credit: 'Jodie Cook' },
  'email-intelligence-saas': { id: '6RqSDGaNJ5c', credit: 'Mushaboom Studio' },
  'textile-wholesale-erp-b2b': { id: '3QWKTcv37ug', credit: 'Getty Images' },
  'forecasting-traceability-dashboards': { id: 'E1_mIuMTYps', credit: 'Getty Images' },
  'ocr-invoice-engine': { id: '83tkuJuUNyg', credit: 'Meg Aghamyan' },
  'ai-meeting-intelligence': { id: 'yyWGGOhJ31A', credit: 'Getty Images' },
  'ai-screen-assistant': { id: 'fj31I5HoOIQ', credit: 'Zarak Khan' },
  'multi-vendor-ecommerce': { id: 'moEZU_cqsNw', credit: 'Getty Images' },
  'erp-migration-v14-v19': { id: 'ioAUyH-MkYs', credit: 'Troy Bridges' },
  'ai-customer-engagement-crm': { id: '8VhQ221GXF4', credit: 'Curated Lifestyle' },
  'portal-order-approval-engine': { id: '4B4MHGPqTjo', credit: 'Bryan White' },
  'multi-team-helpdesk': { id: 'VrAELJTMpFA', credit: 'Getty Images' },
  'saaskit-automation-devops': { id: 'YYZnrK8NrSw', credit: 'Alex Shuper' },
  'claude-mcp-erp-integration': { id: 'O6czJw9b7yY', credit: 'Allison Saeng' },
  'stock-prediction-research': { id: 'AWXIZmzOrQo', credit: 'Getty Images' },
  'emg-bionic-arm': { id: 'HOt2zB6X-Gk', credit: 'Getty Images' },
}


const WIDTHS = [480, 960, 1440]
const TARGET_MEAN = 122 // light-theme page; the old value of 76 was for a black page

/**
 * Light-theme grade.
 *
 * Deliberately no baked-in scrim any more: WorkCard lays a CSS gradient under
 * its text, so burning one into the file just made every cover muddy and left
 * us unable to reuse the image anywhere else.
 *
 * Exposure is pulled to a common target so nineteen unrelated photographs read
 * as one set, then lightly desaturated and warmed to sit with the amber.
 */
async function graded(buf, width) {
  const base = sharp(buf).resize(width, Math.round((width / 16) * 10), {
    fit: 'cover',
    position: 'attention',
  })
  // Genuinely dark originals (a night skyline, a terminal screen) cannot be
  // lifted by a brightness multiply alone — it just greys them. Stretch the
  // histogram first, then measure again and correct to the shared target.
  const raw = await base.clone().stats()
  const rawMean = raw.channels.slice(0, 3).reduce((a, c) => a + c.mean, 0) / 3
  const needsStretch = rawMean < 90

  const lifted = needsStretch ? base.normalise({ lower: 1, upper: 99 }) : base
  const after = await lifted.clone().stats()
  const mean = after.channels.slice(0, 3).reduce((a, c) => a + c.mean, 0) / 3
  const exposure = Math.min(2.2, Math.max(0.6, TARGET_MEAN / Math.max(mean, 1)))

  return lifted
    .modulate({ saturation: 0.78, brightness: exposure })
    .linear(1.04, 2)
    .composite([
      {
        input: Buffer.from(
          `<svg width="${width}" height="${Math.round((width / 16) * 10)}"><rect width="100%" height="100%" fill="#f5c518" fill-opacity="0.10"/></svg>`,
        ),
        blend: 'soft-light',
      },
    ])
}

async function fetchOriginal(id) {
  // The public photo endpoint resolves a raw image URL without an API key.
  const page = await fetch(`https://unsplash.com/napi/photos/${id}`, {
    headers: { accept: 'application/json' },
  })
  if (!page.ok) throw new Error(`photo ${id}: ${page.status}`)
  const json = await page.json()
  const raw = `${json.urls.raw}&w=2400&q=88&fm=jpg&fit=max`
  const img = await fetch(raw)
  if (!img.ok) throw new Error(`download ${id}: ${img.status}`)
  return Buffer.from(await img.arrayBuffer())
}

async function main() {
  const force = process.argv.includes('--force')
  await fs.mkdir(OUT, { recursive: true })

  for (const [slug, meta] of Object.entries(COVERS)) {
    const webp = path.join(OUT, `${slug}-960.webp`)
    if (!force) {
      const exists = await fs.stat(webp).then(() => true, () => false)
      if (exists) {
        console.log('skip', slug)
        continue
      }
    }
    try {
      const buf = await fetchOriginal(meta.id)
      let bytes = 0
      for (const w of WIDTHS) {
        // AVIF first (smallest), WebP for reach, one JPEG as the universal fallback.
        await (await graded(buf, w)).avif({ quality: 52, effort: 4 }).toFile(path.join(OUT, `${slug}-${w}.avif`))
        await (await graded(buf, w)).webp({ quality: 74 }).toFile(path.join(OUT, `${slug}-${w}.webp`))
        for (const ext of ['avif', 'webp']) bytes += (await fs.stat(path.join(OUT, `${slug}-${w}.${ext}`))).size
      }
      await (await graded(buf, 960)).jpeg({ quality: 76, mozjpeg: true }).toFile(path.join(OUT, `${slug}.jpg`))
      bytes += (await fs.stat(path.join(OUT, `${slug}.jpg`))).size
      console.log('ok  ', slug, `${Math.round(bytes / 1024)}kb across ${WIDTHS.length * 2 + 1} files`)
    } catch (err) {
      console.error('FAIL', slug, err.message)
      process.exitCode = 1
    }
  }
}

main()
