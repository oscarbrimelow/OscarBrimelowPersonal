import ponteImg from '../assets/pontecity.jpg'
import terminalTowerImg from '../assets/terminaltower.jpg'
import goldReefImg from '../assets/goldreefcity.jpg'
import melvilleImg from '../assets/melville.jpg'
import rocknrollImg from '../assets/rocknroll.jpg'
import laxeyWheelImg from '../assets/laxeywheel.jpg'
import sulbyGlenImg from '../assets/sulbyglenhotel.jpg'
import cucumberImg from '../assets/cucumberchameleonjungle.JPG'

export const sceneData = {
  jhb: {
    items: [
      { 
        id: 'jhb_coffee', 
        x: 80, 
        y: 82, 
        icon: '☕', 
        type: 'collectible', 
        name: 'Strong Coffee', 
        item: '☕', 
        message: 'You found a fresh brew! Caffeine +20HP' 
      },
      { 
        id: 'jhb_graffiti', 
        x: 20, 
        y: 82, 
        width: 15, 
        height: 10, 
        type: 'inspect', 
        message: 'Graffiti reads: "CODE IS ART"' 
      },
      { 
        id: 'jhb_biltong', 
        x: 60, 
        y: 82, 
        icon: '🥩', 
        type: 'collectible', 
        name: 'Biltong', 
        item: '🥩', 
        message: 'Oscar loves biltong, he eats it when hes coding late nights' 
      },
      { 
        id: 'jhb_krugerrand', 
        x: 35, 
        y: 82, 
        icon: '🪙', 
        type: 'collectible', 
        name: 'Krugerrand', 
        item: '🪙', 
        message: 'Oscar collects currencies around the world with his project mycoinshelf.com' 
      },
      { 
        id: 'jhb_rooibos', 
        x: 10, 
        y: 82, 
        icon: '🍵', 
        type: 'collectible', 
        name: 'Rooibos Tea', 
        item: '🍵', 
        message: 'A warm cup of Rooibos tea. (Adds HP)' 
      },
      {
        id: 'jhb_sign',
        x: 50,
        y: 82,
        icon: '🛑',
        type: 'inspect',
        message: 'Street Sign: "Caution: Developers at work"'
      },
      {
        id: 'jhb_ponte',
        x: 75,
        y: 65,
        width: 10,
        height: 30,
        type: 'landmark',
        name: 'Ponte City',
        image: ponteImg,
        description: 'Ponte City is the tallest residential skyscraper in Africa. A brutalist icon of the Johannesburg skyline.'
      },
      {
        id: 'jhb_goldreef',
        x: 15,
        y: 70,
        width: 15,
        height: 15,
        icon: '🎢',
        type: 'landmark',
        name: 'Gold Reef City',
        image: ponteImg, // TEMP FIX: Use Ponte Image to test if goldreefcity.jpg is corrupt
        description: 'Built on top of an old gold mine, this theme park represents the gold rush history of Johannesburg.'
      },
      {
        id: 'jhb_melville',
        x: 85,
        y: 75,
        width: 12,
        height: 12,
        type: 'landmark',
        name: 'Melville Koppies',
        image: melvilleImg,
        description: 'A nature reserve and heritage site in the heart of the city, showing the natural beauty of the Highveld.'
      },
      // Obstacles
      {
        id: 'jhb_obs_1',
        x: 25,
        y: 84,
        icon: '🚧',
        type: 'obstacle',
        message: 'Ouch! Watch out for construction!'
      },
      {
        id: 'jhb_obs_2',
        x: 45,
        y: 84,
        icon: '🔥',
        type: 'obstacle',
        message: 'Too hot! Stay away from the fire!'
      },
      {
        id: 'jhb_obs_3',
        x: 65,
        y: 84,
        icon: '🪨',
        type: 'obstacle',
        message: 'You tripped over a rock!'
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
      },
      {
        id: 'cle_terminal_tower',
        x: 45,
        y: 30,
        width: 15,
        height: 40,
        type: 'landmark',
        name: 'Terminal Tower',
        image: terminalTowerImg,
        description: 'The Terminal Tower is a 52-story landmark skyscraper located on Public Square in downtown Cleveland.'
      },
      {
        id: 'cle_rockhall',
        x: 80,
        y: 45,
        width: 15,
        height: 20,
        type: 'landmark',
        name: 'Rock & Roll Hall of Fame',
        image: rocknrollImg,
        description: 'The world-famous museum documenting the history of rock music and the artists, producers, and engineers who have influenced its development.'
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
      },
      {
        id: 'iom_laxey',
        x: 60,
        y: 35,
        width: 15,
        height: 25,
        type: 'landmark',
        name: 'Laxey Wheel',
        image: laxeyWheelImg,
        description: 'The Great Laxey Wheel is the largest working waterwheel in the world.'
      },
      {
        id: 'iom_sulby',
        x: 20,
        y: 45,
        width: 15,
        height: 15,
        type: 'landmark',
        name: 'Sulby Glen Hotel',
        image: sulbyGlenImg,
        description: 'A classic Manx pub and hotel nestled in the beautiful Sulby Glen.'
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
      },
      {
        id: 'jungle_cucumber',
        x: 75,
        y: 65,
        width: 15,
        height: 15,
        type: 'landmark',
        name: 'Cucumber the Chameleon',
        image: cucumberImg,
        description: 'This is Cucumber, Oscar\'s pet chameleon!'
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
