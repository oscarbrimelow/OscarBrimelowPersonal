import { createContext, useContext, useState, useEffect } from 'react'
import { play } from '../audio/engine'

const GameContext = createContext()

export function useGame() {
  return useContext(GameContext)
}

export function GameProvider({ children }) {
  const [money, setMoney] = useState(0)
  const [inventory, setInventory] = useState([]) // Array of strings/icons
  const [health, setHealth] = useState(100)
  const [theme, setTheme] = useState('normal') // 'normal' | 'gameboy'
  const [blackberryOpen, setBlackberryOpen] = useState(false)
  const [chameleonClicks, setChameleonClicks] = useState(0)

  // Actions
  const addMoney = (amount) => setMoney(m => m + amount)
  
  const spendMoney = (amount) => {
    if (money >= amount) {
      setMoney(m => m - amount)
      return true
    }
    return false
  }

  const addToInventory = (item) => {
    if (inventory.length < 3 && !inventory.includes(item)) {
      setInventory(prev => [...prev, item])
      return true
    }
    return false
  }

  const takeDamage = (amount) => {
    setHealth(h => Math.max(0, h - amount))
  }

  const toggleBlackberry = () => {
    play('blip')
    setBlackberryOpen(prev => !prev)
  }

  const handleChameleonClick = () => {
    if (theme === 'gameboy') {
      setTheme('normal')
      setChameleonClicks(0)
      play('blip')
      return
    }

    const newCount = chameleonClicks + 1
    setChameleonClicks(newCount)
    play('blip')
    
    if (newCount === 3) {
      setTheme('gameboy')
      play('collect') 
    }
  }

  const triggerLevelUp = () => {
    // Confetti logic will be handled in the component listening to this or via a separate effect
    play('collect') // Placeholder for level up sound
  }

  const value = {
    money,
    inventory,
    health,
    theme,
    blackberryOpen,
    setBlackberryOpen,
    addMoney,
    addToInventory,
    takeDamage,
    toggleBlackberry,
    handleChameleonClick,
    triggerLevelUp,
    chameleonClicks,
    spendMoney
  }

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  )
}
