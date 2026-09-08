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
    term: 'Agentic tool-calling',
    tech: 'Claude MCP',
    body:
      'The agent does not get database credentials. It calls a tool, the ORM decides whether that call is allowed, and the result comes back. Model proposes, runtime disposes.',
    from: { label: 'ERP agent', to: '/work/conversational-ai-agent-erp' },
    icon: 'workflow',
  },
  {
    id: 'rag',
    term: 'Retrieval-augmented generation',
    tech: 'RAG',
    body:
      'Answers grounded in your documents and tables rather than the model’s memory, so a wrong answer is a retrieval bug you can fix — not a hallucination you can only apologise for.',
    from: { label: 'AI solutions', to: '/solutions/ai' },
    icon: 'database',
  },
  {
    id: 'structured',
    term: 'Structured outputs',
    tech: 'Zod-validated',
    body:
      'Every model response is parsed against a schema before anything downstream trusts it. Wrong shape, rejected — it never reaches your database as a half-parsed string.',
    from: { label: 'Email intelligence', to: '/work/email-intelligence-saas' },
    icon: 'shield-check',
  },
  {
    id: 'guardrails',
    term: 'Prompt-injection hardening',
    tech: 'Guardrails',
    body:
      'Untrusted text — an email body, a PDF, a form field — is treated as data, never as instructions. We wrote up what this does and does not defend against.',
    from: { label: 'Read the teardown', to: '/insights/prompt-injection-hardening-enterprise-agents' },
    icon: 'lock',
  },
  {
    id: 'hitl',
    term: 'Human in the loop',
    tech: 'Confidence thresholds',
    body:
      'Confidence scoring routes the uncertain cases to a person and lets the rest through. Your team reviews the edge cases instead of every row.',
    from: { label: 'OCR engine', to: '/work' },
    icon: 'users',
  },
  {
    id: 'routing',
    term: 'Model routing',
    tech: 'AI Gateway',
    body:
      'Five providers behind one registry, so a price change, a rate limit or a better model is a config change — not a rewrite and not a lock-in.',
    from: { label: 'Email intelligence', to: '/work/email-intelligence-saas' },
    icon: 'cpu',
  },
]

export default function AIStack() {
  return (
    <Section tone="base">
      <Container>
        <SectionHeader
          eyebrow="The AI layer"
          title="Named properly, because the details are the difference."
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
