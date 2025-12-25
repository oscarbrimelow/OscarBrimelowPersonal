import { motion } from 'framer-motion'

export default function KonamiPortal({ visible, onClose }) {
  if (!visible) return null
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 2000,
        pointerEvents: 'none',
        background: 'radial-gradient(circle at 50% 50%, rgba(0,255,180,0.4), rgba(0,0,0,0.9))'
      }}
      onAnimationComplete={() => setTimeout(onClose, 2200)}
    >
      <motion.div
        initial={{ scale: 0, rotate: 0 }}
        animate={{ scale: [0, 1.2, 0.9, 1.4], rotate: [0, 90, 180, 360] }}
        transition={{ duration: 2, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          width: 280,
          height: 280,
          borderRadius: '50%',
          boxShadow: '0 0 60px 20px #0ff',
          background: 'conic-gradient(from 0deg, #0ff, #8a2be2, #0ff)'
        }}
      />
    </motion.div>
  )
}
