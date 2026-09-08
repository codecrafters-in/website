const labelBase =
  'pointer-events-none absolute left-3 font-mono uppercase tracking-[0.16em] text-on-surface-variant transition-all duration-300'

export default function FloatingField({ label, id, as = 'input', options, className = '', required, ...rest }) {
  if (as === 'select') {
    return (
      <label htmlFor={id} className={`relative block ${className}`}>
        <span className={`${labelBase} top-2 text-[9px] text-primary-container`}>{label}{required ? ' *' : ''}</span>
        <select id={id} required={required} className="forge-input w-full pt-6 pb-2.5 px-3 text-sm appearance-none rounded-t-sm" {...rest}>
          {options?.map((o) => (
            <option key={o.value ?? o} value={o.value ?? o} className="bg-surface-container-lowest">
              {o.label ?? o}
            </option>
          ))}
        </select>
        <span aria-hidden="true" className="absolute right-3 top-1/2 -translate-y-1/2 text-outline text-xs">▾</span>
      </label>
    )
  }
  const Field = as === 'textarea' ? 'textarea' : 'input'
  return (
    <label htmlFor={id} className={`relative block ${className}`}>
      <Field
        id={id}
        required={required}
        placeholder=" "
        className={`forge-input peer w-full pt-6 pb-2.5 px-3 text-sm rounded-t-sm ${as === 'textarea' ? 'min-h-[140px] resize-y' : ''}`}
        {...rest}
      />
      <span
        className={`${labelBase} top-4 text-[11px] peer-focus:top-2 peer-focus:text-[9px] peer-focus:text-primary-container peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-[9px]`}
      >
        {label}
        {required ? ' *' : ''}
      </span>
    </label>
  )
}
