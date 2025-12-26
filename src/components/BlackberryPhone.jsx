import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGame } from '../context/GameContext'
import { 
  play, toggleMute, isMuted, nowPlaying, 
  setGlobalVolume, toggleMusicMute, toggleSfxMute, 
  isMusicMuted, isSfxMuted 
} from '../audio/engine'
import SocialIcons from './SocialIcons'
import WorldGuide from './WorldGuide'
import { isDayInSouthAfrica } from '../utils/time'

const apps = [
  { id: 'socials', icon: '🌐', label: 'Socials' },
  { id: 'clock', icon: '⏰', label: 'Clock' },
  { id: 'map', icon: '🗺️', label: 'Map' },
  { id: 'bag', icon: '🎒', label: 'Bag' },
  { id: 'shop', icon: '🛒', label: 'Shop' },
  { id: 'settings', icon: '⚙️', label: 'Settings' },
  { id: 'guide', icon: '📖', label: 'Guide' }
]

const secretApp = { id: 'secrets', icon: '👁️', label: 'Secrets' }

const shopItems = [
  { name: 'Coffee', icon: '☕', price: 10, desc: 'Fuel for code.' },
  { name: 'Potion', icon: '🧪', price: 50, desc: 'Restores HP.' },
  { name: 'Key', icon: '🗝️', price: 100, desc: 'Unlocks ???' },
  { name: 'Dev Kit', icon: '💻', price: 999, desc: 'God Mode.' }
]

