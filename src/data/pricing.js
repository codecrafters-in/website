// Engagement models. Build is the highlighted tier.
export const pricing = [
  {
    id: 'diagnostic',
    tier: 'Diagnostic',
    price: 'Free',
    tagline: 'A 45-minute technical audit of your stack. Walk away with a prioritised bottleneck list and ROI estimates. No pitch, no pressure.',
    items: ['45-min architect call', 'Tech stack analysis', 'Written bottleneck report', 'ROI estimate'],
    cta: { label: 'Book the diagnostic', to: '/contact' },
    highlight: false,
  },
  {
    id: 'build',
    tier: 'Build · forward-deployed',
    price: 'Project-based',
    tagline: 'Fixed scope, fixed price, one system: an AI pipeline, an ERP module, a cloud migration. You know exactly what you are getting.',
    items: ['Custom scoping call', 'Milestone-based delivery', '30 days post-launch support', 'Documentation included', 'Fixed price, no surprises'],
    cta: { label: 'Get a quote', to: '/contact' },
    highlight: true,
  },
  {
    id: 'scale',
    tier: 'Scale',
    price: 'Retainer',
    tagline: 'An ongoing engineering partnership. We become your technical team, building, optimising and maintaining systems as you grow.',
    items: ['Dedicated engineering team', 'Monthly strategy sessions', 'Priority response SLA', '24/7 monitoring included'],
    cta: { label: 'Discuss a partnership', to: '/contact' },
    highlight: false,
  },
]

export default pricing

// Odoo licence prices for India as listed on odoo.com/pricing, checked on the
// date below. Odoo shows these as introductory prices for the first 12 months
// (list prices are higher) and changes them from time to time: re-check before
// relying on them. Implementation is our own price.
export const odooPricing = {
  checked: '8 November 2026',
  source: 'https://www.odoo.com/pricing',
  currency: '₹',
  plans: [
    { name: 'One App Free', yearly: '₹0', monthly: '₹0', includes: 'One Odoo app (for example Invoicing or CRM), unlimited users, Odoo Online hosting' },
    { name: 'Standard', yearly: '₹580', monthly: '₹725', includes: 'All Odoo apps, Odoo Online hosting' },
    { name: 'Custom', yearly: '₹1,080', monthly: '₹1,350', includes: 'All apps plus Odoo Studio, multi-company, external API, and Odoo.sh or on-premise hosting' },
  ],
  example: '10 users on Standard, billed yearly: 10 × ₹580 × 12 = ₹69,600 a year in Odoo licences.',
}

export const implementationPricing = {
  from: 'US$5,000',
  summary:
    'Fixed price, agreed after a free scoping call. Focused setups and single custom modules start from US$5,000; full implementations with data migration are quoted on scope (apps, users, integrations, data volume). Indian clients are quoted in rupees.',
  noMarkup: 'You pay Odoo S.A. directly for licences (or use free Community). We do not resell or mark up licences.',
}
