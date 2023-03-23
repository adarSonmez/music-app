import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { Howl } from 'howler'
import { formatTime } from '@/includes/helper'

export default defineStore('player', () => {
  const sound = ref(null)
  const currentSong = ref(null)
  const seek = ref('00:00')
  const duration = ref('00:00')
  const playerProgress = ref('0%')

  const isPlaying = computed(() => {
    if (sound.value) {
      return sound.value.playing()
    }
    return false
  })

  async function newSong(song) {
    if (sound.value instanceof Howl) {
      await sound.value.unload()
    }

    currentSong.value = song

    sound.value = new Howl({
      src: [song.url],
      html5: true,
      format: ['mp3'],
      onplay: () => {
        console.log('playing')
        requestAnimationFrame(progress)
      },
      onpause: () => {
        console.log('paused')
      },
      onend: () => {
        console.log('finished')
      }
    })
    await sound.value.play()
  }

  async function togglePlay() {
    if (!sound.value) {
      return
    }

    if (isPlaying.value) {
      await sound.value.pause()
    } else {
      await sound.value.play()
    }
  }

  async function updateSeek(event) {
    if (!sound.value) {
      return
    }

    const { x, width } = event.target.getBoundingClientRect()

    const clickX = event.clientX - x
    const percentage = clickX / width
    const seconds = sound.value.duration() * percentage

    await sound.value.seek(seconds)
    await sound.value.once('seek', progress)
  }

  function progress() {
    if (sound.value) {
      seek.value = formatTime(sound.value.seek())
      duration.value = formatTime(sound.value.duration())
      playerProgress.value = `${(sound.value.seek() / sound.value.duration()) * 100}%`

      if (sound.value.playing()) {
        requestAnimationFrame(progress)
      }
    }
  }

  return { newSong, togglePlay, updateSeek, isPlaying, seek, duration, playerProgress, currentSong }
})
