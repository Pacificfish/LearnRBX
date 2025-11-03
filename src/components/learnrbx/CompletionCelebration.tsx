import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, Sparkles } from 'lucide-react'

interface CompletionCelebrationProps {
  open: boolean
  onClose?: () => void
}

export default function CompletionCelebration({ open, onClose }: CompletionCelebrationProps) {
  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        onClose?.()
      }, 4000)
      return () => clearTimeout(timer)
    }
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
        >
          <motion.div
            initial={{ y: 50 }}
            animate={{ y: 0 }}
            exit={{ y: 50 }}
            className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-8 py-6 rounded-2xl shadow-2xl border-4 border-green-300 flex flex-col items-center space-y-3"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 0.5 }}
            >
              <CheckCircle2 size={48} />
            </motion.div>
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-1">Excellent Work! 🎉</h3>
              <p className="text-green-50 text-sm">Lesson completed!</p>
            </div>
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 1 }}
            >
              <Sparkles className="text-yellow-300" size={24} />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

