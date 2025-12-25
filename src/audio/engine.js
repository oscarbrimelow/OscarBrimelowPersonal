import { Howl, Howler } from 'howler'

const sounds = {
  bgm: new Howl({
    src: ['https://assets.mixkit.co/active_storage/sfx/123/123-preview.mp3'], // Placeholder replacement
    loop: true,
    volume: 0.35
  }),
  blip: new Howl({
    src: ['https://assets.mixkit.co/active_storage/sfx/2578/2578-preview.mp3'], // Placeholder replacement
    volume: 0.5
  }),
  collect: new Howl({
    src: ['https://assets.mixkit.co/active_storage/sfx/2000/2000-preview.mp3'], // Placeholder replacement
    volume: 0.6
  }),
  splash: new Howl({
    src: ['https://assets.mixkit.co/active_storage/sfx/2003/2003-preview.mp3'], // Placeholder replacement
    volume: 0.6
  })
}

export function play(name) {
  if (name !== 'bgm' && sfxMuted) return
  const s = sounds[name]
  if (s) s.play()
}

let sfxMuted = false
let musicMuted = false

export function toggleMute() {
  Howler.mute(!Howler._muted)
}

export function isMuted() {
  return !!Howler._muted
}

export function setGlobalVolume(val) {
  Howler.volume(val)
}

export function toggleMusicMute() {
  musicMuted = !musicMuted
  if (musicMuted) sounds.bgm.mute(true)
  else sounds.bgm.mute(false)
  return musicMuted
}

export function toggleSfxMute() {
  sfxMuted = !sfxMuted
  return sfxMuted
}

export function isMusicMuted() {
  return musicMuted
}

export function isSfxMuted() {
  return sfxMuted
}

export function startBgm() {
  if (!sounds.bgm.playing()) sounds.bgm.play()
}

export function stopBgm() {
  if (sounds.bgm.playing()) sounds.bgm.stop()
}

export const nowPlaying = 'Chiptune Loop'
