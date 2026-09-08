import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Icon from './ui/Icon.jsx'
import ArcadeButton from '../arcade/ArcadeButton.jsx'
import { nav, site } from '../data/site.js'
import { solutions } from '../data/solutions.js'
import { lockScroll, unlockScroll } from '../lib/scrollLock.js'

export default function Navbar() {
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [megaOpen, setMegaOpen] = useState(false)
  const [mobileSolutions, setMobileSolutions] = useState(false)
  const closeTimer = useRef(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
    setMegaOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (menuOpen) lockScroll()
    else unlockScroll()
    return () => {
      if (menuOpen) unlockScroll()
    }
  }, [menuOpen])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setMenuOpen(false)
        setMegaOpen(false)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const isActive = (to) => (to === '/' ? location.pathname === '/' : location.pathname.startsWith(to))

  const openMega = () => {
    clearTimeout(closeTimer.current)
    setMegaOpen(true)
  }
  const scheduleCloseMega = () => {
    clearTimeout(closeTimer.current)
    closeTimer.current = setTimeout(() => setMegaOpen(false), 140)
  }

  return (
    <header
      className={`fixed top-0 inset-x-0 z-nav transition-all duration-500 ${
        scrolled || menuOpen ? 'bg-surface/85 glass-blur shadow-edge' : 'bg-transparent'
      }`}
    >
      <nav className="site-container flex items-center justify-between h-[72px]" aria-label="Main navigation">
        <Link to="/" className="flex items-center shrink-0 hover:opacity-90 transition-opacity relative z-10" aria-label={`${site.name} home`}>
          <img src="/images/light_logo.png" alt={site.name} width="220" height="56" className="h-12 md:h-14 w-auto object-contain" />
        </Link>

        {/* Desktop */}
        <div className="hidden lg:flex items-center gap-9 absolute left-1/2 -translate-x-1/2">
          {nav.map((link) =>
            link.mega ? (
              <div key={link.to} className="relative" onMouseEnter={openMega} onMouseLeave={scheduleCloseMega}>
                <Link
                  to={link.to}
                  aria-haspopup="true"
                  aria-expanded={megaOpen}
                  onFocus={openMega}
                  className={`relative inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.2em] py-2 transition-colors ${
                    isActive(link.to) ? 'text-primary-container' : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  {link.label}
                  <Icon name="chevron-down" size={13} className={`transition-transform duration-300 ${megaOpen ? 'rotate-180' : ''}`} />
                  {isActive(link.to) && <motion.span layoutId="nav-indicator" className="absolute -bottom-0.5 left-0 right-0 h-px bg-primary-container" />}
                </Link>
                <AnimatePresence>
                  {megaOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.98 }}
                      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute left-1/2 -translate-x-1/2 top-full pt-4"
                      onMouseEnter={openMega}
                      onMouseLeave={scheduleCloseMega}
                    >
                      <div className="vitreous-glass rounded-lg p-3 w-[720px] grid grid-cols-2 gap-1 shadow-ambient">
                        {solutions.map((s) => (
                          <Link
                            key={s.slug}
                            to={`/solutions/${s.slug}`}
                            className="group flex gap-4 p-4 rounded-sm hover:bg-surface-container-low/80 transition-colors"
                          >
                            <span className="mt-0.5 w-9 h-9 shrink-0 rounded-sm bg-surface-container-lowest shadow-edge flex items-center justify-center text-primary-container">
                              <Icon name={s.icon} size={18} />
                            </span>
                            <span>
                              <span className="block font-mono text-[9px] uppercase tracking-[0.2em] text-outline mb-1">
                                {s.num} · {s.eyebrow}
                              </span>
                              <span className="block text-on-surface text-sm font-semibold group-hover:text-primary transition-colors">{s.title}</span>
                              <span className="block text-on-surface-variant text-xs leading-relaxed mt-1">{s.short}</span>
                            </span>
                          </Link>
                        ))}
                        <Link
                          to="/solutions"
                          className="col-span-2 mt-1 flex items-center justify-between px-4 py-3 rounded-sm bg-surface-container-lowest/70 font-mono text-[10px] uppercase tracking-[0.2em] text-on-surface-variant hover:text-primary transition-colors"
                        >
                          All solutions & engagement models
                          <Icon name="arrow-right" size={14} />
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                key={link.to}
                to={link.to}
                className={`relative font-mono text-[11px] uppercase tracking-[0.2em] py-2 transition-colors ${
                  isActive(link.to) ? 'text-primary-container' : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                {link.label}
                {isActive(link.to) && <motion.span layoutId="nav-indicator" className="absolute -bottom-0.5 left-0 right-0 h-px bg-primary-container" />}
              </Link>
            ),
          )}
        </div>

        <div className="flex items-center gap-2 sm:gap-4 relative z-10">
          <ArcadeButton className="hidden sm:inline-flex" />
          <Link
            to="/contact"
            className={`hidden lg:inline-flex font-mono text-[11px] uppercase tracking-[0.2em] py-2 transition-colors ${
              isActive('/contact') ? 'text-primary-container' : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Contact
          </Link>
          <Link
            to="/contact"
            className="hidden sm:inline-flex items-center gap-2 bg-molten text-on-primary font-bold px-5 py-3 text-[11px] uppercase tracking-[0.18em] rounded-sm shadow-edge hover:shadow-molten hover:brightness-110 transition"
          >
            Book a diagnostic
          </Link>
          <button
            className="lg:hidden text-on-surface-variant hover:text-primary-container transition-colors p-2 -mr-2"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <Icon name={menuOpen ? 'x' : 'menu'} size={24} />
          </button>
        </div>
      </nav>

      {/* Mobile panel */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden fixed inset-0 top-[72px] bg-surface-container-lowest/95 glass-blur overflow-y-auto"
            data-lenis-prevent
          >
            <div className="site-container py-8 flex flex-col">
              {nav.map((link, i) =>
                link.mega ? (
                  <div key={link.to}>
                    <div className="flex items-center justify-between">
                      <Link to={link.to} className="font-display text-3xl py-3 text-on-surface" style={{ transitionDelay: `${i * 40}ms` }}>
                        {link.label}
                      </Link>
                      <button
                        type="button"
                        aria-expanded={mobileSolutions}
                        aria-label="Toggle solutions"
                        onClick={() => setMobileSolutions((v) => !v)}
                        className="p-3 text-on-surface-variant"
                      >
                        <Icon name="chevron-down" size={22} className={`transition-transform ${mobileSolutions ? 'rotate-180' : ''}`} />
                      </button>
                    </div>
                    <div className="grid transition-[grid-template-rows] duration-400" style={{ gridTemplateRows: mobileSolutions ? '1fr' : '0fr' }}>
                      <div className="overflow-hidden">
                        <ul className="pb-3 pl-1 flex flex-col">
                          {solutions.map((s) => (
                            <li key={s.slug}>
                              <Link to={`/solutions/${s.slug}`} className="flex items-center gap-3 py-2.5 text-on-surface-variant text-base">
                                <Icon name={s.icon} size={16} className="text-primary-container" />
                                {s.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link key={link.to} to={link.to} className={`font-display text-3xl py-3 ${isActive(link.to) ? 'text-primary-container' : 'text-on-surface'}`}>
                    {link.label}
                  </Link>
                ),
              )}
              <Link to="/contact" className={`font-display text-3xl py-3 ${isActive('/contact') ? 'text-primary-container' : 'text-on-surface'}`}>
                Contact
              </Link>
              <div className="mt-8 flex items-center gap-4">
                <Link
                  to="/contact"
                  className="flex-1 text-center bg-molten text-on-primary font-bold px-6 py-4 text-xs uppercase tracking-[0.18em] rounded-sm"
                >
                  Book a diagnostic
                </Link>
                <ArcadeButton />
              </div>
              <p className="mt-10 font-mono text-[10px] uppercase tracking-[0.2em] text-outline">
                {site.location.label} · {site.email}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
