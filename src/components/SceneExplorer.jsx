import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import me8bit from '../assets/me8bit.png'
import { play } from '../audio/engine'

export default function SceneExplorer({ sceneId, bgImage, onClose }) {
  const [targetPos, setTargetPos] = useState({ x: 50, y: 80 })
  const [facingRight, setFacingRight] = useState(true)
  const [transition, setTransition] = useState({ duration: 0 })
  
  // We track the last position to calculate speed (distance / time)
  // This ensures the character moves at a constant walking pace
  const lastPos = useRef({ x: 50, y: 80 })

  const handleSceneClick = (e) => {
    // Get click coordinates relative to the scene container
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100

    // Calculate distance to determine duration (speed control)
    const dist = Math.hypot(x - lastPos.current.x, y - lastPos.current.y)
    const duration = dist * 0.05 // 0.05 seconds per 1% distance

    setTransition({ duration, ease: "linear" })
    setFacingRight(x > lastPos.current.x)
    setTargetPos({ x, y })
    
    // Update last known position for next click
    lastPos.current = { x, y }
    
    // Play sound
    play('blip')
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        zIndex: 4000,
        background: '#000',
        overflow: 'hidden'
      }}
    >
      {/* Interactive Background Layer */}
      <div 
        style={{
          width: '100%',
          height: '100%',
          backgroundImage: `url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative',
          cursor: 'crosshair'
        }}
        onClick={handleSceneClick}
      >
        {/* HUD: Close Button */}
        <div style={{ position: 'absolute', top: 20, right: 20, zIndex: 50 }}>
          <button 
            className="pixel-button"
            onClick={(e) => {
              e.stopPropagation()
              play('blip')
              onClose()
            }}
            style={{ 
              background: 'rgba(255, 0, 0, 0.8)', 
              color: 'white',
              border: '2px solid white',
              boxShadow: '4px 4px 0 rgba(0,0,0,0.5)'
            }}
          >
            ❌ EXIT SCENE
          </button>
        </div>

        {/* HUD: Instruction */}
        <div style={{
            position: 'absolute', 
            bottom: 20, 
            left: '50%', 
            transform: 'translateX(-50%)',
            color: 'white',
            textShadow: '0 2px 4px black',
            fontFamily: "'Press Start 2P', cursive",
            fontSize: '12px',
            pointerEvents: 'none',
            opacity: 0.8
        }}>
            CLICK TO MOVE
        </div>

        {/* The Player Character */}
        <motion.img
          src={me8bit}
          alt="Explorer"
          animate={{ 
            left: `${targetPos.x}%`, 
            top: `${targetPos.y}%` 
          }}
          transition={transition}
          style={{
            position: 'absolute',
            width: 'clamp(60px, 10vw, 120px)', // Responsive size
            height: 'auto',
            transform: `translate(-50%, -95%) scaleX(${facingRight ? 1 : -1})`, // Anchor at feet
            filter: 'drop-shadow(0 10px 10px rgba(0,0,0,0.5))',
            pointerEvents: 'none', // Allow clicks to pass through to background
            zIndex: 10
          }}
        />

        {/* Click Target Indicator (Visual Feedback) */}
        <motion.div
            key={`${targetPos.x}-${targetPos.y}`} // Remounts animation on new click
            initial={{ opacity: 1, scale: 0 }}
            animate={{ opacity: 0, scale: 2 }}
            transition={{ duration: 0.5 }}
            style={{
                position: 'absolute',
                left: `${targetPos.x}%`,
                top: `${targetPos.y}%`,
                width: 20,
                height: 20,
                border: '3px solid rgba(255, 255, 255, 0.8)',
                borderRadius: '50%',
                transform: 'translate(-50%, -50%)',
                pointerEvents: 'none'
            }}
        />
      </div>
    </motion.div>
  )
}
