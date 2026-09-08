import { useParams, Link } from 'react-router-dom'
import SEO, { breadcrumb, ORG_ID, PERSON_ID } from '../components/SEO.jsx'
import Blocks from '../components/blocks/Blocks.jsx'
import NotFoundView from '../components/NotFoundView.jsx'
import InsightCard from '../components/cards/InsightCard.jsx'
import LeadMagnet from '../components/LeadMagnet.jsx'
import CTASection from '../components/CTASection.jsx'
import { Section, Container, Eyebrow, Tag, Icon, GlassCard, Button } from '../components/ui/index.js'
import Reveal from '../effects/Reveal.jsx'
import { insights, insightBySlug } from '../data/insights.js'
import { founder } from '../data/founder.js'
import { site } from '../data/site.js'
import { formatDate } from '../lib/format.js'
import Aurora from '../components/Aurora.jsx'

export function Component() {
  const { slug } = useParams()
  const a = insightBySlug[slug]
  if (!a) return <NotFoundView />

  const toc = a.body.filter((b) => b.type === 'h2' && b.id)
  const sorted = [...insights].sort((x, y) => (x.date < y.date ? 1 : -1))
  const idx = sorted.findIndex((x) => x.slug === a.slug)
  const next = sorted[(idx + 1) % sorted.length]

  const jsonLd = [
    breadcrumb([{ name: 'Home', path: '/' }, { name: 'Insights', path: '/insights' }, { name: a.title, path: `/insights/${a.slug}` }]),
    {
      '@type': 'Article',
      headline: a.title,
      description: a.excerpt,
      datePublished: a.date,
      dateModified: a.updated || a.date,
      author: { '@type': 'Person', '@id': PERSON_ID, name: founder.name, url: `${site.url}/about` },
      publisher: { '@id': ORG_ID },
      mainEntityOfPage: `${site.url}/insights/${a.slug}`,
      image: [`${site.url}/images/og-default.jpg`],
      keywords: (a.tags || []).join(', '),
    },
  ]

  return (
    <>
      <SEO title={a.seo?.title || a.title} description={a.seo?.description || a.excerpt} path={`/insights/${a.slug}`} type="article" jsonLd={jsonLd} />

      <section className="relative pt-[72px] overflow-hidden">
        <Aurora variant="soft" />
        <Container size="narrow" className="relative py-20 md:py-28">
          <Link to="/insights" className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-on-surface-variant hover:text-primary-container transition-colors">
            <Icon name="arrow-left" size={13} /> All insights
          </Link>
          <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.2em] text-outline flex flex-wrap items-center gap-3">
            <span>{formatDate(a.date)}</span>
            <span aria-hidden="true">·</span>
            <span>{a.readingTime}</span>
            <span aria-hidden="true">·</span>
            <span>{a.author}</span>
          </p>
          <h1 className="mt-6 font-display font-semibold text-display-lg text-on-surface max-w-4xl">{a.title}</h1>
          <p className="mt-6 text-on-surface-variant text-lg leading-relaxed max-w-2xl">{a.excerpt}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {a.tags?.map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </div>
        </Container>
      </section>

      <Section tone="low">
        <Container size="narrow" className="grid lg:grid-cols-12 gap-12">
          <aside className="lg:col-span-3 order-2 lg:order-1">
            {toc.length > 0 && (
              <nav className="lg:sticky lg:top-28" aria-label="On this page">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-outline mb-4">On this page</p>
                <ol className="flex flex-col gap-2.5">
                  {toc.map((h, i) => (
                    <li key={h.id}>
                      <a href={`#${h.id}`} className="flex gap-3 text-sm text-on-surface-variant hover:text-primary-container transition-colors">
                        <span className="font-mono text-[10px] text-primary-container pt-1">{String(i + 1).padStart(2, '0')}</span>
                        {h.text}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            )}
          </aside>
          <article className="lg:col-span-9 order-1 lg:order-2 max-w-3xl">
            <Blocks blocks={a.body} />
            <GlassCard className="mt-16" padding="p-6 md:p-8" lift={false}>
              <Eyebrow className="mb-3">Written by</Eyebrow>
              <p className="font-display text-xl text-on-surface">{founder.name}</p>
              <p className="text-on-surface-variant text-sm mt-1">{founder.role}, {site.name}</p>
              <p className="text-on-surface-variant text-sm leading-relaxed mt-4">{founder.bio[0]}</p>
              <div className="mt-5 flex gap-4">
                <Button to="/about" variant="link" icon="arrow-right">
                  About the team
                </Button>
                <Button to="/contact" variant="link" icon="arrow-up-right">
                  Work with us
                </Button>
              </div>
            </GlassCard>
          </article>
        </Container>
      </Section>

      <Section tone="base">
        <Container size="narrow">
          <Eyebrow className="mb-8">Read next</Eyebrow>
          <Reveal>
            <InsightCard item={next} />
          </Reveal>
        </Container>
      </Section>

      {/* Articles are the top of the funnel and previously ended in nothing.
          Capture, then ask. */}
      <LeadMagnet source={`Article: ${a.slug}`} />
      <CTASection
        eyebrow="Apply it"
        title="Want this run on your systems?"
        lede="Send us the version of this problem you actually have. We will tell you what we would do about it, and whether it is worth doing."
      />
    </>
  )
}

export default Component
