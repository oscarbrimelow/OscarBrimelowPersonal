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
        onClick={e => e.stopPropagation()}
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
            top: '48%', 
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '60%',
            height: '55%',
            overflowY: 'auto',
            color: '#000',
            background: 'rgba(255,255,255,0.85)',
            borderRadius: '20px',
            padding: '20px',
            fontFamily: "'Inter', sans-serif",
            fontSize: 'clamp(14px, 2vw, 16px)',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
            boxShadow: 'inset 0 0 20px rgba(255,255,255,0.5)'
          }}>
             <h3 style={{ margin: 0, fontFamily: "'Press Start 2P', cursive", fontSize: 18, color: '#222' }}>WORLD GUIDE</h3>
             <p style={{ margin: 0 }}><strong>Welcome, Traveler.</strong></p>
             <p style={{ margin: 0 }}>This is an interactive parallax world. Scroll to explore different biomes.</p>
             <ul style={{ textAlign: 'left', paddingLeft: 20, margin: '5px 0' }}>
               <li><strong>Phone:</strong> Check apps & inventory.</li>
               <li><strong>Shop:</strong> Buy items & upgrades.</li>
               <li><strong>Secrets:</strong> Find hidden codes.</li>
             </ul>
             <p style={{ margin: 0, fontSize: 12, fontStyle: 'italic', color: '#555' }}>"Click anywhere to close"</p>
          </div>
        </div>

        {/* 8-bit Character */}
        <img 
          src={me8bit} 
          alt="Oscar 8-bit" 
          style={{ 
            height: '220px',
            alignSelf: 'flex-start',
            marginLeft: '15%',
            marginTop: '-60px',
            filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.5))',
            zIndex: 10
          }} 
        />
      </div>
    </motion.div>
  )
}
