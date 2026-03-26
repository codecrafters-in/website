import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
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

const modules = [
  { icon: 'group', name: 'CRM', desc: 'Full sales pipeline. Lead scoring, deal tracking, automated follow-ups.' },
  { icon: 'inventory_2', name: 'Inventory', desc: 'Real-time stock, multi-warehouse, automated reorder rules.' },
  { icon: 'receipt_long', name: 'Accounting', desc: 'Multi-currency, bank reconciliation, automated invoicing.' },
  { icon: 'precision_manufacturing', name: 'Manufacturing', desc: 'Production orders, BoM management, real-time shopfloor tracking.' },
  { icon: 'shopping_cart', name: 'eCommerce', desc: 'Headless storefront connected directly to your inventory & fulfillment.' },
  { icon: 'people', name: 'HR & Payroll', desc: 'Employee records, leave management, payroll processing.' },
  { icon: 'local_shipping', name: 'Logistics', desc: 'Carrier integrations, shipping automation, delivery tracking.' },
  { icon: 'bar_chart', name: 'Reporting', desc: 'Custom dashboards and BI reports across every business unit.' },
]

export default function OdooSolutions() {
  const [activeModule, setActiveModule] = useState(null)

  return (
    <>
      <SEO
        title="Odoo ERP Implementation & Customisation | Best Odoo Partner India"
        description="End-to-end Odoo ERP implementation, module customisation, v14–v19 migration, and integrations. Best Odoo service provider in India with 4+ years and 30+ projects."
        keywords="best Odoo partner India, Odoo ERP implementation India, Odoo customisation service, Odoo v17 v18 v19 developer, Odoo module development, Odoo migration India, Odoo service provider"
        path="/odoo-solutions"
      />
    <main className="pt-24 min-h-screen">

      {/* ── HERO ── */}
      <section className="relative px-5 sm:px-8 lg:px-10 xl:px-14 py-20 max-w-7xl mx-auto overflow-hidden">
        <div className="forge-grid absolute inset-0 -z-10" />
        <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center" variants={stagger} initial="hidden" animate="visible">
          <div className="md:col-span-2 space-y-6">
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3 py-1.5 bg-surface-container-high border-l-2 border-primary-container">
              <span className="material-symbols-outlined text-primary-container text-sm">deployed_code</span>
              <span className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Odoo ERP Architecture</span>
            </motion.div>
            <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter text-on-surface leading-[0.9]">
              ONE PLATFORM.<br />
              <span className="text-primary-container">ZERO SILOS.</span><br />
              TOTAL CONTROL.
            </motion.h1>
            <motion.p variants={fadeUp} className="text-xl text-on-surface-variant max-w-xl leading-relaxed">
              We implement Odoo so completely that every department — sales, ops, finance, HR, logistics — works from a single source of truth. No more spreadsheet wars.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap gap-4 pt-2">
              <Link to="/contact">
                <motion.button className="molten-gradient text-on-primary px-8 py-4 font-bold uppercase tracking-wider rounded-sm shadow-xl shadow-primary-container/20" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  Get a Free ERP Audit
                </motion.button>
              </Link>
              <Link to="/portfolio">
                <button className="border border-[#4e4633]/40 text-on-surface px-8 py-4 font-bold uppercase tracking-wider rounded-sm hover:bg-surface-container-high transition-all">
                  See Results
                </button>
              </Link>
            </motion.div>
          </div>
          <motion.div variants={fadeUp} className="relative aspect-square overflow-hidden rounded-sm border border-[#4e4633]/20">
            <img src="/images/services-hero.jpg" alt="ERP Architecture" className="w-full h-full object-cover grayscale contrast-125 opacity-60" />
            <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <div className="glass-panel p-5 border border-[#4e4633]/20">
                <p className="text-primary-container text-[10px] font-bold uppercase tracking-widest mb-2">Client Stat</p>
                <p className="text-2xl font-black text-on-surface">96% faster</p>
                <p className="text-on-surface-variant text-xs">order processing after Odoo implementation</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ── THE PROBLEM ── */}
      <section className="bg-surface-container-low py-20 px-5 sm:px-8 lg:px-10 xl:px-14 border-y border-[#4e4633]/10">
        <InView className="max-w-7xl mx-auto">
          <motion.div variants={fadeUp} className="max-w-2xl mb-12">
            <p className="text-primary-container text-xs uppercase tracking-[0.3em] mb-3">Why ERP Implementations Fail</p>
            <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-on-surface">80% of ERP Projects Fail.<br />Here's Why We're Different.</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { problem: 'Generic implementation agencies that copy-paste templates', solution: "We re-engineer your workflows around Odoo's strengths — not the other way around." },
              { problem: 'Go-live and disappear support model', solution: 'We stay until 90% of your team actually uses the system daily. That\'s our standard.' },
              { problem: 'IT team writes the requirements, ops hates the result', solution: 'We interview every stakeholder. The system gets built for the people who use it.' },
              { problem: 'Migration leaves behind 3 years of critical data', solution: 'Every byte migrated, validated, and reconciled. Your history comes with you.' },
            ].map((item, idx) => (
              <motion.div key={idx} variants={fadeUp} className="bg-surface-container-lowest border border-[#4e4633]/10 overflow-hidden">
                <div className="p-5 border-b border-[#4e4633]/10 flex gap-3">
                  <span className="material-symbols-outlined text-on-surface-variant/30 text-xl mt-0.5 shrink-0">cancel</span>
                  <p className="text-on-surface-variant text-sm line-through opacity-50">{item.problem}</p>
                </div>
                <div className="p-5 flex gap-3 bg-[#0e0e0e]/30">
                  <span className="material-symbols-outlined text-primary-container text-xl mt-0.5 shrink-0">check_circle</span>
                  <p className="text-on-surface text-sm font-medium">{item.solution}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </InView>
      </section>

      {/* ── MODULES ── */}
      <section className="py-24 px-5 sm:px-8 lg:px-10 xl:px-14 max-w-7xl mx-auto">
        <InView>
          <motion.div variants={fadeUp} className="mb-12">
            <p className="text-primary-container text-xs uppercase tracking-[0.3em] mb-3">Platform Coverage</p>
            <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-on-surface">Every Department. One System.</h2>
          </motion.div>
          <motion.div variants={stagger} className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {modules.map((m) => (
              <motion.div
                key={m.name}
                variants={fadeUp}
                className={`p-6 border cursor-pointer transition-all duration-200 ${activeModule === m.name
                  ? 'border-[#f5c518]/40 bg-surface-container vitreous-edge'
                  : 'border-[#4e4633]/15 bg-surface-container-lowest hover:border-[#f5c518]/20 hover:bg-surface-container'
                  }`}
                onClick={() => setActiveModule(activeModule === m.name ? null : m.name)}
              >
                <span className="material-symbols-outlined text-primary-container text-2xl mb-3 block">{m.icon}</span>
                <h4 className="font-black text-on-surface text-sm uppercase tracking-wide mb-2">{m.name}</h4>
                <p className={`text-on-surface-variant text-xs leading-relaxed transition-all duration-200 ${activeModule === m.name ? 'opacity-100 max-h-24' : 'opacity-0 max-h-0 overflow-hidden'}`}>
                  {m.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
          <motion.p variants={fadeUp} className="text-on-surface-variant text-xs text-center mt-4 opacity-60">Click any module to learn more</motion.p>
        </InView>
      </section>

      {/* ── PROCESS ── */}
      <section className="bg-surface-container-low py-20 px-5 sm:px-8 lg:px-10 xl:px-14 border-y border-[#4e4633]/10">
        <InView className="max-w-7xl mx-auto">
          <motion.div variants={fadeUp} className="mb-12 text-center">
            <p className="text-primary-container text-xs uppercase tracking-[0.3em] mb-3">Our Process</p>
            <h2 className="text-3xl font-black tracking-tighter text-on-surface">From Chaos to Clarity in 6 Phases.</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-6 gap-0">
            {[
              { phase: '01', title: 'Audit', desc: 'We map your current state: tools, workflows, data, pain points.' },
              { phase: '02', title: 'Blueprint', desc: 'A custom architecture plan. Every module, every integration, every workflow.' },
              { phase: '03', title: 'Configure', desc: 'We build the system in a staging environment. You test it before it goes live.' },
              { phase: '04', title: 'Migrate', desc: 'Clean, validated data migration. Every record accounted for.' },
              { phase: '05', title: 'Launch', desc: 'Phased rollout with your team. No big-bang launches. Zero disruption.' },
              { phase: '06', title: 'Optimize', desc: 'Ongoing improvements. The system gets better as you use it.' },
            ].map((p) => (
              <motion.div key={p.phase} variants={fadeUp} className="p-6 border-t border-b border-r border-[#4e4633]/10 first:border-l relative">
                <div className="text-3xl font-black text-[#4e4633]/20 mb-3">{p.phase}</div>
                <h4 className="font-black text-on-surface uppercase text-xs tracking-wider mb-2">{p.title}</h4>
                <p className="text-on-surface-variant text-xs leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </InView>
      </section>

      {/* ── RESULTS ── */}
      <section className="py-24 px-5 sm:px-8 lg:px-10 xl:px-14 max-w-7xl mx-auto">
        <InView>
          <motion.div variants={fadeUp} className="mb-12 text-center">
            <p className="text-primary-container text-xs uppercase tracking-[0.3em] mb-3">Measurable Outcomes</p>
            <h2 className="text-3xl font-black tracking-tighter text-on-surface">Numbers Don't Lie.</h2>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { val: '96%', lbl: 'Faster order processing', accent: true },
              { val: '40%', lbl: 'Reduction in admin costs', accent: false },
              { val: '3x', lbl: 'Faster month-end close', accent: false },
              { val: '100%', lbl: 'Data migration accuracy', accent: true },
            ].map((s) => (
              <motion.div key={s.lbl} variants={fadeUp} className="p-8 bg-surface-container-low border border-[#4e4633]/10">
                <p className={`text-4xl md:text-5xl font-black tracking-tighter mb-2 ${s.accent ? 'text-primary-container' : 'text-on-surface'}`}>{s.val}</p>
                <p className="text-on-surface-variant text-xs uppercase tracking-widest">{s.lbl}</p>
              </motion.div>
            ))}
          </div>
        </InView>
      </section>

      {/* ── CTA ── */}
      <section className="bg-surface-container-lowest border-t border-[#4e4633]/10 py-24 px-5 sm:px-8 lg:px-10 xl:px-14 text-center relative overflow-hidden">
        <div className="forge-grid absolute inset-0 opacity-20" />
        <InView className="max-w-3xl mx-auto relative z-10">
          <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-black tracking-tighter text-on-surface mb-6">
            Let's Unify Your Business<br />on <span className="text-primary-container">One Platform.</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-on-surface-variant text-lg mb-10">
            Book a free ERP audit. We'll map your current workflows and show you exactly what a unified Odoo system would look like — and what it would cost you NOT to build it.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <motion.button className="molten-gradient text-on-primary px-10 py-5 font-bold uppercase tracking-widest text-sm" whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(245,197,24,0.3)' }} whileTap={{ scale: 0.97 }}>
                Book Free ERP Audit
              </motion.button>
            </Link>
            <Link to="/portfolio">
              <button className="border border-[#9a9078]/50 text-on-surface px-10 py-5 font-bold uppercase tracking-widest text-sm hover:bg-surface-container-low transition-all">
                See Client Results
              </button>
            </Link>
          </motion.div>
          <motion.p variants={fadeUp} className="text-on-surface-variant text-xs mt-6 opacity-50">45-minute call. No commitment. Written summary delivered within 24 hours.</motion.p>
        </InView>
      </section>
    </main>
    </>
  )
}
