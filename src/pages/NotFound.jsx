import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import SEO from '../components/SEO'

export default function NotFound() {
  return (
    <>
      <SEO
        title="Page Not Found"
        description="The page you're looking for doesn't exist."
        path="/404"
      />
      <div className="min-h-screen bg-background flex items-center justify-center px-8 forge-grid">
        <div className="text-center max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-[#F5C518] text-xs uppercase tracking-widest mb-4 font-black">404 — Not Found</div>
            <h1 className="text-7xl font-black text-white tracking-tighter mb-6 leading-none">
              This page<br />
              <span className="text-[#F5C518]">doesn't exist</span>
            </h1>
            <p className="text-[#D1C5AC] mb-10 leading-relaxed">
              The page you're looking for has been moved, deleted, or never existed. Let's get you back on track.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/"
                className="bg-[#F5C518] text-[#131313] px-8 py-4 text-xs font-black uppercase tracking-widest hover:bg-white transition-colors"
              >
                Back to Home
              </Link>
              <Link
                to="/contact"
                className="border border-[#4E4633]/40 text-[#D1C5AC] px-8 py-4 text-xs font-black uppercase tracking-widest hover:border-[#F5C518] hover:text-[#F5C518] transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  )
}
