import { useParams, Link } from 'react-router-dom'
import SEO, { breadcrumb, ORG_ID } from '../components/SEO.jsx'
import CTASection from '../components/CTASection.jsx'
import Blocks from '../components/blocks/Blocks.jsx'
import NotFoundView from '../components/NotFoundView.jsx'
import WorkCard from '../components/cards/WorkCard.jsx'
import FactChips from '../components/FactChips.jsx'
import ArchitectureFlow from '../components/ArchitectureFlow.jsx'
import { coverSources } from '../lib/format.js'
import { Section, Container, Eyebrow, Tag, Icon, GlassCard } from '../components/ui/index.js'
import Reveal from '../effects/Reveal.jsx'
import SplitText from '../effects/SplitText.jsx'
import { work, workBySlug, featuredWork } from '../data/work.js'
import { solutionBySlug } from '../data/solutions.js'
import { testimonials } from '../data/testimonials.js'
import Aurora from '../components/Aurora.jsx'

export function Component() {
  const { slug } = useParams()
  const w = workBySlug[slug]
  if (!w || !w.body) return <NotFoundView />

  const detailed = featuredWork.filter((x) => x.body)
  const idx = detailed.findIndex((x) => x.slug === w.slug)
  const prev = detailed[(idx - 1 + detailed.length) % detailed.length]
  const next = detailed[(idx + 1) % detailed.length]
  const testimonial = w.testimonialId ? testimonials.find((t) => t.id === w.testimonialId) : null
  const cover = coverSources(w.image)
  const more = work.filter((x) => x.slug !== w.slug && x.category?.some((c) => w.category?.includes(c))).slice(0, 3)

  const jsonLd = [
    breadcrumb([{ name: 'Home', path: '/' }, { name: 'Work', path: '/work' }, { name: w.title, path: `/work/${w.slug}` }]),
    w.jsonLd || {
      '@type': 'CreativeWork',
      name: w.title,
      description: w.summary,
      author: { '@id': ORG_ID },
      about: w.industry,
      keywords: (w.tags || []).join(', '),
      url: `https://codecrafters.in/work/${w.slug}`,
    },
  ]

  return (
    <>
      <SEO
        title={w.title}
        description={w.challenge ? `${w.challenge} ${w.summary}`.slice(0, 158) : w.summary}
        path={`/work/${w.slug}`}
        type="article"
        image={w.image ? `https://codecrafters.in${w.image}` : undefined}
        jsonLd={jsonLd}
      />

      <section className="relative pt-[72px] overflow-hidden">
        <Aurora variant="soft" />
        <Container className="relative py-20 md:py-28">
          <Link to="/work" className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-on-surface-variant hover:text-primary-container transition-colors">
            <Icon name="arrow-left" size={13} /> All work
          </Link>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Eyebrow>{w.industry}</Eyebrow>
            {w.client === 'In-house product' && (
              <span className="bg-primary-container text-on-primary-container font-mono text-[9px] uppercase tracking-[0.2em] px-2 py-1">In-house product</span>
            )}
          </div>
          <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.2em] text-outline">{w.title}</p>
          <h1 className="mt-3 font-display font-semibold text-display-lg text-on-surface max-w-4xl">
            <SplitText text={w.challenge || w.title} immediate />
          </h1>
          {w.hardPart && (
            <div className="mt-7 flex items-start gap-3 rounded-xl bg-surface-container p-5 max-w-2xl shadow-edge">
              <Icon name="zap" size={18} className="mt-0.5 shrink-0 text-primary-container" />
              <p className="text-base leading-snug text-on-surface">
                <span className="font-semibold">The hard part:</span>{' '}
                <span className="text-on-surface-variant">{w.hardPart}</span>
              </p>
            </div>
          )}
          <p className="mt-6 text-on-surface-variant text-lg leading-relaxed max-w-2xl">{w.summary}</p>
          <FactChips item={w} max={6} tone="detail" className="mt-7" />
          <Reveal stagger={80} className="mt-12 flex flex-wrap gap-x-14 gap-y-8">
            {w.metrics?.map((m) => (
              <div key={m.label}>
                <p className="font-display text-4xl md:text-5xl text-primary-container tracking-tightest leading-none">{m.value}</p>
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-on-surface-variant mt-3">{m.label}</p>
              </div>
            ))}
          </Reveal>
        </Container>
      </section>

      {cover && (
        <Container className="relative">
          <figure className="relative overflow-hidden rounded-xl shadow-edge">
            <div className="relative aspect-[21/9] bg-surface-container-lowest">
              <img
                src={cover.jpg}
                srcSet={cover.webp}
                sizes="(min-width: 1280px) 1200px, 100vw"
                alt={`${w.title} — ${w.industry}`}
                width="1280"
                height="800"
                loading="eager"
                fetchPriority="high"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest/80 via-transparent to-transparent"
                aria-hidden="true"
              />
            </div>
            {w.imageCredit && (
              <figcaption className="mt-3 font-mono text-[10px] uppercase tracking-[0.18em] text-outline">
                Photo: {w.imageCredit}
              </figcaption>
            )}
          </figure>
        </Container>
      )}

      {w.flow && (
        <Container className="relative mt-16">
          <ArchitectureFlow flow={w.flow} />
        </Container>
      )}

      <Section tone="low">
        <Container className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          <aside className="lg:col-span-4 lg:order-2">
            <div className="lg:sticky lg:top-28 flex flex-col gap-4">
              <GlassCard padding="p-6" lift={false}>
                <dl className="flex flex-col gap-5 text-sm">
                  <div>
                    <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-outline">Client</dt>
                    <dd className="text-on-surface mt-1">{w.client}</dd>
                  </div>
                  {w.year && (
                    <div>
                      <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-outline">Year</dt>
                      <dd className="text-on-surface mt-1">{w.year}</dd>
                    </div>
                  )}
                  {w.services?.length > 0 && (
                    <div>
                      <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-outline">Solutions</dt>
                      <dd className="mt-2 flex flex-wrap gap-2">
                        {w.services.map((s) => {
                          const sol = solutionBySlug[s]
                          return sol ? (
                            <Link key={s} to={`/solutions/${s}`} className="text-on-surface hover:text-primary-container transition-colors text-sm underline-offset-4 hover:underline">
                              {sol.title}
                            </Link>
                          ) : null
                        })}
                      </dd>
                    </div>
                  )}
                  <div>
                    <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-outline">Stack</dt>
                    <dd className="mt-2 flex flex-wrap gap-2">
                      {(w.stack || w.tags || []).map((t) => (
                        <Tag key={t}>{t}</Tag>
                      ))}
                    </dd>
                  </div>
                </dl>
              </GlassCard>
              {testimonial && (
                <GlassCard padding="p-6" lift={false}>
                  <Icon name="quote" size={16} className="text-primary-container" />
                  <p className="text-on-surface text-sm leading-relaxed mt-3">“{testimonial.quote}”</p>
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-on-surface-variant mt-4">
                    {testimonial.name} · {testimonial.title}
                  </p>
                </GlassCard>
              )}
              <Link to="/contact" className="glass-card rounded-lg p-6 hover:shadow-edge-strong transition">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary-container">Similar build?</p>
                <p className="text-on-surface text-sm mt-2 flex items-center gap-2">
                  Book a free diagnostic <Icon name="arrow-right" size={14} />
                </p>
              </Link>
            </div>
          </aside>
          <article className="lg:col-span-8 lg:order-1 max-w-3xl">
            {w.problem && (
              <Reveal>
                <h2 className="font-display text-display-sm text-on-surface">The problem</h2>
                <p className="text-on-surface-variant text-base leading-[1.8] mt-4">{w.problem}</p>
              </Reveal>
            )}
            {w.approach && (
              <Reveal className="mt-12">
                <h2 className="font-display text-display-sm text-on-surface">The approach</h2>
                <p className="text-on-surface-variant text-base leading-[1.8] mt-4">{w.approach}</p>
              </Reveal>
            )}
            {w.outcome && (
              <Reveal className="mt-12">
                <h2 className="font-display text-display-sm text-on-surface">The outcome</h2>
                <p className="text-on-surface-variant text-base leading-[1.8] mt-4">{w.outcome}</p>
              </Reveal>
            )}
            <div className="mt-6">
              <Blocks blocks={w.body} />
            </div>
          </article>
        </Container>
      </Section>

      <Section tone="base" padded={false} className="py-8">
        <Container className="flex items-center justify-between gap-6">
          <Link to={`/work/${prev.slug}`} className="group inline-flex items-center gap-3 text-on-surface-variant hover:text-primary-container transition-colors max-w-[45%]">
            <Icon name="arrow-left" size={18} className="shrink-0 transition-transform group-hover:-translate-x-1" />
            <span className="font-display text-sm md:text-lg leading-snug">{prev.title}</span>
          </Link>
          <Link to={`/work/${next.slug}`} className="group inline-flex items-center gap-3 text-on-surface-variant hover:text-primary-container transition-colors text-right max-w-[45%]">
            <span className="font-display text-sm md:text-lg leading-snug">{next.title}</span>
            <Icon name="arrow-right" size={18} className="shrink-0 transition-transform group-hover:translate-x-1" />
          </Link>
        </Container>
      </Section>

      {more.length > 0 && (
        <Section tone="lowest">
          <Container>
            <Eyebrow className="mb-8">More like this</Eyebrow>
            <Reveal stagger={100} className="grid md:grid-cols-3 gap-5">
              {more.map((m, i) => (
                <WorkCard key={m.slug} item={m} index={i} />
              ))}
            </Reveal>
          </Container>
        </Section>
      )}

      <CTASection title="Discuss a similar build." lede="Tell us what your version of this problem looks like. The first 45 minutes are free and specific." />
    </>
  )
}

export default Component
