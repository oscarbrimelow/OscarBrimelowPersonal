import { useGame } from '../context/GameContext'
import { sceneData } from '../data/sceneData'

export default function Achievements({ onClose }) {
  const { collectedSceneItems, visitedScenes, money } = useGame()

  // Calculate totals
  let totalCollectibles = 0
  let collectedCount = 0
  let totalLandmarks = 0
  
  // Per scene stats
  const sceneStats = Object.keys(sceneData).map(sceneKey => {
    const items = sceneData[sceneKey].items
    const collectibles = items.filter(i => i.type === 'collectible')
    const landmarks = items.filter(i => i.type === 'landmark')
    
    const collectedInScene = collectibles.filter(i => collectedSceneItems.includes(i.id)).length
    
    totalCollectibles += collectibles.length
    collectedCount += collectedInScene
    totalLandmarks += landmarks.length
    
    return {
      id: sceneKey,
      name: sceneKey.toUpperCase(),
      total: collectibles.length,
      found: collectedInScene,
      landmarks: landmarks.length
    }
  })

  // Achievement List
  const achievements = [
    {
      id: 'novice',
      name: 'Novice Explorer',
      desc: 'Find your first item',
      unlocked: collectedCount >= 1
    },
    {
      id: 'pro',
      name: 'Treasure Hunter',
      desc: 'Find 10 items',
      unlocked: collectedCount >= 10
    },
    {
      id: 'rich',
      name: 'Money Maker',
      desc: 'Earn $500',
      unlocked: money >= 500
    },
    {
      id: 'globetrotter',
      name: 'Globetrotter',
      desc: 'Visit 3 different locations',
      unlocked: visitedScenes.length >= 3
    },
    {
      id: 'master',
      name: 'Completionist',
      desc: 'Find ALL collectible items',
      unlocked: collectedCount === totalCollectibles && totalCollectibles > 0
    }
  ]

  return (
    <div style={{ textAlign: 'center', color: '#fff' }}>
      <h4 style={{ color: '#ffd700', marginBottom: 20 }}>🏆 Achievements</h4>
      
      {/* Overall Progress */}
      <div style={{ background: '#333', padding: 10, borderRadius: 8, marginBottom: 20 }}>
        <div style={{ fontSize: 12, color: '#aaa' }}>Total Progress</div>
        <div style={{ fontSize: 24, color: '#00ffd0' }}>{collectedCount} / {totalCollectibles}</div>
        <div style={{ fontSize: 10, color: '#888' }}>Items Found</div>
      </div>

      {/* Scene Breakdown */}
      <h5 style={{ color: '#fff', marginBottom: 10, textAlign: 'left' }}>Locations</h5>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 20 }}>
        {sceneStats.map(stat => (
          <div key={stat.id} style={{ background: '#222', padding: 8, borderRadius: 6, textAlign: 'left' }}>
            <div style={{ fontSize: 12, fontWeight: 'bold' }}>{stat.name}</div>
            <div style={{ fontSize: 10, color: '#aaa' }}>Items: {stat.found}/{stat.total}</div>
          </div>
        ))}
      </div>

      {/* Medals */}
      <h5 style={{ color: '#fff', marginBottom: 10, textAlign: 'left' }}>Medals</h5>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20, maxHeight: 150, overflowY: 'auto' }}>
        {achievements.map(ach => (
          <div key={ach.id} style={{ 
            background: ach.unlocked ? 'linear-gradient(90deg, #333 0%, #444 100%)' : '#222', 
            padding: 8, 
            borderRadius: 6, 
            textAlign: 'left',
            borderLeft: ach.unlocked ? '4px solid #ffd700' : '4px solid #555',
            opacity: ach.unlocked ? 1 : 0.6
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 12, color: ach.unlocked ? '#fff' : '#888' }}>{ach.name}</span>
              {ach.unlocked && <span style={{ fontSize: 12 }}>✅</span>}
            </div>
            <div style={{ fontSize: 10, color: '#aaa' }}>{ach.desc}</div>
          </div>
        ))}
      </div>

      <button className="pixel-button" onClick={onClose}>Back</button>
    </div>
  )
}
