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

export default function About() {
  return (
    <>
      <SEO
        title="About — Who We Are"
        description="CodeCrafters is a boutique AI and Odoo engineering firm. We work with a select few enterprise clients who demand precision over promises."
        path="/about"
      />
    <main className="pt-24">

      {/* ── HERO ── */}
      <section className="relative px-5 sm:px-8 lg:px-10 xl:px-14 py-24 max-w-7xl mx-auto overflow-hidden">
        <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-16 items-center" variants={stagger} initial="hidden" animate="visible">
          <div className="md:col-span-2 space-y-8">
            <motion.span variants={fadeUp} className="text-primary-container text-sm tracking-[0.3em] uppercase block font-bold">
              Est. 2018 · 50+ Enterprise Clients
            </motion.span>
            <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tighter leading-none text-on-surface">
              We Build Systems<br />
              <span className="text-primary-container">That Last.</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-on-surface-variant text-xl md:text-2xl leading-relaxed max-w-2xl font-light">
              CodeCrafters was built on one conviction: most enterprise software is fragile. We forge infrastructure that compounds in value over time.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
              <Link to="/contact">
                <motion.button className="molten-gradient text-on-primary px-8 py-4 font-bold text-sm uppercase tracking-widest rounded-sm" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  Start a Partnership
                </motion.button>
              </Link>
              <Link to="/portfolio">
                <button className="border border-[#4e4633]/40 text-on-surface px-8 py-4 font-bold text-sm uppercase tracking-widest rounded-sm hover:bg-surface-container-high transition-all">
                  Our Case Studies
                </button>
              </Link>
            </motion.div>
          </div>
          <motion.div variants={fadeUp} className="relative aspect-[2/3] bg-surface-container-low rounded-lg overflow-hidden group">
            <img src="/images/about-hero.jpg" alt="Architectural blueprints" className="w-full h-full object-cover grayscale opacity-50 group-hover:scale-110 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-80" />
          </motion.div>
        </motion.div>
      </section>

      {/* ── FOUNDER SECTION ── */}
      <section id="process-section" className="bg-surface-container-low py-24 md:py-32 px-5 sm:px-8 lg:px-10 xl:px-14">
        <InView className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
          <motion.div variants={fadeUp} className="relative aspect-square">
            <div className="absolute inset-0 border border-[#4e4633] opacity-20 translate-x-4 translate-y-4" />
            <img src="/images/founder-portrait.jpg" alt="Founder" className="w-full h-full object-cover rounded-sm relative z-10 contrast-125" />
            <motion.div
              className="absolute -bottom-6 -right-6 glass-panel p-6 md:p-8 z-20 max-w-xs"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <p className="font-bold text-base md:text-lg text-primary">"Precision is the bridge between imagination and reality."</p>
              <p className="text-on-surface-variant text-xs mt-2 uppercase tracking-widest">— Julian Thorne, Founder & CEO</p>
            </motion.div>
          </motion.div>

          <div className="space-y-8">
            <motion.h2 variants={fadeUp} className="text-4xl font-bold tracking-tight text-on-surface uppercase italic">Why We Built This</motion.h2>
            <motion.div variants={stagger} className="space-y-5 text-on-surface-variant leading-relaxed text-lg">
              <motion.p variants={fadeUp}>
                In 2018, Julian Thorne watched a $50M ERP project fail at a Fortune 500 client — not because of technical limitations, but because the implementors didn't understand the business.
              </motion.p>
              <motion.p variants={fadeUp}>
                CodeCrafters was his answer: a firm where every architect spends the first week learning your business before writing a single line of code. That discipline is now our competitive moat.
              </motion.p>
              <motion.p variants={fadeUp}>
                Today, we've applied that philosophy to 50+ enterprises across logistics, finance, healthcare, and manufacturing — with a 94% retention rate and zero critical system failures.
              </motion.p>
            </motion.div>
            <motion.div variants={fadeUp} className="flex gap-10 pt-4">
              {[['50+', 'Projects Delivered'], ['94%', 'Client Retention'], ['0', 'Critical Failures']].map(([v, l]) => (
                <div key={l}>
                  <span className="block text-3xl font-black text-primary">{v}</span>
                  <span className="text-[10px] uppercase tracking-widest text-outline">{l}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </InView>
      </section>

      {/* ── VALUES BENTO ── */}
      <section className="py-24 md:py-32 px-5 sm:px-8 lg:px-10 xl:px-14 max-w-7xl mx-auto">
        <InView>
          <motion.div variants={fadeUp} className="text-center mb-16 space-y-4">
            <h2 className="text-5xl font-black tracking-tighter uppercase">How We Work</h2>
            <div className="h-1 w-24 molten-gradient mx-auto" />
          </motion.div>
          <motion.div variants={stagger} className="grid grid-cols-1 md:grid-cols-6 gap-6 lg:h-[600px]">
            <motion.div variants={fadeUp} className="md:col-span-3 md:row-span-2 glass-panel p-10 md:p-12 flex flex-col justify-end group">
              <span className="material-symbols-outlined text-primary text-5xl mb-8">precision_manufacturing</span>
              <h3 className="text-3xl font-bold mb-4">Business First, Code Second</h3>
              <p className="text-on-surface-variant leading-relaxed">
                Every engagement starts with a week of stakeholder interviews. We map your business before we design your system. The result: software your team actually uses, because it was built for how they actually work.
              </p>
            </motion.div>
            <motion.div variants={fadeUp} className="md:col-span-3 glass-panel p-8 flex gap-6 items-center">
              <div className="bg-surface-container-highest p-4 rounded-sm shrink-0">
                <span className="material-symbols-outlined text-primary-container">auto_fix_high</span>
              </div>
              <div>
                <h4 className="font-bold text-lg">Compound Value</h4>
                <p className="text-sm text-on-surface-variant">We build systems designed to get smarter over time. AI learns your patterns. Odoo evolves with your business. Your ROI compounds.</p>
              </div>
            </motion.div>
            <motion.div variants={fadeUp} className="md:col-span-3 grid grid-cols-2 gap-6">
              <div className="glass-panel p-8 flex flex-col justify-center text-center">
                <span className="text-4xl font-black text-primary mb-2">99.9%</span>
                <p className="text-[10px] uppercase tracking-tighter text-outline">Uptime Guarantee</p>
              </div>
              <div className="bg-primary-container p-8 flex flex-col justify-center text-center">
                <span className="text-4xl font-black text-on-primary-container mb-2">24/7</span>
                <p className="text-[10px] uppercase tracking-tighter text-on-primary-container/60">Support Coverage</p>
              </div>
            </motion.div>
          </motion.div>
        </InView>
      </section>

      {/* ── WHY ODOO ── */}
      <section className="bg-surface-container-lowest py-24 px-5 sm:px-8 lg:px-10 xl:px-14">
        <InView className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <motion.div variants={fadeUp} className="max-w-xl">
              <h2 className="text-4xl font-bold tracking-tight text-on-surface mb-4">Why We Bet on Odoo.</h2>
              <p className="text-on-surface-variant text-lg">We've evaluated every major ERP platform. Odoo wins on every dimension that matters for growth-stage enterprises.</p>
            </motion.div>
            <motion.div variants={fadeUp}>
              <Link to="/odoo-solutions" className="text-primary-container text-sm flex items-center gap-2 group font-bold uppercase tracking-widest">
                Full Odoo Details <span className="material-symbols-outlined group-hover:translate-x-2 transition-transform">arrow_forward</span>
              </Link>
            </motion.div>
          </div>
          <motion.div variants={stagger} className="grid grid-cols-1 md:grid-cols-4 gap-0 divide-y md:divide-y-0 md:divide-x divide-[#4e4633]/10">
            {[
              { icon: 'hub', title: 'Unified Platform', body: 'One system for CRM, ERP, inventory, HR, and accounting. No more duct-tape integrations.' },
              { icon: 'speed', title: 'Deploy in Days', body: 'Modular architecture means you go live with what you need today and add more tomorrow.' },
              { icon: 'monitoring', title: 'Real-Time Visibility', body: 'Live dashboards across every business unit. Make decisions on actual data, not yesterday\'s spreadsheet.' },
              { icon: 'security', title: 'Enterprise Security', body: 'SOC2-ready infrastructure. Role-based access. Audit trails on every transaction.' },
            ].map((item) => (
              <motion.div key={item.title} variants={fadeUp} className="p-8 md:p-10 hover:bg-surface-container-low transition-colors duration-300">
                <span className="material-symbols-outlined text-primary-container mb-5 text-3xl block">{item.icon}</span>
                <h4 className="font-bold text-xl mb-3">{item.title}</h4>
                <p className="text-sm text-on-surface-variant leading-relaxed">{item.body}</p>
              </motion.div>
            ))}
          </motion.div>
        </InView>
      </section>

      {/* ── TEAM / FINAL CTA ── */}
      <section className="py-24 px-5 sm:px-8 lg:px-10 xl:px-14 text-center">
        <InView className="max-w-3xl mx-auto space-y-10">
          <motion.h2 variants={fadeUp} className="text-5xl font-extrabold tracking-tighter">Ready to Work with a Team<br />That Actually Delivers?</motion.h2>
          <motion.p variants={fadeUp} className="text-on-surface-variant text-xl italic font-light">
            No offshore handoffs. No junior developers on your account. Senior architects, end to end.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-col md:flex-row gap-6 justify-center">
            <Link to="/contact">
              <motion.button className="molten-gradient text-on-primary font-bold py-4 px-10 rounded-sm uppercase tracking-widest text-sm shadow-xl shadow-primary-container/10" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
                Start a Partnership
              </motion.button>
            </Link>
            <Link to="/portfolio">
              <button className="border border-[#4e4633] text-on-surface font-bold py-4 px-10 rounded-sm uppercase tracking-widest text-sm hover:bg-surface-container-high transition-colors">
                See Our Work
              </button>
            </Link>
          </motion.div>
        </InView>
      </section>
    </main>
    </>
  )
}
