import { play } from '../audio/engine'

const links = [
  { href: 'https://instagram.com/oscarbrimelow/', label: 'IG', emoji: '📸' },
  { href: 'https://github.com/oscarbrimelow', label: 'GH', emoji: '🐙' },
  { href: 'https://discord.com/users/oscarza', label: 'DC', emoji: '💬' },
  { href: 'https://facebook.com/oscar.brimelow', label: 'FB', emoji: '📘' },
  { href: 'https://youtube.com/channel/UC6iU7m1r682I4ZPNS9W_bNA', label: 'YT', emoji: '▶️' }
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
             fontSize: 32, 
             textDecoration: 'none', 
             transition: 'transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
             display: 'inline-block',
             transform: `rotate(${i % 2 === 0 ? 3 : -3}deg)`,
             margin: '0 8px'
          }}
        >
          {item.emoji}
        </a>
      ))}
    </div>
  )
}
