<template>
  <div class="music-player" :class="{ playing: isPlaying }" @click="toggle" :title="isPlaying ? '暂停' : '播放'">
    <span class="music-icon">🎵</span>
    <span class="music-note" v-if="isPlaying">♪</span>
    <audio ref="audioRef" loop preload="auto">
      <source src="/bg.mp3" type="audio/mpeg" />
    </audio>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'

const audioRef = ref(null)
const isPlaying = ref(false)

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
  position: fixed;
  top: 16px;
  right: 16px;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.85);
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 100;
  transition: all 0.3s;
  backdrop-filter: blur(8px);

  &:hover {
    transform: scale(1.08);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
  }

  &.playing {
    background: var(--pink-bg);
    box-shadow: 0 2px 12px rgba(255, 100, 140, 0.15);

    .music-icon {
      animation: float 2s infinite ease-in-out;
    }
  }
}

.music-icon {
  font-size: 18px;
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
