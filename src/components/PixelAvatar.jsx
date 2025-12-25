import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function PixelAvatar({ section }) {
  const [mode, setMode] = useState('walking')

  useEffect(() => {
    if (section === 'sky') setMode('flying')
    else if (section === 'mineshaft') setMode('mining')
    else setMode('walking')
  }, [section])

  // Simple CSS Pixel Art Character
  // We'll use a small SVG or CSS grid for the character
  // Mode: flying (plane), walking (person), mining (helmet)

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 100,
      pointerEvents: 'none',
      filter: 'drop-shadow(4px 4px 0px rgba(0,0,0,0.5))'
    }}>
      {mode === 'flying' && (
        <motion.div
          animate={{ y: [0, -10, 0], rotate: [0, 2, -2, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {/* 8-bit Plane */}
          <div style={{ fontSize: '64px' }}>✈️</div>
        </motion.div>
      )}

      {mode === 'walking' && (
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
        >
          {/* 8-bit Walker */}
          <div style={{ fontSize: '64px' }}>🏃</div>
        </motion.div>
      )}

      {mode === 'mining' && (
        <motion.div
          animate={{ rotate: [0, 10, 0, -10, 0] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          {/* 8-bit Miner */}
          <div style={{ fontSize: '64px' }}>👷</div>
        </motion.div>
      )}
    </div>
  )
}
