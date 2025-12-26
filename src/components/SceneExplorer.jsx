import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import me8bit from '../assets/me8bit.png'
import { play } from '../audio/engine'
import { sceneData } from '../data/sceneData'
import { useGame } from '../context/GameContext'

export default function SceneExplorer({ sceneId, bgImage, onClose }) {
  const { addToInventory, addMoney, markItemAsCollected, collectedSceneItems } = useGame()
  const [targetPos, setTargetPos] = useState({ x: 50, y: 80 })
  const [facingRight, setFacingRight] = useState(true)
  const [transition, setTransition] = useState({ duration: 0 })
  const [activeLandmark, setActiveLandmark] = useState(null)
  
  // We track the last position to calculate speed (distance / time)
  // This ensures the character moves at a constant walking pace
  const lastPos = useRef({ x: 50, y: 80 })

  useEffect(() => {
    // Check if it's a new location visit
    const isNew = visitScene(sceneId)
    if (isNew) {
      alert(`New Location Discovered: ${sceneId.toUpperCase()}! You found $50.`)
    }
  }, [sceneId])

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

  const handleItemClick = (e, item) => {
    e.stopPropagation() // Prevent walking when clicking an item
    play('collect')

    if (item.type === 'collectible') {
        const added = markItemAsCollected(item.id)
        if (added) {
            if (item.item) {
                const invAdded = addToInventory(item.item)
                if (invAdded) {
                    alert(`${item.message}`)
                } else {
                    alert(`Inventory Full! Could not pick up ${item.name}.`)
                    // TODO: Revert collected status if inventory full? 
                    // For now, let's assume if inventory is full, it's gone. 
                    // Actually, markItemAsCollected returns true if it WASNT collected before.
                }
            } else {
                alert(item.message)
            }
        }
    } else if (item.type === 'inspect') {
        alert(item.message)
    } else if (item.type === 'landmark') {
        setActiveLandmark(item)
    }
  }

  const currentItems = sceneData[sceneId]?.items || []
  const visibleItems = currentItems.filter(item => 
    item.type === 'inspect' || item.type === 'landmark' || !collectedSceneItems.includes(item.id)
  )

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
        overflow: 'hidden' // Main container is fixed, inner is scrollable
      }}
    >
      {/* HUD: Close Button (Fixed Overlay) */}
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

      {/* HUD: Instruction (Fixed Overlay) */}
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
          opacity: 0.8,
          zIndex: 50
      }}>
          CLICK TO MOVE • SCROLL TO EXPLORE
      </div>

      {/* Scrollable Content Wrapper */}
      <div style={{ 
          width: '100%', 
          height: '100%', 
          overflow: 'auto',
          display: 'flex',            // centers image if smaller than screen
          justifyContent: 'center',   // centers image horizontally
          alignItems: 'flex-start'    // aligns top
      }}>
        {/* Scene Container (Relative for absolute children) */}
        <div 
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '100%', // Ensure it doesn't overflow horizontally unintentionally
            cursor: 'crosshair'
          }}
          onClick={handleSceneClick}
        >
          <img 
            src={bgImage} 
            alt="Scene Background"
            style={{ 
              width: '100%', 
              height: 'auto', 
              display: 'block',
              pointerEvents: 'none' // Clicks pass to the container div
            }} 
            draggable={false}
          />

          {/* Render Items */}
          {visibleItems.map(item => (
            <motion.div
              key={item.id}
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              style={{
                position: 'absolute',
                left: `${item.x}%`,
                top: `${item.y}%`,
                width: item.width ? `${item.width}%` : 'auto',
                height: item.height ? `${item.height}%` : 'auto',
                fontSize: '2rem',
                cursor: 'pointer',
                zIndex: 20, // Above character
                transform: 'translate(-50%, -50%)',
                filter: 'drop-shadow(0 0 5px white)'
              }}
              onClick={(e) => handleItemClick(e, item)}
            >
              {item.icon || (
                 // Invisible hit area if no icon
                 <div style={{ width: '100%', height: '100%', background: 'transparent' }} />
              )}
            </motion.div>
          ))}

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
              pointerEvents: 'none', // Allow clicks to pass through
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
      </div>

      {activeLandmark && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, width: '100%', height: '100%',
          background: 'rgba(0,0,0,0.8)',
          zIndex: 5000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 20
        }} onClick={() => setActiveLandmark(null)}>
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            style={{
              background: '#222',
              border: '4px solid white',
              padding: 20,
              maxWidth: 600,
              width: '100%',
              color: 'white',
              position: 'relative',
              textAlign: 'center',
              boxShadow: '0 0 20px rgba(0,0,0,0.5)'
            }}
            onClick={e => e.stopPropagation()}
          >
            <div style={{ fontSize: 20, marginBottom: 16, fontFamily: "'Press Start 2P', cursive", color: '#00ffd0' }}>{activeLandmark.name}</div>
            {activeLandmark.image && (
              <img 
                src={activeLandmark.image} 
                alt={activeLandmark.name} 
                style={{ width: '100%', height: 'auto', maxHeight: '40vh', objectFit: 'cover', marginBottom: 16, border: '2px solid #555' }}
              />
            )}
            <div style={{ fontSize: 16, lineHeight: 1.5, marginBottom: 20, fontFamily: 'monospace' }}>
              {activeLandmark.description}
            </div>
            <button className="pixel-button" onClick={() => setActiveLandmark(null)}>CLOSE</button>
          </motion.div>
        </div>
      )}
    </motion.div>
  )
}
