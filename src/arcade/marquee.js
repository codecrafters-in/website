// Marquee copy.
//
// Arcade cabinets always carried one lit sign above the screen and nobody ever
// minded, because it never interrupted the game. That is the whole design rule
// here: short lines, above the cabinet, never during play, never a modal, never
// an email gate. The conversion moment is the end screen.
//
// The copy leans on the AI stack rather than the ERP work, because that is the
// part a visitor cannot guess from the rest of the site and the part the game
// they are playing is actually about. One Odoo line stays, since that is the
// positioning everything else hangs off.
//
// Two constraints on every line:
//   1. It must be checkable against this repo — `src/components/AIStack.jsx`,
//      `src/data/stats.js`, or the built chunk sizes. A fabricated claim here
//      is the same failure the truth pass removed, just harder to spot because
//      it reads as flavour text.
//   2. It has to fit a crawl in Press Start 2P, which is a wide face. Roughly
//      55 characters is the ceiling before a line stops being scannable.

export const marquee = [
  {
    text: 'RAG grounds answers in your data, not model memory.',
    label: 'AI stack',
    to: '/solutions/ai',
  },
  {
    text: 'Agentic tool-calling: model proposes, runtime disposes.',
    label: 'ERP agent',
    to: '/work/conversational-ai-agent-erp',
  },
  {
    text: 'Prompt injection is stage three of this game. We harden it.',
    label: 'The teardown',
    to: '/insights/prompt-injection-hardening-enterprise-agents',
  },
  {
    text: 'Five model providers, one registry. No lock-in.',
    label: 'Email AI',
    to: '/work/email-intelligence-saas',
  },
  {
    text: 'Forward-deployed engineering. We build inside your workflow.',
    label: 'Who we are',
    to: '/about',
  },
  {
    text: 'Confidence scoring sends the uncertain rows to a human.',
    label: 'What we do',
    to: '/solutions',
  },
  {
    text: '120+ Odoo modules, plus the AI layer on top.',
    label: 'The work',
    to: '/work',
  },
  {
    text: 'This cabinet is under 10 KB. Nothing here is faked.',
  },
]

export default marquee
