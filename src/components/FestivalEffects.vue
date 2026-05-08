<template>
  <div :class="['festival-layer', info.theme]">
    <div class="particles" v-if="info.theme !== 'default'">
      <span
        v-for="n in particleCount"
        :key="n"
        class="particle"
        :class="info.theme"
        :style="particleStyle(n)"
      ></span>
    </div>

    <Teleport to="body">
      <Transition name="popup">
        <div v-if="showPopup" class="festival-popup-overlay" @click="dismissPopup">
          <div class="festival-popup" @click.stop>
            <div class="popup-emoji">{{ info.emoji }}</div>
            <h2 class="popup-title">{{ info.name }}</h2>
            <p class="popup-message">{{ info.message }}</p>
            <p class="popup-names">{{ boy }} & {{ girl }}</p>
            <button class="popup-btn" @click="dismissPopup">收下祝福</button>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { getFestivalInfo } from '../utils/festival'
import config from '../config/love.config'

const { boy, girl } = config
const info = getFestivalInfo()
const showPopup = ref(false)

const particleCount = computed(() => {
  if (info.theme === 'valentine') return 15
  if (info.theme === 'qixi') return 20
  if (info.theme === 'christmas') return 18
  return 12
})

const particleChar = computed(() => {
  if (info.theme === 'valentine') return '🌹'
  if (info.theme === 'qixi') return '⭐'
  if (info.theme === 'christmas') return '❄'
  if (info.theme === 'newyear') return '✨'
  if (info.theme === 'national') return '🇨🇳'
  return '♥'
})

const particleStyle = (n) => ({
  left: ((n * 37 + 13) % 100) + '%',
  animationDelay: (n * 0.4) + 's',
  animationDuration: (3 + (n % 5)) + 's',
  fontSize: (14 + (n % 18)) + 'px',
  opacity: 0.3 + (n % 5) * 0.12
})

const dismissPopup = () => {
  showPopup.value = false
}

onMounted(() => {
  if (info.theme !== 'default') {
    setTimeout(() => {
      showPopup.value = true
    }, 1500)
  }
})
</script>

<style scoped lang="scss">
.festival-layer {
  position: fixed;
  inset: 0;
  z-index: -1;
  transition: background 0.8s;
  pointer-events: none;

  &.valentine  { background: linear-gradient(170deg, #fce4ec, #fdf2f4, #fff5f8); }
  &.qixi       { background: linear-gradient(170deg, #f3e8f8, #f8f4fc, #faf8fc); }
  &.christmas  { background: linear-gradient(170deg, #f3e5e5, #fff5f5, #fff); }
  &.newyear    { background: linear-gradient(170deg, #fff8e7, #fffdf5, #fff); }
  &.national   { background: linear-gradient(170deg, #fde8e8, #fff5f5, #fff); }
  &.default    { background: var(--bg); }
}

.particles {
  position: absolute;
  inset: 0;
  overflow: hidden;
}

.particle {
  position: absolute;
  top: -30px;
  animation: particleFall linear infinite;

  &::before {
    content: '♥';
    color: var(--pink-light);
  }

  &.valentine::before  { content: '🌹'; }
  &.qixi::before       { content: '⭐'; }
  &.christmas::before  { content: '❄'; }
  &.newyear::before    { content: '✨'; }
  &.national::before   { content: '🇨🇳'; }
}

@keyframes particleFall {
  0%   { transform: translateY(-30px) rotate(0deg); opacity: 0; }
  10%  { opacity: 0.7; }
  100% { transform: translateY(105vh) rotate(360deg); opacity: 0; }
}

.festival-popup-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
  backdrop-filter: blur(4px);
}

.festival-popup {
  background: #fff;
  border-radius: 24px;
  padding: 40px 32px 28px;
  text-align: center;
  max-width: 360px;
  width: 100%;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
  animation: bounceIn 0.6s ease;
}

.popup-emoji {
  font-size: 56px;
  margin-bottom: 12px;
}

.popup-title {
  font-size: 24px;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 8px;
}

.popup-message {
  font-size: 15px;
  line-height: 1.8;
  color: #666;
  margin-bottom: 16px;
}

.popup-names {
  font-size: 14px;
  color: var(--pink);
  font-weight: 600;
  margin-bottom: 20px;
}

.popup-btn {
  padding: 12px 40px;
  background: linear-gradient(135deg, var(--pink), var(--pink-dark));
  color: #fff;
  border-radius: 24px;
  font-size: 15px;
  font-weight: 600;
  transition: all 0.3s;
  box-shadow: 0 4px 16px rgba(255, 100, 140, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(255, 100, 140, 0.4);
  }
}

.popup-enter-active {
  transition: opacity 0.3s;
}
.popup-leave-active {
  transition: opacity 0.2s;
}
.popup-enter-from,
.popup-leave-to {
  opacity: 0;
}
</style>
