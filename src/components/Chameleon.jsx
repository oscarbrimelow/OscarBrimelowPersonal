import { motion } from 'framer-motion'
import { useGame } from '../context/GameContext'
import chameleonImg from '../assets/chameleom.png'

export default function Chameleon() {
  const { handleChameleonClick } = useGame()
  
  return (
    <motion.div 
      onClick={handleChameleonClick}
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.9 }}
      animate={{ 
        scale: [1, 1.05, 1],
        rotate: [0, 2, -2, 0]
      }}
      transition={{ 
        duration: 3, 
        repeat: Infinity, 
        ease: "easeInOut" 
      }}
      style={{
        position: 'fixed',
        right: 12,
        bottom: 80, 
        zIndex: 1200,
        width: 64, // Slightly larger for better visibility
        cursor: 'pointer',
        filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.6))'
      }}
    >
      <img 
        src={chameleonImg} 
        alt="Hidden Chameleon" 
        style={{ 
          width: '100%', 
          height: 'auto',
          imageRendering: 'pixelated', // Keep it crisp
        }} 
      />
    </motion.div>
  )
}
