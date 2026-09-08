import { Head } from 'vite-react-ssg'
import { site } from '../data/site.js'

const BASE_URL = site.url
const DEFAULT_OG_IMAGE = `${BASE_URL}/images/og-default.jpg`
const DEFAULT_TITLE = 'CodeCrafters — Odoo ERP & AI Automation, Built to Ship'
const DEFAULT_DESCRIPTION = site.description

export const ORG_ID = `${BASE_URL}/#org`
export const PERSON_ID = `${BASE_URL}/#jaimin`
export const WEBSITE_ID = `${BASE_URL}/#website`

// ProfessionalService is a subtype of both Organization and LocalBusiness, so a
// single node stays the referent for every `{'@id': ORG_ID}` elsewhere while
// becoming eligible for local results ("Odoo developer Ahmedabad").
const orgNode = {
  '@type': ['Organization', 'ProfessionalService'],
  '@id': ORG_ID,
  name: site.name,
  url: BASE_URL,
  logo: { '@type': 'ImageObject', url: `${BASE_URL}/images/light_logo.png` },
  image: DEFAULT_OG_IMAGE,
  description: DEFAULT_DESCRIPTION,
  email: site.email,
  founder: { '@id': PERSON_ID },
  address: {
    '@type': 'PostalAddress',
    addressLocality: site.location.city,
    addressRegion: site.location.region,
    addressCountry: site.location.country,
  },
  contactPoint: {
    '@type': 'ContactPoint',
    email: site.email,
    contactType: 'sales',
    availableLanguage: ['English', 'Hindi', 'Gujarati'],
  },
  areaServed: [
    { '@type': 'City', name: site.location.city },
    { '@type': 'AdministrativeArea', name: site.location.region },
    { '@type': 'Country', name: 'India' },
    'Worldwide',
  ],
  knowsAbout: [
    'Odoo ERP implementation',
    'Odoo migration',
    'Odoo custom module development',
    'ERP integration',
    'AI agents',
    'Retrieval-augmented generation',
    'LLM pipelines',
    'B2B commerce platforms',
  ],
  priceRange: '$$$',
  sameAs: Object.values(site.socials),
}

const websiteNode = {
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  url: BASE_URL,
  name: site.name,
  publisher: { '@id': ORG_ID },
  inLanguage: 'en',
}

/** ItemList for index pages (/work, /insights) so the set is machine-readable. */
export function itemList(name, items) {
  return {
    '@type': 'ItemList',
    name,
    numberOfItems: items.length,
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `${BASE_URL}${it.path}`,
      name: it.name,
    })),
  }
}

/** WebPage node — every page should declare what it is. */
export function webPage({ name, path = '', description }) {
  return {
    '@type': 'WebPage',
    '@id': `${BASE_URL}${path}#webpage`,
    url: `${BASE_URL}${path}`,
    name,
    description,
    isPartOf: { '@id': WEBSITE_ID },
    about: { '@id': ORG_ID },
    inLanguage: 'en',
  }
}

export function breadcrumb(items) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: `${BASE_URL}${it.path}`,
    })),
  }
}

export function faqNode(faqs) {
  return {
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
}

export default function SEO({
  title,
  description = DEFAULT_DESCRIPTION,
  path = '',
  image,
  type = 'website',
  jsonLd = [],
  noindex = false,
  includeOrg = true,
}) {
  const clean = title ? String(title).replace(/\s*[|\u2014-]\s*CodeCrafters\s*$/i, '').trim() : ''
  const fullTitle = clean ? `${clean} | ${site.name}` : DEFAULT_TITLE
  const ogImage = image || DEFAULT_OG_IMAGE
  const canonical = `${BASE_URL}${path}`
  const graph = [...(includeOrg ? [orgNode, websiteNode] : []), ...jsonLd.filter(Boolean)]

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={noindex ? 'noindex, nofollow' : 'index, follow'} />
      <link rel="canonical" href={canonical} />

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={canonical} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={site.name} />
      <meta property="og:locale" content="en_IN" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      <script type="application/ld+json">
        {JSON.stringify({ '@context': 'https://schema.org', '@graph': graph })}
      </script>
    </Head>
  )
}
