import { play } from '../audio/engine'

const items = [
  { title: 'AskOsc.com', href: 'https://AskOsc.com', primary: true, icon: '🤖' },
  { title: 'MyCoinShelf.com', href: 'https://MyCoinShelf.com', primary: true, icon: '🪙' },
  { title: 'ManxBiltong.com', href: 'https://ManxBiltong.com', primary: true, icon: '🥩' },
  { title: 'MineCraft Farms', href: 'https://oscarbrimelow.github.io/MineCraftFarms/', icon: '🐷' },
  { title: 'Sulby Glen Hotel', href: 'https://oscarbrimelow.github.io/SulbyGlenHotel/', icon: '🏨' },
  { title: 'Fyle', href: 'https://github.com/oscarbrimelow/Fyle', icon: '📁' },
  { title: 'Meal Planner', href: 'https://oscarbrimelow.github.io/MealPlanner/', icon: '🍱' },
  { title: 'Ultimate Calculator', href: 'https://oscarbrimelow.github.io/UltimateCalculator/', icon: '🧮' }
]

export default function ProjectCards() {
  const { addMoney } = useGame()
  const [cooldowns, setCooldowns] = useState({})

  const handleCardClick = (title, href) => {
    if (cooldowns[title]) {
      window.open(href, '_blank')
      return
    }

    // Give money logic
    addMoney(10)
    play('collect')
    
    // Set cooldown
    setCooldowns(prev => ({ ...prev, [title]: true }))
    setTimeout(() => {
      setCooldowns(prev => ({ ...prev, [title]: false }))
    }, 5000) // 5 second cooldown

    // Still open link? User said "clicking on my projects gives you money per click". 
    // Usually projects open a link. I should probably still open it or maybe just give money if they hold shift? 
    // The prompt says "clicking on my projects gives you money". It implies the action itself.
    // I will let it open the link too, so it's a bonus.
    window.open(href, '_blank')
  }

  return (
    <div className="grid" style={{ gap: '24px', display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
      {items.map((item, i) => (
        <div 
          className="card" 
          key={item.title}
          style={{
            transform: `rotate(${Math.random() * 4 - 2}deg)`,
            transition: 'transform 0.2s',
            border: item.primary ? '3px solid #00ffd0' : '3px solid #444',
            background: '#111',
            padding: '16px',
            width: '200px',
            textAlign: 'center',
            cursor: 'pointer',
            position: 'relative'
          }}
          onMouseEnter={(e) => {
            play('blip')
            e.currentTarget.style.transform = 'scale(1.05) rotate(0deg)'
          }}
          onMouseLeave={(e) => {
             e.currentTarget.style.transform = `rotate(${Math.random() * 4 - 2}deg)`
          }}
          onClick={() => handleCardClick(item.title, item.href)}
        >
          {cooldowns[item.title] ? null : (
            <div style={{ 
              position: 'absolute', 
              top: -10, 
              right: -10, 
              background: '#ffd700', 
              color: '#000', 
              borderRadius: '50%', 
              width: 24, 
              height: 24, 
              fontSize: 12, 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              fontWeight: 'bold',
              boxShadow: '0 0 5px rgba(255, 215, 0, 0.8)'
            }}>
              $
            </div>
          )}
          <div style={{ fontSize: 32, marginBottom: 8 }}>{item.icon}</div>
          <div className="title" style={{ fontSize: 18, color: item.primary ? '#00ffd0' : '#fff', fontFamily: 'Press Start 2P, cursive', marginBottom: 8 }}>
            {item.title}
          </div>
          <div style={{ fontSize: 14 }}>
            <a href={item.href} target="_blank" rel="noreferrer" onClick={() => play('collect')} style={{ color: '#aaa', textDecoration: 'none' }}>
              [View Artifact]
            </a>
          </div>
        </div>
      ))}
    </div>
  )
}
