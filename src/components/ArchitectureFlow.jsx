import Icon from './ui/Icon.jsx'

/**
 * The pipeline of a system we built, stage by stage.
 *
 * Why this and not a tag list: a tag says "we used Claude MCP". It does not
 * tell a CTO whether we know where a model belongs. This does — because the
 * stages are colour-coded by KIND, so you can see at a glance that the model
 * only touches two steps and that a guardrail sits between it and the database.
 * "The model proposes, the ORM disposes" is the whole trust argument, and it is
 * far more convincing drawn than asserted.
 *
 * Every flow is sourced from the `approach` and bullet list already written for
 * that case study. Nothing here describes a system we did not build.
 */

const KINDS = {
  input: { icon: 'message-circle', label: 'Input', ring: 'shadow-[inset_0_0_0_1px_rgb(var(--outline-variant))]', text: 'text-on-surface-variant' },
  llm: { icon: 'brain', label: 'Model', ring: 'shadow-[inset_0_0_0_1.5px_rgb(var(--brand))] bg-brand-tint', text: 'text-on-surface' },
  guard: { icon: 'shield-check', label: 'Guardrail', ring: 'shadow-[inset_0_0_0_1.5px_rgb(var(--primary-container))]', text: 'text-on-surface' },
  code: { icon: 'cpu', label: 'Deterministic', ring: 'shadow-[inset_0_0_0_1px_rgb(var(--outline-variant))]', text: 'text-on-surface' },
  data: { icon: 'database', label: 'System of record', ring: 'shadow-[inset_0_0_0_1px_rgb(var(--outline-variant))]', text: 'text-on-surface' },
  human: { icon: 'users', label: 'Human', ring: 'shadow-[inset_0_0_0_1px_rgb(var(--outline-variant))]', text: 'text-on-surface' },
  output: { icon: 'circle-check', label: 'Output', ring: 'shadow-[inset_0_0_0_1px_rgb(var(--outline-variant))]', text: 'text-on-surface' },
}

const LEGEND = ['llm', 'guard', 'code']

export default function ArchitectureFlow({ flow, title = 'How it actually runs', className = '' }) {
  if (!flow?.length) return null

  return (
    <section className={className} aria-label={title}>
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
        <h2 className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary-container">{title}</h2>
        <ul className="flex flex-wrap items-center gap-x-4 gap-y-1">
          {LEGEND.map((k) => (
            <li key={k} className="inline-flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.16em] text-outline">
              <span
                className={`inline-block h-2 w-2 rounded-sm ${
                  k === 'llm' ? 'bg-brand' : k === 'guard' ? 'bg-primary-container' : 'bg-outline-variant'
                }`}
              />
              {KINDS[k].label}
            </li>
          ))}
        </ul>
      </div>

      {/* Horizontal on wide screens, vertical on mobile — the arrow rotates. */}
      <ol className="mt-5 flex flex-col md:flex-row md:flex-wrap md:items-stretch gap-2">
        {flow.map((s, i) => {
          const k = KINDS[s.kind] || KINDS.code
          return (
            <li key={s.step} className="flex md:flex-1 md:min-w-[150px] items-center gap-2">
              <div className={`flex-1 rounded-lg bg-surface-container px-3.5 py-3 ${k.ring}`}>
                <div className="flex items-center gap-2">
                  <Icon
                    name={k.icon}
                    size={14}
                    className={s.kind === 'llm' || s.kind === 'guard' ? 'text-primary-container shrink-0' : 'text-outline shrink-0'}
                  />
                  <span className={`text-sm font-semibold leading-tight ${k.text}`}>{s.step}</span>
                </div>
                {s.note && <p className="mt-1.5 text-xs leading-snug text-on-surface-variant">{s.note}</p>}
              </div>
              {i < flow.length - 1 && (
                <Icon
                  name="arrow-right"
                  size={14}
                  className="text-outline shrink-0 rotate-90 md:rotate-0"
                  aria-hidden="true"
                />
              )}
            </li>
          )
        })}
      </ol>
    </section>
  )
}
