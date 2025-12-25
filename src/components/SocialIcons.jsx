import { play } from '../audio/engine'
import instaLogo from '../assets/instalogo.png'
import githubLogo from '../assets/githublogo.png'
import discordLogo from '../assets/discordlogo.png'
import facebookLogo from '../assets/facebooklogo.png'
import youtubeLogo from '../assets/youtubelogo.png'

const links = [
  { href: 'https://instagram.com/oscarbrimelow/', label: 'IG', icon: instaLogo },
  { href: 'https://github.com/oscarbrimelow', label: 'GH', icon: githubLogo },
  { href: 'https://discord.com/users/oscarza', label: 'DC', icon: discordLogo },
  { href: 'https://facebook.com/oscar.brimelow', label: 'FB', icon: facebookLogo },
  { href: 'https://youtube.com/channel/UC6iU7m1r682I4ZPNS9W_bNA', label: 'YT', icon: youtubeLogo }
]

export default function SocialIcons() {
  return (
    <div className="socials" style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
      {links.map((item, i) => (
        <a
          key={item.href}
          className="social-icon"
          href={item.href}
          target="_blank"
          rel="noreferrer"
          onMouseEnter={(e) => {
             play('blip')
             e.currentTarget.style.transform = 'scale(1.2) rotate(5deg)'
             e.currentTarget.style.zIndex = 10
          }}
          onMouseLeave={(e) => {
             e.currentTarget.style.transform = `scale(1) rotate(${i % 2 === 0 ? 3 : -3}deg)`
             e.currentTarget.style.zIndex = 1
          }}
          onClick={() => play('collect')}
          title={item.label}
          aria-label={item.label}
          style={{ 
             width: 48,
             height: 48,
             textDecoration: 'none', 
             transition: 'transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
             display: 'inline-block',
             transform: `rotate(${i % 2 === 0 ? 3 : -3}deg)`,
             margin: '0 8px',
             background: 'none',
             border: 'none',
             boxShadow: 'none'
          }}
        >
          <img 
            src={item.icon} 
            alt={item.label} 
            style={{ 
              width: '100%', 
              height: '100%', 
              objectFit: 'contain',
              filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))' 
            }} 
          />
        </a>
      ))}
    </div>
  )
}
