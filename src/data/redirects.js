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
  // URLs from the previous (Odoo-built) site still known to Google.
  { from: '/about-us', to: '/about' },
  { from: '/contactus', to: '/contact' },
  { from: '/our-services', to: '/solutions' },
  { from: '/industries', to: '/solutions' },
  { from: '/case-studies', to: '/work' },
  { from: '/ai-solutions', to: '/solutions/ai' },
  { from: '/ai-agents-real-estate-usa', to: '/solutions/ai' },
  { from: '/services/cloud-devops', to: '/solutions/cloud-devops' },
  { from: '/services/ui-ux-design', to: '/solutions/brand-design' },
  { from: '/services/saas', to: '/solutions' },
  { from: '/services/software-development', to: '/solutions' },
  { from: '/services/web-development', to: '/solutions' },
  { from: '/services/mobile-app-development', to: '/solutions' },
  { from: '/services/on-demand', to: '/solutions' },
  { from: '/blog', to: '/insights' },
  { from: '/blog/page/2', to: '/insights' },
  { from: '/blog/business-with-erp-solutions-2/patient-engagement-automation-odoo-ai', to: '/solutions/ai' },
  { from: '/blog/business-with-erp-solutions-2/transform-odoo-with-voice-to-text-16', to: '/solutions/ai' },
  { from: '/blog/business-with-erp-solutions-2/leveraging-odoo-s-api-for-intelligent', to: '/solutions/ai' },
]

export const redirectPaths = redirects.map((r) => r.from)

export default redirects
