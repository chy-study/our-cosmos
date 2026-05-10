<template>
  <div class="music-player" :class="{ playing: isPlaying }" @click="toggle" :title="isPlaying ? '暂停' : '播放'">
    <span class="music-icon">🎵</span>
    <span class="music-note" v-if="isPlaying">♪</span>
    <audio ref="audioRef" loop preload="auto">
      <source src="/src/assets/music/kiss_the_rain.m4a" type="audio/mp4" />
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
