import { motion } from 'framer-motion'
import { useGame } from '../context/GameContext'
import chameleonImg from '../assets/chameleon.png'

export default function Chameleon({ section }) {
  const { handleChameleonClick } = useGame()
  
  // Dynamic filters based on section
  const filterStyle = section === 'sky' 
    ? 'brightness(0) saturate(100%) invert(48%) sepia(91%) saturate(2253%) hue-rotate(170deg) brightness(98%) contrast(101%)' // Blue
    : section === 'jungle'
    ? 'brightness(0) saturate(100%) invert(69%) sepia(61%) saturate(543%) hue-rotate(85deg) brightness(96%) contrast(90%)' // Green
    : 'brightness(0.7)' // Grey/Dim

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
          filter: filterStyle,
          transition: 'filter 0.5s ease'
        }} 
      />
    </motion.div>
  )
}
