// FAQ records. `scope` controls where each question is shown:
// 'home', 'contact', or 'solutions:<slug>'.
export const faq = [
  {
    id: 'diagnostic',
    q: 'How does the free diagnostic work?',
    a: 'Book a 45-minute call with our architects. We map your current stack, find the three biggest bottlenecks and estimate the ROI of fixing them. You get a written summary within 24 hours. No pitch, no commitment.',
    scope: ['home', 'contact', 'solutions:ai', 'solutions:odoo', 'solutions:cloud-devops', 'solutions:security', 'solutions:data-dashboards', 'solutions:brand-design'],
  },
  {
    id: 'timelines',
    q: 'How long does a typical engagement take?',
    a: 'First measurable wins usually land within 14 business days. A scoped build runs 2 to 8 weeks depending on integrations and migration volume. You get a milestone plan before we start.',
    scope: ['contact', 'solutions:ai', 'solutions:odoo', 'solutions:data-dashboards', 'solutions:brand-design'],
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
    scope: ['contact', 'solutions:ai', 'solutions:odoo', 'solutions:data-dashboards'],
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
    a: 'Senior-led. A principal engineer scopes and architects every engagement and stays on the account. No offshore handoffs or account managers; the person you talk to is the person accountable for the build.',
    scope: ['home', 'contact', 'solutions:security'],
  },
  {
    id: 'support',
    q: 'What happens after launch?',
    a: 'Every Build includes 30 days of post-launch support and full documentation. After that you can move to a Scale retainer with 24/7 monitoring, a priority response SLA and monthly strategy sessions.',
    scope: ['contact', 'solutions:odoo', 'solutions:cloud-devops'],
  },
  {
    id: 'pricing',
    q: 'How much does an Odoo project cost?',
    a: 'Fixed price, agreed after a free scoping call. Odoo projects start from $5,000 for a focused setup or a single custom module; a full implementation with data migration costs more, depending on apps, users and integrations. Monthly support retainers are available. The diagnostic is free.',
    scope: ['home', 'contact', 'solutions:odoo', 'solutions:odoo-customization', 'solutions:data-dashboards', 'solutions:brand-design'],
  },
  {
    id: 'location',
    q: 'Where are you based, and what time zones do you cover?',
    a: 'We are based in Ahmedabad, India (IST, UTC+5:30) and work with clients across North America, the UK, the Gulf and Australia. We overlap with your working hours for standups and respond within 4 business hours.',
    scope: ['contact', 'home'],
  },
  {
    id: 'odoo-edition',
    q: 'Odoo Community or Enterprise: which one do we need?',
    a: 'It depends on the apps you need and how many people will use it. Community is free and covers sales, stock, purchase and basic invoicing. Enterprise adds full accounting, Studio, mobile apps and Odoo’s own support, and is licensed per user. We tell you which fits on the free diagnostic call, and we work with both.',
    scope: ['home', 'solutions:odoo', 'solutions:odoo-migration'],
  },
  {
    id: 'odoo-rescue',
    q: 'Can you fix an Odoo setup another partner did?',
    a: 'Yes, and it is a common first project. We audit what was built, keep what works, fix or replace the custom modules that break, and clean up the data. You get a written list of what we found before any work starts.',
    scope: ['home', 'solutions:odoo', 'solutions:odoo-customization', 'solutions:odoo-migration'],
  },
  {
    id: 'odoo-versions',
    q: 'Which Odoo versions do you work with?',
    a: 'Odoo 14 through 19, Community and Enterprise. We also upgrade between versions and move businesses from Tally, spreadsheets or another ERP into Odoo.',
    scope: ['home', 'solutions:odoo-migration'],
  },
  {
    id: 'odoo-official-partner',
    q: 'Are you an official Odoo partner?',
    a: 'No. CodeCrafters is an independent Odoo service provider, not part of the Odoo partner programme. We do not resell Odoo licences: you buy Odoo directly from Odoo S.A. (or use free Community), and we do the implementation, migration, custom modules and support. Our engineers include ex-Odoo developers, and we have shipped 120+ custom Odoo modules.',
    scope: ['home', 'solutions:odoo', 'solutions:odoo-ahmedabad'],
  },
  {
    id: 'gujarat-local',
    q: 'Do you work with businesses in Ahmedabad and Gandhinagar?',
    a: 'Yes. Our team is based in Ahmedabad, so businesses in Ahmedabad, Gandhinagar and the rest of Gujarat work with us in the same time zone, in English, Hindi or Gujarati, and in-person meetings can be arranged. We also work with clients elsewhere in India and abroad.',
    scope: ['solutions:odoo-ahmedabad'],
  },
]

export const faqByScope = (scope) => faq.filter((f) => f.scope.includes(scope))

export default faq
