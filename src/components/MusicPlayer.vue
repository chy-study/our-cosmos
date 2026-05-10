<template>
  <div class="music-player" :class="{ playing: isPlaying }" @click="toggle" :title="isPlaying ? '暂停' : '播放'">
    <span class="music-icon">🎵</span>
    <span class="music-note" v-if="isPlaying">♪</span>
    <audio ref="audioRef" preload="auto" @ended="nextSong" />
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'

const audioRef = ref(null)
const isPlaying = ref(false)

const musicModules = import.meta.glob('../assets/music/*.{mp3,m4a}', { eager: true, query: '?url', import: 'default' })
const musicUrls = Object.values(musicModules)

function pickRandom(excludeUrl) {
  const pool = excludeUrl && musicUrls.length > 1
    ? musicUrls.filter(u => u !== excludeUrl)
    : musicUrls
  return pool[Math.floor(Math.random() * pool.length)]
}

function setSource(url) {
  const audio = audioRef.value
  if (!audio) return
  audio.src = url
  audio.load()
}

function nextSong() {
  const audio = audioRef.value
  if (!audio) return
  const newUrl = pickRandom(audio.src)
  setSource(newUrl)
  audio.play().then(() => {
    isPlaying.value = true
  }).catch(() => {
    isPlaying.value = false
  })
}

const toggle = () => {
  const audio = audioRef.value
  if (!audio) return

  if (isPlaying.value) {
    audio.pause()
    isPlaying.value = false
  } else {
    audio.play().then(() => {
      isPlaying.value = true
    }).catch(() => {
      // autoplay blocked
    })
  }
}

onMounted(() => {
  const audio = audioRef.value
  if (!audio) return

  // Set initial random source
  setSource(pickRandom())

  // Try autoplay
  audio.play().then(() => {
    isPlaying.value = true
  }).catch(() => {
    isPlaying.value = false
  })

  // Also listen for first user interaction to start playing
  const startOnInteraction = () => {
    if (!isPlaying.value) {
      audio.play().then(() => {
        isPlaying.value = true
      }).catch(() => {})
    }
    document.removeEventListener('click', startOnInteraction)
  }
  document.addEventListener('click', startOnInteraction, { once: true })
})
</script>

<style scoped lang="scss">
.music-player {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s;

  &.playing {
    background: var(--pink-bg);

    .music-icon {
      animation: float 2s infinite ease-in-out;
    }
  }
}

.music-icon {
  font-size: 18px;
  filter: brightness(0) invert(1);
  transition: all 0.3s;
}

.music-note {
  position: absolute;
  top: -4px;
  right: -2px;
  font-size: 12px;
  color: var(--pink);
  animation: float 1.5s infinite ease-in-out;
}
</style>
