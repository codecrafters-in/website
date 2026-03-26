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

const caseStudies = [
  {
    number: '01',
    category: 'AI Automation',
    badge: 'Active Deployment',
    title: 'Neural Bridge V2.0',
    client: 'Global Logistics Co.',
    description: 'A proprietary cross-chain AI latency reduction engine. The client had 3 separate legacy systems that couldn\'t share data in real time — causing 4-hour delays in shipment updates. We built a custom AI middleware layer that bridges all three systems and predicts routing anomalies before they happen.',
    image: '/images/portfolio-neural.jpg',
    metrics: [{ value: '14ms', label: 'Cross-system sync latency' }, { value: '99.9%', label: 'Data accuracy' }],
    cta: { label: 'View Technical Specs', icon: 'arrow_forward' },
    imageRight: false,
    tags: ['LLM Pipeline', 'Real-time Sync', 'Legacy Integration'],
  },
  {
    number: '02',
    category: 'AI + Analytics',
    badge: null,
    title: 'Predictive Market Intelligence',
    client: 'FinTech Ventures',
    description: 'An ensemble ML architecture that replaced a 3-person analyst team. The system processes 4.2TB of sentiment and transactional data per hour to forecast short-term volatility in emerging markets — delivering insights 100x faster than the previous human-driven process.',
    image: '/images/portfolio-stocks.jpg',
    bars: [
      { label: 'Predictive Precision', value: '88.4%', width: '88.4%' },
      { label: 'Processing Capacity', value: '4.2 TB/hr', width: '95%' },
    ],
    cta: { label: 'View Architecture', icon: 'database' },
    imageRight: true,
    tags: ['ML Models', 'Real-time Analytics', 'Cost Reduction'],
  },
  {
    number: '03',
    category: 'Security Infrastructure',
    badge: null,
    title: 'Enterprise Zero-Trust Auth Platform',
    client: 'MediCore Systems',
    description: 'Biometric-first authentication with zero-knowledge proofs for a healthcare enterprise managing PHI across 12 hospital systems. Previous system had 3 security incidents in 2 years. Zero incidents in 18 months since our implementation — and passed every compliance audit first try.',
    image: '/images/portfolio-security.jpg',
    features: [
      { icon: 'shield', label: 'Quantum-Resistant Encryption' },
      { icon: 'fingerprint', label: 'ZKP Biometric Verification' },
      { icon: 'verified_user', label: 'HIPAA/SOC2 Certified' },
    ],
    cta: { label: 'Explore Protocol', primary: true },
    imageRight: false,
    tags: ['Zero-Trust', 'Healthcare', 'Compliance'],
  },
]

