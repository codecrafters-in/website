import { motion } from 'framer-motion'

export default function PageLoader() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <motion.div
          className="w-12 h-12 border-2 border-[#4E4633]/20 border-t-[#F5C518] rounded-full mx-auto mb-6"
          animate={{ rotate: 360 }}
          transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
        />
        <p className="text-[#4E4633] text-xs uppercase tracking-widest font-black">Loading</p>
      </div>
    </div>
  )
}
