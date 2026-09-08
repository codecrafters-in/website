// Generates the default Open Graph image and PWA icons. Dev-time only: `npm run og`.
import sharp from 'sharp'
import { mkdir } from 'node:fs/promises'

const W = 1200
const H = 630
const LOGO = 'assets/images/logo/dark_logo.png'
const ICON_SRC = 'assets/images/logo/dark_logo.png' // wide logo → letterboxed square icons

const escapeXml = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

function ogSvg({ title, tagline }) {
  const grid = []
  for (let x = 0; x <= W; x += 40) grid.push(`<line x1="${x}" y1="0" x2="${x}" y2="${H}" stroke="rgba(78,70,51,0.22)" stroke-width="1"/>`)
  for (let y = 0; y <= H; y += 40) grid.push(`<line x1="0" y1="${y}" x2="${W}" y2="${y}" stroke="rgba(78,70,51,0.22)" stroke-width="1"/>`)
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs>
    <radialGradient id="glow" cx="72%" cy="40%" r="55%">
      <stop offset="0%" stop-color="#f5c518" stop-opacity="0.22"/>
      <stop offset="100%" stop-color="#f5c518" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="molten" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#ffe5a0"/>
      <stop offset="100%" stop-color="#f5c518"/>
    </linearGradient>
    <radialGradient id="fade" cx="50%" cy="45%" r="70%">
      <stop offset="30%" stop-color="#fff" stop-opacity="1"/>
      <stop offset="100%" stop-color="#fff" stop-opacity="0"/>
    </radialGradient>
    <mask id="gridmask"><rect width="${W}" height="${H}" fill="url(#fade)"/></mask>
  </defs>
  <rect width="${W}" height="${H}" fill="#0e0e0e"/>
  <g mask="url(#gridmask)">${grid.join('')}</g>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>
  <rect x="0" y="0" width="${W}" height="1" fill="rgba(245,197,24,0.25)"/>
  <text x="80" y="150" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="20" letter-spacing="6" fill="#f5c518">AI SOLUTIONS · ENTERPRISE-READY</text>
  <text x="80" y="300" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-weight="700" font-size="84" letter-spacing="-3" fill="#e5e2e1">${escapeXml(title[0])}</text>
  <text x="80" y="395" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-weight="700" font-size="84" letter-spacing="-3" fill="url(#molten)">${escapeXml(title[1])}</text>
  <text x="80" y="470" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="26" fill="#d1c5ac">${escapeXml(tagline)}</text>
  <text x="80" y="560" font-family="Menlo, Courier New, monospace" font-size="18" letter-spacing="4" fill="#9a9078">CODECRAFTERS.IN</text>
  <!-- CRT-style corner marks -->
  <path d="M${W - 80} 60 h40 v40" stroke="#f5c518" stroke-width="2" fill="none" opacity="0.6"/>
  <path d="M${W - 80} ${H - 60} h40 v-40" stroke="#f5c518" stroke-width="2" fill="none" opacity="0.6"/>
</svg>`
}

async function main() {
  await mkdir('public/images', { recursive: true })
  await mkdir('public/icons', { recursive: true })

  const svg = Buffer.from(ogSvg({ title: ['AI systems that', 'actually ship.'], tagline: 'Agents, RAG, LLM pipelines and enterprise platforms — designed, built and run.' }))
  const logo = await sharp(LOGO).resize({ height: 72, fit: 'inside' }).png().toBuffer()
  const logoMeta = await sharp(logo).metadata()
  await sharp(svg)
    .composite([{ input: logo, left: W - 80 - (logoMeta.width || 200), top: 60 }])
    .jpeg({ quality: 86, mozjpeg: true })
    .toFile('public/images/og-default.jpg')
  console.log('✓ public/images/og-default.jpg')

  const bg = { r: 14, g: 14, b: 14, alpha: 1 }
  for (const size of [192, 512]) {
    const pad = Math.round(size * 0.12)
    const inner = await sharp(ICON_SRC).resize(size - pad * 2, size - pad * 2, { fit: 'contain', background: bg }).png().toBuffer()
    await sharp({ create: { width: size, height: size, channels: 4, background: bg } }).composite([{ input: inner, gravity: 'center' }]).png().toFile(`public/icons/icon-${size}.png`)
    console.log(`✓ public/icons/icon-${size}.png`)
  }
  // Maskable: icon occupies the inner 80% safe zone.
  const inner = await sharp(ICON_SRC).resize(Math.round(512 * 0.72), Math.round(512 * 0.72), { fit: 'contain', background: bg }).png().toBuffer()
  await sharp({ create: { width: 512, height: 512, channels: 4, background: bg } })
    .composite([{ input: inner, gravity: 'center' }])
    .png()
    .toFile('public/icons/maskable-512.png')
  console.log('✓ public/icons/maskable-512.png')
  {
    const inner = await sharp(ICON_SRC).resize(150, 150, { fit: 'contain', background: bg }).png().toBuffer()
    await sharp({ create: { width: 180, height: 180, channels: 4, background: bg } }).composite([{ input: inner, gravity: 'center' }]).png().toFile('public/icons/apple-touch-icon.png')
  }
  console.log('✓ public/icons/apple-touch-icon.png')
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
