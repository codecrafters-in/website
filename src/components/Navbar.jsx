import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { label: 'Services', to: '/services' },
  { label: 'AI Forge', to: '/ai-forge' },
  { label: 'Odoo Solutions', to: '/odoo-solutions' },
  { label: 'Brand Design', to: '/brand-design' },
  { label: 'Case Studies', to: '/portfolio' },
  { label: 'About', to: '/about' },
]

export default function Navbar() {
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const isActive = (to) => location.pathname === to

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#131313]/98 shadow-[0_1px_0_rgba(245,197,24,0.08)] backdrop-blur-xl'
          : 'bg-[#131313]/80 backdrop-blur-md'
      } border-b border-[#F5C518]/8`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="flex justify-between items-center px-5 sm:px-8 lg:px-10 xl:px-16 h-16 max-w-screen-2xl mx-auto">

        {/* Logo */}
        <Link to="/" className="flex items-center shrink-0 hover:opacity-90 transition-opacity" aria-label="CodeCrafters home">
          <img
            src="/images/dark_logo.png"
            alt="CodeCrafters"
            className="h-16 w-auto object-contain"
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`relative font-semibold tracking-wide uppercase text-[11px] transition-colors duration-200 whitespace-nowrap py-1 ${
                isActive(link.to)
                  ? 'text-[#F5C518]'
                  : 'text-[#A09880] hover:text-white'
              }`}
            >
              {link.label}
              {isActive(link.to) && (
                <motion.span
                  layoutId="nav-indicator"
                  className="absolute -bottom-[1px] left-0 right-0 h-[2px] bg-[#F5C518]"
                />
              )}
            </Link>
          ))}
        </div>

        {/* CTA + hamburger */}
        <div className="flex items-center gap-4">
          <Link
            to="/contact"
            className="hidden sm:inline-flex items-center bg-[#F5C518] text-[#131313] font-bold px-5 py-2.5 text-[11px] uppercase tracking-wider hover:bg-white transition-colors whitespace-nowrap"
          >
            Book Free Audit
          </Link>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden text-[#A09880] hover:text-[#F5C518] transition-colors p-1.5 -mr-1.5"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <span className="material-symbols-outlined text-2xl leading-none">
              {menuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 top-16 bg-black/60 z-40 lg:hidden"
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 right-0 bg-[#0E0E0E] border-b border-[#F5C518]/10 z-50 lg:hidden"
            >
              <div className="px-5 sm:px-8 py-4 flex flex-col divide-y divide-[#4e4633]/10">
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`font-semibold tracking-wide uppercase text-sm transition-colors py-4 ${
                      isActive(link.to) ? 'text-[#F5C518]' : 'text-[#A09880] hover:text-white'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="pt-5 pb-2">
                  <Link
                    to="/contact"
                    className="block text-center bg-[#F5C518] text-[#131313] font-bold px-6 py-3.5 text-sm uppercase tracking-wider hover:bg-white transition-colors"
                  >
                    Book Free Audit
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  )
}
