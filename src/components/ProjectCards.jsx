import { play } from '../audio/engine'

const items = [
  { title: 'AskOsc.com', href: 'https://AskOsc.com', primary: true },
  { title: 'MyCoinShelf.com', href: 'https://MyCoinShelf.com', primary: true },
  { title: 'ManxBiltong.com', href: 'https://ManxBiltong.com', primary: true },
  { title: 'MineCraft Farms', href: 'https://oscarbrimelow.github.io/MineCraftFarms/' },
  { title: 'Sulby Glen Hotel', href: 'https://oscarbrimelow.github.io/SulbyGlenHotel/' },
  { title: 'Fyle', href: 'https://github.com/oscarbrimelow/Fyle' },
  { title: 'Meal Planner', href: 'https://oscarbrimelow.github.io/MealPlanner/' },
  { title: 'Ultimate Calculator', href: 'https://oscarbrimelow.github.io/UltimateCalculator/' }
]

export default function ProjectCards() {
  return (
    <div className="grid">
      {items.map(item => (
        <div className="card" key={item.title}>
          <div className="title" style={{ fontSize: 14, color: item.primary ? '#00ffd0' : '#fff' }}>
            {item.title} {item.primary ? '★' : ''}
          </div>
          <div style={{ fontSize: 18, marginTop: 8 }}>
            <a href={item.href} target="_blank" rel="noreferrer" onMouseEnter={() => play('blip')} onClick={() => play('collect')}>
              {item.href}
            </a>
          </div>
        </div>
      ))}
    </div>
  )
}
