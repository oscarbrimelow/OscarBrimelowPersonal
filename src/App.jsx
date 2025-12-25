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

// Use public folder assets with explicit base URL for GitHub Pages reliability
const BASE_URL = import.meta.env.BASE_URL
const skyBg = `${BASE_URL}sky-bg.png`
const cityBg = `${BASE_URL}city-bg.png`
const jungleBg = `${BASE_URL}jungle-bg.png`

export default function App() {
  const { scrollYProgress } = useScroll()
  const skyY = useTransform(scrollYProgress, [0, 1], [0, -200])
  const cityY = useTransform(scrollYProgress, [0, 1], [0, -500])
  const jungleY = useTransform(scrollYProgress, [0, 1], [0, -900])
  const [section, setSection] = useState('sky')
  const [dialog, setDialog] = useState(null)
  const [portal, setPortal] = useState(false)
  const isDay = isDayInSouthAfrica()
  const age = ageFromDOB('2004-08-08')

  useKonami(() => setPortal(true))

  useEffect(() => {
    const h = () => {
      const y = window.scrollY
      const h = window.innerHeight
      if (y < h * 1) setSection('sky')
      else if (y < h * 2) setSection('cities')
      else setSection('jungle')
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

  const sky = useMemo(() => (
    <div className="section">
      <div>
        <div className="title">Oscar Brimelow</div>
        <div style={{ fontSize: 20, marginTop: 10 }}>
          Age {age}. Johannesburg · Cleveland · Isle of Man
        </div>
        <div style={{ marginTop: 18 }}>
          <SocialIcons />
        </div>
      </div>
    </div>
  ), [age])

  const cities = (
    <div className="section">
      <div>
        <div className="title">Global Cities</div>
        <div style={{ fontSize: 18, marginTop: 8 }}>
          Scroll through Johannesburg, Cleveland, Isle of Man. Click landmarks for life events.
        </div>
        <div style={{ marginTop: 18 }}>
          <button className="pixel-button" onMouseEnter={() => play('blip')} onClick={() => setDialog('iom')}>
            IoM Lighthouse
          </button>
          <button className="pixel-button" style={{ marginLeft: 8 }} onMouseEnter={() => play('blip')} onClick={() => setDialog('jhb')}>
            Johannesburg Skyline
          </button>
          <button className="pixel-button" style={{ marginLeft: 8 }} onMouseEnter={() => play('blip')} onClick={() => setDialog('cle')}>
            Cleveland Arcade
          </button>
        </div>
      </div>
      {dialog === 'iom' && (
        <RetroDialog title="Isle of Man">
          Lighthouse memory unlocked. Family stories, sea spray, and pixel sunsets.
        </RetroDialog>
      )}
      {dialog === 'jhb' && (
        <RetroDialog title="Johannesburg">
          Where code and hustle meet. Coffee-fueled builds and big city energy.
        </RetroDialog>
      )}
      {dialog === 'cle' && (
        <RetroDialog title="Cleveland">
          Rust belt charm with Midwest grit. Friends, games, and growth.
        </RetroDialog>
      )}
    </div>
  )

  const jungle = (
    <div className="section">
      <div>
        <div className="title">The Jungle — Work</div>
        <div style={{ fontSize: 18, marginTop: 8 }}>
          A lush 8-bit jungle with a parallax waterfall. Explore artifacts.
        </div>
        <div style={{ marginTop: 18 }}>
          <ProjectCards />
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
        <span className="badge">Scroll to explore</span>
      </div>
      <div className="world">
        {/* Parallax Layers - Now using Real Images from Public Folder */}
      <motion.div 
        className="fixed inset-0 w-full h-[120vh] z-0 pointer-events-none"
        style={{ 
          y: skyY,
          backgroundImage: `url(${skyBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center bottom',
          backgroundRepeat: 'no-repeat',
          willChange: 'transform',
          backgroundColor: '#2a2a4e' // Fallback Dark Sky
        }}
      />
      <motion.div 
        className="fixed inset-0 w-full h-[120vh] z-0 pointer-events-none"
        style={{ 
          y: cityY,
          backgroundImage: `url(${cityBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center bottom',
          backgroundRepeat: 'no-repeat',
          top: '100vh', // Starts below the sky
          willChange: 'transform',
          backgroundColor: '#1a1a2e' // Fallback City Dark
        }}
      />
      <motion.div 
        className="fixed inset-0 w-full h-[150vh] z-0 pointer-events-none"
        style={{ 
          y: jungleY,
          backgroundImage: `url(${jungleBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
          backgroundRepeat: 'no-repeat',
          top: '200vh', // Starts below the city
          willChange: 'transform',
          backgroundColor: '#0a1a0a' // Fallback Jungle Green
        }}
      />
        <div style={{ position: 'relative' }}>
          {sky}
          {cities}
          {jungle}
          <div className="section">
            <div>
              <div className="title">Notebook</div>
              <Notebook />
              <div style={{ marginTop: 18 }}>
                <SpotifyEmbed />
              </div>
              <div style={{ marginTop: 18 }}>
                <ImdbMarquee />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
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
        height: 160,
        background: '#0c0c0c',
        border: '3px solid #2b2b2b',
        borderRadius: 8,
        color: '#eaffff',
        padding: 12,
        fontFamily: 'VT323, monospace',
        fontSize: 18
      }}
    />
  )
}

function SpotifyEmbed() {
  return (
    <div style={{ width: 'min(800px, 92vw)' }}>
      <div className="title" style={{ fontSize: 14, marginBottom: 8 }}>Live Spotify</div>
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
      <div className="title" style={{ fontSize: 14, marginBottom: 8 }}>Now Watching</div>
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
