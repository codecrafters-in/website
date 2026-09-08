const TONES = {
  base: 'bg-surface',
  low: 'bg-surface-container-low',
  lowest: 'bg-surface-container-lowest',
  container: 'bg-surface-container',
  high: 'bg-surface-container-high',
  transparent: '',
}

// Sections never use 1px borders (DESIGN.md "No-Line" rule). Structure comes from tonal shifts.
export default function Section({ as: Tag = 'section', tone = 'base', padded = true, className = '', children, ...rest }) {
  return (
    <Tag className={`relative ${TONES[tone] ?? TONES.base} ${padded ? 'section-y' : ''} ${className}`} {...rest}>
      {children}
    </Tag>
  )
}
