import { Link } from 'react-router-dom'
import { useState } from 'react'
import { motion } from 'framer-motion'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (email) setSubscribed(true)
  }

  return (
    <footer className="bg-[#0E0E0E] w-full pt-16 pb-8 border-t border-[#4E4633]/20">
      <div className="max-w-screen-2xl mx-auto px-5 sm:px-8 lg:px-10 xl:px-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">

          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link to="/" className="inline-block mb-5 hover:opacity-80 transition-opacity" aria-label="CodeCrafters home">
              <img
                src="/images/dark_logo.png"
                alt="CodeCrafters"
                className="h-14 w-auto object-contain"
              />
            </Link>
            <p className="text-[#8A7F6A] text-sm leading-relaxed mb-6 max-w-xs">
              We forge AI-powered systems and Odoo ERP infrastructure that cut costs, eliminate bottlenecks, and scale with your ambitions.
            </p>
            <div className="flex items-center gap-4">
              <a href="https://linkedin.com/company/codecrafters-in" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="text-[#4E4633] hover:text-[#F5C518] transition-colors">
                <span className="material-symbols-outlined text-xl">hub</span>
              </a>
              <a href="https://github.com/codecrafters-in" target="_blank" rel="noreferrer" aria-label="GitHub" className="text-[#4E4633] hover:text-[#F5C518] transition-colors">
                <span className="material-symbols-outlined text-xl">terminal</span>
              </a>
              <a href="mailto:hello@codecrafters.in" aria-label="Email" className="text-[#4E4633] hover:text-[#F5C518] transition-colors">
                <span className="material-symbols-outlined text-xl">mail</span>
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h5 className="text-white font-bold text-[10px] uppercase tracking-[0.15em] mb-5">Services</h5>
            <ul className="space-y-3">
              {[
                { label: 'AI Automation & LLMs', to: '/ai-forge' },
                { label: 'Odoo ERP Architecture', to: '/odoo-solutions' },
                { label: 'Cloud Infrastructure', to: '/services' },
                { label: 'Smart Dashboards', to: '/services' },
                { label: 'Cyber Security', to: '/services' },
              ].map((item) => (
                <li key={item.label}>
                  <Link to={item.to} className="text-[#8A7F6A] hover:text-[#F5C518] text-sm transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h5 className="text-white font-bold text-[10px] uppercase tracking-[0.15em] mb-5">Company</h5>
            <ul className="space-y-3">
              {[
                { label: 'About Us', to: '/about' },
                { label: 'Case Studies', to: '/portfolio' },
                { label: 'Contact Us', to: '/contact' },
                { label: 'Book a Free Audit', to: '/contact' },
                { label: 'Privacy Policy', to: '/privacy' },
              ].map((item) => (
                <li key={item.label}>
                  <Link to={item.to} className="text-[#8A7F6A] hover:text-[#F5C518] text-sm transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h5 className="text-white font-bold text-[10px] uppercase tracking-[0.15em] mb-5">Get Insights</h5>
            <p className="text-[#8A7F6A] text-xs leading-relaxed mb-5">
              Bi-weekly tactical insights on AI automation and Odoo strategy — straight to your inbox.
            </p>
            {subscribed ? (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-[#F5C518] text-sm font-bold flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-base">check_circle</span>
                You're in. Watch your inbox.
              </motion.div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex border border-[#4e4633]/30 focus-within:border-[#F5C518]/60 transition-colors">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your work email"
                  required
                  className="bg-transparent text-xs text-white flex-1 py-3 px-3 focus:ring-0 focus:outline-none placeholder:text-[#4e4633]"
                />
                <button type="submit" className="px-3 text-[#F5C518] hover:text-white transition-colors border-l border-[#4e4633]/30">
                  <span className="material-symbols-outlined text-base">arrow_forward</span>
                </button>
              </form>
            )}

            <div className="mt-8 p-4 border border-[#4e4633]/20 bg-[#1c1b1b]/40">
              <p className="text-[#4E4633] text-[10px] uppercase tracking-widest mb-1.5">Free First Step</p>
              <Link to="/contact" className="text-[#F5C518] text-xs font-bold hover:underline">
                Get your free technical audit →
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-6 border-t border-[#4E4633]/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-[#4E4633] text-[11px]">
            © {new Date().getFullYear()} CodeCrafters. All rights reserved. · codecrafters.in
          </p>
          <div className="flex gap-6">
            <Link to="/privacy" className="text-[#4E4633] text-[11px] hover:text-[#F5C518] transition-colors">Privacy</Link>
            <Link to="/terms" className="text-[#4E4633] text-[11px] hover:text-[#F5C518] transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
