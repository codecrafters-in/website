import { Link } from 'react-router-dom'
import Section from './ui/Section.jsx'
import Container from './ui/Container.jsx'
import Icon from './ui/Icon.jsx'
import SectionHeader from './SectionHeader.jsx'
import Reveal from '../effects/Reveal.jsx'

/**
 * The AI stack, in the words the field actually uses.
 *
 * A technical buyer is running a vocabulary check as much as a capability
 * check: people who have shipped this say "structured outputs" and "human in
 * the loop", people who have not say "powered by AI". Naming each layer
 * precisely — and pointing at the build it came from — is the cheapest
 * credibility on the site.
 *
 * Rule: every entry names a real technique from a real project. If we have not
 * shipped it, it is not on this list.
 */
const LAYERS = [
  {
    id: 'agentic',
    term: 'Ask Odoo in plain English',
    tech: 'AI agent',
    body:
      '"Which invoices are overdue?" gets a real answer from your live Odoo. The AI never gets database access: Odoo checks each request against that user\'s permissions first.',
    from: { label: 'ERP agent', to: '/work/conversational-ai-agent-erp' },
    icon: 'workflow',
  },
  {
    id: 'rag',
    term: 'Answers from your own data',
    tech: 'Grounded answers',
    body:
      'The AI answers from your documents and Odoo records, not from guesswork, so if an answer is wrong we can trace exactly where it came from and fix it.',
    from: { label: 'AI solutions', to: '/solutions/ai' },
    icon: 'database',
  },
  {
    id: 'structured',
    term: 'Checked before it is saved',
    tech: 'Validation',
    body:
      'Everything the AI reads from an email or PDF is checked against strict rules before it is saved. If it does not fit, it is rejected instead of creating a messy record.',
    from: { label: 'Email intelligence', to: '/work/email-intelligence-saas' },
    icon: 'shield-check',
  },
  {
    id: 'guardrails',
    term: 'Safe from trick emails',
    tech: 'Guardrails',
    body:
      'Text from outside (an email, a PDF, a form) is treated as data, never as instructions, so nobody can trick the AI into doing something it should not. We wrote up how.',
    from: { label: 'Read the teardown', to: '/insights/prompt-injection-hardening-enterprise-agents' },
    icon: 'lock',
  },
  {
    id: 'hitl',
    term: 'People check the unclear cases',
    tech: 'Human review',
    body:
      'When the AI is unsure, it sends the case to a person; the clear ones go straight through. Your team reviews the odd few instead of every row.',
    from: { label: 'OCR engine', to: '/work' },
    icon: 'users',
  },
  {
    id: 'routing',
    term: 'No lock-in to one AI company',
    tech: 'Any AI provider',
    body:
      'We can switch between AI providers with a settings change, so a price rise or a better model never means rebuilding your system.',
    from: { label: 'Email intelligence', to: '/work/email-intelligence-saas' },
    icon: 'cpu',
  },
]

export default function AIStack() {
  return (
    <Section tone="base">
      <Container>
        <SectionHeader
          eyebrow="AI on top of Odoo"
          title="Once Odoo works, AI takes the repetitive work."
          lede="Six things that separate a system you can put in front of staff from a demo. Each one is from a build that is running now."
          size="md"
        />
        <Reveal stagger={70} className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {LAYERS.map((l) => (
            <Link
              key={l.id}
              to={l.from.to}
              className="group flex flex-col rounded-2xl bg-surface-container p-6 shadow-edge transition duration-300 hover:-translate-y-1 hover:shadow-[inset_0_0_0_1.5px_rgb(var(--brand)),0_24px_48px_-24px_rgb(var(--shadow)/0.25)]"
            >
              <div className="flex items-start justify-between gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand-tint text-primary-container">
                  <Icon name={l.icon} size={19} />
                </span>
                <span className="rounded-md bg-surface-container-low px-2 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-primary-container">
                  {l.tech}
                </span>
              </div>
              <h3 className="mt-5 font-display text-lg leading-snug text-on-surface">{l.term}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-on-surface-variant">{l.body}</p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-container">
                {l.from.label}
                <Icon name="arrow-right" size={15} className="transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </Reveal>
      </Container>
    </Section>
  )
}
