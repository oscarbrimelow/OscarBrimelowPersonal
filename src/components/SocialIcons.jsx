import { play } from '../audio/engine'

const links = [
  { href: 'https://instagram.com/oscarbrimelow/', label: 'IG', emoji: '📸' },
  { href: 'https://github.com/oscarbrimelow', label: 'GH', emoji: '🐙' },
  { href: 'https://discord.com/users/oscarza', label: 'DC', emoji: '💬' },
  { href: 'https://open.spotify.com/user/47xzzm4tm5meveaqo7h1zrv01?si=352da350bf234989', label: 'SP', emoji: '🎵' },
  { href: 'https://facebook.com/oscar.brimelow', label: 'FB', emoji: '📘' },
  { href: 'https://youtube.com/channel/UC6iU7m1r682I4ZPNS9W_bNA', label: 'YT', emoji: '▶️' }
]

export default function SocialIcons() {
  return (
    <div className="socials">
      {links.map(item => (
        <a
          key={item.href}
          className="social-icon"
          href={item.href}
          target="_blank"
          rel="noreferrer"
          onMouseEnter={() => play('blip')}
          onClick={() => play('collect')}
          title={item.label}
          aria-label={item.label}
        >
          <span style={{ fontSize: 18 }}>{item.emoji}</span>
        </a>
      ))}
    </div>
  )
}
