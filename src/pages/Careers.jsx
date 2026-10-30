import { Link } from 'react-router-dom'
import SEO, { breadcrumb } from '../components/SEO.jsx'
import { Section, Container, Eyebrow, Heading, GlassCard, Icon, Tag } from '../components/ui/index.js'
import Reveal from '../effects/Reveal.jsx'
import SplitText from '../effects/SplitText.jsx'
import Aurora from '../components/Aurora.jsx'
import { careers } from '../data/careers.js'
import { site } from '../data/site.js'

const PERKS = [
  { icon: 'cpu', title: 'Real AI in production', body: 'Agents, RAG and LLM pipelines that run inside real businesses — not demos.' },
  { icon: 'users', title: 'Senior people around you', body: 'Code review, pairing and direct feedback from engineers who have shipped it before.' },
  { icon: 'briefcase', title: 'Ownership end to end', body: 'Take a feature from the requirement to production, and see who it helps.' },
]

export function Component() {
  return (
    <>
      <SEO
        title="Careers — Build AI Products With Us"
        description={`Open roles at ${site.name}. Join a small, senior team building ERP systems and AI products in ${site.location.label}.`}
        path="/careers"
        jsonLd={[breadcrumb([{ name: 'Home', path: '/' }, { name: 'Careers', path: '/careers' }])]}
      />

      <section className="relative pt-[72px] overflow-hidden">
        <Aurora variant="soft" />
        <Container className="relative py-24 md:py-32">
          <Eyebrow className="mb-7">Careers</Eyebrow>
          <h1 className="font-display font-semibold text-display-xl text-on-surface max-w-4xl">
            <SplitText text="Build things" immediate />
            <br />
            <span className="molten-text">
              <SplitText text="that actually ship." immediate delay={0.2} />
            </span>
          </h1>
          <p className="mt-7 text-on-surface-variant text-lg leading-relaxed max-w-2xl">
            We are a small team building ERP systems and AI products for real businesses. If you care about the problem as much as the code, we would like to hear from you.
          </p>
        </Container>
      </section>

      <Section tone="low">
        <Container>
          <div className="flex items-end justify-between gap-6 flex-wrap">
            <div>
              <Eyebrow className="mb-5">Open roles</Eyebrow>
              <Heading size="md">{careers.length} {careers.length === 1 ? 'opening' : 'openings'} right now.</Heading>
            </div>
          </div>
          <Reveal stagger={80} className="mt-10 flex flex-col gap-4">
            {careers.map((job) => (
              <Link
                key={job.slug}
                to={`/careers/${job.slug}`}
                className="group glass-card rounded-lg p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-6 justify-between hover:shadow-edge-strong transition"
              >
                <div className="max-w-2xl">
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-outline">{job.team}</p>
                  <h2 className="font-display text-2xl text-on-surface mt-2 group-hover:text-primary transition-colors">{job.title}</h2>
                  <p className="text-on-surface-variant text-sm leading-relaxed mt-3">{job.summary}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    <Tag>{job.experience}</Tag>
                    <Tag>{job.type}</Tag>
                    <Tag>{job.location}</Tag>
                  </div>
                </div>
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary-container shrink-0">
                  View role & apply <Icon name="arrow-right" size={16} />
                </span>
              </Link>
            ))}
          </Reveal>
        </Container>
      </Section>

      <Section tone="base">
        <Container>
          <Eyebrow className="mb-5">Why join</Eyebrow>
          <Heading size="md">Small team. Real work.</Heading>
          <Reveal stagger={80} className="mt-10 grid md:grid-cols-3 gap-4">
            {PERKS.map((p) => (
              <GlassCard key={p.title} padding="p-6" lift={false}>
                <span className="text-primary-container">
                  <Icon name={p.icon} size={20} />
                </span>
                <h3 className="font-display text-lg text-on-surface mt-4">{p.title}</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed mt-2">{p.body}</p>
              </GlassCard>
            ))}
          </Reveal>
          <p className="mt-10 text-on-surface-variant text-sm">
            No role that fits? Write to{' '}
            <a href={`mailto:${site.email}`} className="text-primary-container hover:text-primary underline underline-offset-4">
              {site.email}
            </a>{' '}
            with what you have built.
          </p>
        </Container>
      </Section>

    </>
  )
}

export default Component
