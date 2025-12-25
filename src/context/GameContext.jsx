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

  const [godMode, setGodMode] = useState(false)
  const [hasSecretApp, setHasSecretApp] = useState(false)
  const [collectedSceneItems, setCollectedSceneItems] = useState([]) // Array of IDs

  // Actions
  const addMoney = (amount) => setMoney(m => m + amount)

  const markItemAsCollected = (itemId) => {
    if (!collectedSceneItems.includes(itemId)) {
      setCollectedSceneItems(prev => [...prev, itemId])
      return true
    }
    return false
  }
  
  const spendMoney = (amount) => {
    if (money >= amount) {
      setMoney(m => m - amount)
      return true
    }
    return false
  }

  const addToInventory = (item) => {
    if (inventory.length < 20) {
      setInventory(prev => [...prev, item])
      return true
    }
    return false
  }

  const removeFromInventory = (index) => {
    setInventory(prev => prev.filter((_, i) => i !== index))
  }

  const useItem = (item, index) => {
    let used = false
    let message = ''

    switch(item) {
      case '☕':
        setHealth(h => Math.min(100, h + 20))
        message = 'You feel caffeinated! (+20 HP)'
        used = true
        break
      case '🧪':
        setHealth(h => Math.min(100, h + 50))
        message = 'Health restored! (+50 HP)'
        used = true
        break
      case '💻':
        setGodMode(prev => !prev)
        message = godMode ? 'God Mode Deactivated.' : 'God Mode Activated!'
        // Dev Kit is reusable, so we don't remove it? 
        // Or maybe it's a one-time activation? Let's make it toggleable and NOT consumed.
        used = false 
        break
      case '🗝️':
        if (!hasSecretApp) {
          setHasSecretApp(true)
          message = 'You unlocked the Secret App!'
          used = true
        } else {
          message = 'You already used this key.'
          used = false
        }
        break
      case '💎':
        addMoney(500)
        message = 'Sold Ruby for $500!'
        used = true
        break
      case '⚜️':
        addMoney(200)
        message = 'Sold Gold Nugget for $200!'
        used = true
        break
      case '⚫':
        message = 'It is just coal... (No effect)'
        used = true // Consume it to get rid of it? Or keep it? Let's consume.
        break
      case '🥩':
        setHealth(h => Math.min(100, h + 15))
        message = 'Yum! Biltong is the best coding snack. (+15 HP)'
        used = true
        break
      case '🍵':
        setHealth(h => Math.min(100, h + 15))
        message = 'Refreshing Rooibos tea. (+15 HP)'
        used = true
        break
      case '🥟':
        setHealth(h => Math.min(100, h + 20))
        message = 'Delicious Pierogis! (+20 HP)'
        used = true
        break
      case '🪙':
        addMoney(100)
        message = 'Sold the rare coin for $100!'
        used = true
        break
      case '🏍️':
        message = 'Vroom Vroom! It is a model of a TT Bike.'
        used = false // Keep it as a souvenir?
        break
      case '🥭':
        setHealth(h => Math.min(100, h + 20))
        message = 'Juicy Jungle Mango! (+20 HP)'
        used = true
        break
      case '🗿':
        addMoney(1000)
        message = 'You sold the Ancient Idol to a museum for $1000!'
        used = true
        break
      case '⛏️':
        message = 'You can use this in the mineshaft!'
        used = false
        break
      default:
        message = 'This item cannot be used.'
    }

    if (used) {
      removeFromInventory(index)
    }
    
    return message
  }

  const takeDamage = (amount) => {
    if (godMode) return
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
    spendMoney,
    useItem,
    godMode,
    hasSecretApp,
    collectedSceneItems,
    markItemAsCollected
  }

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  )
}
