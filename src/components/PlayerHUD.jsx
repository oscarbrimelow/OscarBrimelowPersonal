import { motion } from 'framer-motion'
import { useGame } from '../context/GameContext'

export default function PlayerHUD({ isShaking }) {
  const { health, money, inventory } = useGame()

  return (
    <div className="hud-overlay" style={{
      position: 'fixed',
      top: 20,
      left: 20,
      zIndex: 1000,
      fontFamily: "'Press Start 2P', cursive",
      color: '#fff',
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
      pointerEvents: 'none' // Let clicks pass through to underlying elements
    }}>
      {/* Health Bar */}
      <motion.div 
        animate={isShaking ? { x: [-2, 2, -2, 2, 0] } : {}}
        transition={{ duration: 0.2 }}
        style={{ display: 'flex', alignItems: 'center', gap: 8 }}
      >
        <span>HP</span>
        <div style={{ 
          width: 100, 
          height: 16, 
          border: '2px solid #fff', 
          background: '#333',
          position: 'relative'
        }}>
          <div style={{
            width: `${health}%`,
            height: '100%',
            background: health > 50 ? '#00ff00' : health > 20 ? '#ffff00' : '#ff0000',
            transition: 'width 0.2s'
          }} />
        </div>
      </motion.div>

      {/* Money Counter */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontSize: 20 }}>🪙</span>
        <span>{money.toString().padStart(4, '0')}</span>
      </div>

      {/* Inventory */}
      <div style={{ display: 'flex', gap: 4 }}>
        {[0, 1, 2].map(i => (
          <div key={i} style={{
            width: 32,
            height: 32,
            border: '2px solid #fff',
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 20
          }}>
            {inventory[i] || ''}
          </div>
        ))}
      </div>
    </div>
  )
}
