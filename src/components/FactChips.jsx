import Icon from './ui/Icon.jsx'

/**
 * Small icon + 2-3 word chips — the spec strip you see on a product listing
 * ("1.5 Ton", "5 Star", "Copper Condenser"). On a case study the equivalent
 * facts are the ones a buyer actually scans for: where it ran, how big the
 * client was, how long it took, whether it is still live.
 *
 * Everything here comes from `src/data/work.js`. Chips are only rendered for
 * fields that exist — nothing is inferred or invented, because a fabricated
 * spec is worse than a missing one.
 */

/** Region is already encoded at the end of the anonymised client string. */
function regionOf(client = '') {
  const parts = String(client).split(',').map((s) => s.trim())
  return parts.length > 1 ? parts.at(-1) : null
}

/** "Textile wholesaler, India" -> "Textile wholesaler" */
function orgOf(client = '') {
  const head = String(client).split(',')[0].trim()
  if (!head || /^(in-house product|internal r&d|peer-reviewed research|thesis research)$/i.test(head)) return null
  return head
}

const ICONS = {
  region: 'map-pin',
  org: 'users',
  year: 'calendar',
  duration: 'clock',
  platform: 'database',
  status: 'circle-check',
  scale: 'chart-line',
  integrations: 'workflow',
}

/**
 * Builds the chip list for a work item. Explicit `item.facts` entries win and
 * are appended first, so anything hand-written in the data outranks the
 * derived defaults.
 */
export function factsFor(item, { max = 4 } = {}) {
  const out = []
  const push = (kind, label) => {
    if (label && !out.some((f) => f.label === label)) out.push({ kind, label, icon: ICONS[kind] || 'sparkles' })
  }

  for (const f of item.facts || []) push(f.kind, f.label)

  const org = orgOf(item.client)
  if (org) push('org', org)
  push('region', regionOf(item.client))
  if (item.year) push('year', `Shipped ${item.year}`)
  if (item.body) push('status', 'Still in production')

  return out.slice(0, max)
}

/**
 * @param {'card'|'detail'} tone card = compact, sits on a light surface.
 */
export default function FactChips({ item, max = 4, tone = 'card', className = '' }) {
  const facts = factsFor(item, { max })
  if (!facts.length) return null

  const chip =
    tone === 'detail'
      ? 'gap-2 px-3 py-2 text-xs bg-surface-container-low text-on-surface'
      : 'gap-1.5 px-2.5 py-1.5 text-[11px] bg-surface-container-low text-on-surface-variant'

  return (
    <ul className={`flex flex-wrap gap-2 ${className}`}>
      {facts.map((f) => (
        <li
          key={`${f.kind}-${f.label}`}
          className={`inline-flex items-center rounded-lg shadow-edge ${chip}`}
        >
          <Icon name={f.icon} size={tone === 'detail' ? 15 : 13} className="text-primary-container shrink-0" />
          <span className="whitespace-nowrap">{f.label}</span>
        </li>
      ))}
    </ul>
  )
}
