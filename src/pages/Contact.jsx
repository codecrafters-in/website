import { useState } from 'react'
import { toast } from 'sonner'
import SEO, { breadcrumb, faqNode, ORG_ID } from '../components/SEO.jsx'
import { Section, Container, Eyebrow, Heading, Button, GlassCard, Icon, FloatingField, Accordion } from '../components/ui/index.js'
import Reveal from '../effects/Reveal.jsx'
import SplitText from '../effects/SplitText.jsx'
import useCopyToClipboard from '../hooks/useCopyToClipboard.js'
import { site } from '../data/site.js'
import { track } from '../lib/analytics.js'
import { getAttribution } from '../lib/attribution.js'
import { whatsappUrl } from '../components/BookingFloat.jsx'
import { solutions } from '../data/solutions.js'
import { faqByScope } from '../data/faq.js'
import KeyPoints from '../components/KeyPoints.jsx'
import { keyPoints } from '../data/keyPoints.js'
import Aurora from '../components/Aurora.jsx'

const BUDGETS = ['Under $25K', '$25K – $50K', '$50K – $100K', '$100K+', 'Not sure yet']

export function Component() {
  const [state, setState] = useState('idle')
  const [copied, copy] = useCopyToClipboard()
  const [started, setStarted] = useState(false)
  const faqs = faqByScope('contact').slice(0, 6)
  const wa = whatsappUrl('/contact')

  // Fires once, on the first field the visitor touches — gives a form-start vs
  // form-submit funnel so abandonment is measurable.
  const onFirstInput = () => {
    if (started) return
    setStarted(true)
    track('contact_form_start')
  }

  const submit = async (e) => {
    e.preventDefault()
    if (state === 'loading') return
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form).entries())
    setState('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, ...getAttribution() }),
      })
      if (!res.ok) throw new Error()
      setState('done')
      track('contact_form_submit', { budget: data.budget || 'unspecified', interest: data.interest || 'unspecified' })
      // Virtual pageview so Ads/GA4 can use a conversion "page" without the
      // UX cost of navigating away from the in-page success state.
      track('virtual_pageview', { page_path: '/thank-you', page_title: 'Enquiry received' })
      toast.success('Transmission received. We reply within 4 business hours.')
    } catch {
      setState('idle')
      toast.error(`Could not send. Email us directly at ${site.email}.`)
    }
  }

  const jsonLd = [
    breadcrumb([{ name: 'Home', path: '/' }, { name: 'Contact', path: '/contact' }]),
    { '@type': 'ContactPage', name: 'Contact CodeCrafters', url: `${site.url}/contact`, about: { '@id': ORG_ID } },
    faqs.length ? faqNode(faqs) : null,
  ]

  return (
    <>
      <SEO
        title="Contact — Book a Free 45-Minute Diagnostic"
        description={`Tell us your biggest bottleneck. We map it, estimate the ROI and tell you honestly whether AI belongs there. ${site.responseTime.toLowerCase()} response.`}
        path="/contact"
        jsonLd={jsonLd}
      />

      <section className="relative pt-[72px] overflow-hidden">
        <Aurora variant="soft" />
        <Container className="relative py-20 md:py-28 grid lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left */}
          <div className="lg:col-span-5">
            <Eyebrow className="mb-7">Free 45-min diagnostic</Eyebrow>
            <h1 className="font-display font-semibold text-display-lg text-on-surface">
              <SplitText text="Let's find your" immediate />
              <br />
              <span className="molten-text">
                <SplitText text="biggest win." immediate delay={0.2} />
              </span>
            </h1>
            <p className="mt-7 text-on-surface-variant text-lg leading-relaxed">
              One call. We map your most expensive bottleneck, estimate what fixing it is worth, and tell you honestly whether AI belongs there. If it does not, we will say so.
            </p>

            <div className="mt-10 flex flex-col gap-3">
              {wa && (
                <a
                  href={wa}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => track('whatsapp_click', { location: 'contact' })}
                  className="bg-molten text-on-primary rounded-lg p-5 flex items-center justify-between shadow-molten hover:brightness-110 transition"
                >
                  <span>
                    <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-on-primary/70">Fastest route</span>
                    <span className="block font-bold text-base mt-1">Message us on WhatsApp</span>
                  </span>
                  <Icon name="message-circle" size={22} />
                </a>
              )}
              <button
                type="button"
                onClick={() => {
                  copy(site.email)
                  track('email_copy', { location: 'contact' })
                }}
                className="group glass-card rounded-lg p-5 flex items-center justify-between text-left hover:shadow-edge-strong transition"
              >
                <span>
                  <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-outline">Email</span>
                  <span className="block text-on-surface text-base mt-1">{site.email}</span>
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-primary-container inline-flex items-center gap-1.5">
                  {copied ? <Icon name="check" size={14} /> : <Icon name="copy" size={14} />}
                  {copied ? 'Copied' : 'Copy'}
                </span>
              </button>
              <div className="grid grid-cols-2 gap-3">
                <GlassCard padding="p-5" lift={false}>
                  <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-outline">Response</span>
                  <span className="block text-on-surface text-sm mt-1">{site.responseTime}</span>
                </GlassCard>
                <GlassCard padding="p-5" lift={false}>
                  <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-outline">Based in</span>
                  <span className="block text-on-surface text-sm mt-1">{site.location.label} · IST</span>
                </GlassCard>
              </div>
              {site.calUrl && (
                <a
                  href={site.calUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => track('booking_click', { location: 'contact' })}
                  className="glass-card rounded-lg p-5 flex items-center justify-between hover:shadow-edge-strong transition"
                >
                  <span>
                    <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-outline">Prefer a calendar?</span>
                    <span className="block text-on-surface text-base mt-1">Book a 45-minute slot directly</span>
                  </span>
                  <Icon name="calendar" size={20} className="text-primary-container" />
                </a>
              )}
            </div>

            <p className="mt-8 inline-flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-on-surface-variant">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-container opacity-60" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-container" />
              </span>
              {site.availability.label} · {site.availability.period}
            </p>
            <p className="mt-2 text-on-surface-variant text-xs">{site.availability.note}.</p>
          </div>

          {/* Right: form */}
          <div className="lg:col-span-7">
            <Reveal delay={100}>
              <div className="glass-card rounded-lg p-6 md:p-10">
                {state === 'done' ? (
                  <div className="text-center py-16">
                    <Icon name="circle-check" size={40} className="text-primary-container mx-auto" />
                    <Heading as="p" size="sm" className="mt-6">
                      Transmission received.
                    </Heading>
                    <p className="text-on-surface-variant mt-3 max-w-sm mx-auto">We read every message ourselves and reply within four business hours. Talk soon.</p>
                    <Button to="/work" variant="link" icon="arrow-right" className="mt-8">
                      Browse the work meanwhile
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={submit} onFocusCapture={onFirstInput} className="flex flex-col gap-5" noValidate={false}>
                    <div className="grid sm:grid-cols-2 gap-5">
                      <FloatingField id="name" name="name" label="Your name" required autoComplete="name" />
                      <FloatingField id="email" name="email" type="email" label="Work email" required autoComplete="email" />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-5">
                      <FloatingField id="company" name="company" label="Company" autoComplete="organization" />
                      <FloatingField id="budget" name="budget" as="select" label="Budget" options={['', ...BUDGETS].map((b) => ({ value: b, label: b || 'Select a range' }))} defaultValue="" />
                    </div>
                    <FloatingField
                      id="interest"
                      name="interest"
                      as="select"
                      label="What are you exploring?"
                      defaultValue=""
                      options={[{ value: '', label: 'Pick one (or leave blank)' }, ...solutions.map((s) => ({ value: s.title, label: s.title })), { value: 'Something else', label: 'Something else' }]}
                    />
                    <FloatingField id="message" name="message" as="textarea" label="What is slowing you down?" required rows={5} />
                    <input type="text" name="botcheck" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                      <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-outline max-w-xs">
                        NDA available on request. Nothing you write here is used for marketing.
                      </p>
                      <Button as="button" type="submit" size="lg" disabled={state === 'loading'} icon={state === 'loading' ? null : 'arrow-right'}>
                        {state === 'loading' ? 'Sending…' : 'Send it'}
                      </Button>
                    </div>
                  </form>
                )}
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <KeyPoints items={keyPoints.contact} />

      <Section tone="low">
        <Container className="grid lg:grid-cols-3 gap-10 lg:gap-16">
          <Reveal>
            <Eyebrow className="mb-5">Before you write</Eyebrow>
            <Heading size="md">The things people ask first.</Heading>
          </Reveal>
          <Reveal className="lg:col-span-2" delay={80}>
            <Accordion items={faqs} defaultOpen={0} />
          </Reveal>
        </Container>
      </Section>
    </>
  )
}

export default Component
