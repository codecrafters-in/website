// Parse a marketing claim string like '420%', '2.4M+', '14', '50+' into counter props.
export function claimToStat(str, label) {
  const s = String(str).trim()
  const m = s.match(/^([^0-9]*)([0-9]+(?:\.[0-9]+)?)(.*)$/)
  if (!m) return { value: s, label }
  const value = parseFloat(m[2])
  const decimals = m[2].includes('.') ? m[2].split('.')[1].length : 0
  return { prefix: m[1] || '', value, suffix: m[3] || '', decimals, label }
}

export const formatDate = (d) =>
  new Date(d).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })

/**
 * Responsive sources for a cover. The pipeline in scripts/work-images.mjs emits
 * `<slug>-480/960/1440.{avif,webp}` plus a `<slug>.jpg` fallback, so both the
 * srcset and the fallback are derivable from the one `image` path in work.js.
 */
export function coverSources(image) {
  if (!image) return null
  const base = image.replace(/\.(jpg|webp|avif)$/, '')
  const set = (ext) => [480, 960, 1440].map((w) => `${base}-${w}.${ext} ${w}w`).join(', ')
  return { avif: set('avif'), webp: set('webp'), jpg: image }
}
