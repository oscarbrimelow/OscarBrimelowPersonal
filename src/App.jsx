import { useEffect, useMemo, useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import SoundBar from './components/SoundBar.jsx'
import Chameleon from './components/Chameleon.jsx'
import RetroDialog from './components/RetroDialog.jsx'
import SocialIcons from './components/SocialIcons.jsx'
import ProjectCards from './components/ProjectCards.jsx'
import KonamiPortal from './components/KonamiPortal.jsx'
import PixelAvatar from './components/PixelAvatar.jsx'
import useKonami from './hooks/useKonami.js'
import { isDayInSouthAfrica, ageFromDOB } from './utils/time.js'
import { play } from './audio/engine.js'

import skyBg from './assets/sky-bg.png'
import jhbBg from './assets/jhb-bg.png'
import cleBg from './assets/cle-bg.png'
import iomBg from './assets/iom-bg.png'
import jungleBg from './assets/jungle-bg.png'
import mineshaftBg from './assets/mineshaft-bg.png'

export default function App() {
  const { scrollY } = useScroll()
  const [vh, setVh] = useState(0)

  useEffect(() => {
    const updateVh = () => setVh(window.innerHeight)
    updateVh()
    window.addEventListener('resize', updateVh)
    return () => window.removeEventListener('resize', updateVh)
  }, [])

  // Parallax Logic:
  // Move at 0.2x speed (slower parallax = less gap opening).
  // Formula: y = scrollY * 0.2 - (startOffset * 0.2)
  const skyY = useTransform(scrollY, v => v * 0.2)
  const jhbY = useTransform(scrollY, v => v * 0.2 - (vh * 1) * 0.2)
  const cleY = useTransform(scrollY, v => v * 0.2 - (vh * 2) * 0.2)
  const iomY = useTransform(scrollY, v => v * 0.2 - (vh * 3) * 0.2)
  const jungleY = useTransform(scrollY, v => v * 0.2 - (vh * 4) * 0.2)
  const mineshaftY = useTransform(scrollY, v => v * 0.2 - (vh * 5) * 0.2)

  const [section, setSection] = useState('sky')
  const [dialog, setDialog] = useState(null)
  const [portal, setPortal] = useState(false)
  const [miningGame, setMiningGame] = useState(false)
  const isDay = isDayInSouthAfrica()
  const age = ageFromDOB('2004-08-08')

  useKonami(() => setPortal(true))

  useEffect(() => {
    const h = () => {
      const y = window.scrollY
      const h = window.innerHeight
      // 6 Sections total: Sky, JHB, CLE, IOM, Jungle, Mineshaft
      // Thresholds are roughly at X.5 of each section
      if (y < h * 0.5) setSection('sky')
      else if (y < h * 1.5) setSection('jhb')
      else if (y < h * 2.5) setSection('cle')
      else if (y < h * 3.5) setSection('iom')
      else if (y < h * 4.5) setSection('jungle')
      else setSection('mineshaft')
    }
    h()
    window.addEventListener('scroll', h)
    return () => window.removeEventListener('scroll', h)
  }, [])

  useEffect(() => {
    if (section === 'jungle') play('splash')
  }, [section])

  useEffect(() => {
    const handleMove = (e) => {
      const dot = document.createElement('div')
      dot.className = 'cursor-trail'
      dot.style.left = `${e.clientX}px`
      dot.style.top = `${e.clientY}px`
      document.body.appendChild(dot)
      setTimeout(() => dot.remove(), 400)
    }
    window.addEventListener('mousemove', handleMove)
    return () => window.removeEventListener('mousemove', handleMove)
  }, [])

  const skySection = (
    <div className="section">
      <div>
        <div className="title">Oscar Brimelow</div>
        <div style={{ fontSize: 20, marginTop: 10 }}>
          Age {age}. The Journey Begins.
        </div>
        <div style={{ marginTop: 18 }}>
           <SocialIcons />
        </div>
      </div>
    </div>
  )

  const jhbSection = (
    <div className="section">
      <div>
        <div className="title">Johannesburg</div>
        <div style={{ fontSize: 18, marginTop: 8 }}>
          Roots. Energy. Code.
        </div>
        <div style={{ marginTop: 24 }}>
          <button className="pixel-button" onMouseEnter={() => play('blip')} onClick={() => setDialog('jhb')}>
            📍 Johannesburg Skyline
          </button>
        </div>
      </div>
      {dialog === 'jhb' && (
        <RetroDialog title="Johannesburg">
          Where code and hustle meet. Coffee-fueled builds and big city energy.
        </RetroDialog>
      )}
      <motion.div 
        whileHover={{ scale: 1.2, y: -5 }}
        style={{ position: 'absolute', top: '30%', left: '10%', fontSize: '40px', cursor: 'pointer', zIndex: 20 }}
        onClick={() => setDialog('jhb')}
      >
        🏙️
      </motion.div>
    </div>
  )

  const cleSection = (
    <div className="section">
      <div>
        <div className="title">Cleveland</div>
        <div style={{ fontSize: 18, marginTop: 8 }}>
          The Arcade. Midwest Tech.
        </div>
        <div style={{ marginTop: 24 }}>
          <button className="pixel-button" onMouseEnter={() => play('blip')} onClick={() => setDialog('cle')}>
            📍 Cleveland Arcade
          </button>
        </div>
      </div>
      {dialog === 'cle' && (
        <RetroDialog title="Cleveland">
          Rust belt charm with Midwest grit. Friends, games, and growth.
        </RetroDialog>
      )}
      <motion.div 
        whileHover={{ scale: 1.2 }}
        style={{ position: 'absolute', top: '25%', right: '15%', fontSize: '40px', cursor: 'pointer', zIndex: 20 }}
        onClick={() => setDialog('cle')}
      >
        🎮
      </motion.div>
    </div>
  )

  const iomSection = (
    <div className="section">
      <div>
        <div className="title">Isle of Man</div>
        <div style={{ fontSize: 18, marginTop: 8 }}>
          Lighthouse views. Calm & Focus.
        </div>
        <div style={{ marginTop: 24 }}>
          <button className="pixel-button" onMouseEnter={() => play('blip')} onClick={() => setDialog('iom')}>
            📍 Lighthouse
          </button>
        </div>
      </div>
      {dialog === 'iom' && (
        <RetroDialog title="Isle of Man">
          Lighthouse memory unlocked. Family stories, sea spray, and pixel sunsets.
        </RetroDialog>
      )}
      {/* Clickable Overlay Icons (Absolutely positioned in the scene) */}
      <motion.div 
        whileHover={{ scale: 1.2, rotate: 10 }}
        style={{ position: 'absolute', top: '20%', right: '10%', fontSize: '40px', cursor: 'pointer', zIndex: 20 }}
        onClick={() => setDialog('iom')}
      >
        🏰
      </motion.div>
    </div>
  )

  const jungleSection = (
    <div className="section">
      <div>
        <div className="title">The Jungle — Projects</div>
        <div style={{ fontSize: 18, marginTop: 8 }}>
          Explore the artifacts of creation.
        </div>
        <div style={{ marginTop: 18 }}>
          <ProjectCards />
        </div>
      </div>
    </div>
  )

  const mineshaftSection = (
    <div className="section">
      <div>
        <div className="title">The Mineshaft</div>
        <div style={{ fontSize: 18, marginTop: 8 }}>
          Digging deep into data & extras.
        </div>
        
        <div style={{ marginTop: 24, display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          {['💎', '⛏️', '🔦', '🧨'].map((ore, i) => (
            <button 
              key={i}
              className="pixel-button" 
              style={{ fontSize: 24, padding: 12 }}
              onMouseEnter={() => play('blip')}
              onClick={() => {
                play('collect')
                if (ore === '💎') {
                   setMiningGame(true)
                } else {
                   const prizes = ['XP +10', 'Found a Ruby!', 'Nothing here...', 'A secret key!', 'Golden Nugget!', 'Coal...']
                   const prize = prizes[Math.floor(Math.random() * prizes.length)]
                   alert(`You mined ${ore}! ${prize}`)
                }
              }}
            >
              {ore}
            </button>
          ))}
        </div>

        <div style={{ marginTop: 40 }}>
           <div className="title" style={{ fontSize: 20 }}>Notebook</div>
           <Notebook />
        </div>

        <div style={{ marginTop: 24 }}>
           <SpotifyEmbed />
        </div>

        <div style={{ marginTop: 24 }}>
           <ImdbMarquee />
        </div>
      </div>
    </div>
  )

  return (
    <>
      <SoundBar />
      <Chameleon section={section} />
      <PixelAvatar section={section} />
      <KonamiPortal visible={portal} onClose={() => setPortal(false)} />
      {miningGame && <MiningGame onClose={() => setMiningGame(false)} />}
      <div className="hud">
        <span className="badge">{isDay ? '☀️ Sun' : '🌙 Moon'} SA Time</span>
        <span className="badge">Scroll: Sky → JHB → CLE → IOM → Jungle → Mine</span>
      </div>
      {/* Animated Elements */}
      <AnimatePresence>
        {section === 'sky' && <SkyExtras />}
        {section === 'jungle' && <JungleExtras />}
      </AnimatePresence>

      <div className="world" style={{ height: '600vh' }}>
        {/* Parallax Backgrounds */}
        <BgLayer img={skyBg} y={skyY} zIndex={0} top="0" />
        <BgLayer img={jhbBg} y={jhbY} zIndex={0} top="100vh" />
        <BgLayer img={cleBg} y={cleY} zIndex={0} top="200vh" />
        <BgLayer img={iomBg} y={iomY} zIndex={0} top="300vh" />
        <BgLayer img={jungleBg} y={jungleY} zIndex={0} top="400vh" />
        <BgLayer img={mineshaftBg} y={mineshaftY} zIndex={0} top="500vh" />

        <div style={{ position: 'relative', zIndex: 10 }}>
          {skySection}
          {jhbSection}
          {cleSection}
          {iomSection}
          {jungleSection}
          {mineshaftSection}
        </div>
      </div>
    </>
  )
}

function BgLayer({ img, y, top }) {
  return (
    <motion.img 
      src={img}
      alt="Background"
      style={{ 
        position: 'absolute',
        top: top,
        left: 0,
        width: '100%',
        height: '105vh',
        objectFit: 'cover',
        objectPosition: 'center',
        zIndex: 0,
        pointerEvents: 'none',
        y: y,
        willChange: 'transform'
      }}
    />
  )
}

function SkyExtras() {
  return (
    <motion.div
      initial={{ x: '-10vw' }}
      animate={{ x: '110vw' }}
      transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      style={{
        position: 'fixed',
        top: '15%',
        left: 0,
        fontSize: '40px',
        zIndex: 5,
        pointerEvents: 'none'
      }}
    >
      🛩️
    </motion.div>
  )
}

function JungleExtras() {
  return (
    <>
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: Math.random() * 100 + 'vw', y: Math.random() * 100 + 'vh' }}
          animate={{ opacity: [0, 1, 0], x: '+20px', y: '-20px' }}
          transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2 }}
          style={{
            position: 'fixed',
            fontSize: '20px',
            zIndex: 5,
            pointerEvents: 'none',
            filter: 'drop-shadow(0 0 5px yellow)'
          }}
        >
          ✨
        </motion.div>
      ))}
      <motion.div
         animate={{ x: [0, 100, 0], y: [0, -20, 0] }}
         transition={{ duration: 10, repeat: Infinity }}
         style={{ position: 'fixed', top: '30%', right: '10%', fontSize: '40px', zIndex: 5 }}
      >
        🦜
      </motion.div>
    </>
  )
}

