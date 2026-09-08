// Site-wide identity, navigation, footer and marketing claims.
// `import.meta.env` is undefined outside Vite (e.g. plain Node), so guard it.
const env = (typeof import.meta !== 'undefined' && import.meta.env) || {}

export const site = {
  name: 'CodeCrafters',
  legalName: 'CodeCrafters',
  url: 'https://codecrafters.in',
  tagline: 'Odoo ERP and AI automation, engineered to last.',
  description:
    'Odoo ERP implementation, migration and AI automation from Ahmedabad, India. Founder-led engineering: 120+ custom modules, 15+ migrations, agents and RAG wired into the systems you already run.',
  email: 'hello@codecrafters.in',
  legalEmail: 'legal@codecrafters.in',
  location: { city: 'Ahmedabad', region: 'Gujarat', country: 'IN', label: 'Ahmedabad, India' },
  socials: {
    linkedin: 'https://linkedin.com/company/codecrafters-in',
    github: 'https://github.com/codecrafters-in',
  },
  calUrl: env.VITE_CAL_URL || '',
  whatsapp: env.VITE_WHATSAPP_NUMBER || '',
  founder: {
    name: 'Jaimin Shah',
    title: 'Founder & Principal Engineer',
    linkedin: 'https://linkedin.com/in/jaiminshah198',
    github: 'https://github.com/ByteShah',
  },
  responseTime: 'Within 4 business hours',
  // Shown in the footer. Fill these in — a verifiable legal identity is one of
  // the cheapest trust signals available and every serious agency publishes it.
  legal: {
    registeredName: '',   // e.g. 'CodeCrafters Technologies LLP'
    gstin: '',            // e.g. '24ABCDE1234F1Z5'
    addressLine: '',      // street / area, Ahmedabad, Gujarat, India
    phone: '',            // e.g. '+91 98765 43210'
  },
  availability: {
    label: 'Accepting new engagements',
    period: 'Q4 2026',
    note: 'Limited to 3 new enterprise engagements per quarter',
  },
  industries: [
    'Logistics & Supply Chain',
    'Financial Services',
    'Healthcare',
    'Retail & eCommerce',
    'Manufacturing',
    'Textiles & Wholesale',
  ],
  capabilities: [
    'LLM pipelines',
    'Autonomous agents',
    'RAG systems',
    'ERP platforms',
    'B2B commerce',
    'Zero-trust security',
    'Kubernetes & cloud',
    'Real-time dashboards',
    'Forecasting models',
    'Brand systems',
  ],
  // Only figures that trace to delivered work, a repo or a publication.
  claims: {
    projects: '30+',
    modules: '120+',
    migrations: '15+',
    publications: '2',
  },
  konamiHint: '↑↑↓↓←→←→BA',
}

export const nav = [
  { label: 'Solutions', to: '/solutions', mega: true },
  { label: 'Work', to: '/work' },
  { label: 'Insights', to: '/insights' },
  { label: 'About', to: '/about' },
]

export const footerColumns = [
  {
    title: 'Solutions',
    links: [
      { label: 'Odoo & Enterprise Platforms', to: '/solutions/enterprise-platforms' },
      { label: 'AI Solutions', to: '/solutions/ai' },
      { label: 'Data & Dashboards', to: '/solutions/data-dashboards' },
      { label: 'Cloud & DevOps', to: '/solutions/cloud-devops' },
      { label: 'Security', to: '/solutions/security' },
      { label: 'Brand & Design', to: '/solutions/brand-design' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', to: '/about' },
      { label: 'Work', to: '/work' },
      { label: 'Insights', to: '/insights' },
      { label: 'Contact', to: '/contact' },
      { label: 'Book a diagnostic', to: '/contact' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'AI Readiness Checklist', to: '/#checklist' },
      { label: 'Privacy', to: '/privacy' },
      { label: 'Terms', to: '/terms' },
    ],
  },
]

export default site
