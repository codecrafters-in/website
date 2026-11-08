// Site-wide identity, navigation, footer and marketing claims.
// `import.meta.env` is undefined outside Vite (e.g. plain Node), so guard it.
const env = (typeof import.meta !== 'undefined' && import.meta.env) || {}

export const site = {
  name: 'CodeCrafters',
  legalName: 'CodeCrafters',
  url: 'https://www.codecrafters.in',
  tagline: 'Odoo for growing businesses, set up so your team actually uses it.',
  description:
    'Odoo implementation, migration and customization for growing businesses, from Ahmedabad, India. 120+ custom Odoo modules and 15+ migrations, plus AI that saves hours inside Odoo.',
  email: 'hello@codecrafters.in',
  phone: '+91 70438 31200',
  phoneE164: '+917043831200',
  // wa.me link with a prefilled first line, so the chat opens with context.
  whatsappUrl: 'https://wa.me/917043831200?text=' + encodeURIComponent('Hi CodeCrafters, I have a question about Odoo.'),
  legalEmail: 'legal@codecrafters.in',
  location: { city: 'Ahmedabad', region: 'Gujarat', country: 'IN', label: 'Ahmedabad, India' },
  socials: {
    linkedin: 'https://www.linkedin.com/company/codecraftersin/',
    github: 'https://github.com/codecrafters-in',
  },
  calUrl: env.VITE_CAL_URL || '',
  responseTime: 'Within 4 business hours',
  // Shown in the footer. Fill these in — a verifiable legal identity is one of
  // the cheapest trust signals available and every serious agency publishes it.
  legal: {
    registeredName: '',   // e.g. 'CodeCrafters Technologies LLP'
    gstin: '',            // e.g. '24ABCDE1234F1Z5'
    addressLine: '',      // street / area, Ahmedabad, Gujarat, India
  },
  availability: {
    label: 'Accepting new engagements',
    period: 'Q4 2026',
    note: 'We take on a limited number of new projects each quarter',
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
  { label: 'Odoo Services', to: '/solutions', mega: true },
  { label: 'Work', to: '/work' },
  { label: 'Insights', to: '/insights' },
  { label: 'About', to: '/about' },
  { label: 'Careers', to: '/careers', badge: 'Hiring' },
]

export const footerColumns = [
  {
    title: 'Odoo services',
    links: [
      { label: 'Odoo Implementation', to: '/solutions/odoo' },
      { label: 'Odoo Migration & Upgrades', to: '/solutions/odoo-migration' },
      { label: 'Odoo Customization', to: '/solutions/odoo-customization' },
      { label: 'Odoo AI Integration', to: '/solutions/ai' },
      { label: 'Odoo Reports & Dashboards', to: '/solutions/data-dashboards' },
      { label: 'Odoo POS', to: '/solutions/odoo-pos' },
      { label: 'Odoo for Retail', to: '/solutions/odoo-retail' },
      { label: 'Odoo Manufacturing', to: '/solutions/odoo-manufacturing' },
      { label: 'Odoo Accounting & Billing', to: '/solutions/odoo-accounting-billing' },
      { label: 'Odoo in Ahmedabad & Gandhinagar', to: '/solutions/odoo-ahmedabad' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', to: '/about' },
      { label: 'Work', to: '/work' },
      { label: 'Insights', to: '/insights' },
      { label: 'Careers', to: '/careers' },
      { label: 'Contact', to: '/contact' },
      { label: 'Book a diagnostic', to: '/contact' },
    ],
  },
  {
    title: 'More',
    links: [
      { label: 'Cloud & DevOps', to: '/solutions/cloud-devops' },
      { label: 'Security', to: '/solutions/security' },
      { label: 'Brand & Design', to: '/solutions/brand-design' },
      { label: 'AI Readiness Checklist', to: '/#checklist' },
      { label: 'Privacy', to: '/privacy' },
      { label: 'Terms', to: '/terms' },
    ],
  },
]

export default site
