import { Link } from 'react-router-dom'

// Renders **bold**, `code` and [links](/path) inside plain text. Internal paths
// use the router; anything starting with http opens in a new tab.
export default function Inline({ text }) {
  if (!text) return null
  const parts = String(text).split(/(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)\s]+\))/g)
  return parts.map((p, i) => {
    if (p.startsWith('**') && p.endsWith('**')) return <strong key={i} className="text-on-surface font-semibold">{p.slice(2, -2)}</strong>
    if (p.startsWith('`') && p.endsWith('`')) return <code key={i} className="font-mono text-[0.9em] text-primary bg-surface-container-lowest px-1.5 py-0.5 rounded-sm">{p.slice(1, -1)}</code>
    const link = p.match(/^\[([^\]]+)\]\(([^)\s]+)\)$/)
    if (link) {
      const [, label, href] = link
      const cls = 'text-primary-container font-semibold underline underline-offset-4 hover:text-primary'
      return href.startsWith('http') ? (
        <a key={i} href={href} target="_blank" rel="noreferrer" className={cls}>{label}</a>
      ) : (
        <Link key={i} to={href} className={cls}>{label}</Link>
      )
    }
    return <span key={i}>{p}</span>
  })
}
