import { sceneData } from '../data/sceneData'
import Platformer from './Platformer'

export default function SceneExplorer({ sceneId, bgImage, onClose }) {
  const currentItems = sceneData[sceneId]?.items || []
  
  return (
    <Platformer 
      sceneId={sceneId} 
      bgImage={bgImage} 
      items={currentItems} 
      onClose={onClose} 
    />
  )
}
