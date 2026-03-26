import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
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

const deliverables = [
  { icon: 'auto_awesome', title: 'Logo & Identity System', desc: 'Primary logo, variations, icon mark, and usage guidelines. Delivered in all formats — SVG, PNG, PDF.' },
  { icon: 'palette', title: 'Brand Guidelines', desc: 'Typography system, colour palette, spacing rules, tone of voice. A single source of truth your whole team can use.' },
  { icon: 'dashboard', title: 'UI & Design System', desc: 'Component library, design tokens, and Figma files. Ready to hand off to any developer.' },
  { icon: 'present_to_all', title: 'Pitch Deck Design', desc: 'Investor-ready slide deck templates that match your brand and make the right impression in the room.' },
  { icon: 'grid_view', title: 'Social Media Kit', desc: 'LinkedIn banners, post templates, story formats, and profile assets. Consistent across every channel.' },
  { icon: 'description', title: 'Brand Collateral', desc: 'Business cards, email signatures, letterheads, and proposal templates.' },
]

const process = [
  { num: '01', title: 'Discovery', desc: "We learn your business, your market, your competitors, and who you're trying to reach. Strategy before pixels." },
  { num: '02', title: 'Three Concepts', desc: 'We present three distinct brand directions — not variations of one idea. You pick the direction that resonates.' },
  { num: '03', title: 'Refinement', desc: 'One direction, refined to perfection. Two rounds of revisions included. We get the details right.' },
  { num: '04', title: 'Final Delivery', desc: 'Complete asset pack, brand guidelines PDF, and Figma source files. Everything you need, nothing you don\'t.' },
]

const reasons = [
  { icon: 'handshake', title: 'Enterprise Trust Signal', body: 'A polished, consistent brand tells enterprise buyers you are serious. It is the first filter — before they read a word of your proposal.' },
  { icon: 'trending_up', title: 'Sales Enablement', body: 'Sales decks, one-pagers, and email templates that look like they came from a FTSE 500 company. Close faster.' },
  { icon: 'rocket_launch', title: 'Investor Readiness', body: 'Investors fund teams, not just ideas. A strong brand signals operational maturity and reduces perceived risk.' },
  { icon: 'group', title: 'Team Alignment', body: 'A clear brand guide means every teammate, agency, and contractor produces on-brand work without asking you first.' },
]

