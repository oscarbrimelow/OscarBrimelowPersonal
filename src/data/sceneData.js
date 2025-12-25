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
      },
      { 
        id: 'jhb_biltong', 
        x: 60, 
        y: 85, 
        icon: '🥩', 
        type: 'collectible', 
        name: 'Biltong', 
        item: '🥩', 
        message: 'Oscar loves biltong, he eats it when hes coding late nights' 
      },
      { 
        id: 'jhb_krugerrand', 
        x: 35, 
        y: 60, 
        icon: '🪙', 
        type: 'collectible', 
        name: 'Krugerrand', 
        item: '🪙', 
        message: 'Oscar collects currencies around the world with his project mycoinshelf.com' 
      },
      { 
        id: 'jhb_rooibos', 
        x: 10, 
        y: 75, 
        icon: '🍵', 
        type: 'collectible', 
        name: 'Rooibos Tea', 
        item: '🍵', 
        message: 'A warm cup of Rooibos tea. (Adds HP)' 
      },
      {
        id: 'jhb_sign',
        x: 50,
        y: 20,
        icon: '🛑',
        type: 'inspect',
        message: 'Street Sign: "Caution: Developers at work"'
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
      },
      { 
        id: 'cle_pierogi', 
        x: 70, 
        y: 65, 
        icon: '🥟', 
        type: 'collectible', 
        name: 'Pierogis', 
        item: '🥟', 
        message: 'Delicious Cleveland Pierogis!' 
      },
      {
        id: 'cle_arcade',
        x: 20,
        y: 50,
        icon: '🕹️',
        type: 'inspect',
        message: 'A vintage Pac-Man machine. High Score: OSCAR'
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
      },
      { 
        id: 'iom_motorbike', 
        x: 75, 
        y: 60, 
        icon: '🏍️', 
        type: 'collectible', 
        name: 'Model Motorbike', 
        item: '🏍️', 
        message: 'A souvenir from the famous TT races!' 
      },
      { 
        id: 'iom_manx_biltong', 
        x: 50, 
        y: 70, 
        icon: '🥩', 
        type: 'collectible', 
        name: 'Manx Biltong', 
        item: '🥩', 
        message: 'Dads home made biltong made in IOM!' 
      },
      {
        id: 'iom_lighthouse',
        x: 10,
        y: 30,
        icon: '🚨',
        type: 'inspect',
        message: 'The Point of Ayre Lighthouse blinking in the distance.'
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
      },
      {
        id: 'jungle_fruit',
        x: 25,
        y: 60,
        icon: '🥭',
        type: 'collectible',
        name: 'Exotic Fruit',
        item: '🥭',
        message: 'A sweet jungle mango! (+20 HP)'
      },
      {
        id: 'jungle_idol',
        x: 45,
        y: 30,
        icon: '🗿',
        type: 'collectible',
        name: 'Ancient Idol',
        item: '🗿',
        message: 'A mysterious artifact...'
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
      },
      {
        id: 'mine_pickaxe',
        x: 20,
        y: 70,
        icon: '⛏️',
        type: 'collectible', 
        name: 'Rusty Pickaxe',
        item: '⛏️',
        message: 'Useful for mining gems!'
      },
      {
        id: 'mine_lantern',
        x: 50,
        y: 40,
        icon: '🏮',
        type: 'inspect',
        message: 'It flickers... something is watching.'
      }
    ]
  }
}
