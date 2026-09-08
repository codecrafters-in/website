import { Link } from 'react-router-dom'
import Container from './ui/Container.jsx'
import Icon from './ui/Icon.jsx'
import Reveal from '../effects/Reveal.jsx'

/**
 * "Which of these is you?"
 *
 * A visitor who has to work out which of six solution pages applies to them
 * usually picks none. This asks the question in their words — the sentence they
 * would actually say out loud — and routes them in one click. It is the first
 * thing under the hero because it is the fastest way to turn a scroller into
 * someone on a specific page.
 */
const ROUTES = [
  {
    id: 'broken',
    quote: 'Our Odoo is a mess.',
    body: 'Half-finished modules, workarounds nobody documented, and a team that has quietly gone back to spreadsheets.',
    action: 'Get it stable',
    to: '/solutions/enterprise-platforms',
    icon: 'server-crash',
  },
  {
    id: 'ai',
    quote: 'We want AI on our own data.',
    body: 'Not a chatbot bolted on the side — agents and RAG that read your live ERP and are safe to hand to non-technical staff.',
    action: 'See how it works',
    to: '/solutions/ai',
    icon: 'brain',
  },
  {
    id: 'manual',
    quote: 'Too much of this is still manual.',
    body: 'Invoices retyped, claims keyed by hand, reports rebuilt every month. Work software should have finished hours ago.',
    action: 'See what we automated',
    to: '/work',
    icon: 'clock',
  },
]

export default function IntentRouter() {
  return (
    <section className="bg-surface-container-low py-16 md:py-20">
      <Container>
        <h2 className="font-display text-display-sm text-on-surface">Which of these is you?</h2>
        <Reveal stagger={80} className="mt-9 grid gap-4 md:grid-cols-3">
          {ROUTES.map((r) => (
            <Link
              key={r.id}
              to={r.to}
              className="group flex flex-col rounded-2xl bg-surface-container p-6 shadow-edge transition duration-300 hover:-translate-y-1 hover:shadow-[inset_0_0_0_1.5px_rgb(var(--brand)),0_24px_48px_-24px_rgb(var(--shadow)/0.25)]"
            >
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-tint text-primary-container">
                <Icon name={r.icon} size={21} />
              </span>
              <p className="mt-5 font-display text-xl leading-snug text-on-surface">“{r.quote}”</p>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-on-surface-variant">{r.body}</p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary-container">
                {r.action}
                <Icon name="arrow-right" size={16} className="transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </Reveal>
      </Container>
    </section>
  )
}
