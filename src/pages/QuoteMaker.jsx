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

export default function QuoteMaker() {
  return (
    <>
      <SEO
        title="QuoteMaker — Professional Quote & Proposal Builder | CodeCrafters"
        description="Create professional quotes in minutes. Share via link — no client login needed. Get notified when clients view or accept. Free to start. Built by CodeCrafters."
        keywords="QuoteMaker, professional quote builder, proposal software India, invoice quote tool freelancers, quote and invoice software, share quote link client, quote builder free"
        path="/products/quotemaker"
      />
      <main className="pt-24 min-h-screen">

        {/* ── HERO ── */}
        <section className="industrial-grid relative overflow-hidden px-5 sm:px-8 lg:px-10 xl:px-14 py-20 md:py-28">
          <div className="max-w-7xl mx-auto">
            <motion.div variants={stagger} initial="hidden" animate="visible" className="max-w-3xl">
              <motion.div variants={fadeUp} className="flex items-center gap-3 mb-6">
                <span className="text-[9px] font-black uppercase tracking-widest text-[#f5c518] bg-[#f5c518]/10 border border-[#f5c518]/20 px-2 py-1">SaaS Product by CodeCrafters</span>
                <span className="text-[9px] font-bold uppercase tracking-widest text-green-400">● Live</span>
              </motion.div>
              <motion.h1 variants={fadeUp} className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tighter text-on-surface mb-6 leading-none">
                CLOSE MORE<br />
                DEALS,<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-container">FASTER.</span>
              </motion.h1>
              <motion.p variants={fadeUp} className="text-on-surface-variant text-lg md:text-xl leading-relaxed mb-8 max-w-xl">
                Create professional quotes in minutes. Share via a single link — no client login needed. Know the instant they open it or accept.
              </motion.p>
              <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
                <a href="https://quotemaker.codecrafters.in/" target="_blank" rel="noopener noreferrer">
                  <motion.button
                    className="flex items-center gap-2 bg-[#f5c518] text-[#131313] px-8 py-4 font-black text-sm uppercase tracking-widest hover:brightness-110 transition-all"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Try Free — No Credit Card
                    <span className="material-symbols-outlined text-base">arrow_forward</span>
                  </motion.button>
                </a>
              </motion.div>
              <motion.p variants={fadeUp} className="text-[#4e4633] text-xs mt-4 uppercase tracking-widest">
                Free to start · No credit card required
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* ── PROBLEM ── */}
        <section className="bg-surface-container-low border-y border-[#4e4633]/15 py-20 px-5 sm:px-8 lg:px-10 xl:px-14">
          <InView className="max-w-7xl mx-auto">
            <motion.p variants={fadeUp} className="text-primary-container text-xs font-bold uppercase tracking-[0.3em] mb-4">Sound Familiar?</motion.p>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-black tracking-tighter uppercase text-on-surface mb-12">
              Sending Quotes in<br />WhatsApp? Google Docs?
            </motion.h2>
            <motion.div variants={stagger} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                { icon: 'sentiment_dissatisfied', title: 'Looks Unprofessional', body: "A quote copy-pasted into a WhatsApp message or a messy Google Doc tells your client you cut corners. First impressions cost deals." },
                { icon: 'visibility_off', title: 'No Idea If They Opened It', body: "You send the quote and then... silence. You don't know if they read it, ignored it, or are waiting. You're guessing when to follow up." },
                { icon: 'schedule', title: 'Chasing Clients for Hours', body: "Back-and-forth emails, missed calls, \"I'll sign it tomorrow\" — the follow-up is eating your time before the deal is even closed." },
              ].map((p) => (
                <motion.div key={p.title} variants={fadeUp} className="p-6 bg-surface-container-lowest border border-[#4e4633]/15">
                  <span className="material-symbols-outlined text-[#4e4633]/50 text-2xl mb-4 block">{p.icon}</span>
                  <h3 className="font-bold text-on-surface text-sm mb-2">{p.title}</h3>
                  <p className="text-on-surface-variant text-xs leading-relaxed">{p.body}</p>
                </motion.div>
              ))}
            </motion.div>
          </InView>
        </section>

        {/* ── FEATURES ── */}
        <section className="py-20 px-5 sm:px-8 lg:px-10 xl:px-14 industrial-grid">
          <InView className="max-w-7xl mx-auto">
            <motion.p variants={fadeUp} className="text-primary-container text-xs font-bold uppercase tracking-[0.3em] mb-4">What QuoteMaker Does</motion.p>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-black tracking-tighter uppercase text-on-surface mb-14">
              Everything You Need.<br />Nothing You Don't.
            </motion.h2>
            <motion.div variants={stagger} className="grid md:grid-cols-2 gap-6">
              {[
                {
                  icon: 'description',
                  title: 'Build Beautiful Quotes in Minutes',
                  body: 'Add line items, set quantities and prices, apply taxes and discounts. Your quote looks polished every single time — no design skills needed.',
                  badge: 'Core Feature',
                },
                {
                  icon: 'link',
                  title: 'Share via Link — No Login for Clients',
                  body: 'Send one link. Your client opens it on any device, in any browser — no account, no app, no friction. They see a clean, professional proposal.',
                  badge: 'Zero Friction',
                },
                {
                  icon: 'notifications_active',
                  title: 'Know When They Open It',
                  body: "You're notified the instant your client views the quote. No more wondering. Follow up at exactly the right moment — when it's top of mind.",
                  badge: 'Real-Time Tracking',
                },
                {
                  icon: 'task_alt',
                  title: 'One-Click Accept for Clients',
                  body: "Clients accept with one click. You get notified immediately. No paperwork, no back-and-forth. The deal is closed while they're still engaged.",
                  badge: 'Fast Close',
                },
                {
                  icon: 'receipt_long',
                  title: 'Convert Quote to Invoice Instantly',
                  body: "Once accepted, turn the quote into a professional invoice in one click. Same line items, same branding — ready to send.",
                  badge: 'Save Time',
                },
                {
                  icon: 'inventory_2',
                  title: 'Product Catalog & Templates',
                  body: "Save your products and services once. Reuse them across quotes with autocomplete. Build quote templates for your most common proposals.",
                  badge: 'Speed',
                },
              ].map((f) => (
                <motion.div key={f.title} variants={fadeUp} className="flex gap-5 p-6 bg-surface-container-low border border-[#4e4633]/10 hover:border-[#f5c518]/20 transition-colors group">
                  <div className="flex-shrink-0 w-10 h-10 bg-[#f5c518]/10 border border-[#f5c518]/15 flex items-center justify-center group-hover:bg-[#f5c518]/15 transition-colors">
                    <span className="material-symbols-outlined text-primary-container text-base">{f.icon}</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <h3 className="font-bold text-on-surface text-sm">{f.title}</h3>
                    </div>
                    <span className="text-[8px] font-bold uppercase tracking-widest text-primary-container bg-primary-container/10 px-1.5 py-0.5 mb-2 inline-block">{f.badge}</span>
                    <p className="text-on-surface-variant text-xs leading-relaxed">{f.body}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </InView>
        </section>

        {/* ── HOW IT WORKS ── */}
        <section className="bg-surface-container-low border-y border-[#4e4633]/15 py-20 px-5 sm:px-8 lg:px-10 xl:px-14">
          <InView className="max-w-7xl mx-auto">
            <motion.p variants={fadeUp} className="text-primary-container text-xs font-bold uppercase tracking-[0.3em] mb-4">How It Works</motion.p>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-black tracking-tighter uppercase text-on-surface mb-14">
              3 Steps to a Closed Deal
            </motion.h2>
            <motion.div variants={stagger} className="grid md:grid-cols-3 gap-6">
              {[
                { step: '01', icon: 'edit_note', title: 'Build Your Quote', body: 'Add your client details, line items, and pricing. Apply discounts or taxes. Looks professional out of the box.' },
                { step: '02', icon: 'share', title: 'Send the Link', body: "Copy the quote link and send it via email, WhatsApp, or anywhere. Your client opens it instantly — no login, no friction." },
                { step: '03', icon: 'celebration', title: 'Get Notified & Close', body: "You're alerted when they view it. They accept with one click. You get a notification. Deal closed." },
              ].map((s) => (
                <motion.div key={s.step} variants={fadeUp} className="relative p-8 bg-surface-container-lowest border border-[#4e4633]/15">
                  <span className="absolute top-6 right-6 text-5xl font-black text-[#4e4633]/15">{s.step}</span>
                  <span className="material-symbols-outlined text-primary-container text-2xl mb-5 block">{s.icon}</span>
                  <h3 className="font-bold text-on-surface text-base mb-3">{s.title}</h3>
                  <p className="text-on-surface-variant text-sm leading-relaxed">{s.body}</p>
                </motion.div>
              ))}
            </motion.div>
          </InView>
        </section>

        {/* ── BUILT BY ── */}
        <section className="py-16 px-5 sm:px-8 lg:px-10 xl:px-14">
          <InView className="max-w-7xl mx-auto">
            <motion.div variants={fadeUp} className="flex flex-col md:flex-row items-center justify-between gap-6 p-8 bg-surface-container-low border border-[#4e4633]/15">
              <div>
                <p className="text-[#4e4633] text-[10px] uppercase tracking-widest mb-1">Built by</p>
                <p className="text-on-surface font-bold text-sm">CodeCrafters — the team behind 30+ enterprise ERP and AI systems</p>
                <p className="text-on-surface-variant text-xs mt-1">We built QuoteMaker because we needed it ourselves. Now it's yours.</p>
              </div>
              <Link to="/products" className="text-primary-container text-xs font-bold uppercase tracking-widest hover:underline whitespace-nowrap">
                See All Products →
              </Link>
            </motion.div>
          </InView>
        </section>

        {/* ── CTA ── */}
        <section className="px-5 sm:px-8 lg:px-10 xl:px-14 pb-28">
          <InView className="max-w-7xl mx-auto">
            <motion.div variants={fadeUp} className="bg-[#f5c518] p-12 md:p-20 text-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-5">
                <div className="absolute top-0 right-0 text-[18rem] font-black leading-none text-[#131313] select-none">Q</div>
              </div>
              <div className="relative z-10">
                <p className="text-[#131313]/60 text-xs font-bold uppercase tracking-[0.3em] mb-4">Start Today</p>
                <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-[#131313] mb-4 leading-tight">
                  Stop Losing Deals to<br />Messy Quotes.
                </h2>
                <p className="text-[#131313]/70 text-base md:text-lg mb-8 max-w-md mx-auto">
                  Free to start. Create your first quote in under 5 minutes.
                </p>
                <a href="https://quotemaker.codecrafters.in/" target="_blank" rel="noopener noreferrer">
                  <motion.button
                    className="flex items-center gap-2 bg-[#131313] text-[#f5c518] px-10 py-4 font-black text-sm uppercase tracking-widest hover:bg-[#0a0a0a] transition-all mx-auto"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Try QuoteMaker Free
                    <span className="material-symbols-outlined text-base">open_in_new</span>
                  </motion.button>
                </a>
                <p className="text-[#131313]/50 text-[10px] uppercase tracking-widest mt-4">No credit card · No commitment · Built by CodeCrafters</p>
              </div>
            </motion.div>
          </InView>
        </section>

      </main>
    </>
  )
}
