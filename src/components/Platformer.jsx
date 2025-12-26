import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import me8bit from '../assets/me8bit.png'
import { play } from '../audio/engine'
import { useGame } from '../context/GameContext'

// Constants
const GRAVITY = 0.6
const JUMP_FORCE = -12
const MOVE_SPEED = 5
const FRICTION = 0.8
const SCREEN_HEIGHT = 600 // Virtual height for physics
const FLOOR_Y = 500
const PLAYER_SIZE = 60

export default function Platformer({ sceneId, bgImage, items, onClose }) {
  const { addToInventory, addMoney, markItemAsCollected, collectedSceneItems, visitScene } = useGame()
  
  // Game State
  const [player, setPlayer] = useState({ x: 100, y: FLOOR_Y - PLAYER_SIZE, vx: 0, vy: 0, facingRight: true })
  const [cameraX, setCameraX] = useState(0)
  const [keys, setKeys] = useState({})
  const requestRef = useRef()
  const playerRef = useRef(player) // Ref for loop access without dependencies
  const [activeLandmark, setActiveLandmark] = useState(null)
  
  // Sync state to ref
  useEffect(() => {
    playerRef.current = player
  }, [player])

  useEffect(() => {
    const isNew = visitScene(sceneId)
    if (isNew) {
      alert(`New Location Discovered: ${sceneId.toUpperCase()}! You found $50.`)
    }
  }, [sceneId])

  // Input Handling
  useEffect(() => {
    const handleKeyDown = (e) => setKeys(k => ({ ...k, [e.code]: true }))
    const handleKeyUp = (e) => setKeys(k => ({ ...k, [e.code]: false }))
    
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [])

  // Physics Loop
  useEffect(() => {
    let lastTime = performance.now()

    const update = (time) => {
      const dt = (time - lastTime) / 16.67 // Normalize to ~60fps
      lastTime = time

      const p = { ...playerRef.current }
      const k = keys

      // Horizontal Movement
      if (k['ArrowRight'] || k['KeyD']) {
        p.vx += 1 * dt
        p.facingRight = true
      }
      if (k['ArrowLeft'] || k['KeyA']) {
        p.vx -= 1 * dt
        p.facingRight = false
      }

      // Friction
      p.vx *= FRICTION

      // Jumping
      if ((k['ArrowUp'] || k['KeyW'] || k['Space']) && p.y >= FLOOR_Y - PLAYER_SIZE - 1) {
        p.vy = JUMP_FORCE
        play('blip')
      }

      // Gravity
      p.vy += GRAVITY * dt

      // Apply Velocity
      p.x += p.vx * dt
      p.y += p.vy * dt

      // Floor Collision
      if (p.y > FLOOR_Y - PLAYER_SIZE) {
        p.y = FLOOR_Y - PLAYER_SIZE
        p.vy = 0
      }

      // Wall Collision (Left)
      if (p.x < 0) {
        p.x = 0
        p.vx = 0
      }

      // Update State
      setPlayer(p)

      // Camera Follow
      // Keep player in middle 1/3 of screen
      const screenWidth = window.innerWidth
      const targetCamX = p.x - screenWidth / 3
      // Smooth camera? For now direct
      setCameraX(Math.max(0, targetCamX))

      requestRef.current = requestAnimationFrame(update)
    }

    requestRef.current = requestAnimationFrame(update)
    return () => cancelAnimationFrame(requestRef.current)
  }, [keys])

  // Item Collection Check
  useEffect(() => {
    const p = playerRef.current
    
    // Check collision with items
    // We map existing items (0-100%) to a wider world (e.g. 0-2000px)
    // Let's assume the world is 3000px wide for now
    const WORLD_WIDTH = 3000
    
    items.forEach(item => {
      if (collectedSceneItems.includes(item.id)) return

      // Map item % to World Pixels
      const itemX = (item.x / 100) * WORLD_WIDTH
      const itemY = (item.y / 100) * SCREEN_HEIGHT
      
      // Distance check
      const dx = p.x - itemX
      const dy = p.y - itemY
      const dist = Math.sqrt(dx*dx + dy*dy)

      if (dist < 80) { // Collection Radius
        handleItemCollect(item)
      }
    })
  }, [player, items, collectedSceneItems]) // Check on player update

  const handleItemCollect = (item) => {
    play('collect')
    if (item.type === 'collectible') {
      const added = markItemAsCollected(item.id)
      if (added) {
          if (item.item) {
              const invAdded = addToInventory(item.item)
              if (invAdded) alert(item.message)
          } else {
              alert(item.message)
          }
      }
    } else if (item.type === 'inspect') {
       // alert(item.message) // Alert pauses game loop, maybe show toast?
    } else if (item.type === 'landmark') {
        setActiveLandmark(item)
    }
  }

  // Render Helpers
  const WORLD_WIDTH = 3000 // Match collision logic

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      background: '#87CEEB',
      overflow: 'hidden',
      fontFamily: "'Press Start 2P', cursive",
      zIndex: 9999
    }}>
       {/* HUD: Close Button (Fixed Overlay) */}
       <div style={{ position: 'absolute', top: 20, right: 20, zIndex: 50 }}>
        <button 
          className="pixel-button"
          onClick={onClose}
          style={{ 
            background: 'rgba(255, 0, 0, 0.8)', 
            color: 'white',
            border: '2px solid white',
            boxShadow: '4px 4px 0 rgba(0,0,0,0.5)'
          }}
        >
          ❌ EXIT
        </button>
      </div>

      {/* Instructions */}
      <div style={{
          position: 'absolute', top: 20, left: 20, zIndex: 50, color: 'white', textShadow: '2px 2px 0 #000'
      }}>
          WASD / ARROWS to Move & Jump
      </div>

      {/* Game World Container */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0,
        width: '100%', height: '100%',
        transform: `translateX(-${cameraX}px)`,
        transition: 'transform 0.05s linear' // Smooth out camera jitter
      }}>
        
        {/* Parallax Background (Infinite Tiling) */}
        <div style={{
            position: 'absolute',
            top: 0, left: cameraX * 0.5, // Parallax effect (moves slower)
            width: '200%', // Wide enough to cover
            height: '100%',
            display: 'flex'
        }}>
            {/* Repeat BG multiple times */}
            {[...Array(6)].map((_, i) => (
              <img key={i} src={bgImage} style={{ height: '100%', width: 'auto', objectFit: 'cover' }} />
            ))}
        </div>

        {/* Floor */}
        <div style={{
            position: 'absolute',
            left: 0, top: FLOOR_Y,
            width: WORLD_WIDTH + 1000,
            height: 200,
            background: `repeating-linear-gradient(45deg, #333 0, #333 10px, #444 10px, #444 20px)`,
            borderTop: '4px solid #fff'
        }}></div>

        {/* Items */}
        {items.map(item => {
             if (collectedSceneItems.includes(item.id) && item.type !== 'landmark') return null
             
             const x = (item.x / 100) * WORLD_WIDTH
             const y = (item.y / 100) * SCREEN_HEIGHT
             
             return (
                 <motion.div
                    key={item.id}
                    animate={{ y: [y, y - 10, y] }} // Float animation
                    transition={{ duration: 2, repeat: Infinity }}
                    style={{
                        position: 'absolute',
                        left: x,
                        top: y,
                        width: 50, height: 50,
                        fontSize: '30px',
                        zIndex: 10
                    }}
                 >
                     {item.icon || '❓'}
                 </motion.div>
             )
        })}

        {/* Player */}
        <div style={{
            position: 'absolute',
            left: player.x,
            top: player.y,
            width: PLAYER_SIZE,
            height: PLAYER_SIZE,
            zIndex: 20,
            transform: `scaleX(${player.facingRight ? 1 : -1})`, // Flip sprite
            transition: 'transform 0.1s'
        }}>
            <img src={me8bit} style={{ width: '100%', height: '100%', imageRendering: 'pixelated' }} />
        </div>

      </div>

      {/* Landmark Modal (Overlay) */}
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
          <div style={{
              background: '#222',
              border: '4px solid white',
              padding: 20,
              maxWidth: 600,
              width: '100%',
              color: 'white',
              textAlign: 'center'
            }}
            onClick={e => e.stopPropagation()}
          >
            <h2>{activeLandmark.name}</h2>
            <img src={activeLandmark.image} style={{ width: '100%', maxHeight: 300, objectFit: 'cover' }} />
            <p>{activeLandmark.description}</p>
            <button onClick={() => setActiveLandmark(null)} className="pixel-button">CLOSE</button>
          </div>
        </div>
      )}
    </div>
  )
}
