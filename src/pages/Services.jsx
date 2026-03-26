import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}
const stagger = { visible: { transition: { staggerChildren: 0.12 } } }

function InView({ children, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div ref={ref} variants={stagger} initial="hidden" animate={inView ? 'visible' : 'hidden'} className={className}>
      {children}
    </motion.div>
  )
}

export default function Services() {
  return (
    <>
      <SEO
        title="Services — AI Automation & Odoo ERP"
        description="Full-stack AI automation, Odoo ERP implementation, cloud infrastructure, and cyber security for enterprise organizations."
        path="/services"
      />
    <main className="pt-24 min-h-screen">

      {/* ── HERO ── */}
      <section className="relative px-5 sm:px-8 lg:px-10 xl:px-14 py-20 max-w-7xl mx-auto overflow-hidden">
        <div className="forge-grid absolute inset-0 -z-10" />
        <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center" variants={stagger} initial="hidden" animate="visible">
          <div className="md:col-span-2 space-y-6">
            <motion.div variants={fadeUp} className="inline-block px-3 py-1 bg-surface-container-high border-l-2 border-primary-container">
              <span className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Architectural Systems Design</span>
            </motion.div>
            <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter text-on-surface leading-[0.9]">
              FORGING THE <br />
              <span className="text-primary-container">DIGITAL CORE</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-xl text-on-surface-variant max-w-xl leading-relaxed">
              We don't build apps. We engineer high-precision AI systems and ERP infrastructure that eliminate operational drag and compound ROI over time.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap gap-4 pt-2">
              <Link to="/contact">
                <motion.button className="molten-gradient text-on-primary px-8 py-4 font-bold uppercase tracking-wider rounded-sm shadow-xl shadow-primary-container/20" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  Start Your Forge
                </motion.button>
              </Link>
              <Link to="/portfolio">
                <button className="border border-[#4e4633]/40 text-on-surface px-8 py-4 font-bold uppercase tracking-wider rounded-sm hover:bg-surface-container-high transition-all">
                  View Results
                </button>
              </Link>
            </motion.div>
          </div>
          <motion.div variants={fadeUp} className="md:col-span-1 relative aspect-[2/1] md:aspect-square overflow-hidden rounded-sm border border-[#4e4633]/20">
            <img src="/images/services-hero.jpg" alt="Liquid gold geometry" className="w-full h-full object-cover grayscale contrast-125 opacity-70" />
            <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
          </motion.div>
        </motion.div>
      </section>

      {/* ── BIG BENTO GRID ── */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 xl:px-14 py-16">
        <InView className="grid grid-cols-1 md:grid-cols-6 gap-5 lg:h-[800px]">

          {/* AI Forge — large 4/6 x 2 rows */}
          <motion.div
            variants={fadeUp}
            id="ai-section"
            className="md:col-span-4 md:row-span-2 relative vitreous-glass p-10 md:p-12 overflow-hidden border border-[#4e4633]/20 flex flex-col justify-between group min-h-[350px]"
          >
            <div className="relative z-10">
              <span className="text-primary-container text-xs font-bold tracking-widest uppercase mb-3 block">01 / Intelligence</span>
              <h3 className="text-4xl md:text-5xl font-black tracking-tighter mb-6 uppercase text-on-surface">
                AI Forge &<br />Neural Systems
              </h3>
              <p className="text-on-surface-variant text-lg max-w-md leading-relaxed mb-8">
                Custom LLM pipelines, autonomous AI agents, and RAG systems built on your proprietary data. We've reduced client manual workloads by an average of 72% in the first 90 days.
              </p>
              <ul className="space-y-2 mb-8">
                {['Custom LLM pipelines & fine-tuning', 'Autonomous AI agent workflows', 'RAG systems on proprietary data', 'AI-powered reporting & analytics', 'LLM integration into existing tools'].map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm text-on-surface-variant">
                    <span className="w-1.5 h-1.5 bg-primary-container inline-block shrink-0" />{f}
                  </li>
                ))}
              </ul>
              <Link to="/contact" className="flex items-center gap-2 group/link w-fit">
                <span className="text-sm font-bold uppercase tracking-widest group-hover/link:text-primary-container transition-colors">Initialize Protocol</span>
                <span className="material-symbols-outlined text-primary-container group-hover/link:translate-x-2 transition-transform">arrow_forward</span>
              </Link>
            </div>
            <div className="absolute -right-16 -bottom-16 w-72 h-72 opacity-5">
              <span className="material-symbols-outlined text-[250px] text-primary-container" style={{ fontVariationSettings: "'FILL' 1" }}>psychology</span>
            </div>
          </motion.div>

          {/* Odoo Solutions */}
          <motion.div
            variants={fadeUp}
            id="odoo-section"
            className="md:col-span-2 bg-surface-container p-8 flex flex-col justify-between border border-[#4e4633]/10 hover:border-[#f5c518]/20 transition-colors group"
          >
            <div>
              <span className="material-symbols-outlined text-primary-container text-3xl mb-4 block">deployed_code</span>
              <h4 className="text-2xl font-black tracking-tighter uppercase text-on-surface mb-3">Odoo ERP Solutions</h4>
              <p className="text-sm text-on-surface-variant leading-relaxed">One platform for CRM, inventory, accounting, HR, and manufacturing. Full implementation, custom modules, and migration from any legacy system.</p>
            </div>
            <Link to="/contact" className="text-primary-container text-xs font-bold uppercase tracking-widest flex items-center gap-1 group-hover:gap-3 transition-all mt-6">
              Learn More <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </motion.div>

          {/* Cloud Forge */}
          <motion.div
            variants={fadeUp}
            id="cloud-section"
            className="md:col-span-2 bg-surface-container-high p-8 flex flex-col justify-between border border-[#4e4633]/10 hover:border-[#f5c518]/20 transition-colors group"
          >
            <div>
              <span className="material-symbols-outlined text-primary-container text-3xl mb-4 block">cloud_done</span>
              <h4 className="text-2xl font-black tracking-tighter uppercase text-on-surface mb-3">Cloud & DevOps Forge</h4>
              <p className="text-sm text-on-surface-variant leading-relaxed">99.99% uptime SLA. Auto-scaling Kubernetes clusters on AWS, GCP, or Azure. Zero-downtime deployment pipelines.</p>
            </div>
            <div className="flex gap-2 flex-wrap mt-4">
              {['AWS', 'GCP', 'K8S', 'Docker'].map((t) => (
                <span key={t} className="text-[10px] font-bold py-1 px-2 bg-surface-container-lowest border border-[#4e4633]/20 text-on-surface-variant uppercase">{t}</span>
              ))}
            </div>
          </motion.div>
        </InView>
      </section>

      {/* ── ODOO DEEP DIVE ── */}
      <section className="px-5 sm:px-8 lg:px-10 xl:px-14 py-16 max-w-7xl mx-auto">
        <InView className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <motion.div variants={fadeUp} className="md:col-span-8 vitreous-glass p-10 md:p-12 flex flex-col justify-between border border-[#4e4633]/10 group">
            <div>
              <div className="flex items-center gap-4 mb-8">
                <span className="material-symbols-outlined text-primary-container text-4xl">settings_input_component</span>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-on-surface">Odoo Implementation That Actually Sticks</h2>
              </div>
              <p className="text-on-surface-variant text-lg leading-relaxed mb-10 max-w-xl">
                80% of ERP implementations fail because of poor adoption. We go beyond setup — we re-engineer your workflows around Odoo's strengths, train your team, and stay on until your team loves the system.
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-6 text-sm uppercase tracking-wide">
                {['Custom Module Development', 'Legacy System Migration', 'Third-Party API Integrations', 'Performance Optimization', 'User Training & Onboarding', 'Ongoing Support & Maintenance'].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-on-surface-variant">
                    <span className="w-1.5 h-1.5 bg-primary-container inline-block shrink-0" />{item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-10 flex justify-end">
              <span className="material-symbols-outlined text-[#4e4633] group-hover:text-primary-container transition-colors duration-500 text-6xl">schema</span>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="md:col-span-4 bg-surface-container-lowest p-10 border border-[#4e4633]/20 flex flex-col justify-between">
            <div>
              <span className="inline-block bg-primary-container/10 text-primary-container text-[10px] font-bold uppercase tracking-widest px-3 py-1 mb-5">Most Popular</span>
              <h3 className="text-2xl font-bold tracking-tight text-primary-container mb-4">Free Tech Stack Audit</h3>
              <p className="text-on-surface-variant text-sm leading-relaxed mb-6">
                Our architects will spend 45 minutes with you mapping your current system, identifying your 3 biggest bottlenecks, and showing you exactly what's possible.
              </p>
              <ul className="space-y-2 mb-6">
                {['No commitment required', 'Actionable recommendations', '45-minute deep dive', 'Written summary delivered'].map((i) => (
                  <li key={i} className="text-xs text-on-surface-variant flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary-container text-sm">check</span>{i}
                  </li>
                ))}
              </ul>
            </div>
            <Link to="/contact">
              <button className="w-full border border-[#f5c518]/40 py-4 font-bold text-xs uppercase tracking-widest hover:bg-primary-container hover:text-on-primary-container transition-all duration-300">
                Book Free Audit
              </button>
            </Link>
          </motion.div>

          {/* AI Workflow Full Width */}
          <motion.div variants={fadeUp} className="md:col-span-12 vitreous-glass p-10 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-10 border border-[#4e4633]/10">
            <div className="relative overflow-hidden rounded-sm h-60 md:h-auto">
              <img src="/images/ai-workflow.jpg" alt="Neural network visualization" className="w-full h-full object-cover opacity-50 contrast-150" />
              <div className="absolute inset-0 bg-surface-container-lowest/40 backdrop-blur-sm flex items-center justify-center">
                <span className="material-symbols-outlined text-primary-container text-7xl md:text-8xl">psychology</span>
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-on-surface mb-5">AI Workflows That Replace Headcount</h2>
              <p className="text-on-surface-variant text-lg leading-relaxed mb-8">
                We connect LLMs directly to your databases, CRM, and operational tools. The result: self-writing reports, automated customer responses, real-time compliance checks, and intelligent routing — all without adding staff.
              </p>
              <div className="space-y-4">
                <div className="p-4 bg-surface-container-low border-l-2 border-primary-container">
                  <h4 className="text-on-surface font-bold text-sm uppercase mb-1">Neural Logic Integration</h4>
                  <p className="text-on-surface-variant text-xs">Direct LLM-to-database connections. Your AI reads your data, not generic internet data.</p>
                </div>
                <div className="p-4 bg-surface-container-low border-l-2 border-[#4e4633]">
                  <h4 className="text-on-surface font-bold text-sm uppercase mb-1">Automated Executive Reporting</h4>
                  <p className="text-on-surface-variant text-xs">Board-ready summaries generated daily from raw telemetry. No analyst required.</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Dashboard */}
          <motion.div variants={fadeUp} id="dashboard-section" className="md:col-span-6 vitreous-glass p-10 border border-[#4e4633]/10">
            <span className="material-symbols-outlined text-primary-container mb-5 block text-4xl">dashboard_customize</span>
            <h3 className="text-3xl font-bold tracking-tight text-on-surface mb-4">Real-Time Intelligence Dashboards</h3>
            <p className="text-on-surface-variant leading-relaxed mb-6 text-sm">
              Stop waiting for end-of-month reports. Live dashboards that surface anomalies before they become problems, track KPIs your team actually cares about, and auto-alert the right people.
            </p>
            <div className="aspect-video bg-surface-container-lowest rounded-sm border border-[#4e4633]/10 overflow-hidden relative">
              <div className="absolute inset-0 flex items-end justify-start p-3 gap-1.5">
                {[35, 60, 80, 45, 90, 65, 50, 75].map((h, i) => (
                  <motion.div key={i} className="flex-1 bg-primary-container rounded-sm" style={{ height: `${h}%`, opacity: i % 2 === 0 ? 0.6 : 0.3 }}
                    initial={{ height: 0 }} whileInView={{ height: `${h}%` }} transition={{ delay: i * 0.08, duration: 0.5 }} viewport={{ once: true }} />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Cyber Security */}
          <motion.div variants={fadeUp} className="md:col-span-6 vitreous-glass p-10 border border-[#4e4633]/10 flex flex-col justify-center">
            <span className="material-symbols-outlined text-primary-container mb-5 block text-4xl">shield_lock</span>
            <h3 className="text-3xl font-bold tracking-tight text-on-surface mb-4">Hardened Cyber Security</h3>
            <p className="text-on-surface-variant leading-relaxed mb-6 text-sm">
              Zero-trust architecture. Quantum-resistant encryption. Biometric access controls. We secure your digital perimeter like it holds your most valuable asset — because it does.
            </p>
            <div className="flex gap-3 flex-wrap">
              {['Zero-Trust', 'Penetration Testing', 'Compliance Auditing', 'Incident Response'].map((tag) => (
                <span key={tag} className="text-[10px] uppercase tracking-widest text-on-surface-variant px-3 py-1 bg-surface-container-highest">{tag}</span>
              ))}
            </div>
          </motion.div>
        </InView>
      </section>

      {/* ── PRICING SIGNAL ── */}
      <section className="bg-surface-container-low py-20 px-5 sm:px-8 lg:px-10 xl:px-14 border-y border-[#4e4633]/10">
        <InView className="max-w-7xl mx-auto">
          <motion.div variants={fadeUp} className="text-center mb-12">
            <p className="text-primary-container text-xs uppercase tracking-[0.3em] mb-3">Engagement Models</p>
            <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-on-surface">Flexible Partnerships. Fixed Accountability.</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { tier: 'Diagnostic', price: 'Free', desc: 'A 45-min technical audit of your current stack. Walk away with a prioritized list of bottlenecks and ROI estimates. No pitch, no pressure.', items: ['45-min architect call', 'Tech stack analysis', 'Written bottleneck report', 'ROI estimate'], cta: 'Book Now', highlight: false },
              { tier: 'Build', price: 'Project-Based', desc: 'Fixed-scope, fixed-price engagements for a specific system — an AI pipeline, an Odoo module, a cloud migration. You know exactly what you\'re getting.', items: ['Custom scoping call', 'Milestone-based delivery', 'Post-launch support (30 days)', 'Documentation included'], cta: 'Get a Quote', highlight: true },
              { tier: 'Scale', price: 'Retainer', desc: 'Ongoing engineering partnership. We become your outsourced technical team — building, optimizing, and maintaining your systems as your business grows.', items: ['Dedicated engineering team', 'Monthly strategy sessions', 'Priority response SLA', '24/7 monitoring included'], cta: 'Discuss Partnership', highlight: false },
            ].map((p) => (
              <motion.div
                key={p.tier}
                variants={fadeUp}
                className={`p-8 border flex flex-col ${p.highlight ? 'bg-surface-container border-[#f5c518]/30 vitreous-edge relative' : 'bg-surface-container-lowest border-[#4e4633]/20'}`}
              >
                {p.highlight && (
                  <span className="absolute -top-3 left-8 bg-primary-container text-on-primary-container text-[10px] font-black uppercase tracking-widest px-3 py-1">Most Popular</span>
                )}
                <p className="text-primary-container text-xs font-bold uppercase tracking-widest mb-2">{p.tier}</p>
                <p className="text-2xl font-black text-on-surface mb-4">{p.price}</p>
                <p className="text-on-surface-variant text-sm leading-relaxed mb-6 flex-grow">{p.desc}</p>
                <ul className="space-y-2 mb-8">
                  {p.items.map((i) => (
                    <li key={i} className="text-xs text-on-surface-variant flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary-container text-sm">check</span>{i}
                    </li>
                  ))}
                </ul>
                <Link to="/contact">
                  <button className={`w-full py-3 font-bold text-xs uppercase tracking-widest transition-all ${p.highlight ? 'molten-gradient text-on-primary' : 'border border-[#4e4633]/40 text-on-surface hover:bg-surface-container-high'}`}>
                    {p.cta}
                  </button>
                </Link>
              </motion.div>
            ))}
          </div>
        </InView>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="bg-surface-container-lowest border-t border-[#4e4633]/10 relative overflow-hidden">
        <div className="forge-grid absolute inset-0 opacity-20" />
        <InView className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 xl:px-14 py-24 text-center relative z-10">
          <motion.h2 variants={fadeUp} className="text-4xl md:text-6xl font-black tracking-tighter text-on-surface mb-6">
            READY TO <span className="text-primary-container">OPTIMIZE</span> YOUR FORGE?
          </motion.h2>
          <motion.p variants={fadeUp} className="text-on-surface-variant text-lg max-w-2xl mx-auto mb-10">
            Stop fighting your tools. Every week without the right infrastructure is a week of compounding inefficiency. Let's fix that.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-col md:flex-row gap-4 justify-center">
            <Link to="/contact">
              <motion.button className="molten-gradient text-on-primary px-10 py-5 font-bold uppercase tracking-widest text-sm" whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(245,197,24,0.3)' }} whileTap={{ scale: 0.97 }}>
                Schedule Free Audit
              </motion.button>
            </Link>
            <Link to="/portfolio">
              <button className="bg-transparent border border-[#9a9078]/50 px-10 py-5 font-bold uppercase tracking-widest text-sm text-on-surface hover:bg-surface-container-low transition-all">
                View Case Studies
              </button>
            </Link>
          </motion.div>
        </InView>
      </section>
    </main>
    </>
  )
}
