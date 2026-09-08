import { useState } from 'react'
import { toast } from 'sonner'
import Section from './ui/Section.jsx'
import Container from './ui/Container.jsx'
import Eyebrow from './ui/Eyebrow.jsx'
import Heading from './ui/Heading.jsx'
import Icon from './ui/Icon.jsx'
import Reveal from '../effects/Reveal.jsx'
import { track } from '../lib/analytics.js'

const POINTS = ['Where your data actually lives (and who can read it)', 'Which processes are automatable in 30 days', 'The three failure modes that kill AI pilots', 'A scoring sheet you can hand to your board']

export default function LeadMagnet({ source = 'Checklist' }) {
  const [email, setEmail] = useState('')
  const [state, setState] = useState('idle')

  const submit = async (e) => {
    e.preventDefault()
    if (!email || state === 'loading') return
    setState('loading')
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source }),
      })
      if (!res.ok) throw new Error()
      setState('done')
      track('lead_magnet_submit', { location: source })
      toast.success('Checklist on its way. Check your inbox.')
    } catch {
      setState('idle')
      toast.error('Something went wrong. Please try again.')
    }
  }

  return (
    <Section id="checklist" tone="lowest" className="overflow-hidden scroll-mt-20">
      <Container className="relative">
        <div className="glass-card rounded-lg p-7 md:p-12 grid lg:grid-cols-3 gap-10 items-center">
          <Reveal className="lg:col-span-2">
            <Eyebrow className="mb-5">Free download</Eyebrow>
            <Heading size="md">The AI Readiness Checklist for CTOs.</Heading>
            <p className="text-on-surface-variant mt-4 max-w-xl leading-relaxed">
              14 checkpoints we run before any automation engagement. Ten minutes to fill in. It tells you where the money is, and where the risk is.
            </p>
            <ul className="mt-6 grid sm:grid-cols-2 gap-x-6 gap-y-2.5">
              {POINTS.map((p) => (
                <li key={p} className="flex gap-2.5 text-sm text-on-surface-variant">
                  <Icon name="check" size={14} className="mt-1 text-primary-container shrink-0" />
                  {p}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={120}>
            {state === 'done' ? (
              <div className="bg-surface-container-lowest rounded-lg p-6 shadow-edge text-center">
                <Icon name="circle-check" size={28} className="text-primary-container mx-auto" />
                <p className="text-on-surface font-semibold mt-3">Sent.</p>
                <p className="text-on-surface-variant text-sm mt-1">Check your inbox in the next few minutes.</p>
              </div>
            ) : (
              <form onSubmit={submit} className="bg-surface-container-lowest rounded-lg p-6 shadow-edge flex flex-col gap-3">
                <label htmlFor="checklist-email" className="font-mono text-[10px] uppercase tracking-[0.2em] text-on-surface-variant">
                  Work email
                </label>
                <input
                  id="checklist-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="forge-input w-full px-3 py-3 text-sm rounded-t-sm placeholder:text-outline"
                  style={{ '--tw-placeholder-opacity': 1 }}
                />
                <input type="text" name="botcheck" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
                <button
                  type="submit"
                  disabled={state === 'loading'}
                  className="mt-2 bg-molten text-on-primary font-bold text-xs uppercase tracking-[0.18em] py-4 rounded-sm shadow-edge hover:shadow-molten hover:brightness-110 transition disabled:opacity-60"
                >
                  {state === 'loading' ? 'Sending…' : 'Send me the checklist'}
                </button>
                <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-outline text-center">No spam. Unsubscribe any time.</p>
              </form>
            )}
          </Reveal>
        </div>
      </Container>
    </Section>
  )
}
