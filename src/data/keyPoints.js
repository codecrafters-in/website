// Per-page key points — the scannable spec strip each page opens with.
//
// Two jobs at once:
//  1. CRO — a visitor should be able to decide from these four facts alone.
//  2. SEO — these carry the target phrases ("AI solutions company", "Odoo ERP
//     solution", "ERP solution", "business solutions") in real sentences, in
//     body copy, where they count. Never stuffed: if a phrase does not fit the
//     sentence honestly, it is not in it.
//
// Every claim here traces to src/data/work.js, stats.js or founder.js.

export const keyPoints = {
  work: [
    {
      icon: 'circle-check',
      value: '19',
      label: 'Projects on this page',
      note: 'Every one shipped to production. Nothing here is a concept or a pitch deck.',
    },
    {
      icon: 'database',
      value: '120+',
      label: 'Odoo modules shipped',
      note: 'Custom ERP solutions across textiles, logistics, healthcare and retail.',
    },
    {
      icon: 'workflow',
      value: '15+',
      label: 'ERP migrations',
      note: 'Including a v14 to v19 cutover in 8 weeks with zero records lost.',
    },
    {
      icon: 'shield-check',
      value: 'NDA',
      label: 'Clients anonymised',
      note: 'Names withheld by agreement. The systems and outcomes are real.',
    },
  ],

  solutions: [
    {
      icon: 'database',
      label: 'Odoo & ERP solutions',
      note: 'Implementation, migration and custom modules for businesses already running Odoo.',
      to: '/solutions/enterprise-platforms',
      cta: 'ERP solutions',
    },
    {
      icon: 'brain',
      label: 'AI solutions on your own data',
      note: 'Agents, RAG and LLM pipelines wired into the systems you already run.',
      to: '/solutions/ai',
      cta: 'AI solutions',
    },
    {
      icon: 'chart-line',
      label: 'Data & business intelligence',
      note: 'Forecasting and real-time dashboards, so decisions stop running on stale exports.',
      to: '/solutions/data-dashboards',
      cta: 'Dashboards',
    },
    {
      icon: 'users',
      label: 'One engineer, start to finish',
      note: 'Forward-deployed. The person who scopes your solution is the person who builds it.',
      to: '/about',
      cta: 'How we work',
    },
  ],

  about: [
    {
      icon: 'map-pin',
      label: 'An AI and ERP company in Ahmedabad',
      note: 'Working with businesses across India, Canada and Australia.',
    },
    {
      icon: 'book-open',
      value: '2',
      label: 'Peer-reviewed papers',
      note: 'Published machine learning research behind the AI solutions we ship.',
    },
    {
      icon: 'users',
      value: 'FDE',
      label: 'Forward-deployed engineering',
      note: 'No account managers, no handoffs, no juniors learning on your project.',
    },
    {
      icon: 'shield-check',
      label: 'NDA on request',
      note: 'Your data stays yours. Nothing you share is used for marketing.',
    },
  ],

  insights: [
    {
      icon: 'file-text',
      label: 'Written by the engineer',
      note: 'Not a content team. Every article comes from a system we actually built.',
    },
    {
      icon: 'workflow',
      label: 'Mechanisms, not trends',
      note: 'How the automation works, what it cost, and the mistakes we made first.',
    },
    {
      icon: 'shield-check',
      label: 'Including what fails',
      note: 'Our prompt-injection piece has a section on what you cannot defend against.',
    },
  ],

  contact: [
    {
      icon: 'message-circle',
      label: 'Straight to the engineer',
      note: 'No sales desk, no qualification call before the real conversation.',
    },
    {
      icon: 'clock',
      label: 'Reply within 4 business hours',
      note: 'Ahmedabad, IST. Usually much faster.',
    },
    {
      icon: 'shield-check',
      label: 'NDA available on request',
      note: 'Nothing you write here is used for marketing.',
    },
  ],
}

/** Compact reassurance row, used next to CTAs. */
export const reassurance = [
  { icon: 'message-circle', label: 'Straight to the engineer' },
  { icon: 'clock', label: 'Reply in 4 business hours' },
  { icon: 'shield-check', label: 'NDA on request' },
]

/** Sits directly under the hero CTA — the objections a buyer has in the first
 *  five seconds, answered before they scroll. */
export const heroAssurance = [
  { icon: 'circle-check', label: 'No pitch deck' },
  { icon: 'users', label: 'You talk to the engineer' },
  { icon: 'shield-check', label: 'NDA on request' },
  { icon: 'x', label: 'No lock-in — you keep the code' },
]

/** Replaces the keyword ticker under the hero with actual credentials. */
export const credentials = [
  { icon: 'database', label: 'Odoo v14–v19' },
  { icon: 'workflow', label: 'ERP migrations' },
  { icon: 'brain', label: 'Agents & RAG' },
  { icon: 'book-open', label: 'Peer-reviewed research' },
  { icon: 'lock', label: 'AES-256-GCM' },
  { icon: 'shield-check', label: 'Prompt-injection hardened' },
  { icon: 'map-pin', label: 'Ahmedabad · IST' },
  { icon: 'globe', label: 'India · Canada · Australia' },
]

/** Risk reversal, placed immediately before the closing CTA. */
export const deRisk = [
  {
    icon: 'search',
    label: 'A diagnostic before a proposal',
    note: 'We map the bottleneck and tell you honestly if AI is the wrong tool. Often it is.',
  },
  {
    icon: 'file-text',
    label: 'Fixed scope, fixed price',
    note: 'Builds are priced after scoping, not billed by the hour against an open clock.',
  },
  {
    icon: 'circle-check',
    label: 'You keep the code',
    note: 'Full source, full documentation. No proprietary runtime you cannot leave.',
  },
  {
    icon: 'users',
    label: 'The same engineer throughout',
    note: 'Whoever scopes your system builds it and stays on it. No junior handover.',
  },
]

export default keyPoints
