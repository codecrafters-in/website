import { Helmet } from 'react-helmet-async'

const SITE_NAME = 'CodeCrafters'
const DEFAULT_OG_IMAGE = 'https://codecrafters.in/images/og-default.jpg'
const BASE_URL = 'https://codecrafters.in'

const ORG_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'CodeCrafters',
  url: BASE_URL,
  logo: `${BASE_URL}/images/dark_logo.png`,
  image: DEFAULT_OG_IMAGE,
  description: 'Odoo ERP implementation partner in India. Custom Odoo development, AI automation, module development, and migrations by Jaimin Shah. Ahmedabad, Gujarat.',
  founder: {
    '@type': 'Person',
    name: 'Jaimin Shah',
    jobTitle: 'Senior Odoo Developer & AI Engineer',
    url: BASE_URL,
    sameAs: [
      'https://linkedin.com/company/codecrafters-in',
      'https://github.com/codecrafters-in',
    ],
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Ahmedabad',
    addressRegion: 'Gujarat',
    addressCountry: 'IN',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'hello@codecrafters.in',
    contactType: 'customer service',
  },
  areaServed: 'Worldwide',
  serviceType: ['Odoo ERP Implementation', 'Odoo Customisation', 'Odoo Module Development', 'Odoo Migration', 'AI Automation', 'LLM Integration', 'Odoo AI Agent Development'],
  priceRange: '$$',
}

export default function SEO({ title, description, path = '', image, keywords }) {
  const fullTitle = title
    ? `${title} | ${SITE_NAME}`
    : `${SITE_NAME} — Best Odoo Partner in India | Odoo ERP & AI Automation`
  const ogImage = image || DEFAULT_OG_IMAGE
  const canonical = `${BASE_URL}${path}`

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="robots" content="index, follow" />
      <meta name="author" content="Jaimin Shah" />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={canonical} />

      {/* Geo */}
      <meta name="geo.region" content="IN-GJ" />
      <meta name="geo.placename" content="Ahmedabad" />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={canonical} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="en_IN" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* JSON-LD */}
      <script type="application/ld+json">{JSON.stringify(ORG_SCHEMA)}</script>
    </Helmet>
  )
}
