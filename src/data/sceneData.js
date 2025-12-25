export const sceneData = {
  jhb: {
    items: [
      { 
        id: 'jhb_coffee', 
        x: 80, 
        y: 75, 
        icon: '☕', 
        type: 'collectible', 
        name: 'Strong Coffee', 
        item: '☕', 
        message: 'You found a fresh brew! Caffeine +20HP' 
      },
      { 
        id: 'jhb_graffiti', 
        x: 20, 
        y: 40, 
        width: 15, 
        height: 10, 
        type: 'inspect', 
        message: 'Graffiti reads: "CODE IS ART"' 
      }
    ]
  },
  cle: {
    items: [
      { 
        id: 'cle_token', 
        x: 50, 
        y: 85, 
        icon: '🪙', 
        type: 'collectible', 
        name: 'Arcade Token', 
        item: '🪙', 
        message: 'An old arcade token! (+ $50)' 
      }
    ]
  },
  iom: {
    items: [
      { 
        id: 'iom_shell', 
        x: 30, 
        y: 90, 
        icon: '🐚', 
        type: 'collectible', 
        name: 'Seashell', 
        item: '🐚', 
        message: 'A perfect seashell. Added to inventory.' 
      }
    ]
  },
  jungle: {
    items: [
      { 
        id: 'jungle_banana', 
        x: 60, 
        y: 50, 
        icon: '🍌', 
        type: 'collectible', 
        name: 'Banana', 
        item: '🍌', 
        message: 'Potassium power! (+10 HP)' 
      },
      {
        id: 'jungle_parrot',
        x: 85,
        y: 20,
        icon: '🦜',
        type: 'inspect',
        message: 'Squawk! Hello World! Squawk!'
      }
    ]
  },
  mineshaft: {
    items: [
      { 
        id: 'mine_diamond', 
        x: 90, 
        y: 80, 
        icon: '💎', 
        type: 'collectible', 
        name: 'Hidden Diamond', 
        item: '💎', 
        message: 'JACKPOT! You found a hidden diamond!' 
      }
    ]
  }
}
