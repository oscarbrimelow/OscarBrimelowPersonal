import { motion } from 'framer-motion'
import me8bit from '../assets/me8bit.png'
import thoughtBubble from '../assets/Thought Bubble.png'

export default function WorldGuide({ onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        background: 'rgba(0,0,0,0.6)',
        backdropFilter: 'blur(20px)',
        zIndex: 3000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'auto'
      }}
      onClick={onClose}
    >
      <div 
        style={{ 
          position: 'relative', 
          width: 'min(95vw, 800px)', 
          height: 'min(90vh, 700px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        // Removed stopPropagation to allow clicking anywhere to close
      >
        {/* Thought Bubble Container */}
        <div style={{ 
          position: 'relative', 
          width: '100%', 
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <img 
            src={thoughtBubble} 
            alt="Guide Bubble" 
            style={{ 
              width: '100%', 
              height: '100%', 
              objectFit: 'contain',
              filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.3))'
            }} 
          />
          
          {/* Text Content inside Bubble */}
          <div style={{
            position: 'absolute',
            top: '45%', 
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '55%',
            height: '50%',
            overflowY: 'auto',
            color: '#ffffff',
            textShadow: '0 2px 4px rgba(0,0,0,0.8)',
            fontFamily: "'Inter', sans-serif",
            fontSize: 'clamp(14px, 2vw, 18px)',
            fontWeight: 500,
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}>
             <h3 style={{ margin: 0, fontFamily: "'Press Start 2P', cursive", fontSize: 'clamp(16px, 2.5vw, 22px)', color: '#00ffd0', textShadow: '2px 2px 0 #000' }}>WORLD GUIDE</h3>
             <p style={{ margin: 0 }}><strong>Welcome, Traveler.</strong></p>
             <p style={{ margin: 0 }}>This is an interactive parallax world. Scroll to explore different biomes.</p>
             <ul style={{ textAlign: 'left', paddingLeft: 20, margin: '5px 0', listStyle: 'none' }}>
               <li style={{ marginBottom: 8 }}>📱 <strong>Phone:</strong> Check apps & inventory.</li>
               <li style={{ marginBottom: 8 }}>🛒 <strong>Shop:</strong> Buy items & upgrades.</li>
               <li style={{ marginBottom: 8 }}>🔍 <strong>Secrets:</strong> Find hidden codes.</li>
             </ul>
             <p style={{ margin: 0, fontSize: 12, fontStyle: 'italic', opacity: 0.8 }}>"Click anywhere to close"</p>
          </div>
        </div>

        {/* 8-bit Character */}
        <img 
          src={me8bit} 
          alt="Oscar 8-bit" 
          style={{ 
            position: 'absolute',
            bottom: '-50px',
            left: '5%',
            height: 'clamp(300px, 50vh, 600px)',
            filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.5))',
            zIndex: 10
          }} 
        />
      </div>
    </motion.div>
  )
}
