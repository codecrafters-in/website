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

export default function AIForge() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    try {
      const res = await fetch('/api/checklist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'AI Forge Page' }),
      })
      if (!res.ok) throw new Error()
      setSubmitted(true)
      toast.success('Checklist sent! Check your inbox.')
    } catch {
      toast.error('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <SEO
        title="AI Forge — Intelligent Automation Engineering"
        description="LLM pipelines, autonomous agent swarms, and RAG systems engineered for enterprise-scale automation. Reduce manual labour by 80%."
        path="/ai-forge"
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
                <img src="/images/hero-grid.jpg" alt="AI Infrastructure visualization" className="w-full h-full object-cover grayscale brightness-50 contrast-125" />
              </div>
            </div>
            <motion.div
              className="absolute bottom-6 left-6 right-6 md:right-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              <div className="bg-[#3a3939]/80 glass-blur p-5 rounded-sm border border-[#4e4633]/20 max-w-sm">
                <p className="text-[#f5c518] text-xs uppercase tracking-[0.2em] mb-2 font-bold">Live Forge Status</p>
                <h3 className="text-lg font-bold text-on-surface mb-2">System Integrations: 99.9%</h3>
                <div className="w-full bg-surface-container-high h-1 rounded-full overflow-hidden">
                  <motion.div className="bg-primary-container h-full" initial={{ width: 0 }} animate={{ width: '99%' }} transition={{ delay: 1.2, duration: 1.5, ease: 'easeOut' }} />
                </div>
                <p className="text-on-surface-variant text-[10px] mt-2">AI agents processing 2.4M+ tasks/day across all clients</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Text 1/3 */}
          <motion.div className="flex flex-col justify-center space-y-6" variants={stagger} initial="hidden" animate="visible">
            <motion.span variants={fadeUp} className="text-primary-container text-xs uppercase tracking-[0.3em] font-bold">
              Architectural Alchemists
            </motion.span>
            <motion.h1 variants={fadeUp} className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter leading-none text-on-surface">
              WE FORGE <br />
              <span className="text-primary-container">DIGITAL</span> <br />
              INFRASTRUCTURE.
            </motion.h1>
            <motion.p variants={fadeUp} className="text-on-surface-variant text-base leading-relaxed">
              High-precision AI orchestration and Odoo ERP transformation for elite global enterprises. Custom-built. Zero bloat. Guaranteed ROI.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
              <Link to="/contact">
                <motion.button className="molten-gradient text-on-primary px-7 py-4 font-bold text-sm uppercase tracking-widest rounded-sm vitreous-edge" whileHover={{ scale: 1.03, filter: 'brightness(1.1)' }} whileTap={{ scale: 0.97 }}>
                  Start Your Forge
                </motion.button>
              </Link>
              <Link to="/services">
                <button className="border border-[#4e4633]/40 text-on-surface px-7 py-4 font-bold text-sm uppercase tracking-widest rounded-sm hover:bg-surface-container-high transition-all">
                  Our Services
                </button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── AI CAPABILITIES ── */}
      <section className="bg-surface-container-low py-24 px-5 sm:px-8 lg:px-10 xl:px-14 border-y border-[#4e4633]/10">
        <InView className="max-w-7xl mx-auto">
          <motion.div variants={fadeUp} className="mb-12">
            <p className="text-primary-container text-xs uppercase tracking-[0.3em] mb-3">What AI Forge Delivers</p>
            <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-on-surface">
              We Don't Prompt GPT.<br />We Build AI Infrastructure.
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: 'hub', title: 'Custom LLM Pipelines', body: 'Fine-tuned models trained on your proprietary data, deployed in your environment. Your AI understands your business — not just the internet.', stat: '72% avg. task reduction' },
              { icon: 'smart_toy', title: 'Autonomous Agent Swarms', body: 'Multi-step AI agents that handle entire workflows end-to-end: research, decision-making, execution, and reporting — without human handoffs.', stat: '24/7 operation' },
              { icon: 'database', title: 'RAG Systems', body: 'Retrieval-Augmented Generation that queries your documents, databases, and APIs in real time. Answers that are accurate because they\'re grounded in your actual data.', stat: '98.4% accuracy rate' },
            ].map((c) => (
              <motion.div key={c.title} variants={fadeUp} className="p-8 bg-surface-container-lowest border border-[#4e4633]/10 hover:border-[#f5c518]/25 transition-all duration-300 group flex flex-col">
                <span className="material-symbols-outlined text-primary-container text-4xl mb-4 block">{c.icon}</span>
                <h4 className="text-on-surface font-bold text-lg mb-3 uppercase tracking-tight">{c.title}</h4>
                <p className="text-on-surface-variant text-sm leading-relaxed flex-grow">{c.body}</p>
                <p className="text-primary-container text-xs font-bold uppercase tracking-widest mt-5 pt-4 border-t border-[#4e4633]/20">{c.stat}</p>
              </motion.div>
            ))}
          </div>
        </InView>
      </section>

      {/* ── USE CASES ── */}
      <section className="py-24 px-5 sm:px-8 lg:px-10 xl:px-14 max-w-7xl mx-auto">
        <InView>
          <motion.div variants={fadeUp} className="mb-12">
            <p className="text-primary-container text-xs uppercase tracking-[0.3em] mb-3">Real-World Impact</p>
            <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-on-surface">What Our AI Replaces.</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              { before: '3 FTE analysts writing monthly reports', after: 'AI generates daily reports in 30 seconds. 99% cost reduction.', icon: 'bar_chart' },
              { before: 'Customer support team handling 500+ tickets/day', after: 'AI resolves 78% of tickets autonomously. Human team handles only escalations.', icon: 'support_agent' },
              { before: 'Manual data entry from emails & PDFs to ERP', after: 'AI extracts, validates, and syncs data in real time. Zero manual entry.', icon: 'input' },
              { before: 'Weekly compliance checks taking 2 days each', after: 'Continuous AI monitoring. Violations flagged in <5 minutes. Always audit-ready.', icon: 'verified' },
            ].map((uc, i) => (
              <motion.div key={i} variants={fadeUp} className="bg-surface-container-low border border-[#4e4633]/10 overflow-hidden">
                <div className="p-6 border-b border-[#4e4633]/10 flex items-start gap-4">
                  <span className="material-symbols-outlined text-on-surface-variant/40 text-2xl mt-0.5">{uc.icon}</span>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-on-surface-variant/50 mb-1 font-bold">Before</p>
                    <p className="text-on-surface-variant text-sm line-through opacity-60">{uc.before}</p>
                  </div>
                </div>
                <div className="p-6 flex items-start gap-4 bg-surface-container-lowest/50">
                  <span className="material-symbols-outlined text-primary-container text-2xl mt-0.5">check_circle</span>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-primary-container mb-1 font-bold">After CodeCrafters AI</p>
                    <p className="text-on-surface text-sm font-medium">{uc.after}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </InView>
      </section>

      {/* ── LEAD MAGNET ── */}
      <section className="py-16 px-5 sm:px-8 lg:px-10 xl:px-14 max-w-7xl mx-auto">
        <InView>
          <motion.div
            variants={fadeUp}
            className="bg-surface-container rounded-lg vitreous-edge overflow-hidden flex flex-col md:flex-row border border-[#4e4633]/20"
          >
            <div className="md:w-1/2 p-10 md:p-14 flex flex-col justify-center">
              <span className="text-primary-container font-bold text-xs uppercase tracking-[0.3em] mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">download</span> Free Resource
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-on-surface mb-4 uppercase leading-tight">
                The Odoo AI<br />Automation Checklist
              </h2>
              <p className="text-on-surface-variant mb-6 leading-relaxed text-sm">
                14 critical checkpoints used by CTOs at 50+ enterprises to identify where AI can replace manual work in their Odoo stack. 10 minutes to read. Could save you $500K+ per year.
              </p>
              {submitted ? (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3 text-primary-container font-bold">
                  <span className="material-symbols-outlined">check_circle</span>
                  Checklist sent! Check your inbox.
                </motion.div>
              ) : (
                <form className="flex flex-col space-y-3" onSubmit={handleSubmit}>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Corporate Email Address"
                    required
                    className="w-full bg-surface-container-lowest border-0 border-b border-[#4e4633]/40 text-on-surface px-0 py-3 focus:ring-0 focus:border-primary-container transition-all outline-none placeholder:text-on-surface-variant/30 text-sm"
                  />
                  <motion.button
                    type="submit"
                    disabled={loading}
                    className="molten-gradient text-on-primary font-black py-4 uppercase tracking-[0.15em] rounded-sm shadow-xl text-sm disabled:opacity-70"
                    whileHover={loading ? {} : { scale: 1.01, filter: 'brightness(1.08)' }}
                    whileTap={loading ? {} : { scale: 0.98 }}
                  >
                    {loading ? 'Sending...' : 'Generate Access Key'}
                  </motion.button>
                </form>
              )}
              <p className="text-[10px] text-on-surface-variant/40 mt-4 uppercase font-medium">
                Encrypted transmission. No spam, just technical value.
              </p>
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
                  <h4 className="text-base font-black text-on-surface uppercase mb-4">Architecture<br />Manual</h4>
                  <div className="space-y-2 mb-6">
                    {[1, 0.8, 1, 0.7, 0.9].map((w, i) => (
                      <div key={i} className="h-1 bg-on-surface-variant/20" style={{ width: `${w * 100}%`, margin: w < 1 ? '0 auto' : '0' }} />
                    ))}
                  </div>
                  <span className="material-symbols-outlined text-primary-container text-3xl">file_download</span>
                  <p className="text-on-surface-variant text-[10px] mt-2">14 checkpoints · 10 min read</p>
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
            Ready to Deploy Your<br /><span className="text-primary-container">First AI System?</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-on-surface-variant text-lg mb-10 leading-relaxed">
            We'll spend 45 minutes mapping your highest-ROI automation opportunities. No commitment. No sales pitch.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <motion.button
                className="molten-gradient text-on-primary px-10 py-5 font-bold uppercase tracking-widest text-sm"
                whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(245,197,24,0.3)' }}
                whileTap={{ scale: 0.97 }}
              >
                Book Free AI Audit
              </motion.button>
            </Link>
            <Link to="/portfolio">
              <button className="border border-[#9a9078]/50 text-on-surface px-10 py-5 font-bold uppercase tracking-widest text-sm hover:bg-surface-container-low transition-all">
                See AI Case Studies
              </button>
            </Link>
          </motion.div>
        </InView>
      </section>
    </main>
    </>
  )
}
