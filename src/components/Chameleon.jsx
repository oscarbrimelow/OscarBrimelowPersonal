import { motion } from 'framer-motion'

export default function Chameleon({ section }) {
  const color = section === 'sky' ? '#00b7ff' : section === 'jungle' ? '#00ff9a' : '#b0b0b0'
  return (
    <motion.div 
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
        bottom: 12,
        zIndex: 1200,
        width: 54,
        height: 32,
        filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.6))'
      }}
    >
      <svg className="pixel" width="54" height="32" viewBox="0 0 54 32">
        <rect x="2" y="12" width="30" height="12" fill={color}/>
        <rect x="32" y="14" width="20" height="10" fill={color}/>
        <rect x="4" y="10" width="6" height="4" fill="#fff"/>
        <rect x="6" y="11" width="2" height="2" fill="#000"/>
        <rect x="42" y="24" width="6" height="4" fill="#000"/>
        <rect x="0" y="22" width="4" height="6" fill={color}/>
      </svg>
    </motion.div>
  )
}