export default function BrandDesign() {
  return (
    <>
      <SEO
        title="Brand & Identity Design — CodeCrafters"
        description="Logo systems, brand guidelines, UI design systems, pitch decks, and social media kits. Built for enterprise credibility by a technical team that understands product."
        keywords="brand design India, logo design Ahmedabad, brand identity system, UI design system, pitch deck design India"
        path="/brand-design"
      />
    <main className="pt-24 min-h-screen">

      {/* ── HERO ── */}
      <section className="relative px-5 sm:px-8 lg:px-10 xl:px-14 py-20 max-w-7xl mx-auto overflow-hidden">
        <div className="forge-grid absolute inset-0 -z-10" />
        <motion.div className="max-w-4xl" variants={stagger} initial="hidden" animate="visible">
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3 py-1.5 bg-surface-container-high border-l-2 border-primary-container mb-8">
            <span className="material-symbols-outlined text-primary-container text-sm">auto_awesome</span>
            <span className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Brand & Identity Design</span>
          </motion.div>
          <motion.h1 variants={fadeUp} className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tighter text-on-surface leading-[0.9] mb-8">
            YOUR BRAND IS YOUR<br />
            FIRST IMPRESSION.<br />
            <span className="text-primary-container">MAKE IT COUNT.</span>
          </motion.h1>
          <motion.p variants={fadeUp} className="text-on-surface-variant text-xl leading-relaxed max-w-2xl mb-10">
            We design brand identities that make enterprise buyers trust you before you say a word — and keep your team aligned long after the project ends.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
            <Link to="/contact">
              <motion.button
                className="molten-gradient text-[#131313] px-8 py-4 font-bold text-sm uppercase tracking-widest"
                whileHover={{ scale: 1.03, filter: 'brightness(1.1)' }}
                whileTap={{ scale: 0.97 }}
              >
                Book Free Brand Audit
              </motion.button>
            </Link>
            <Link to="/portfolio">
              <button className="border border-[#4e4633]/40 text-on-surface px-8 py-4 font-bold text-sm uppercase tracking-widest hover:border-[#F5C518]/40 transition-colors">
                View Our Work
              </button>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* ── DELIVERABLES ── */}
      <section className="bg-surface-container-low py-24 px-5 sm:px-8 lg:px-10 xl:px-14 border-y border-[#4e4633]/10">
        <InView className="max-w-7xl mx-auto">
          <motion.div variants={fadeUp} className="mb-14">
            <p className="text-primary-container text-xs uppercase tracking-[0.3em] mb-3">What You Get</p>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-on-surface">
              Everything You Need.<br />Nothing You Don't.
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {deliverables.map((d) => (
              <motion.div
                key={d.title}
                variants={fadeUp}
                className="p-8 bg-surface-container-lowest border border-[#4e4633]/10 hover:border-[#f5c518]/30 transition-all group"
              >
                <span className="material-symbols-outlined text-primary-container text-3xl mb-5 block">{d.icon}</span>
                <h3 className="font-black text-on-surface uppercase text-sm tracking-wider mb-3">{d.title}</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed">{d.desc}</p>
              </motion.div>
            ))}
          </div>
        </InView>
      </section>

      {/* ── PROCESS ── */}
      <section className="py-24 px-5 sm:px-8 lg:px-10 xl:px-14 max-w-7xl mx-auto">
        <InView>
          <motion.div variants={fadeUp} className="mb-14 text-center">
            <p className="text-primary-container text-xs uppercase tracking-[0.3em] mb-3">Our Process</p>
            <h2 className="text-4xl font-black tracking-tighter text-on-surface">From Brief to Brand in 4 Stages.</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-0">
            {process.map((step, i) => (
              <motion.div
                key={step.num}
                variants={fadeUp}
                className="p-8 border-t border-b border-[#4e4633]/10 md:border-l relative"
              >
                <div className="text-5xl font-black text-[#4e4633]/20 mb-4">{step.num}</div>
                <h4 className="font-black text-on-surface uppercase text-sm tracking-wider mb-3">{step.title}</h4>
                <p className="text-on-surface-variant text-sm leading-relaxed">{step.desc}</p>
                {i < 3 && (
                  <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                    <span className="material-symbols-outlined text-[#4e4633]/40">chevron_right</span>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </InView>
      </section>

      {/* ── WHY BRAND MATTERS ── */}
      <section className="bg-surface-container-low py-24 px-5 sm:px-8 lg:px-10 xl:px-14 border-y border-[#4e4633]/10">
        <InView className="max-w-7xl mx-auto">
          <motion.div variants={fadeUp} className="mb-14">
            <p className="text-primary-container text-xs uppercase tracking-[0.3em] mb-3">Why It Matters</p>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-on-surface">
              Brand Is Not a Logo.<br />It's a Business Asset.
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {reasons.map((r) => (
              <motion.div key={r.title} variants={fadeUp} className="p-8 bg-surface-container-lowest border border-[#4e4633]/10 flex gap-6">
                <span className="material-symbols-outlined text-primary-container text-3xl shrink-0 mt-0.5">{r.icon}</span>
                <div>
                  <h3 className="font-black text-on-surface uppercase text-sm tracking-wider mb-2">{r.title}</h3>
                  <p className="text-on-surface-variant text-sm leading-relaxed">{r.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </InView>
      </section>

      {/* ── STATS ── */}
      <section className="bg-surface-container-lowest border-y border-[#4e4633]/10 py-20">
        <InView className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 xl:px-14 grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
          {[
            { value: '2–3 wks', label: 'Average Delivery', accent: true },
            { value: '3', label: 'Initial Concepts', accent: false },
            { value: '2x', label: 'Revision Rounds', accent: false },
            { value: '100%', label: 'Source Files Included', accent: true },
          ].map((stat) => (
            <motion.div key={stat.label} variants={fadeUp}>
              <p className={`text-4xl md:text-5xl font-black tracking-tighter mb-2 ${stat.accent ? 'text-primary-container' : 'text-on-surface'}`}>{stat.value}</p>
              <p className="text-on-surface-variant text-xs font-bold uppercase tracking-[0.2em]">{stat.label}</p>
            </motion.div>
          ))}
        </InView>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="bg-surface-container-lowest border-t border-[#4e4633]/10 relative overflow-hidden">
        <div className="forge-grid absolute inset-0 opacity-20" />
        <InView className="max-w-3xl mx-auto px-5 sm:px-8 lg:px-10 xl:px-14 py-24 text-center relative z-10">
          <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-black tracking-tighter text-on-surface mb-6">
            Ready to Build a Brand<br />That <span className="text-primary-container">Closes Deals?</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-on-surface-variant text-lg mb-10 leading-relaxed">
            Book a free 30-minute brand audit. We'll review your current positioning and show you exactly where your brand is costing you clients.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <motion.button
                className="molten-gradient text-[#131313] px-10 py-5 font-bold uppercase tracking-widest text-sm shadow-[0_0_30px_rgba(245,197,24,0.2)]"
                whileHover={{ scale: 1.02, boxShadow: '0 0 40px rgba(245,197,24,0.35)' }}
                whileTap={{ scale: 0.97 }}
              >
                Book Free Brand Audit
              </motion.button>
            </Link>
            <Link to="/services">
              <button className="border border-[#9a9078]/50 text-on-surface px-10 py-5 font-bold uppercase tracking-widest text-sm hover:bg-surface-container-low transition-all">
                All Services
              </button>
            </Link>
          </motion.div>
        </InView>
      </section>
    </main>
    </>
  )
}
