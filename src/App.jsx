import { useEffect, useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { GameProvider, useGame } from './context/GameContext'
import PlayerHUD from './components/PlayerHUD.jsx'
import BlackberryPhone from './components/BlackberryPhone.jsx'
import Chameleon from './components/Chameleon.jsx'
import RetroDialog from './components/RetroDialog.jsx'
import SocialIcons from './components/SocialIcons.jsx'
import ProjectCards from './components/ProjectCards.jsx'
import KonamiPortal from './components/KonamiPortal.jsx'
import WorldGuide from './components/WorldGuide.jsx'
import SceneExplorer from './components/SceneExplorer.jsx'
import useKonami from './hooks/useKonami.js'
import { isDayInSouthAfrica, ageFromDOB } from './utils/time.js'
import { play, initAudioContext } from './audio/engine.js'

import skyBg from './assets/sky-bg.png'
import jhbBg from './assets/jhb-bg.png'
import cleBg from './assets/cle-bg.png'
import cleScenery from './assets/cle-scenery.png'
import iomBg from './assets/iom-bg.png'
import iomScenery from './assets/iom-scenery.png'
import jungleBg from './assets/jungle-bg.png'
import mineshaftBg from './assets/mineshaft-bg.png'
import tardisCursor from './assets/tardis-cursor.svg'
import me8bit from './assets/me8bit.png'

export default function App() {
  return (
    <GameProvider>
      <MainGame />
    </GameProvider>
  )
}

function MainGame() {
  const { scrollY } = useScroll()
  const { addMoney, addToInventory, takeDamage, theme, triggerLevelUp } = useGame()
  const [vh, setVh] = useState(window.innerHeight)
  const [isShaking, setIsShaking] = useState(false)

  // Scroll Speed Damage Logic
  useEffect(() => {
    let lastScrollY = window.scrollY
    let lastTime = Date.now()
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const currentTime = Date.now()
      const timeDiff = currentTime - lastTime
      
      if (timeDiff > 50) { // Check every 50ms
        const distance = Math.abs(currentScrollY - lastScrollY)
        const speed = distance / timeDiff
        
        // Threshold for "Too Fast"
        if (speed > 3) { 
          setIsShaking(true)
          takeDamage(1)
        } else {
          setIsShaking(false)
        }
        
        lastScrollY = currentScrollY
        lastTime = currentTime
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [takeDamage])

  // "OSCAR" Code Listener
  useEffect(() => {
    const code = ['o','s','c','a','r']
    let idx = 0
    const h = (e) => {
      if (e.key.toLowerCase() === code[idx]) {
        idx++
        if (idx === code.length) {
          triggerLevelUp()
          alert("LEVEL UP! YOU FOUND THE CREATOR CODE!")
          idx = 0
        }
      } else {
        idx = 0
      }
    }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [triggerLevelUp])

  useEffect(() => {
    const updateVh = () => setVh(window.innerHeight)
    updateVh()
    window.addEventListener('resize', updateVh)
    return () => window.removeEventListener('resize', updateVh)
  }, [])

  // Parallax Logic
  const parallaxFactor = 0.15
  const jhbY = useTransform(scrollY, [0, vh, 2*vh], [-vh*0.15, 0, vh])
  const jhbX = useTransform(scrollY, [0, vh, 2*vh], ['0%', '0%', '-100%'])
  const cleY = useTransform(scrollY, [0, vh, 2*vh, 3*vh], [-vh*0.3, -vh, 0, vh*0.15])
  const cleX = useTransform(scrollY, [0, vh, 2*vh], ['100%', '100%', '0%'])
  const jhbOpacity = useTransform(scrollY, [vh, 1.5*vh, 2*vh], [1, 0.5, 0])
  const cleOpacity = useTransform(scrollY, [vh, 1.5*vh, 2*vh], [0, 0.5, 1])
  const skyY = useTransform(scrollY, v => v * parallaxFactor)
  const iomY = useTransform(scrollY, v => v * parallaxFactor - (vh * 3) * parallaxFactor)
  const jungleY = useTransform(scrollY, v => v * parallaxFactor - (vh * 4) * parallaxFactor)
  const mineshaftY = useTransform(scrollY, v => v * parallaxFactor - (vh * 5) * parallaxFactor)

  const [section, setSection] = useState('sky')
  const [dialog, setDialog] = useState(null)
  const [portal, setPortal] = useState(false)
  const [miningGame, setMiningGame] = useState(false)
  const [guideOpen, setGuideOpen] = useState(false)
  const [activeScene, setActiveScene] = useState(null)
  const isDay = isDayInSouthAfrica()
  const age = ageFromDOB('2004-08-08')

  useKonami(() => setPortal(true))

  useEffect(() => {
    const h = () => {
      const y = window.scrollY
      const h = window.innerHeight
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
    const resumeAudio = () => {
      initAudioContext()
      window.removeEventListener('click', resumeAudio)
      window.removeEventListener('keydown', resumeAudio)
    }
    window.addEventListener('click', resumeAudio)
    window.addEventListener('keydown', resumeAudio)
    return () => {
      window.removeEventListener('click', resumeAudio)
      window.removeEventListener('keydown', resumeAudio)
    }
  }, [])

  useEffect(() => {
    console.log("%cHey fellow dev, hope you like the pixels!", "font-family: 'Press Start 2P'; font-size: 16px; color: #00ffd0; background: #222; padding: 10px; border-radius: 4px;")
    document.body.style.cursor = `url('${tardisCursor}') 16 16, auto`
    
    const handleMove = (e) => {
      if (Math.random() > 0.5) return 
      const dot = document.createElement('div')
      dot.className = 'cursor-trail'
      dot.style.left = `${e.clientX}px`
      dot.style.top = `${e.clientY}px`
      const size = Math.random() * 6 + 2
      dot.style.width = `${size}px`
      dot.style.height = `${size}px`
      dot.style.background = ['#fff', '#00ffd0', '#ffd700', '#ff0055'][Math.floor(Math.random() * 4)]
      dot.style.borderRadius = '0%'
      dot.style.boxShadow = '0 0 4px rgba(255,255,255,0.8)'
      dot.style.pointerEvents = 'none'
      dot.style.position = 'fixed'
      dot.style.zIndex = '9999'
      dot.style.transition = 'transform 0.5s, opacity 0.5s'
      document.body.appendChild(dot)
      requestAnimationFrame(() => {
        dot.style.transform = `translate(${Math.random()*20-10}px, ${Math.random()*20+10}px) rotate(${Math.random()*360}deg)`
        dot.style.opacity = '0'
      })
      setTimeout(() => dot.remove(), 500)
    }
    window.addEventListener('mousemove', handleMove)
    return () => window.removeEventListener('mousemove', handleMove)
  }, [])

  const skySection = (
    <div className="section">
      <div style={{ position: 'relative' }}>
        <motion.img 
          src={me8bit} 
          alt="Pixel Oscar"
          style={{ 
            position: 'absolute',
            top: -120,
            left: '50%',
            x: -180, // Framer motion uses x instead of transform translateX
            width: 80, 
            height: 80, 
            imageRendering: 'pixelated',
            zIndex: 20
          }}
          animate={{ 
            rotate: [-5, 5, -5],
            y: [0, -10, 0]
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        />
        <div className="title">Oscar Brimelow</div>
        <div style={{ fontSize: 20, marginTop: 10 }}>
          Age {age}. The Journey Begins.
        </div>
        <div style={{ marginTop: 18 }}>
           <SocialIcons />
           <div style={{ marginTop: 16 }}>
             <button 
               className="pixel-button" 
               style={{ padding: '8px 16px', fontSize: '14px' }}
               onClick={() => {
                 play('blip')
                 setGuideOpen(true)
               }}
               onMouseEnter={() => play('blip')}
             >
               📜 Guide
             </button>
           </div>
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
          <button className="pixel-button" onMouseEnter={() => play('blip')} onClick={() => setActiveScene('jhb')}>
            📍 Explore Johannesburg
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
          <button className="pixel-button" onMouseEnter={() => play('blip')} onClick={() => setActiveScene('cle')}>
            📍 Explore Arcade
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
          <button className="pixel-button" onMouseEnter={() => play('blip')} onClick={() => setActiveScene('iom')}>
            📍 Explore Lighthouse
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
          <button className="pixel-button" onMouseEnter={() => play('blip')} onClick={() => setActiveScene('jungle')}>
            📍 Explore Jungle
          </button>
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
        
        {/* Explore Button */}
        <div style={{ marginTop: 16 }}>
          <button 
            className="pixel-button" 
            onClick={() => setActiveScene('mineshaft')}
            onMouseEnter={() => play('blip')}
          >
             🔦 Explore Mines
          </button>
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
                   const prizes = [
                     { name: 'Found a Ruby!', item: '💎', money: 50 },
                     { name: 'Nothing here...', item: null, money: 0 },
                     { name: 'A secret key!', item: '🗝️', money: 0 },
                     { name: 'Golden Nugget!', item: '⚜️', money: 100 },
                     { name: 'Coal...', item: '⚫', money: 1 }
                   ]
                   const prize = prizes[Math.floor(Math.random() * prizes.length)]
                   
                   if (prize.money > 0) addMoney(prize.money)
                   if (prize.item) {
                     const added = addToInventory(prize.item)
                     if (added) alert(`${prize.name} Added to inventory!`)
                     else alert(`${prize.name} Inventory full!`)
                   } else {
                     alert(prize.name)
                   }
                }
              }}
            >
              {ore}
            </button>
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <div className={theme === 'gameboy' ? 'theme-gameboy' : ''}>
      <PlayerHUD isShaking={isShaking} />
      <BlackberryPhone />
      <Chameleon />
      <KonamiPortal visible={portal} onClose={() => setPortal(false)} />
      {guideOpen && <WorldGuide onClose={() => setGuideOpen(false)} />}
      
      {activeScene && (
        <SceneExplorer 
          sceneId={activeScene}
          bgImage={
            activeScene === 'jhb' ? jhbBg :
            activeScene === 'cle' ? cleScenery :
            activeScene === 'iom' ? iomScenery :
            activeScene === 'jungle' ? jungleBg :
            mineshaftBg
          }
          onClose={() => setActiveScene(null)}
        />
      )}

      {miningGame && <MiningGame onClose={() => setMiningGame(false)} />}
      <AnimatePresence>
        {section === 'jungle' && <JungleExtras />}
      </AnimatePresence>

      <div className="world" style={{ height: '600vh' }}>
        <BgLayer img={skyBg} y={skyY} zIndex={0} top="0" />
        <BgLayer img={jhbBg} y={jhbY} x={jhbX} zIndex={0} top="100vh" blend />
        <BgLayer img={cleBg} y={cleY} x={cleX} zIndex={0} top="200vh" />
        <BgLayer img={iomBg} y={iomY} zIndex={0} top="300vh" blend />
        <BgLayer img={jungleBg} y={jungleY} zIndex={0} top="400vh" blend />
        <BgLayer img={mineshaftBg} y={mineshaftY} zIndex={0} top="500vh" blend />

        <div style={{ position: 'relative', zIndex: 10 }}>
          {skySection}
          <motion.div style={{ x: jhbX, y: jhbY, opacity: jhbOpacity }}>
            {jhbSection}
          </motion.div>
          <motion.div style={{ x: cleX, y: cleY, opacity: cleOpacity }}>
            {cleSection}
          </motion.div>
          {iomSection}
          {jungleSection}
          {mineshaftSection}
        </div>
      </div>
    </div>
  )
}

function BgLayer({ img, y, x, top, blend }) {
  return (
    <motion.img 
      src={img}
      alt="Background"
      style={{ 
        position: 'absolute',
        top: top,
        left: 0,
        width: '100%',
        height: '120vh',
        objectFit: 'cover',
        objectPosition: 'center',
        zIndex: 0,
        pointerEvents: 'none',
        y: y,
        x: x,
        willChange: 'transform',
        maskImage: blend ? 'linear-gradient(to bottom, transparent 0%, black 15%, black 100%)' : undefined,
        WebkitMaskImage: blend ? 'linear-gradient(to bottom, transparent 0%, black 15%, black 100%)' : undefined,
        maskRepeat: 'no-repeat',
        WebkitMaskRepeat: 'no-repeat'
      }}
    />
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
  const { addMoney } = useGame()
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(10)

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else {
      // Reward on finish
      if (score > 0) {
        addMoney(score * 10)
      }
    }
  }, [timeLeft, score, addMoney])

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
          <div style={{ color: '#ffd700', marginBottom: 20 }}>+ {score * 10} Coins</div>
          <button className="pixel-button" onClick={onClose}>Close</button>
        </div>
      )}
    </div>
  )
}
