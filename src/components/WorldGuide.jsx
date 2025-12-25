import { motion } from 'framer-motion'

export default function WorldGuide({ onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        background: 'rgba(0,0,0,0.85)',
        zIndex: 2500,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20
      }}
      onClick={onClose}
    >
      <div 
        className="retro-dialog" 
        onClick={e => e.stopPropagation()}
        style={{
          maxWidth: 600,
          width: '100%',
          maxHeight: '80vh',
          overflowY: 'auto'
        }}
      >
        <div className="title" style={{ marginBottom: 20, textAlign: 'center', color: '#00ffd0' }}>
          🌍 WORLD GUIDE
        </div>
        
        <div style={{ lineHeight: 1.6, fontFamily: "'Inter', sans-serif" }}>
          <p>
            <strong>Welcome, Traveler.</strong>
          </p>
          <p>
            This is not just a website. It is an interactive projection of Oscar's life, work, and journey.
            You are currently exploring a digital parallax world built with code and creativity.
          </p>
          
          <h3 style={{ marginTop: 20, color: '#fff' }}>🚀 System Features</h3>
          <ul style={{ paddingLeft: 20, marginTop: 10 }}>
            <li><strong>Parallax Engine:</strong> Depth-based scrolling through 6 unique biomes.</li>
            <li><strong>Day/Night Cycle:</strong> Real-time lighting synced to South African time.</li>
            <li><strong>Audio Engine:</strong> Context-aware soundscapes and SFX.</li>
            <li><strong>Economy System:</strong> Mine resources, earn coins, and collect loot.</li>
          </ul>

          <h3 style={{ marginTop: 20, color: '#fff' }}>⚠️ Secrets & Anomalies</h3>
          <p style={{ fontStyle: 'italic', color: '#aaa' }}>
            "There are secrets buried in the code and hidden in the shadows. Look for the unusual to find the hidden."
          </p>
          
          <div style={{ marginTop: 30, textAlign: 'center' }}>
            <button className="pixel-button" onClick={onClose}>Close Guide</button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
