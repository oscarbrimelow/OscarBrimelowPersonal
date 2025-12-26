import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import me8bit from '../assets/me8bit.png'
import jhbground from '../assets/jhbground.png'
import { play } from '../audio/engine'
import { useGame } from '../context/GameContext'

// Constants
const GRAVITY = 0.6
const JUMP_FORCE = -15 // Increased for bigger jump
const MOVE_SPEED = 5
const FRICTION = 0.8
const PLAYER_SIZE = 150 // Bigger character

export default function Platformer({ sceneId, bgImage, items, onClose }) {
  const { addToInventory, addMoney, markItemAsCollected, collectedSceneItems, visitScene } = useGame()
  
  // Game State
  // Initialize floor relative to window height to keep it low
  const getFloorY = () => window.innerHeight - 100
  
  const [player, setPlayer] = useState({ 
    x: 100, 
    y: getFloorY() - PLAYER_SIZE, 
    vx: 0, 
    vy: 0, 
    facingRight: true 
  })
  
  const [floorY, setFloorY] = useState(getFloorY())
  const [cameraX, setCameraX] = useState(0)
  
  // keys is now a ref to prevent re-renders causing jitter
  const keysRef = useRef({}) 
  const requestRef = useRef()
  const playerRef = useRef(player) // Ref for loop access without dependencies
  const [activeLandmark, setActiveLandmark] = useState(null)
  
  // Sync state to ref
  useEffect(() => {
    playerRef.current = player
  }, [player])

  // Resize Handler
  useEffect(() => {
    const handleResize = () => {
      setFloorY(window.innerHeight - 100)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    const isNew = visitScene(sceneId)
    if (isNew) {
      alert(`New Location Discovered: ${sceneId.toUpperCase()}! You found $50.`)
    }
  }, [sceneId])

  // Input Handling
  useEffect(() => {
    const handleKeyDown = (e) => { keysRef.current[e.code] = true }
    const handleKeyUp = (e) => { keysRef.current[e.code] = false }
    
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
      // Cap dt to prevent massive jumps (e.g. after alert pause)
      const maxDt = 100 // max 100ms frame time
      const dtRaw = time - lastTime
      const dt = Math.min(dtRaw, maxDt) / 16.67
      lastTime = time

      const p = { ...playerRef.current }
      const k = keysRef.current

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
      if ((k['ArrowUp'] || k['KeyW'] || k['Space']) && p.y >= floorY - PLAYER_SIZE - 1) {
        p.vy = JUMP_FORCE
        play('blip')
      }

      // Gravity
      p.vy += GRAVITY * dt

      // Apply Velocity
      p.x += p.vx * dt
      p.y += p.vy * dt

      // Floor Collision
      if (p.y > floorY - PLAYER_SIZE) {
        p.y = floorY - PLAYER_SIZE
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
  }, [floorY]) // Removed keys dependency to prevent loop restart

  // Item Collection Check
  useEffect(() => {
    const p = playerRef.current
    
    // Check collision with items
    // We map existing items (0-100%) to a wider world
    const WORLD_WIDTH = 10000 // Increased world size
    
    items.forEach(item => {
      if (collectedSceneItems.includes(item.id)) return

      // Map item % to World Pixels
      const itemX = (item.x / 100) * WORLD_WIDTH
      // Items float above floor relative to their original Y%
      const itemY = (item.y / 100) * (floorY + 100) 
      
      // Distance check
      const dx = p.x - itemX
      const dy = p.y - itemY
      const dist = Math.sqrt(dx*dx + dy*dy)

      if (dist < 150) { // Collection Radius (Increased for bigger player)
        handleItemCollect(item)
      }
    })
  }, [player, items, collectedSceneItems, floorY]) // Check on player update

  const handleItemCollect = (item) => {
    play('collect')
    if (item.type === 'collectible') {
      const added = markItemAsCollected(item.id)
      if (added) {
          if (item.item) {
              const invAdded = addToInventory(item.item)
              // Use setTimeout to avoid blocking the render loop immediately
              if (invAdded) setTimeout(() => alert(item.message), 10)
          } else {
              setTimeout(() => alert(item.message), 10)
          }
      }
    } else if (item.type === 'inspect') {
       // alert(item.message) // Alert pauses game loop, maybe show toast?
    } else if (item.type === 'landmark') {
        setActiveLandmark(item)
    }
  }

  // Render Helpers
  const WORLD_WIDTH = 10000 // Match collision logic

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
        
        {/* Parallax Background (Infinite Tiling) - Fixed relative to viewport to prevent running out */}
        <div style={{
            position: 'fixed',
            top: 0, 
            left: 0,
            width: '100vw', 
            height: '100vh',
            backgroundImage: `url(${bgImage})`,
            backgroundRepeat: 'repeat-x',
            backgroundSize: 'auto 100%',
            backgroundPositionX: -cameraX * 0.5, // Move background slower than camera
            zIndex: 0,
            pointerEvents: 'none'
        }} />

        {/* Floor (Infinite-ish) */}
         <div style={{
            position: 'absolute',
            left: -50000, // Start way back
            top: floorY,
            width: 200000, // Huge floor
            height: 200,
            backgroundImage: `url(${jhbground})`,
            backgroundRepeat: 'repeat-x',
            backgroundSize: 'auto 100%',
            // borderTop: '4px solid #fff' // Removed white line
        }}></div>

        {/* Items */}
        {items.map(item => {
             if (collectedSceneItems.includes(item.id) && item.type !== 'landmark') return null
             
             const x = (item.x / 100) * WORLD_WIDTH
             const y = (item.y / 100) * (floorY + 100)
             
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
            top: player.y + 15, // Offset down to stand firmly on floor
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
             <h2 style={{ fontSize: 24, marginBottom: 20 }}>{activeLandmark.name}</h2>
             {activeLandmark.image && (
               <img 
                 src={activeLandmark.image} 
                 style={{ width: '100%', maxHeight: 300, objectFit: 'cover', marginBottom: 20, border: '2px solid white' }} 
               />
             )}
             <p style={{ lineHeight: 1.5, marginBottom: 20 }}>{activeLandmark.description}</p>
             <button className="pixel-button" onClick={() => setActiveLandmark(null)}>CLOSE</button>
          </div>
        </div>
      )}
    </div>
  )
}