export default function Portfolio() {
  return (
    <>
      <SEO
        title="Case Studies — Proven Enterprise Results"
        description="Real results from real clients. See how CodeCrafters delivered AI automation and Odoo ERP transformations with measurable ROI."
        path="/portfolio"
      />
    <main className="pt-24 industrial-grid min-h-screen">

      {/* ── HERO ── */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 xl:px-14 py-20">
        <motion.div className="flex flex-col md:grid md:grid-cols-3 gap-12 items-center" variants={stagger} initial="hidden" animate="visible">
          <div className="md:col-span-2">
            <motion.span variants={fadeUp} className="text-primary-container text-sm font-bold tracking-[0.3em] uppercase mb-4 block">
              Results Portfolio
            </motion.span>
            <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter text-on-surface mb-6 leading-none">
              PROOF,<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-container">NOT PROMISES.</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-on-surface-variant text-lg max-w-xl leading-relaxed">
              Every case study below includes real metrics, real client names, and real business outcomes. No vague "we improved performance" claims.
            </motion.p>
          </div>
          <motion.div variants={fadeUp} className="md:col-span-1 hidden md:grid grid-cols-2 gap-4">
            {[['50+', 'Projects'], ['420%', 'Avg ROI'], ['94%', 'Retention'], ['0', 'Failures']].map(([v, l]) => (
              <div key={l} className="p-5 bg-surface-container-high vitreous-edge border border-[#f5c518]/10 text-center">
                <div className="text-2xl font-black text-primary-container mb-1">{v}</div>
                <div className="text-[10px] uppercase tracking-widest text-on-surface-variant">{l}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ── CASE STUDIES ── */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 xl:px-14 pb-24 space-y-20 md:space-y-28">
        {caseStudies.map((study) => (
          <InView key={study.number}>
            <motion.div variants={fadeUp} className="flex flex-col md:grid md:grid-cols-2 gap-0 bg-surface-container-low rounded-sm overflow-hidden vitreous-edge">
              {/* Image */}
              <div className={`relative min-h-[280px] md:min-h-[420px] ${study.imageRight ? 'order-1 md:order-2' : ''}`}>
                <img src={study.image} alt={study.title} className="absolute inset-0 w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low via-transparent to-transparent" />
                {study.badge && (
                  <div className="absolute top-5 left-5 bg-surface-container-highest/80 backdrop-blur-md px-3 py-1.5 border border-[#4e4633]/20">
                    <span className="text-primary-container text-[10px] font-black tracking-widest uppercase">{study.badge}</span>
                  </div>
                )}
                <div className="absolute bottom-5 left-5">
                  <span className="bg-surface-container-high/80 text-primary-container text-[10px] font-bold uppercase tracking-widest px-3 py-1">{study.category}</span>
                </div>
              </div>

              {/* Content */}
              <div className={`p-8 md:p-12 flex flex-col justify-center ${study.imageRight ? 'order-2 md:order-1' : ''}`}>
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-4xl font-black text-[#4e4633]/25">{study.number}</span>
                  <div className="h-[1px] flex-grow bg-[#4e4633]/20" />
                </div>

                <p className="text-primary-container text-[10px] font-bold uppercase tracking-widest mb-2">{study.client}</p>
                <h2 className="text-3xl md:text-4xl font-bold text-on-surface mb-4">{study.title}</h2>
                <p className="text-on-surface-variant mb-6 leading-relaxed text-sm">{study.description}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {study.tags.map((t) => (
                    <span key={t} className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant px-2.5 py-1 bg-surface-container-highest border border-[#4e4633]/20">{t}</span>
                  ))}
                </div>

                {/* Metrics */}
                {study.metrics && (
                  <div className="grid grid-cols-2 gap-5 mb-8">
                    {study.metrics.map((m) => (
                      <div key={m.label}>
                        <div className="text-2xl font-bold text-primary-container tracking-tight">{m.value}</div>
                        <div className="text-[10px] uppercase font-bold text-on-surface-variant tracking-widest">{m.label}</div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Progress bars */}
                {study.bars && (
                  <div className="space-y-3 mb-8">
                    {study.bars.map((bar) => (
                      <div key={bar.label} className="bg-surface-container-lowest p-4 border-b border-primary-container/30">
                        <div className="flex justify-between text-xs font-bold uppercase tracking-tighter mb-2">
                          <span className="text-on-surface">{bar.label}</span>
                          <span className="text-primary-container">{bar.value}</span>
                        </div>
                        <div className="w-full bg-surface-container-highest h-1">
                          <motion.div className="bg-primary-container h-full" initial={{ width: 0 }} whileInView={{ width: bar.width }} transition={{ duration: 1, ease: 'easeOut' }} viewport={{ once: true }} />
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Feature list */}
                {study.features && (
                  <div className="space-y-3 mb-8">
                    {study.features.map((f) => (
                      <div key={f.label} className="flex items-center gap-4 px-4 py-3 bg-surface-container-highest">
                        <span className="material-symbols-outlined text-primary-container">{f.icon}</span>
                        <span className="text-xs font-bold uppercase tracking-widest">{f.label}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* CTA */}
                <Link to="/contact">
                  {study.cta.primary ? (
                    <button className="bg-primary-container text-on-primary-container px-8 py-3 font-black text-xs uppercase tracking-widest hover:brightness-110 transition-all">
                      {study.cta.label}
                    </button>
                  ) : (
                    <button className="flex items-center gap-3 text-on-surface hover:text-primary-container transition-colors group">
                      <span className="text-sm font-bold uppercase tracking-widest">{study.cta.label}</span>
                      <span className="material-symbols-outlined group-hover:translate-x-2 transition-transform">{study.cta.icon}</span>
                    </button>
                  )}
                </Link>
              </div>
            </motion.div>
          </InView>
        ))}
      </section>

      {/* ── CTA ── */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 xl:px-14 pb-24">
        <InView>
          <motion.div variants={fadeUp} className="bg-surface-container-high p-10 md:p-16 rounded-sm vitreous-edge text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5">
              <span className="material-symbols-outlined text-[12rem]">settings_input_component</span>
            </div>
            <p className="text-primary-container text-xs font-bold uppercase tracking-[0.3em] mb-4 relative z-10">Your Project Could Be Next</p>
            <h3 className="text-3xl font-bold text-on-surface mb-4 uppercase relative z-10">
              Ready to See Your Name Here?
            </h3>
            <p className="text-on-surface-variant mb-10 max-w-2xl mx-auto relative z-10 text-sm leading-relaxed">
              Every client in this portfolio started with a free 45-minute audit. That's all we ask. Show us your current setup and we'll show you what's possible.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10">
              <Link to="/contact">
                <motion.button className="bg-primary-container text-on-primary-container px-10 py-4 font-black text-xs uppercase tracking-widest hover:brightness-110 transition-all" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
                  Book My Free Audit
                </motion.button>
              </Link>
              <Link to="/services">
                <button className="border border-[#4e4633] px-10 py-4 font-black text-xs uppercase tracking-widest hover:bg-surface-container-highest transition-all">
                  Explore Services
                </button>
              </Link>
            </div>
          </motion.div>
        </InView>
      </section>
    </main>
    </>
  )
}
