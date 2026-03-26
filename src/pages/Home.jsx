import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import SEO from '../components/SEO'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}
const stagger = { visible: { transition: { staggerChildren: 0.1 } } }

function InView({ children, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div ref={ref} variants={stagger} initial="hidden" animate={inView ? 'visible' : 'hidden'} className={className}>
      {children}
    </motion.div>
  )
}

export default function Home() {
  const [checklistEmail, setChecklistEmail] = useState('')
  const [checklistDone, setChecklistDone] = useState(false)
  const [checklistLoading, setChecklistLoading] = useState(false)

  const handleChecklist = async (e) => {
    e.preventDefault()
    if (!checklistEmail) return
    setChecklistLoading(true)
    try {
      const res = await fetch('/api/checklist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: checklistEmail, source: 'Home Page' }),
      })
      if (!res.ok) throw new Error()
      setChecklistDone(true)
      toast.success('Checklist sent! Check your inbox.')
    } catch {
      toast.error('Something went wrong. Please try again.')
    } finally {
      setChecklistLoading(false)
    }
  }

  return (
    <>
      <SEO
        title="AI & Odoo Enterprise Solutions"
        description="Cut operational costs by 60% in 90 days. CodeCrafters engineers high-precision AI automation and Odoo ERP systems for elite global enterprises."
        path="/"
      />
    <main className="pt-20">

      {/* ── HERO ── */}
      <section className="relative min-h-[calc(100vh-80px)] flex items-center overflow-hidden px-5 sm:px-8 lg:px-10 xl:px-14 py-16 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full items-center">

          {/* Visual 2/3 */}
          <motion.div
            className="md:col-span-2 relative h-[360px] md:h-[520px] bg-surface-container-lowest rounded-lg vitreous-edge overflow-hidden"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="absolute inset-0 opacity-20 pointer-events-none dot-grid" />
            <div className="absolute inset-0">
              <div className="w-full h-full opacity-60 mix-blend-screen overflow-hidden">
                <img src="/images/hero-grid.jpg" alt="AI Infrastructure" className="w-full h-full object-cover grayscale brightness-50 contrast-125" />
              </div>
            </div>
            {/* Floating status */}
            <motion.div
              className="absolute bottom-8 left-8 right-8 md:right-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              <div className="bg-[#3a3939]/80 glass-blur p-5 rounded-sm border border-[#4e4633]/20 max-w-sm">
                <p className="text-[#f5c518] text-xs uppercase tracking-[0.2em] mb-2 font-bold">Live Deployment Status</p>
                <h3 className="text-lg font-bold text-on-surface mb-2 tracking-tight">Client Systems: All Green</h3>
                <div className="w-full bg-surface-container-high h-1 rounded-full overflow-hidden">
                  <motion.div className="bg-primary-container h-full" initial={{ width: 0 }} animate={{ width: '99%' }} transition={{ delay: 1.2, duration: 1.5, ease: 'easeOut' }} />
                </div>
                <p className="text-on-surface-variant text-[10px] mt-2">99.9% uptime across all managed infrastructure</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Text 1/3 */}
          <motion.div className="flex flex-col justify-center space-y-6" variants={stagger} initial="hidden" animate="visible">
            <motion.span variants={fadeUp} className="text-primary-container text-xs uppercase tracking-[0.3em] font-bold">
              Trusted by 50+ Enterprises
            </motion.span>
            <motion.h1 variants={fadeUp} className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter leading-none text-on-surface">
              STOP LOSING MONEY TO<br />
              <span className="text-primary-container">BROKEN</span><br />
              SYSTEMS.
            </motion.h1>
            <motion.p variants={fadeUp} className="text-on-surface-variant text-base md:text-lg leading-relaxed">
              We build AI-powered automation and Odoo ERP systems that eliminate manual work, cut operational costs by up to 60%, and scale without breaking.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
              <Link to="/contact">
                <motion.button
                  className="molten-gradient text-on-primary px-7 py-4 font-bold text-sm uppercase tracking-widest rounded-sm vitreous-edge"
                  whileHover={{ scale: 1.03, filter: 'brightness(1.1)' }}
                  whileTap={{ scale: 0.97 }}
                >
                  Get Free Audit
                </motion.button>
              </Link>
              <Link to="/portfolio">
                <motion.button
                  className="border border-[#4e4633]/40 text-on-surface px-7 py-4 font-bold text-sm uppercase tracking-widest rounded-sm hover:bg-surface-container-high transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                >
                  See Results
                </motion.button>
              </Link>
            </motion.div>
            <motion.div variants={fadeUp} className="flex gap-6 pt-2">
              {[['420%', 'Avg ROI'], ['60%', 'Cost Reduction'], ['14 days', 'To First Win']].map(([val, lbl]) => (
                <div key={lbl}>
                  <p className="text-primary-container text-xl font-black tracking-tight">{val}</p>
                  <p className="text-on-surface-variant text-[10px] uppercase tracking-widest">{lbl}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── SOCIAL PROOF STRIP ── */}
      <section className="bg-surface-container-lowest border-y border-[#4e4633]/10 py-6 overflow-hidden">
        <div className="max-w-7xl mx-auto px-8">
          <p className="text-on-surface-variant text-[10px] uppercase tracking-[0.3em] text-center mb-4">Delivering results across industries</p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 items-center">
            {['Logistics & Supply Chain', 'Financial Services', 'Healthcare Tech', 'Retail & eCommerce', 'Manufacturing'].map((co) => (
              <span key={co} className="text-[#4e4633] text-xs font-bold uppercase tracking-widest hover:text-on-surface-variant transition-colors cursor-default">{co}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── PAIN POINTS ── */}
      <section className="bg-surface-container-low py-24 px-5 sm:px-8 lg:px-10 xl:px-14">
        <InView className="max-w-7xl mx-auto">
          <motion.div variants={fadeUp} className="mb-12">
            <p className="text-primary-container text-xs uppercase tracking-[0.3em] mb-3">Sound familiar?</p>
            <h2 className="text-3xl md:text-4xl font-black tracking-tighter uppercase text-on-surface">
              Your Business Is Bleeding Profit<br />Through These Gaps.
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: 'settings_slow_motion',
                title: 'Manual Work Is Killing Your Margins',
                body: 'Your team spends 30% of their day on tasks a well-configured AI could handle in seconds. That\'s salary burned on copy-paste work.',
                cost: '~$180K/yr wasted per 10 employees',
              },
              {
                icon: 'database_off',
                title: 'Data Trapped in Silos',
                body: 'Finance can\'t see ops. Sales can\'t see inventory. You\'re making six-figure decisions with incomplete information because your tools don\'t talk.',
                cost: 'Average 23% revenue leakage',
              },
              {
                icon: 'security_update_warning',
                title: 'Your Tech Won\'t Scale',
                body: 'Every new customer or SKU adds friction. Your current setup was built for where you were, not where you\'re going. It will break before you hit your goals.',
                cost: 'Growth capped at current infra limits',
              },
            ].map((card) => (
              <motion.div
                key={card.title}
                variants={fadeUp}
                className="p-8 bg-surface-container-lowest border border-[#4e4633]/10 hover:border-[#f5c518]/30 transition-all duration-300 group flex flex-col"
              >
                <span className="material-symbols-outlined text-primary-container text-4xl mb-4 block">{card.icon}</span>
                <h4 className="text-on-surface font-bold text-lg mb-3 uppercase tracking-tight leading-snug">{card.title}</h4>
                <p className="text-on-surface-variant text-sm leading-relaxed flex-grow">{card.body}</p>
                <p className="text-primary-container text-xs font-bold uppercase tracking-widest mt-4 pt-4 border-t border-[#4e4633]/20">{card.cost}</p>
              </motion.div>
            ))}
          </div>
          <motion.div variants={fadeUp} className="mt-10 text-center">
            <Link to="/contact">
              <button className="molten-gradient text-on-primary px-8 py-4 font-bold text-sm uppercase tracking-widest rounded-sm hover:brightness-110 transition-all">
                Let's Diagnose Your Setup — Free
              </button>
            </Link>
          </motion.div>
        </InView>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-24 px-5 sm:px-8 lg:px-10 xl:px-14 max-w-7xl mx-auto">
        <InView>
          <motion.div variants={fadeUp} className="mb-16 text-center">
            <p className="text-primary-container text-xs uppercase tracking-[0.3em] mb-3">Our Process</p>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-on-surface">From Broken to Best-in-Class<br />in 4 Steps.</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-0">
            {[
              { num: '01', icon: 'manage_search', title: 'Free Audit', body: 'We map your current tech stack, find every bottleneck, and quantify exactly how much money you\'re leaving on the table.' },
              { num: '02', icon: 'architecture', title: 'Blueprint', body: 'Our architects design a custom solution — AI workflows, ERP modules, cloud setup — tailored to your exact business logic.' },
              { num: '03', icon: 'engineering', title: 'Forge & Build', body: 'We build it. You watch your operational friction disappear. First measurable wins typically appear within 14 business days.' },
              { num: '04', icon: 'trending_up', title: 'Scale & Win', body: 'Ongoing optimization, 24/7 monitoring, and dedicated support. Your system gets smarter as your business grows.' },
            ].map((step, i) => (
              <motion.div
                key={step.num}
                variants={fadeUp}
                className="p-8 border-t border-b border-[#4e4633]/10 md:border-l md:border-r-0 first:md:border-l-0 relative"
              >
                <div className="text-5xl font-black text-[#4e4633]/20 mb-4">{step.num}</div>
                <span className="material-symbols-outlined text-primary-container text-3xl mb-4 block">{step.icon}</span>
                <h4 className="font-black text-on-surface uppercase text-sm tracking-wider mb-3">{step.title}</h4>
                <p className="text-on-surface-variant text-sm leading-relaxed">{step.body}</p>
                {i < 3 && (
                  <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                    <span className="material-symbols-outlined text-[#4e4633]/40 text-lg">chevron_right</span>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </InView>
      </section>

      {/* ── SERVICES BENTO ── */}
      <section className="bg-surface-container-low py-24 px-5 sm:px-8 lg:px-10 xl:px-14">
        <InView className="max-w-7xl mx-auto">
          <motion.div variants={fadeUp} className="mb-16">
            <p className="text-primary-container text-xs uppercase tracking-[0.3em] mb-4">What We Build</p>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-on-surface">Enterprise-Grade Solutions.<br />Delivered Fast.</h2>
          </motion.div>
          <motion.div variants={stagger} className="grid grid-cols-1 md:grid-cols-12 gap-5 lg:h-[600px]">

            {/* AI Card large */}
            <Link to="/services#ai-section" className="md:col-span-8 block">
              <motion.div
                variants={fadeUp}
                className="relative bg-surface-container-high overflow-hidden rounded-lg border border-[#4e4633]/20 p-10 md:p-12 flex flex-col justify-end group cursor-pointer h-[320px] md:h-full"
                whileHover={{ borderColor: 'rgba(245,197,24,0.3)' }}
              >
                <img src="/images/ai-infrastructure.jpg" onError={(e) => { e.target.style.display = 'none' }} alt="AI" className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-br from-[#1a1400] to-[#0e0e0e] opacity-70" />
                <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#f5c518 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
                <div className="relative z-10">
                  <span className="inline-block bg-primary-container text-on-primary-container px-3 py-1 text-[10px] font-bold uppercase tracking-widest mb-4">Highest ROI Service</span>
                  <h3 className="text-2xl md:text-3xl font-black text-on-surface mb-3 uppercase">AI Automation & LLM Pipelines</h3>
                  <p className="text-on-surface-variant max-w-lg mb-6 text-sm md:text-base">Custom AI agents that automate your most expensive manual processes — customer support, data entry, reporting, compliance checks — 24/7 at zero marginal cost.</p>
                  <span className="text-primary-container text-sm font-bold uppercase tracking-widest flex items-center gap-2 group-hover:gap-4 transition-all">
                    Explore Service <span className="material-symbols-outlined">arrow_forward</span>
                  </span>
                </div>
              </motion.div>
            </Link>

            {/* Odoo Card */}
            <Link to="/services#odoo-section" className="md:col-span-4 block">
              <motion.div
                variants={fadeUp}
                className="bg-surface-container-lowest border border-[#4e4633]/20 p-8 flex flex-col rounded-lg hover:border-[#f5c518]/20 transition-colors h-full"
              >
                <span className="material-symbols-outlined text-primary-container text-4xl mb-5">deployed_code</span>
                <h3 className="text-xl font-black text-on-surface mb-3 uppercase">Odoo ERP Architecture</h3>
                <p className="text-on-surface-variant text-sm leading-loose flex-grow">One platform for CRM, inventory, accounting, HR, and manufacturing. We implement Odoo so completely that your team actually adopts it.</p>
                <hr className="border-[#4e4633]/20 my-5" />
                <ul className="space-y-2 text-xs font-bold uppercase tracking-widest text-on-surface">
                  {['Full Implementation', 'Custom Modules', 'Migration Support'].map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-primary-container inline-block shrink-0" />{item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </Link>

            {/* Security */}
            <Link to="/services" className="md:col-span-4 block">
              <motion.div
                variants={fadeUp}
                className="bg-surface-container-lowest border border-[#4e4633]/20 p-8 rounded-lg flex items-center justify-between group hover:border-[#f5c518]/20 transition-all h-full"
              >
                <div>
                  <h3 className="text-lg font-black text-on-surface uppercase mb-1">Cyber Security</h3>
                  <p className="text-on-surface-variant text-xs max-w-[160px]">Zero-trust architecture. Quantum-ready encryption.</p>
                </div>
                <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary-container transition-colors text-3xl">shield_lock</span>
              </motion.div>
            </Link>

            {/* DevOps */}
            <Link to="/services" className="md:col-span-8 block">
              <motion.div
                variants={fadeUp}
                className="bg-surface-container-lowest border border-[#4e4633]/20 p-8 rounded-lg flex items-center justify-between group hover:border-[#f5c518]/20 transition-all h-full"
              >
                <div className="flex gap-8 md:gap-12 items-center">
                  <div>
                    <h3 className="text-lg font-black text-on-surface uppercase mb-1">Cloud & DevOps</h3>
                    <p className="text-on-surface-variant text-xs">99.99% uptime SLA. Auto-scaling. Zero-downtime deploys.</p>
                  </div>
                  <div className="hidden lg:flex gap-3">
                    {['AWS', 'GCP', 'Docker', 'K8S'].map((tag) => (
                      <span key={tag} className="text-[10px] font-bold py-1 px-3 border border-[#4e4633]/20 rounded-full text-on-surface-variant uppercase">{tag}</span>
                    ))}
                  </div>
                </div>
                <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary-container transition-colors text-3xl">terminal</span>
              </motion.div>
            </Link>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-8 text-center">
            <Link to="/services">
              <button className="border border-[#4e4633]/40 text-on-surface px-8 py-4 font-bold text-sm uppercase tracking-widest rounded-sm hover:bg-surface-container-high transition-all">
                View All Services & Pricing
              </button>
            </Link>
          </motion.div>
        </InView>
      </section>

      {/* ── STATS / PROOF ── */}
      <section className="bg-surface-container-lowest border-y border-[#4e4633]/10 py-20">
        <InView className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 xl:px-14 grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
          {[
            { value: '420%', label: 'Average Client ROI', accent: true },
            { value: '60%', label: 'Ops Cost Reduction', accent: false },
            { value: '14 Days', label: 'Time to First Win', accent: false },
            { value: '50+', label: 'Enterprises Served', accent: true },
          ].map((stat) => (
            <motion.div key={stat.label} variants={fadeUp}>
              <p className={`text-4xl md:text-5xl font-black tracking-tighter mb-2 ${stat.accent ? 'text-primary-container' : 'text-on-surface'}`}>{stat.value}</p>
              <p className="text-on-surface-variant text-xs font-bold uppercase tracking-[0.2em]">{stat.label}</p>
            </motion.div>
          ))}
        </InView>
      </section>

      {/* ── TESTIMONIAL ── */}
      <section className="py-24 px-5 sm:px-8 lg:px-10 xl:px-14 max-w-7xl mx-auto">
        <InView>
          <motion.div variants={fadeUp} className="mb-12 text-center">
            <p className="text-primary-container text-xs uppercase tracking-[0.3em] mb-3">What Clients Say</p>
            <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-on-surface">Results That Speak for Themselves.</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                quote: 'CodeCrafters reduced our order processing time from 4 hours to 8 minutes. The Odoo implementation paid for itself in the first quarter.',
                name: 'S.C.*',
                title: 'COO, Logistics Enterprise',
                metric: '96% faster processing',
              },
              {
                quote: 'Their AI pipeline replaced 3 full-time data analysts. The reports are more accurate, available instantly, and cost 70% less to produce.',
                name: 'M.W.*',
                title: 'CTO, Financial Services Firm',
                metric: '70% reporting cost cut',
              },
              {
                quote: 'We scaled from 50 to 500 daily transactions without hiring a single additional ops employee. CodeCrafters built the infrastructure that made that possible.',
                name: 'P.S.*',
                title: 'Founder, Retail Group',
                metric: '10x scale, same team size',
              },
            ].map((t) => (
              <motion.div
                key={t.name}
                variants={fadeUp}
                className="p-8 bg-surface-container-low border border-[#4e4633]/10 rounded-sm flex flex-col"
              >
                <div className="flex gap-1 mb-5">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="material-symbols-outlined text-primary-container text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  ))}
                </div>
                <p className="text-on-surface-variant text-sm leading-relaxed flex-grow mb-6 italic">"{t.quote}"</p>
                <div className="border-t border-[#4e4633]/20 pt-5">
                  <p className="text-on-surface font-bold text-sm">{t.name}</p>
                  <p className="text-on-surface-variant text-xs mb-3">{t.title}</p>
                  <span className="inline-block bg-primary-container/10 text-primary-container text-[10px] font-bold uppercase tracking-widest px-3 py-1">
                    {t.metric}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
          <motion.p variants={fadeUp} className="text-[#4e4633] text-[10px] text-center mt-6">
            * Names changed for client confidentiality
          </motion.p>
        </InView>
      </section>

      {/* ── LEAD MAGNET / CTA ── */}
      <section className="py-16 px-5 sm:px-8 lg:px-10 xl:px-14 max-w-7xl mx-auto">
        <InView>
          <motion.div
            variants={fadeUp}
            className="bg-surface-container rounded-lg vitreous-edge overflow-hidden flex flex-col md:flex-row border border-[#4e4633]/20"
          >
            <div className="md:w-1/2 p-10 md:p-14 flex flex-col justify-center">
              <span className="text-primary-container font-bold text-xs uppercase tracking-[0.3em] mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">download</span>
                Free Resource
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-on-surface mb-4 leading-tight uppercase">
                The Odoo AI Automation<br />Checklist for CTOs
              </h2>
              <p className="text-on-surface-variant mb-6 leading-relaxed text-sm">
                14 critical checkpoints to identify automation opportunities in your Odoo stack. Used by CTOs at 50+ enterprises to build their AI roadmap. Takes 10 minutes. Could save you $500K.
              </p>
              {checklistDone ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-3 text-primary-container font-bold text-sm py-4">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  Checklist sent! Check your inbox.
                </motion.div>
              ) : (
                <form className="flex flex-col space-y-4" onSubmit={handleChecklist}>
                  <input
                    type="email"
                    value={checklistEmail}
                    onChange={(e) => setChecklistEmail(e.target.value)}
                    placeholder="Your corporate email"
                    required
                    className="w-full bg-surface-container-lowest border-0 border-b border-[#4e4633]/40 text-on-surface px-0 py-3 focus:ring-0 focus:border-primary-container transition-all outline-none placeholder:text-on-surface-variant/30 text-sm"
                  />
                  <motion.button
                    type="submit"
                    disabled={checklistLoading}
                    className="molten-gradient text-on-primary font-black py-4 uppercase tracking-[0.15em] rounded-sm shadow-xl text-sm disabled:opacity-70"
                    whileHover={checklistLoading ? {} : { scale: 1.01, filter: 'brightness(1.08)' }}
                    whileTap={checklistLoading ? {} : { scale: 0.98 }}
                  >
                    {checklistLoading ? 'Sending...' : 'Send Me the Checklist'}
                  </motion.button>
                </form>
              )}
              <p className="text-[10px] text-on-surface-variant/40 mt-4 uppercase font-medium">No spam. Unsubscribe anytime.</p>
            </div>

            <div className="md:w-1/2 relative bg-surface-container-highest flex items-center justify-center p-10 md:p-12 overflow-hidden">
              <div className="absolute inset-0 opacity-10">
                <img src="/images/code-screen.jpg" alt="" className="w-full h-full object-cover" />
              </div>
              <motion.div
                className="relative z-10 bg-surface p-1 border border-[#f5c518]/20 shadow-2xl"
                initial={{ rotate: 2 }}
                whileHover={{ rotate: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="p-8 bg-surface-container-lowest border border-[#4e4633]/10 text-center w-60 md:w-72">
                  <div className="w-12 h-1 bg-primary-container mx-auto mb-5" />
                  <p className="text-primary-container text-[10px] uppercase tracking-[0.2em] font-bold mb-3">Free Download</p>
                  <h4 className="text-base font-black text-on-surface uppercase mb-4">Odoo AI<br />Automation<br />Checklist</h4>
                  <div className="space-y-2 mb-6">
                    {[1, 0.8, 1, 0.7, 0.9].map((w, i) => (
                      <div key={i} className="h-1 bg-on-surface-variant/20" style={{ width: `${w * 100}%`, margin: w < 1 ? '0 auto' : '0' }} />
                    ))}
                  </div>
                  <span className="material-symbols-outlined text-primary-container text-3xl">file_download</span>
                  <p className="text-on-surface-variant text-[10px] mt-2">14 checkpoints • 10 min read</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </InView>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="bg-surface-container-lowest py-24 px-5 sm:px-8 lg:px-10 xl:px-14 text-center border-t border-[#4e4633]/10">
        <InView className="max-w-3xl mx-auto">
          <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-black tracking-tighter text-on-surface mb-6">
            Your Competitors Are<br />Already <span className="text-primary-container">Automating.</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-on-surface-variant text-lg mb-10 leading-relaxed">
            Every week you delay is another week of unnecessary manual work, another week of data silos costing you decisions, and another week your competition pulls further ahead.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <motion.button
                className="molten-gradient text-on-primary px-10 py-5 font-bold uppercase tracking-widest text-sm shadow-[0_0_30px_rgba(245,197,24,0.2)]"
                whileHover={{ scale: 1.02, boxShadow: '0 0 40px rgba(245,197,24,0.35)' }}
                whileTap={{ scale: 0.97 }}
              >
                Book My Free Audit Now
              </motion.button>
            </Link>
            <Link to="/portfolio">
              <button className="border border-[#9a9078]/50 text-on-surface px-10 py-5 font-bold uppercase tracking-widest text-sm hover:bg-surface-container-low transition-all">
                View Case Studies
              </button>
            </Link>
          </motion.div>
          <motion.p variants={fadeUp} className="text-on-surface-variant text-xs mt-6 opacity-60">
            Free 45-min strategy call. No commitment. No sales pitch — just actionable insights.
          </motion.p>
        </InView>
      </section>
    </main>
    </>
  )
}
