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
  const lastTriggeredRef = useRef({}) // Cooldown tracker
  const containerRef = useRef(null) // Focus container
  const [activeLandmark, setActiveLandmark] = useState(null)
  
  const [hasClickedStart, setHasClickedStart] = useState(false)

  // Sync state to ref
  useEffect(() => {
    playerRef.current = player
  }, [player])

  // Focus Window on Mount for Controls
  useEffect(() => {
    // Focus the container div explicitly
    if (containerRef.current) {
        containerRef.current.focus()
    }
    // Also try window focus as backup
    window.focus()
  }, [])

  // Force focus when user clicks start
  const handleStartGame = () => {
      setHasClickedStart(true)
      if (containerRef.current) {
          containerRef.current.focus()
      }
      play('blip')
  }

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
    // Check cooldown for reusable items (landmarks, inspectables)
    if (item.type === 'landmark' || item.type === 'inspect') {
      const lastTime = lastTriggeredRef.current[item.id] || 0
      if (Date.now() - lastTime < 30000) return // 30s cooldown
      lastTriggeredRef.current[item.id] = Date.now()
    }

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
    } else if (item.type === 'obstacle') {
        play('blip') // Reuse blip for now
        // Bounce player back instead of full reset
        setPlayer(prev => ({ 
            ...prev,
            x: Math.max(0, prev.x - 200), // Bounce back 200px
            vy: -10, // Small hop
            vx: -5 // Push back velocity
        }))
        // Small timeout to allow render to catch up before alert
        setTimeout(() => alert(item.message || "Ouch! Watch out!"), 10)
    }
  }

  // Render Helpers
  const WORLD_WIDTH = 10000 // Match collision logic

  // DEBUG OVERLAY
  const debugItems = items.map(item => {
    const x = (item.x / 100) * WORLD_WIDTH
    const y = (item.y / 100) * (floorY + 100)
    return { ...item, worldX: x, worldY: y, collected: collectedSceneItems.includes(item.id) }
  })

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      background: '#87CEEB',
      overflow: 'hidden',
      fontFamily: "'Press Start 2P', cursive",
      zIndex: 9999
    }}>
       {/* DEBUG INFO */}
       <div style={{
           position: 'absolute',
           top: 60, left: 20,
           background: 'rgba(0,0,0,0.5)',
           color: '#0f0',
           padding: 10,
           zIndex: 50000,
           pointerEvents: 'none',
           fontSize: 10,
           whiteSpace: 'pre-wrap'
       }}>
           P: ({Math.round(player.x)}, {Math.round(player.y)}) <br/>
           Cam: {Math.round(cameraX)} <br/>
           FloorY: {Math.round(floorY)} <br/>
           Items: {debugItems.length} <br/>
           {debugItems.slice(0, 5).map(i => 
               `${i.id}: ${Math.round(i.worldX)}, ${Math.round(i.worldY)} [${i.collected ? 'COLL' : 'ACT'}]`
           ).join('\n')}
           {debugItems.length > 5 && '\n...'}
       </div>

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

      {/* Parallax Background (Infinite Tiling) - Fixed relative to viewport */}
      <div style={{
          position: 'absolute', // Absolute relative to the fixed main container
          top: 0, 
          left: 0,
          width: '100%', 
          height: '100%',
          backgroundColor: '#87CEEB', // Fallback sky color
          backgroundImage: `url(${bgImage})`,
          backgroundRepeat: 'repeat-x',
          backgroundSize: 'auto 100%',
          backgroundPositionX: `${-cameraX * 0.5}px`, // Move background slower than camera
          zIndex: 0,
          pointerEvents: 'none'
      }} />

      {/* Start Game Overlay */}
      {!hasClickedStart && (
        <div style={{
            position: 'absolute',
            top: 0, left: 0, width: '100%', height: '100%',
            background: 'rgba(0,0,0,0.7)',
            zIndex: 20000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            color: 'white'
        }}>
            <h1 style={{ marginBottom: 40, textShadow: '4px 4px 0 #000' }}>READY PLAYER ONE?</h1>
            <button 
                className="pixel-button" 
                onClick={handleStartGame}
                style={{ fontSize: 24, padding: '20px 40px', cursor: 'pointer' }}
            >
                CLICK TO START
            </button>
        </div>
      )}

      {/* Game World Container */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0,
        width: '100%', height: '100%',
        zIndex: 1,
        transform: `translateX(-${cameraX}px)`,
        transition: 'transform 0.05s linear' // Smooth out camera jitter
      }}>
        
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
            zIndex: 10
            // borderTop: '4px solid #fff' // Removed white line
        }}></div>

        {/* Items */}
        {items.map(item => {
             // TEMP DEBUG: Show collected items too
             // if (collectedSceneItems.includes(item.id) && item.type !== 'landmark') return null
             
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
                        width: 64, height: 64,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 1000, // Boost Z-Index
                        border: '4px solid red', // DEBUG VISIBILITY THICKER
                        background: 'rgba(255, 0, 0, 0.5)' // Red background to be super obvious
                    }}
                 >
                     {item.iconImg ? (
                        <img 
                            src={item.iconImg} 
                            alt={item.name || 'item'} 
                            style={{ width: '100%', height: '100%', objectFit: 'contain', imageRendering: 'pixelated' }}
                            onError={(e) => {
                                e.target.style.display = 'none'
                                e.target.parentNode.style.background = 'magenta' // Show magenta if image fails
                            }}
                        />
                     ) : (
                        <div style={{ fontSize: '30px' }}>{item.icon || '❓'}</div>
                     )}
                 </motion.div>
             )
        })}

        {/* TEST CUBE AT PLAYER X */}
        <div style={{
            position: 'absolute',
            left: player.x + 100,
            top: player.y,
            width: 50, height: 50,
            background: 'lime',
            zIndex: 9999,
            border: '2px solid black'
        }}>TEST</div>

        {/* Player */}
        <div style={{
            position: 'absolute',
            left: player.x,
            top: player.y + 15, // Offset down to stand firmly on floor
            width: PLAYER_SIZE,
            height: PLAYER_SIZE,
            zIndex: 200,
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
          background: 'rgba(0,0,0,0.9)', // Slightly darker
          zIndex: 10000, // Ensure it's above everything
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
             {activeLandmark.image ? (
               <img 
                 src={activeLandmark.image} 
                 alt={activeLandmark.name}
                 style={{ width: '100%', maxHeight: 300, objectFit: 'contain', marginBottom: 20, border: '2px solid white', background: '#000' }} 
                 onError={(e) => {
                   e.target.style.display = 'none'
                   console.error("Image failed to load:", activeLandmark.image)
                 }}
               />
             ) : (
                <div style={{ width: '100%', height: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #555', marginBottom: 20 }}>
                    <span style={{ fontSize: 40 }}>🖼️</span>
                </div>
             )}
             <p style={{ lineHeight: 1.5, marginBottom: 20 }}>{activeLandmark.description}</p>
             <button className="pixel-button" onClick={() => setActiveLandmark(null)}>CLOSE</button>
          </div>
        </div>
      )}
    </div>
  )
}