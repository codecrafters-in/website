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
