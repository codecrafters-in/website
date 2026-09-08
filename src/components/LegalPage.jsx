import SEO, { breadcrumb } from './SEO.jsx'
import { Section, Container, Eyebrow, Heading } from './ui/index.js'
import { LAST_UPDATED } from '../pages/legalContent.js'

export default function LegalPage({ title, description, path, sections }) {
  return (
    <>
      <SEO title={title} description={description} path={path} jsonLd={[breadcrumb([{ name: 'Home', path: '/' }, { name: title, path }])]} />
      <section className="relative pt-[72px] overflow-hidden">
        <Container size="prose" className="relative py-20 md:py-28">
          <Eyebrow className="mb-6">Legal</Eyebrow>
          <Heading as="h1" size="lg">
            {title}
          </Heading>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-outline mt-6">Last updated · {LAST_UPDATED}</p>
        </Container>
      </section>
      <Section tone="low">
        <Container size="prose">
          <div className="flex flex-col gap-10">
            {sections.map((s) => (
              <section key={s.title}>
                <h2 className="font-display text-lg md:text-xl text-on-surface mb-3">{s.title}</h2>
                <p className="text-on-surface-variant text-sm md:text-base leading-[1.8]">{s.body}</p>
              </section>
            ))}
          </div>
        </Container>
      </Section>
    </>
  )
}
