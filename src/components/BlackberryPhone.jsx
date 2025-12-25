import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGame } from '../context/GameContext'
import { toggleMute, isMuted, nowPlaying } from '../audio/engine'
import SocialIcons from './SocialIcons'
import WorldGuide from './WorldGuide'
import { isDayInSouthAfrica } from '../utils/time'

const apps = [
  { id: 'socials', icon: '🌐', label: 'Socials' },
  { id: 'clock', icon: '⏰', label: 'Clock' },
  { id: 'map', icon: '🗺️', label: 'Map' },
  { id: 'settings', icon: '⚙️', label: 'Settings' },
  { id: 'guide', icon: '📖', label: 'Guide' }
]

export default function BlackberryPhone() {
  const { blackberryOpen, setBlackberryOpen } = useGame()
  const [activeApp, setActiveApp] = useState(null)
  const [muted, setMuted] = useState(isMuted())
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString('en-ZA'))

  useEffect(() => {
    const t = setInterval(() => setCurrentTime(new Date().toLocaleTimeString('en-ZA')), 1000)
    return () => clearInterval(t)
  }, [])

  const handleAppClick = (id) => {
    setActiveApp(id)
  }

  const closePhone = () => {
    setBlackberryOpen(false)
    setActiveApp(null)
  }

  // Scroll Helpers
  const scrollToSection = (idx) => {
    window.scrollTo({ top: window.innerHeight * idx, behavior: 'smooth' })
    setBlackberryOpen(false)
  }

  return (
    <>
      {/* Trigger Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setBlackberryOpen(true)}
        style={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          width: 50,
          height: 50,
          borderRadius: 12,
          background: '#222',
          border: '2px solid #444',
          fontSize: 24,
          cursor: 'pointer',
          zIndex: 2000,
          display: blackberryOpen ? 'none' : 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 10px rgba(0,0,0,0.5)'
        }}
      >
        📱
      </motion.button>

      {/* Phone Modal */}
      <AnimatePresence>
        {blackberryOpen && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 20 }}
            style={{
              position: 'fixed',
              bottom: 0,
              right: 20,
              width: 300,
              height: 550,
              background: '#1a1a1a',
              borderRadius: '30px 30px 0 0',
              border: '4px solid #333',
              borderBottom: 'none',
              zIndex: 2100,
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              boxShadow: '0 -10px 40px rgba(0,0,0,0.8)'
            }}
          >
            {/* Top Bar */}
            <div style={{ padding: '10px 20px', background: '#000', color: '#fff', fontSize: 12, display: 'flex', justifyContent: 'space-between' }}>
              <span>MyNetwork</span>
              <span>{currentTime.slice(0, 5)}</span>
              <span>🔋 100%</span>
            </div>

            {/* Screen Content */}
            <div style={{ flex: 1, padding: 20, background: 'linear-gradient(180deg, #2a2a2a 0%, #111 100%)', position: 'relative', overflowY: 'auto' }}>
              
              {!activeApp && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 15 }}>
                  {apps.map(app => (
                    <div key={app.id} onClick={() => handleAppClick(app.id)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }}>
                      <div style={{ width: 50, height: 50, background: '#444', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, marginBottom: 5 }}>
                        {app.icon}
                      </div>
                      <span style={{ fontSize: 10, color: '#fff' }}>{app.label}</span>
                    </div>
                  ))}
                </div>
              )}

              {activeApp === 'socials' && (
                <div style={{ textAlign: 'center' }}>
                  <h4 style={{ color: '#fff', marginBottom: 20 }}>Socials</h4>
                  <SocialIcons />
                  <button className="pixel-button" style={{ marginTop: 20 }} onClick={() => setActiveApp(null)}>Back</button>
                </div>
              )}

              {activeApp === 'clock' && (
                <div style={{ textAlign: 'center', paddingTop: 40 }}>
                  <div style={{ fontSize: 40, color: '#fff' }}>{currentTime}</div>
                  <div style={{ color: '#aaa', marginTop: 10 }}>South Africa Standard Time</div>
                  <div style={{ marginTop: 20 }}>{isDayInSouthAfrica() ? '☀️ Day' : '🌙 Night'}</div>
                  <button className="pixel-button" style={{ marginTop: 40 }} onClick={() => setActiveApp(null)}>Back</button>
                </div>
              )}

              {activeApp === 'map' && (
                <div style={{ textAlign: 'center' }}>
                  <h4 style={{ color: '#fff', marginBottom: 15 }}>Quick Travel</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    <button className="pixel-button" onClick={() => scrollToSection(0)}>☁️ Sky</button>
                    <button className="pixel-button" onClick={() => scrollToSection(1.5)}>🏙️ City</button>
                    <button className="pixel-button" onClick={() => scrollToSection(4)}>🦜 Jungle</button>
                    <button className="pixel-button" onClick={() => scrollToSection(5)}>⛏️ Mineshaft</button>
                  </div>
                  <button className="pixel-button" style={{ marginTop: 20 }} onClick={() => setActiveApp(null)}>Back</button>
                </div>
              )}

              {activeApp === 'settings' && (
                <div style={{ textAlign: 'center' }}>
                  <h4 style={{ color: '#fff', marginBottom: 20 }}>Settings</h4>
                  <button 
                    className="pixel-button" 
                    onClick={() => { toggleMute(); setMuted(isMuted()) }}
                    style={{ width: '100%', marginBottom: 15 }}
                  >
                    {muted ? '🔇 Unmute Audio' : '🔊 Mute Audio'}
                  </button>
                  <div style={{ color: '#888', fontSize: 12 }}>
                    Currently Playing:<br/>
                    <span style={{ color: '#00ffd0' }}>{nowPlaying}</span>
                  </div>
                  <button className="pixel-button" style={{ marginTop: 40 }} onClick={() => setActiveApp(null)}>Back</button>
                </div>
              )}

              {activeApp === 'guide' && (
                 <WorldGuide onClose={() => setActiveApp(null)} />
              )}

            </div>

            {/* Home Button Area */}
            <div style={{ height: 60, background: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div 
                onClick={closePhone}
                style={{ width: 40, height: 40, borderRadius: '50%', border: '2px solid #333', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                ⬜
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
