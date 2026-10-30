import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { toast } from 'sonner'
import SEO, { breadcrumb, ORG_ID } from '../components/SEO.jsx'
import NotFoundView from '../components/NotFoundView.jsx'
import { Section, Container, Eyebrow, Heading, Button, Icon, Tag, FloatingField } from '../components/ui/index.js'
import Reveal from '../effects/Reveal.jsx'
import SplitText from '../effects/SplitText.jsx'
import Aurora from '../components/Aurora.jsx'
import { careerBySlug } from '../data/careers.js'
import { site } from '../data/site.js'
import { track } from '../lib/analytics.js'

// Must stay in step with api/apply.js — the function rejects anything larger.
const MAX_RESUME_BYTES = 3 * 1024 * 1024
const RESUME_TYPES = '.pdf,.doc,.docx'

const readAsBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result).split(',')[1] || '')
    reader.onerror = () => reject(reader.error)
    reader.readAsDataURL(file)
  })

function List({ items }) {
  return (
    <ul className="flex flex-col gap-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-on-surface-variant leading-relaxed">
          <Icon name="circle-check" size={17} className="text-primary-container mt-1 shrink-0" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

function ApplyForm({ job }) {
  const [state, setState] = useState('idle')
  const [fileName, setFileName] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    if (state === 'loading') return
    const form = e.currentTarget
    const fd = new FormData(form)
    const resume = fd.get('resume')
    fd.delete('resume')
    const data = Object.fromEntries(fd.entries())

    if (!resume || typeof resume === 'string' || !resume.size) {
      toast.error('Please attach your resume.')
      return
    }
    if (resume.size > MAX_RESUME_BYTES) {
      toast.error('Resume must be 3 MB or smaller.')
      return
    }

    setState('loading')
    try {
      const res = await fetch('/api/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          role: job.title,
          resume: { name: resume.name, type: resume.type, content: await readAsBase64(resume) },
        }),
      })
      if (!res.ok) throw new Error()
      setState('done')
      track('job_apply_submit', { role: job.slug })
    } catch {
      setState('idle')
      toast.error(`Could not send. Email your resume to ${site.email}.`)
    }
  }

  if (state === 'done') {
    return (
      <div className="text-center py-16">
        <Icon name="circle-check" size={40} className="text-primary-container mx-auto" />
        <Heading as="p" size="sm" className="mt-6">
          Application received.
        </Heading>
        <p className="text-on-surface-variant mt-3 max-w-sm mx-auto">
          Thanks for applying. We read every application ourselves and will get back to you if there is a fit.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <FloatingField id="name" name="name" label="Full name" required autoComplete="name" />
        <FloatingField id="email" name="email" type="email" label="Email" required autoComplete="email" />
      </div>
      <div className="grid sm:grid-cols-2 gap-5">
        <FloatingField id="phone" name="phone" type="tel" label="Phone" required autoComplete="tel" />
        <FloatingField id="location" name="location" label="Current city" autoComplete="address-level2" />
      </div>
      <div className="grid sm:grid-cols-2 gap-5">
        <FloatingField id="experience" name="experience" label="Years of experience" required />
        <FloatingField id="notice" name="notice" label="Notice period" />
      </div>
      <div className="grid sm:grid-cols-2 gap-5">
        <FloatingField id="linkedin" name="linkedin" type="url" label="LinkedIn URL" />
        <FloatingField id="portfolio" name="portfolio" type="url" label="GitHub / portfolio URL" />
      </div>
      <FloatingField
        id="message"
        name="message"
        as="textarea"
        label="Tell us about something you built"
        required
        rows={5}
      />
      <label htmlFor="resume" className="glass-card rounded-lg p-5 flex items-center justify-between gap-4 cursor-pointer hover:shadow-edge-strong transition">
        <span className="min-w-0">
          <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-outline">Resume * · PDF or Word, max 3 MB</span>
          <span className="block text-on-surface text-sm mt-1 truncate">{fileName || 'Choose a file'}</span>
        </span>
        <Icon name="file-text" size={20} className="text-primary-container shrink-0" />
        <input
          id="resume"
          name="resume"
          type="file"
          accept={RESUME_TYPES}
          required
          className="sr-only"
          onChange={(e) => setFileName(e.target.files?.[0]?.name || '')}
        />
      </label>
      <input type="text" name="botcheck" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
        <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-outline max-w-xs">
          Your details are used only to assess this application.
        </p>
        <Button as="button" type="submit" size="lg" disabled={state === 'loading'} icon={state === 'loading' ? null : 'arrow-right'}>
          {state === 'loading' ? 'Sending…' : 'Submit application'}
        </Button>
      </div>
    </form>
  )
}

