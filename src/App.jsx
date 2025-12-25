import { useEffect, useMemo, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import SoundBar from './components/SoundBar.jsx'
import Chameleon from './components/Chameleon.jsx'
import RetroDialog from './components/RetroDialog.jsx'
import SocialIcons from './components/SocialIcons.jsx'
import ProjectCards from './components/ProjectCards.jsx'
import KonamiPortal from './components/KonamiPortal.jsx'
import useKonami from './hooks/useKonami.js'
import { isDayInSouthAfrica, ageFromDOB } from './utils/time.js'
import { play } from './audio/engine.js'

import jhbBg from './assets/jhb-bg.png'
import cleBg from './assets/cle-bg.png'
import iomBg from './assets/iom-bg.png'
import jungleBg from './assets/jungle-bg.png'
import mineshaftBg from './assets/mineshaft-bg.png'

export default function App() {
  const { scrollYProgress } = useScroll()
  
  // Parallax offsets - subtle movement for each layer
  const jhbY = useTransform(scrollYProgress, [0, 1], [0, -100])
  const cleY = useTransform(scrollYProgress, [0, 1], [0, -200])
  const iomY = useTransform(scrollYProgress, [0, 1], [0, -300])
  const jungleY = useTransform(scrollYProgress, [0, 1], [0, -400])
  const mineshaftY = useTransform(scrollYProgress, [0, 1], [0, -500])

  const [section, setSection] = useState('jhb')
  const [dialog, setDialog] = useState(null)
  const [portal, setPortal] = useState(false)
  const isDay = isDayInSouthAfrica()
  const age = ageFromDOB('2004-08-08')

  useKonami(() => setPortal(true))

  useEffect(() => {
    const h = () => {
      const y = window.scrollY
      const h = window.innerHeight
      if (y < h * 0.8) setSection('jhb')
      else if (y < h * 1.8) setSection('cle')
      else if (y < h * 2.8) setSection('iom')
      else if (y < h * 3.8) setSection('jungle')
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

  const jhbSection = (
    <div className="section">
      <div>
        <div className="title">Oscar Brimelow</div>
        <div style={{ fontSize: 20, marginTop: 10 }}>
          Age {age}. Johannesburg Start.
        </div>
        <div style={{ marginTop: 18 }}>
           <SocialIcons />
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
                alert(`You mined ${ore}! Found a hidden secret (placeholder).`)
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
      <KonamiPortal visible={portal} onClose={() => setPortal(false)} />
      <div className="hud">
        <span className="badge">{isDay ? '☀️ Sun' : '🌙 Moon'} SA Time</span>
        <span className="badge">Scroll: JHB → CLE → IOM → Jungle → Mine</span>
      </div>
      <div className="world" style={{ height: '500vh' }}>
        {/* Parallax Backgrounds */}
        <BgLayer img={jhbBg} y={jhbY} zIndex={0} top="0" />
        <BgLayer img={cleBg} y={cleY} zIndex={0} top="100vh" />
        <BgLayer img={iomBg} y={iomY} zIndex={0} top="200vh" />
        <BgLayer img={jungleBg} y={jungleY} zIndex={0} top="300vh" />
        <BgLayer img={mineshaftBg} y={mineshaftY} zIndex={0} top="400vh" />

        <div style={{ position: 'relative', zIndex: 10 }}>
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
        position: 'fixed',
        top: top,
        left: 0,
        width: '100%',
        height: '120vh', // Slight overlap
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
