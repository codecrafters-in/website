export default function Prose({ className = '', children, as: Tag = 'div' }) {
  return <Tag className={`prose prose-forge prose-p:leading-[1.75] prose-headings:font-display ${className}`}>{children}</Tag>
}
