import { Howl, Howler } from 'howler'

const sounds = {
  bgm: new Howl({
    src: ['https://cdn.pixabay.com/download/audio/2022/03/24/audio_998c5b5eb6.mp3?filename=8-bit-rpg-120bpm-10636.mp3'],
    loop: true,
    volume: 0.35
  }),
  blip: new Howl({
    src: ['https://cdn.pixabay.com/download/audio/2021/09/29/audio_9b2f64f334.mp3?filename=ui-confirmation-1-1765.mp3'],
    volume: 0.5
  }),
  collect: new Howl({
    src: ['https://cdn.pixabay.com/download/audio/2022/03/15/audio_d4e8823717.mp3?filename=bonus-6160.mp3'],
    volume: 0.6
  }),
  splash: new Howl({
    src: ['https://cdn.pixabay.com/download/audio/2022/03/10/audio_bb2a61d4d0.mp3?filename=water-splash-5956.mp3'],
    volume: 0.6
  })
}

export function play(name) {
  const s = sounds[name]
  if (s) s.play()
}

export function toggleMute() {
  Howler.mute(!Howler._muted)
}

export function isMuted() {
  return !!Howler._muted
}

export function startBgm() {
  if (!sounds.bgm.playing()) sounds.bgm.play()
}

export function stopBgm() {
  if (sounds.bgm.playing()) sounds.bgm.stop()
}

export const nowPlaying = 'Chiptune Loop'