export default function BlackberryPhone() {
  const { blackberryOpen, setBlackberryOpen, money, inventory, spendMoney, addToInventory, useItem, hasSecretApp } = useGame()
  const [activeApp, setActiveApp] = useState(null)
  const [volume, setVolume] = useState(1)
  const [musicMutedState, setMusicMutedState] = useState(isMusicMuted())
  const [sfxMutedState, setSfxMutedState] = useState(isSfxMuted())
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString('en-ZA'))
  const [selectedItemIndex, setSelectedItemIndex] = useState(null)

  const handleBuy = (item) => {
    if (inventory.length >= 20) {
      play('blip')
      alert('Bag full!')
      return
    }
    // Removed duplicate check because consumables can be stacked (logic-wise they are separate entries for now)
    
    if (spendMoney(item.price)) {
      addToInventory(item.icon)
      play('collect')
    } else {
      play('blip')
      alert('Not enough cash!')
    }
  }

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
                  {hasSecretApp && (
                    <div onClick={() => handleAppClick(secretApp.id)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }}>
                      <div style={{ width: 50, height: 50, background: '#220022', borderRadius: 12, border: '1px solid #00ffd0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, marginBottom: 5 }}>
                        {secretApp.icon}
                      </div>
                      <span style={{ fontSize: 10, color: '#00ffd0' }}>{secretApp.label}</span>
                    </div>
                  )}
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

              {activeApp === 'bag' && (
                <div style={{ textAlign: 'center' }}>
                  <h4 style={{ color: '#fff', marginBottom: 15 }}>Inventory ({inventory.length}/20)</h4>
                  {inventory.length === 0 ? (
                    <div style={{ color: '#888', marginTop: 20 }}>Bag is empty.</div>
                  ) : (
                    <>
                      <div style={{ 
                        display: 'grid', 
                        gridTemplateColumns: 'repeat(4, 1fr)', 
                        gap: 10,
                        maxHeight: 300,
                        overflowY: 'auto',
                        padding: 5
                      }}>
                        {inventory.map((item, i) => (
                          <div 
                            key={i} 
                            onClick={() => {
                              play('blip')
                              setSelectedItemIndex(i === selectedItemIndex ? null : i)
                            }}
                            style={{ 
                              width: 50, height: 50, background: selectedItemIndex === i ? '#555' : '#333', 
                              display: 'flex', alignItems: 'center', justifyContent: 'center', 
                              fontSize: 24, borderRadius: 8, border: selectedItemIndex === i ? '2px solid #00ffd0' : '1px solid #555',
                              cursor: 'pointer'
                            }}
                          >
                            {item}
                          </div>
                        ))}
                      </div>
                      
                      {selectedItemIndex !== null && inventory[selectedItemIndex] && (
                        <div style={{ marginTop: 20, padding: 10, background: '#222', borderRadius: 8 }}>
                          <div style={{ fontSize: 30, marginBottom: 10 }}>{inventory[selectedItemIndex]}</div>
                          <button 
                            className="pixel-button" 
                            onClick={() => {
                              const msg = useItem(inventory[selectedItemIndex], selectedItemIndex)
                              play(msg.includes('cannot') ? 'blip' : 'collect')
                              alert(msg)
                              setSelectedItemIndex(null)
                            }}
                          >
                            USE ITEM
                          </button>
                        </div>
                      )}
                    </>
                  )}
                  <button className="pixel-button" style={{ marginTop: 20 }} onClick={() => setActiveApp(null)}>Back</button>
                </div>
              )}

              {activeApp === 'shop' && (
                <div style={{ textAlign: 'center' }}>
                  <h4 style={{ color: '#fff', marginBottom: 15 }}>Dark Web Store</h4>
                  <div style={{ marginBottom: 10, color: '#ffd700' }}>Cash: ${money}</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {shopItems.map(item => (
                      <div key={item.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#333', padding: 8, borderRadius: 8 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <span style={{ fontSize: 20 }}>{item.icon}</span>
                          <div style={{ textAlign: 'left' }}>
                            <div style={{ fontSize: 12, color: '#fff' }}>{item.name}</div>
                            <div style={{ fontSize: 10, color: '#888' }}>{item.desc}</div>
                          </div>
                        </div>
                        <button 
                          className="pixel-button" 
                          style={{ padding: '4px 8px', fontSize: 10 }}
                          onClick={() => handleBuy(item)}
                        >
                          ${item.price}
                        </button>
                      </div>
                    ))}
                  </div>
                  <button className="pixel-button" style={{ marginTop: 20 }} onClick={() => setActiveApp(null)}>Back</button>
                </div>
              )}

              {activeApp === 'settings' && (
                <div style={{ textAlign: 'center' }}>
                  <h4 style={{ color: '#fff', marginBottom: 20 }}>Settings</h4>
                  
                  <div style={{ marginBottom: 20 }}>
                    <label style={{ display: 'block', fontSize: 12, marginBottom: 5, color: '#aaa' }}>Master Volume</label>
                    <input 
                      type="range" 
                      min="0" max="1" step="0.1" 
                      value={volume}
                      onChange={(e) => {
                        const v = parseFloat(e.target.value)
                        setVolume(v)
                        setGlobalVolume(v)
                      }}
                      style={{ width: '100%' }}
                    />
                  </div>

                  <button 
                    className="pixel-button" 
                    onClick={() => { 
                      const m = toggleMusicMute()
                      setMusicMutedState(m)
                    }}
                    style={{ width: '100%', marginBottom: 10, background: musicMutedState ? '#552222' : '#1a1a1a' }}
                  >
                    {musicMutedState ? '🎵 Music: OFF' : '🎵 Music: ON'}
                  </button>

                  <button 
                    className="pixel-button" 
                    onClick={() => { 
                      const m = toggleSfxMute()
                      setSfxMutedState(m)
                    }}
                    style={{ width: '100%', marginBottom: 10, background: sfxMutedState ? '#552222' : '#1a1a1a' }}
                  >
                    {sfxMutedState ? '🔊 SFX: OFF' : '🔊 SFX: ON'}
                  </button>

                  <div style={{ color: '#888', fontSize: 10, marginTop: 10 }}>
                    Now Playing:<br/>
                    <span style={{ color: '#00ffd0' }}>{nowPlaying}</span>
                  </div>
                  <button className="pixel-button" style={{ marginTop: 20 }} onClick={() => setActiveApp(null)}>Back</button>
                </div>
              )}

              {activeApp === 'guide' && (
                 <WorldGuide onClose={() => setActiveApp(null)} />
              )}

              {activeApp === 'achievements' && (
                 <Achievements onClose={() => setActiveApp(null)} />
              )}

              {activeApp === 'secrets' && (
                 <div style={{ textAlign: 'center' }}>
                   <h4 style={{ color: '#00ffd0', marginBottom: 20 }}>Hidden Logs</h4>
                   <p style={{ color: '#aaa', fontSize: 12, marginBottom: 20 }}>
                     You have found the developer backdoor.
                   </p>
                   <ul style={{ textAlign: 'left', fontSize: 12, color: '#fff', paddingLeft: 20 }}>
                     <li>Konami Code: ↑↑↓↓←→←→BA</li>
                     <li>Type "OSCAR" for XP</li>
                     <li>Click the Chameleon 3 times</li>
                     <li>Click projects for cash (cooldown)</li>
                   </ul>
                   <button className="pixel-button" style={{ marginTop: 20 }} onClick={() => setActiveApp(null)}>Back</button>
                 </div>
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