export function Component() {
  const { slug } = useParams()
  const job = careerBySlug[slug]
  if (!job) return <NotFoundView />

  const jsonLd = [
    breadcrumb([
      { name: 'Home', path: '/' },
      { name: 'Careers', path: '/careers' },
      { name: job.title, path: `/careers/${job.slug}` },
    ]),
    {
      '@type': 'JobPosting',
      title: job.title,
      description: [...job.about, ...job.required].join(' '),
      datePosted: job.posted,
      employmentType: 'FULL_TIME',
      hiringOrganization: { '@id': ORG_ID },
      jobLocation: {
        '@type': 'Place',
        address: {
          '@type': 'PostalAddress',
          addressLocality: site.location.city,
          addressRegion: site.location.region,
          addressCountry: site.location.country,
        },
      },
    },
  ]

  return (
    <>
      <SEO title={`${job.title} — Careers`} description={job.summary} path={`/careers/${job.slug}`} jsonLd={jsonLd} />

      <section className="relative pt-[72px] overflow-hidden">
        <Aurora variant="soft" />
        <Container className="relative py-24 md:py-28">
          <Link to="/careers" className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-on-surface-variant hover:text-primary-container transition-colors">
            <Icon name="arrow-left" size={13} /> All openings
          </Link>
          <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.25em] text-outline">{job.team}</p>
          <h1 className="mt-5 font-display font-semibold text-display-lg text-on-surface max-w-4xl">
            <SplitText text={job.title} immediate />
          </h1>
          <div className="mt-8 flex flex-wrap gap-2">
            <Tag>Experience · {job.experience}</Tag>
            <Tag>{job.type}</Tag>
            <Tag>{job.location}</Tag>
          </div>
          <div className="mt-10">
            <Button href="#apply" size="lg">Apply now</Button>
          </div>
        </Container>
      </section>

      <Section tone="low">
        <Container className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-7 flex flex-col gap-14">
            <Reveal>
              <Eyebrow className="mb-5">About the role</Eyebrow>
              <div className="flex flex-col gap-4 text-on-surface-variant text-lg leading-relaxed">
                {job.about.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </Reveal>

            <Reveal>
              <Eyebrow className="mb-5">Key responsibilities</Eyebrow>
              <div className="flex flex-col gap-10">
                {job.responsibilities.map((group) => (
                  <div key={group.title}>
                    <h2 className="font-display text-xl text-on-surface mb-4">{group.title}</h2>
                    <List items={group.items} />
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal>
              <Eyebrow className="mb-5">Required skills</Eyebrow>
              <List items={job.required} />
            </Reveal>

            <Reveal>
              <Eyebrow className="mb-5">Good to have</Eyebrow>
              <List items={job.niceToHave} />
            </Reveal>

            <Reveal>
              <Eyebrow className="mb-5">What we are looking for</Eyebrow>
              <List items={job.lookingFor} />
              <p className="mt-8 glass-card rounded-lg p-5 text-on-surface font-semibold leading-relaxed">{job.note}</p>
            </Reveal>
          </div>

          <aside id="apply" className="lg:col-span-5 scroll-mt-28">
            <div className="lg:sticky lg:top-28 glass-card rounded-lg p-6 md:p-8">
              <Eyebrow className="mb-3">Apply</Eyebrow>
              <Heading as="h2" size="sm" className="mb-6">
                Send us your application.
              </Heading>
              <ApplyForm job={job} />
            </div>
          </aside>
        </Container>
      </Section>
    </>
  )
}

export default Component