function MiningGame({ onClose }) {
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(10)

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [timeLeft])

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, width: '100%', height: '100%',
      background: 'rgba(0,0,0,0.9)',
      zIndex: 2000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column'
    }}>
      <div style={{ fontSize: 30, marginBottom: 20 }}>💎 MINE THE GEMS! 💎</div>
      <div style={{ fontSize: 20, marginBottom: 20 }}>Time: {timeLeft}s | Score: {score}</div>
      
      {timeLeft > 0 ? (
        <motion.button
          whileTap={{ scale: 0.9 }}
          style={{
            fontSize: 40,
            padding: 20,
            background: 'none',
            border: 'none',
            cursor: 'pointer'
          }}
          onClick={() => {
             setScore(score + 1)
             play('blip')
          }}
        >
          ⛏️
        </motion.button>
      ) : (
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 24, marginBottom: 20 }}>Time's Up! You mined {score} gems.</div>
          <button className="pixel-button" onClick={onClose}>Close</button>
        </div>
      )}
    </div>
  )
}

function Notebook() {
  const [text, setText] = useState(() => localStorage.getItem('notebook') || '')
  useEffect(() => { localStorage.setItem('notebook', text) }, [text])
  return (
    <textarea
      value={text}
      onChange={e => setText(e.target.value)}
      placeholder="Random thoughts..."
      style={{
        width: 'min(800px, 92vw)',
        height: 120,
        background: '#0c0c0c',
        border: '3px solid #2b2b2b',
        borderRadius: 8,
        color: '#eaffff',
        padding: 12,
        fontFamily: 'VT323, monospace',
        fontSize: 18,
        marginTop: 10
      }}
    />
  )
}

function SpotifyEmbed() {
  return (
    <div style={{ width: 'min(800px, 92vw)' }}>
      <iframe
        style={{ borderRadius: 12 }}
        src="https://open.spotify.com/embed/user/47xzzm4tm5meveaqo7h1zrv01?utm_source=generator"
        width="100%"
        height="152"
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        title="Spotify"
      ></iframe>
    </div>
  )
}

function ImdbMarquee() {
  const [items] = useState([
    'Blade Runner',
    'Rick & Morty',
    'Everything Everywhere All at Once',
    'The Matrix',
    'Interstellar'
  ])
  return (
    <div style={{ width: 'min(800px, 92vw)' }}>
      <div style={{
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        border: '3px solid #2b2b2b',
        borderRadius: 8,
        padding: '8px 12px',
        background: '#0c0c0c'
      }}>
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: '-100%' }}
          transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
        >
          {items.map((it, i) => (
            <span key={i} style={{ marginRight: 36, fontSize: 18 }}>🎬 {it}</span>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
