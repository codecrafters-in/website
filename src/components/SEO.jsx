import { Helmet } from 'react-helmet-async'

const SITE_NAME = 'CodeCrafters'
const DEFAULT_OG_IMAGE = 'https://codecrafters.in/images/og-default.jpg'
const BASE_URL = 'https://codecrafters.in'

export default function SEO({ title, description, path = '', image }) {
  const fullTitle = title
    ? `${title} | ${SITE_NAME}`
    : `${SITE_NAME} — AI & Odoo Enterprise Solutions`
  const ogImage = image || DEFAULT_OG_IMAGE
  const canonical = `${BASE_URL}${path}`

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={canonical} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  )
}
