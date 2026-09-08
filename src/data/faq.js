// FAQ records. `scope` controls where each question is shown:
// 'home', 'contact', or 'solutions:<slug>'.
export const faq = [
  {
    id: 'diagnostic',
    q: 'How does the free diagnostic work?',
    a: 'Book a 45-minute call with our architects. We map your current stack, find the three biggest bottlenecks and estimate the ROI of fixing them. You get a written summary within 24 hours. No pitch, no commitment.',
    scope: ['home', 'contact', 'solutions:ai', 'solutions:enterprise-platforms', 'solutions:cloud-devops', 'solutions:security', 'solutions:data-dashboards', 'solutions:brand-design'],
  },
  {
    id: 'timelines',
    q: 'How long does a typical engagement take?',
    a: 'First measurable wins usually land within 14 business days. A scoped build runs 2 to 8 weeks depending on integrations and migration volume. Brand projects average 2 to 3 weeks. You get a milestone plan before we start.',
    scope: ['contact', 'solutions:ai', 'solutions:enterprise-platforms', 'solutions:data-dashboards', 'solutions:brand-design'],
  },
  {
    id: 'engagement-models',
    q: 'What engagement models do you offer?',
    a: 'Three. A free Diagnostic, a fixed-scope, fixed-price Build, or a Scale retainer where we act as your engineering team. Most clients start with a Build and move to a retainer once the first system is live.',
    scope: ['home', 'contact', 'solutions:cloud-devops', 'solutions:brand-design'],
  },
  {
    id: 'security-nda',
    q: 'How do you handle data security and NDAs?',
    a: 'We sign NDAs before the diagnostic if you need one. Your data stays in your environment. Encryption at rest, scoped access and audit trails are defaults, not add-ons, and we never use your data to train shared models.',
    scope: ['contact', 'solutions:security', 'solutions:cloud-devops', 'solutions:ai'],
  },
  {
    id: 'existing-systems',
    q: 'Can you work with the systems we already run?',
    a: 'Yes. We build on what you already have: ERPs, CRMs, payment rails, healthcare APIs, legacy databases. If it has an API or a database, we integrate with it. If it does not, we build the bridge.',
    scope: ['contact', 'solutions:ai', 'solutions:enterprise-platforms', 'solutions:data-dashboards'],
  },
  {
    id: 'ai-accuracy',
    q: 'How do you keep AI outputs accurate and safe?',
    a: 'Every AI feature we ship is grounded in your data through retrieval, constrained by schemas, and gated by roles. Low-confidence outputs route to a human. We measure accuracy on your data before launch and monitor it after.',
    scope: ['solutions:ai', 'solutions:security', 'contact'],
  },
  {
    id: 'team',
    q: 'Who actually does the work?',
    a: 'Founder-led. Jaimin Shah scopes and architects every engagement and stays on the account. No offshore handoffs, no juniors on your project. Senior engineers end to end.',
    scope: ['home', 'contact', 'solutions:security'],
  },
  {
    id: 'support',
    q: 'What happens after launch?',
    a: 'Every Build includes 30 days of post-launch support and full documentation. After that you can move to a Scale retainer with 24/7 monitoring, a priority response SLA and monthly strategy sessions.',
    scope: ['contact', 'solutions:enterprise-platforms', 'solutions:cloud-devops'],
  },
  {
    id: 'pricing',
    q: 'What does it cost?',
    a: 'Builds are fixed-price after a scoping call. Typical engagements start under $25K for a single system and run to $100K+ for multi-platform programmes. Retainers are monthly. The diagnostic is free.',
    scope: ['contact', 'solutions:data-dashboards', 'solutions:brand-design'],
  },
  {
    id: 'location',
    q: 'Where are you based, and what time zones do you cover?',
    a: 'We are based in Ahmedabad, India (IST, UTC+5:30) and work with clients across North America, the UK, the Gulf and Australia. We overlap with your working hours for standups and respond within 4 business hours.',
    scope: ['contact', 'home'],
  },
]

export const faqByScope = (scope) => faq.filter((f) => f.scope.includes(scope))

export default faq
