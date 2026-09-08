import Section from './ui/Section.jsx'
import Container from './ui/Container.jsx'
import Accordion from './ui/Accordion.jsx'
import SectionHeader from './SectionHeader.jsx'
import Reveal from '../effects/Reveal.jsx'

export default function FAQ({ items, title = 'Questions we get on the first call.', eyebrow = 'FAQ', tone = 'low', id = 'faq' }) {
  if (!items?.length) return null
  return (
    <Section id={id} tone={tone} className="scroll-mt-20">
      <Container className="grid lg:grid-cols-3 gap-10 lg:gap-16">
        <SectionHeader eyebrow={eyebrow} title={title} size="md" />
        <Reveal className="lg:col-span-2">
          <Accordion items={items} defaultOpen={0} />
        </Reveal>
      </Container>
    </Section>
  )
}
