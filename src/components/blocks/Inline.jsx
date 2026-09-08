// Renders **bold** and `code` inside plain text.
export default function Inline({ text }) {
  if (!text) return null
  const parts = String(text).split(/(\*\*[^*]+\*\*|`[^`]+`)/g)
  return parts.map((p, i) => {
    if (p.startsWith('**') && p.endsWith('**')) return <strong key={i} className="text-on-surface font-semibold">{p.slice(2, -2)}</strong>
    if (p.startsWith('`') && p.endsWith('`')) return <code key={i} className="font-mono text-[0.9em] text-primary bg-surface-container-lowest px-1.5 py-0.5 rounded-sm">{p.slice(1, -1)}</code>
    return <span key={i}>{p}</span>
  })
}
