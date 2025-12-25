import { useEffect, useState } from 'react'
import { isMuted, toggleMute, startBgm, nowPlaying } from '../audio/engine'

export default function SoundBar() {
  const [muted, setMuted] = useState(isMuted())
  const [hovered, setHovered] = useState(false)
  useEffect(() => { startBgm() }, [])
  return (
    <div 
      className="soundbar" 
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ display: 'flex', alignItems: 'center' }}
    >
      <button
        className="pixel-button"
        onClick={() => { toggleMute(); setMuted(isMuted()) }}
        aria-label={muted ? 'Unmute' : 'Mute'}
        title={muted ? 'Unmute' : 'Mute'}
      >
        {muted ? '🔇' : '🔊'}
      </button>
      
      {hovered && (
        <span 
          className="badge" 
          style={{
            position: 'absolute',
            left: '100%',
            marginLeft: 8,
            whiteSpace: 'nowrap',
            background: 'rgba(0,0,0,0.8)',
            padding: '4px 8px',
            borderRadius: 4,
            border: '1px solid #fff',
            pointerEvents: 'none',
            fontSize: 12
          }}
        >
          Now Playing: {nowPlaying}
        </span>
      )}
    </div>
  )
}
