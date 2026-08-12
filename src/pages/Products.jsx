import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}
const stagger = { visible: { transition: { staggerChildren: 0.12 } } }

export default function Products() {
  return (
    <>
      <SEO
        title="Our Products — QuoteMaker & More | CodeCrafters"
        description="Products built and shipped by CodeCrafters. QuoteMaker lets you create professional quotes, share via link, and get notified when clients view or accept. Contact us for a demo."
        keywords="QuoteMaker quote builder, professional proposal software India, invoice and quote tool, SaaS products CodeCrafters"
        path="/products"
      />
      <main className="pt-24 industrial-grid min-h-screen">

        {/* ── HERO ── */}
        <section className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 xl:px-14 py-20">
          <motion.div variants={stagger} initial="hidden" animate="visible">
            <motion.span variants={fadeUp} className="text-primary-container text-sm font-bold tracking-[0.3em] uppercase mb-4 block">
              Our Products
            </motion.span>
            <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter text-on-surface mb-6 leading-none">
              WE DON'T JUST<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-container">BUILD FOR CLIENTS.</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-on-surface-variant text-lg max-w-2xl leading-relaxed">
              We ship our own products too. Real tools, solving real problems — built by the same team that automates enterprise systems.
            </motion.p>
          </motion.div>
        </section>

        {/* ── QUOTEMAKER FEATURED ── */}
        <section className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 xl:px-14 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-surface-container-low vitreous-edge border border-[#f5c518]/20 overflow-hidden"
          >
            <div className="flex flex-col md:grid md:grid-cols-2 gap-0">

              {/* Visual mockup */}
              <div className="relative min-h-[360px] bg-[#0a0a0a] flex items-center justify-center p-10 overflow-hidden order-1">
                <div className="absolute inset-0 overflow-hidden">
                  <div className="w-full h-full opacity-25 mix-blend-luminosity">
                    <img
                      src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1200&q=80&auto=format&fit=crop"
                      alt=""
                      className="w-full h-full object-cover grayscale brightness-50 contrast-125"
                      loading="lazy"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a]/80 via-[#0a0a0a]/60 to-[#0a0a0a]/80" />
                </div>
                <div className="absolute inset-0 opacity-5 dot-grid" />
                <div className="absolute top-4 left-4">
                  <span className="text-[9px] font-black uppercase tracking-widest text-[#f5c518] bg-[#f5c518]/10 border border-[#f5c518]/20 px-2 py-1">Featured Product</span>
                </div>
                <div className="relative z-10 w-full max-w-xs">
                  <div className="bg-[#1c1b1b] border border-[#4e4633]/40 p-6 shadow-2xl">
                    <div className="flex items-center justify-between mb-5">
                      <span className="text-[#f5c518] font-black text-base tracking-tight">QuoteMaker</span>
                      <span className="text-[9px] bg-[#f5c518]/10 text-[#f5c518] px-2 py-0.5 font-bold uppercase tracking-widest border border-[#f5c518]/20">Demo</span>
                    </div>
                    <div className="space-y-1.5 mb-5">
                      <div className="h-1.5 bg-[#4e4633]/30 rounded-full w-2/3" />
                      <div className="h-1.5 bg-[#4e4633]/20 rounded-full w-1/2" />
                    </div>
                    <div className="border border-[#4e4633]/20 mb-4">
                      <div className="grid grid-cols-3 gap-0 text-[8px] font-bold uppercase tracking-widest text-[#4e4633] px-3 py-2 border-b border-[#4e4633]/20">
                        <span>Item</span><span className="text-center">Qty</span><span className="text-right">Price</span>
                      </div>
                      {[['Web Design', '1', '₹25,000'], ['SEO Setup', '1', '₹8,000']].map(([item, qty, price]) => (
                        <div key={item} className="grid grid-cols-3 gap-0 text-[9px] text-on-surface-variant px-3 py-2 border-b border-[#4e4633]/10">
                          <span>{item}</span><span className="text-center">{qty}</span><span className="text-right">{price}</span>
                        </div>
                      ))}
                      <div className="flex justify-between px-3 py-2 text-[10px] font-bold">
                        <span className="text-on-surface-variant uppercase tracking-widest">Total</span>
                        <span className="text-[#f5c518]">₹33,000</span>
                      </div>
                    </div>
                    <button className="w-full bg-[#f5c518] text-[#131313] text-[10px] font-black uppercase tracking-widest py-2.5">
                      Accept Quote
                    </button>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 md:p-12 flex flex-col justify-center order-2">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-[9px] font-black uppercase tracking-widest text-[#f5c518] bg-[#f5c518]/10 border border-[#f5c518]/20 px-2 py-1">SaaS Product</span>
                  <span className="text-[9px] font-bold uppercase tracking-widest text-[#4e4633]">● Available on Request</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-black text-on-surface mb-2 tracking-tight">QuoteMaker</h2>
                <p className="text-primary-container text-sm font-bold mb-4">Professional Quote & Proposal Builder</p>
                <p className="text-on-surface-variant text-sm leading-relaxed mb-6">
                  Stop sending quotes in WhatsApp or Google Docs. Create beautiful, branded proposals in minutes — share via a single link, no client login needed. Get notified the instant they view or accept.
                </p>

                <div className="space-y-3 mb-8">
                  {[
                    { icon: 'description', label: 'Professional quotes in minutes' },
                    { icon: 'link', label: 'Share via link — no client login needed' },
                    { icon: 'notifications_active', label: 'Instant view & accept notifications' },
                    { icon: 'receipt_long', label: 'Convert to invoice in one click' },
                  ].map((f) => (
                    <div key={f.label} className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-primary-container text-base">{f.icon}</span>
                      <span className="text-xs font-semibold text-on-surface-variant tracking-wide">{f.label}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-3 mb-6">
                  <Link to="/contact">
                    <button className="flex items-center gap-2 bg-[#f5c518] text-[#131313] px-6 py-3 font-black text-xs uppercase tracking-widest hover:brightness-110 transition-all">
                      Request a Demo
                      <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </button>
                  </Link>
                  <Link to="/products/quotemaker">
                    <button className="flex items-center gap-2 border border-[#4e4633]/40 text-on-surface px-6 py-3 font-bold text-xs uppercase tracking-widest hover:bg-surface-container-high transition-all">
                      Full Details
                    </button>
                  </Link>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-5 border-t border-[#4e4633]/15">
                  {['Next.js', 'React', 'Supabase', 'Flask', 'Tailwind CSS'].map((t) => (
                    <span key={t} className="text-[9px] font-bold uppercase tracking-wider text-[#4e4633] px-2 py-0.5 border border-[#4e4633]/25">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* ── COMING SOON ── */}
        <section className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 xl:px-14 pb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mb-8"
          >
            <p className="text-primary-container text-xs font-bold uppercase tracking-[0.3em] mb-2">Pipeline</p>
            <h3 className="text-2xl font-black uppercase tracking-tight text-on-surface">More Products Shipping Soon</h3>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {[
              { icon: 'calendar_month', title: 'Booking & Scheduling', desc: 'Let clients book time with you. No back-and-forth. No third-party dependency.', tag: 'Coming Soon' },
              { icon: 'receipt', title: 'Invoice Tracker', desc: 'Track all outstanding invoices, send automated reminders, reconcile payments.', tag: 'In Development' },
              { icon: 'hub', title: 'Client Portal', desc: 'One link for clients to see all quotes, invoices, and project updates in one place.', tag: 'Planned' },
            ].map((p) => (
              <div key={p.title} className="p-6 bg-surface-container-low border border-dashed border-[#4e4633]/20 flex flex-col gap-3 opacity-55 hover:opacity-70 transition-opacity">
                <span className="material-symbols-outlined text-[#4e4633]/60 text-2xl">{p.icon}</span>
                <span className="text-[9px] font-black uppercase tracking-widest text-[#4e4633] bg-[#4e4633]/10 px-2 py-0.5 self-start">{p.tag}</span>
                <h4 className="font-bold text-on-surface text-sm">{p.title}</h4>
                <p className="text-on-surface-variant text-xs leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </motion.div>
        </section>

      </main>
    </>
  )
}
