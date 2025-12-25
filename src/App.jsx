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
        <motion.div className="layer" style={{ y: skyY, background:
          'linear-gradient(#59d1ff, #8be1ff)' }}>
          <div style={{ position: 'absolute', inset: 0 }}>
            <svg width="100%" height="100%">
              <circle cx="12%" cy="20%" r="60" fill={isDay ? '#ffe066' : '#b6b6ff'} />
              <g fill="#fff">
                <rect x="30%" y="26%" width="120" height="18"/>
                <rect x="34%" y="23%" width="60" height="16"/>
                <rect x="60%" y="40%" width="160" height="22"/>
                <rect x="64%" y="37%" width="70" height="18"/>
              </g>
            </svg>
          </div>
        </motion.div>
        <motion.div className="layer" style={{ y: cityY, background:
          'linear-gradient(#7ac6f7, #4b7da1)' }}>
          <div style={{ position: 'absolute', inset: 0 }}>
            <svg width="100%" height="100%">
              <g fill="#222">
                <rect x="10%" y="60%" width="12%" height="30%"/>
                <rect x="24%" y="55%" width="16%" height="35%"/>
                <rect x="42%" y="58%" width="10%" height="32%"/>
                <rect x="60%" y="57%" width="18%" height="33%"/>
                <rect x="80%" y="62%" width="12%" height="28%"/>
              </g>
              <rect x="78%" y="52%" width="3%" height="10%" fill="#b0b0b0"/>
              <rect x="78%" y="49%" width="3%" height="3%" fill="#fff"/>
            </svg>
          </div>
        </motion.div>
        <motion.div className="layer" style={{ y: jungleY, background:
          'linear-gradient(#0f3d2e, #07221a)' }}>
          <div style={{ position: 'absolute', inset: 0 }}>
            <svg width="100%" height="100%">
              <g fill="#0b7a56">
                <rect x="8%" y="70%" width="12%" height="20%"/>
                <rect x="20%" y="68%" width="10%" height="22%"/>
                <rect x="32%" y="72%" width="14%" height="18%"/>
                <rect x="56%" y="70%" width="16%" height="20%"/>
                <rect x="76%" y="69%" width="12%" height="21%"/>
              </g>
              <g>
                <rect x="45%" y="50%" width="6%" height="30%" fill="#1fb3ff"/>
                <rect x="46%" y="50%" width="4%" height="30%" fill="#7fdcff"/>
              </g>
            </svg>
          </div>
        </motion.div>
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
