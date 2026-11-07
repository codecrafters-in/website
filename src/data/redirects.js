// Legacy route redirects from the previous site structure.
export const redirects = [
  { from: '/services', to: '/solutions' },
  { from: '/ai-forge', to: '/solutions/ai' },
  { from: '/odoo-solutions', to: '/solutions/odoo' },
  { from: '/solutions/enterprise-platforms', to: '/solutions/odoo' },
  { from: '/odoo', to: '/solutions/odoo' },
  { from: '/portfolio', to: '/work' },
  { from: '/products', to: '/work' },
  { from: '/products/quotemaker', to: '/work/quotemaker' },
  { from: '/brand-design', to: '/solutions/brand-design' },
]

export const redirectPaths = redirects.map((r) => r.from)

export default redirects
