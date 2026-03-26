import { motion } from 'framer-motion'
import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import SEO from '../components/SEO'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}
const stagger = { visible: { transition: { staggerChildren: 0.1 } } }

const CAL_URL = import.meta.env.VITE_CAL_URL || 'https://cal.com'

export default function Contact() {
  const formRef = useRef(null)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (formRef.current.botcheck.checked) return
    setLoading(true)
    try {
      const form = formRef.current
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.user_name.value,
          email: form.user_email.value,
          company: form.company.value,
          budget: form.budget.value,
          message: form.message.value,
          botcheck: form.botcheck.checked,
        }),
      })
      if (!res.ok) throw new Error()
      setSubmitted(true)
      toast.success('Message sent! We\'ll be in touch within 4 hours.')
    } catch {
      toast.error('Something went wrong. Please email us directly at hello@codecrafters.in')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <SEO
        title="Contact — Book a Free Technical Audit"
        description="Tell us about your biggest operational bottleneck. We'll respond within 24 hours with a tailored assessment — no sales pitch, no fluff."
        path="/contact"
      />
    <main className="min-h-screen pt-24 pb-16 relative overflow-hidden technical-grid">
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary-container/5 rounded-full blur-[128px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-primary-container/5 rounded-full blur-[128px] pointer-events-none" />

      <section className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 xl:px-14 relative z-10">
        <motion.div className="grid grid-cols-1 lg:grid-cols-3 gap-12 md:gap-16 items-start" variants={stagger} initial="hidden" animate="visible">

          {/* ── Left: Info ── */}
          <motion.div variants={stagger} className="lg:col-span-1 space-y-10">
            <div>
              <motion.span variants={fadeUp} className="inline-block py-1 px-3 border border-[#4e4633]/30 text-primary-container text-[10px] tracking-[0.2em] uppercase font-bold mb-6">
                Free 45-Min Audit
              </motion.span>
              <motion.h1 variants={fadeUp} className="text-5xl font-black tracking-tighter text-on-surface leading-[0.9] mb-5">
                Let's Find Your<br /><span className="text-primary-container">Biggest Win.</span>
              </motion.h1>
              <motion.p variants={fadeUp} className="text-on-surface-variant leading-relaxed text-base">
                Tell us about your business and current setup. We'll identify your highest-ROI automation opportunity — free, with no commitment.
              </motion.p>
            </div>

            {/* Contact Info */}
            <motion.div variants={stagger} className="space-y-6">
              {[
                { icon: 'mail', title: 'Email Us', value: 'hello@codecrafters.in', href: 'mailto:hello@codecrafters.in' },
                { icon: 'location_on', title: 'Headquarters', value: 'India', href: null },
                { icon: 'schedule', title: 'Response Time', value: 'Within 4 business hours', href: null },
              ].map((item) => (
                <motion.div key={item.title} variants={fadeUp} className="flex items-start gap-4 group">
                  <div className="mt-0.5 flex items-center justify-center w-9 h-9 border border-[#4e4633]/20 group-hover:border-[#f5c518]/40 transition-colors shrink-0">
                    <span className="material-symbols-outlined text-primary-container text-sm">{item.icon}</span>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-widest text-on-surface">{item.title}</h4>
                    {item.href ? (
                      <a href={item.href} className="text-sm text-on-surface-variant font-mono hover:text-primary-container transition-colors">{item.value}</a>
                    ) : (
                      <p className="text-sm text-on-surface-variant font-mono">{item.value}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Cal.com direct booking */}
            <motion.div variants={fadeUp}>
              <p className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold mb-3">Prefer to book directly?</p>
              <a
                href={CAL_URL}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 w-full border border-[#F5C518]/30 bg-[#F5C518]/5 hover:bg-[#F5C518]/10 hover:border-[#F5C518]/60 transition-all p-4 group"
              >
                <span className="material-symbols-outlined text-primary-container text-xl">calendar_month</span>
                <div>
                  <p className="text-sm font-bold text-on-surface">Book on Cal.com</p>
                  <p className="text-[10px] text-on-surface-variant">Pick a time that works for you</p>
                </div>
                <span className="material-symbols-outlined text-[#4e4633] group-hover:text-primary-container transition-colors ml-auto">arrow_outward</span>
              </a>
            </motion.div>

            {/* Quick links */}
            <motion.div variants={fadeUp} className="space-y-2">
              <p className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold mb-3">Or explore first:</p>
              {[
                { label: 'View Case Studies', to: '/portfolio' },
                { label: 'AI Forge Services', to: '/ai-forge' },
                { label: 'Odoo Solutions', to: '/odoo-solutions' },
              ].map((l) => (
                <Link key={l.to} to={l.to} className="flex items-center gap-2 text-sm text-on-surface-variant hover:text-primary-container transition-colors group">
                  <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">chevron_right</span>
                  {l.label}
                </Link>
              ))}
            </motion.div>

            {/* Status */}
            <motion.div variants={fadeUp} className="p-5 bg-surface-container-low glass-edge border border-[#4e4633]/10">
              <h5 className="text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant mb-3">Availability</h5>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-primary-container animate-pulse shadow-[0_0_8px_#f5c518]" />
                <span className="text-xs font-mono text-on-surface">ACCEPTING NEW CLIENTS // Q2 2026</span>
              </div>
              <p className="text-on-surface-variant text-[10px] mt-2">Limited to 3 new enterprise engagements per quarter to maintain quality.</p>
            </motion.div>
          </motion.div>

          {/* ── Right: Form ── */}
          <motion.div variants={fadeUp} className="lg:col-span-2">
            <div className="bg-[#3a3939]/80 backdrop-blur-[24px] p-8 md:p-12 lg:p-14 glass-edge border border-[#4e4633]/20 relative">
              <div className="absolute top-0 right-0 p-4 font-mono text-[10px] text-[#4e4633] select-none">CC-FORM-882-TR</div>

              {submitted ? (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="py-16 text-center space-y-6">
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: 'spring' }}>
                    <span className="material-symbols-outlined text-primary-container text-6xl" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  </motion.div>
                  <h3 className="text-3xl font-black text-on-surface uppercase tracking-tighter">Transmission Received.</h3>
                  <p className="text-on-surface-variant max-w-sm mx-auto">We'll review your submission and reach out within 4 business hours to schedule your free audit call.</p>
                  <a href={CAL_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-primary-container text-sm font-bold hover:underline">
                    <span className="material-symbols-outlined text-sm">calendar_month</span>
                    Or book a time directly on Cal.com
                  </a>
                  <div className="pt-4 space-y-3">
                    <p className="text-on-surface-variant text-xs uppercase tracking-widest">While you wait, explore:</p>
                    <div className="flex flex-wrap justify-center gap-3">
                      <Link to="/portfolio"><button className="border border-[#4e4633]/40 text-on-surface text-xs px-5 py-2.5 uppercase tracking-widest hover:bg-surface-container-high transition-all">Case Studies</button></Link>
                      <Link to="/ai-forge"><button className="border border-[#4e4633]/40 text-on-surface text-xs px-5 py-2.5 uppercase tracking-widest hover:bg-surface-container-high transition-all">AI Forge</button></Link>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-8">
                  {/* Honeypot — hidden from humans, catches bots */}
                  <input type="checkbox" name="botcheck" style={{ display: 'none' }} tabIndex={-1} />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2 group">
                      <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant group-focus-within:text-primary-container transition-colors">Your Name *</label>
                      <input required type="text" name="user_name" placeholder="FULL NAME" className="w-full bg-surface-container-lowest border-0 border-b border-[#9a9078]/30 focus:border-primary-container text-on-surface placeholder:text-[#4e4633]/50 py-3 font-mono text-sm outline-none transition-colors" />
                    </div>
                    <div className="space-y-2 group">
                      <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant group-focus-within:text-primary-container transition-colors">Work Email *</label>
                      <input required type="email" name="user_email" placeholder="EMAIL@COMPANY.COM" className="w-full bg-surface-container-lowest border-0 border-b border-[#9a9078]/30 focus:border-primary-container text-on-surface placeholder:text-[#4e4633]/50 py-3 font-mono text-sm outline-none transition-colors" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2 group">
                      <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant group-focus-within:text-primary-container transition-colors">Company</label>
                      <input type="text" name="company" placeholder="COMPANY NAME" className="w-full bg-surface-container-lowest border-0 border-b border-[#9a9078]/30 focus:border-primary-container text-on-surface placeholder:text-[#4e4633]/50 py-3 font-mono text-sm outline-none transition-colors" />
                    </div>
                    <div className="space-y-2 group">
                      <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant group-focus-within:text-primary-container transition-colors">Budget Range</label>
                      <select name="budget" className="w-full bg-surface-container-lowest border-0 border-b border-[#9a9078]/30 focus:border-primary-container text-on-surface py-3 font-mono text-sm outline-none transition-colors appearance-none cursor-pointer">
                        <option value="" className="bg-[#1c1b1b]">SELECT RANGE</option>
                        <option value="Under $25K" className="bg-[#1c1b1b]">Under $25K</option>
                        <option value="$25K – $50K" className="bg-[#1c1b1b]">$25K – $50K</option>
                        <option value="$50K – $100K" className="bg-[#1c1b1b]">$50K – $100K</option>
                        <option value="$100K+" className="bg-[#1c1b1b]">$100K+</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2 group">
                    <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant group-focus-within:text-primary-container transition-colors">What Are You Trying to Solve? *</label>
                    <textarea required name="message" placeholder="DESCRIBE YOUR CURRENT SETUP, BIGGEST BOTTLENECKS, AND WHAT SUCCESS LOOKS LIKE..." rows={4} className="w-full bg-surface-container-lowest border-0 border-b border-[#9a9078]/30 focus:border-primary-container text-on-surface placeholder:text-[#4e4633]/50 py-3 font-mono text-sm resize-none outline-none transition-colors" />
                  </div>

                  <div className="pt-2">
                    <motion.button
                      type="submit"
                      disabled={loading}
                      className="w-full molten-gradient group relative overflow-hidden text-on-primary font-bold uppercase tracking-[0.2em] text-sm py-5 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                      whileHover={loading ? {} : { scale: 1.01 }}
                      whileTap={loading ? {} : { scale: 0.98 }}
                    >
                      <span className="relative z-10 flex items-center justify-center gap-3">
                        {loading ? (
                          <>
                            <motion.span className="block w-4 h-4 border-2 border-[#131313]/40 border-t-[#131313] rounded-full" animate={{ rotate: 360 }} transition={{ duration: 0.7, repeat: Infinity, ease: 'linear' }} />
                            Sending...
                          </>
                        ) : (
                          <>
                            Book My Free Audit
                            <span className="material-symbols-outlined text-xl">bolt</span>
                          </>
                        )}
                      </span>
                      {!loading && <div className="absolute inset-0 bg-white/15 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />}
                    </motion.button>
                    <p className="mt-4 text-center text-[10px] text-on-surface-variant font-mono uppercase tracking-widest opacity-50">
                      No commitment. 45-min call. Written summary delivered same day.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ── Global Visual ── */}
      <section className="mt-24 max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 xl:px-14">
        <motion.div
          className="h-[320px] md:h-[380px] w-full bg-surface-container-lowest relative overflow-hidden glass-edge group"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <img src="/images/contact-global.jpg" onError={(e) => { e.target.style.display = 'none' }} alt="Global Network" className="w-full h-full object-cover opacity-30 grayscale group-hover:grayscale-0 transition-all duration-1000 scale-110 group-hover:scale-100" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#0e0e0e] via-[#131313] to-[#1a1400]" style={{ zIndex: -1 }} />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
          <div className="absolute inset-0 flex items-center justify-center p-8">
            <div className="max-w-2xl text-center space-y-5">
              <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-on-surface">Global Execution Capability</h3>
              <p className="text-on-surface-variant leading-relaxed text-sm">We operate across timezones to provide responsive engineering coverage for our clients worldwide.</p>
              <div className="flex flex-wrap justify-center gap-8 mt-6">
                {[{ code: 'IND_01', label: 'Main Cluster' }, { code: 'UAE_04', label: 'Logic Node' }, { code: 'UK_09', label: 'Visual Core' }].map((node) => (
                  <div key={node.code} className="text-center">
                    <span className="block text-primary-container font-mono text-lg">{node.code}</span>
                    <span className="text-[10px] text-on-surface-variant uppercase tracking-widest">{node.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </main>
    </>
  )
}
