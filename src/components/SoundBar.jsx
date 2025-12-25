import { useEffect, useState } from 'react'
import { isMuted, toggleMute, startBgm, nowPlaying } from '../audio/engine'

export default function SoundBar() {
  const [muted, setMuted] = useState(isMuted())
  useEffect(() => { startBgm() }, [])
  return (
    <div className="soundbar">
      <button
        className="pixel-button"
        onClick={() => { toggleMute(); setMuted(isMuted()) }}
        aria-label={muted ? 'Unmute' : 'Mute'}
        title={muted ? 'Unmute' : 'Mute'}
      >
        {muted ? '🔇' : '🔊'}
      </button>
      <span className="badge">Now Playing: {nowPlaying}</span>
    </div>
  )
}
