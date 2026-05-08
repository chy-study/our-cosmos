<template>
  <div class="character-section">
    <div
      class="character-card"
      :class="{ sleeping: mood === 'sleep' }"
      @click="handleClick"
      @dblclick="handleDblClick"
      @mousedown="startHold"
      @mouseup="endHold"
      @mouseleave="endHold"
      @touchstart="startHold"
      @touchend="endHold"
    >
      <div class="chars" :class="{ hugging: mood === 'hug', kissing: mood === 'kiss' }">
        <div class="char boy-char" :class="charBoyClass">
          <div class="char-body">
            <div class="char-face">
              <div class="eyes">
                <span class="eye left"></span>
                <span class="eye right"></span>
              </div>
              <div class="mouth"></div>
              <div class="blush left"></div>
              <div class="blush right"></div>
            </div>
            <div class="char-hair"></div>
          </div>
          <span class="char-name">{{ boy }}</span>
        </div>

        <div class="heart-glow" :class="{ beating: mood === 'kiss' }">♥</div>

        <div class="char girl-char" :class="charGirlClass">
          <div class="char-body">
            <div class="char-face">
              <div class="eyes">
                <span class="eye left"></span>
                <span class="eye right"></span>
              </div>
              <div class="mouth"></div>
              <div class="blush left"></div>
              <div class="blush right"></div>
            </div>
            <div class="char-hair girl-hair"></div>
            <div class="bow"></div>
          </div>
          <span class="char-name">{{ girl }}</span>
        </div>
      </div>

      <div class="mood-tag">{{ moodText }}</div>
      <p class="hint" v-if="mood !== 'sleep'">
        {{ mood === 'angry' ? '点击哄我~' : '单击害羞 · 双击亲亲 · 长按抱抱' }}
      </p>
      <p class="hint sleep-hint" v-else>zzZ... 睡着啦，晚安～</p>
    </div>

    <div class="floating-hearts" v-if="showHearts">
      <span
        v-for="n in 8"
        :key="n"
        class="floating-heart"
        :style="heartStyle(n)"
      >♥</span>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useLoveStore } from '../stores/loveStore'
import config from '../config/love.config'

const { boy, girl } = config
const store = useLoveStore()
const holdTimer = ref(null)
const showHearts = ref(false)
const angryTimer = ref(null)
const sleepTimer = ref(null)

const mood = computed(() => store.characterMood)

const moodText = computed(() => {
  const map = {
    happy: '😊 开心',
    angry: '😡 生气啦',
    shy: '🥰 害羞了',
    kiss: '💋 亲亲',
    hug: '🤗 抱抱',
    sleep: '😴 睡着啦'
  }
  return map[mood.value] || '😊 开心'
})

const charBoyClass = computed(() => ({
  angry: mood.value === 'angry',
  shy: mood.value === 'shy',
  sleeping: mood.value === 'sleep'
}))

const charGirlClass = computed(() => ({
  angry: mood.value === 'angry',
  shy: mood.value === 'shy',
  sleeping: mood.value === 'sleep'
}))

const heartStyle = (n) => ({
  left: (n * 12 + Math.random() * 20) + '%',
  animationDelay: (n * 0.15) + 's',
  animationDuration: (1.5 + Math.random()) + 's',
  fontSize: (14 + n * 3) + 'px'
})

const handleClick = () => {
  if (mood.value === 'angry') {
    store.setMood('shy')
    setTimeout(() => store.setMood('happy'), 2500)
    return
  }
  if (mood.value === 'sleep') return
  store.setMood('shy')
  setTimeout(() => store.setMood('happy'), 2000)
}

const handleDblClick = () => {
  if (mood.value === 'sleep' || mood.value === 'angry') return
  store.setMood('kiss')
  showHearts.value = true
  setTimeout(() => {
    store.setMood('happy')
    showHearts.value = false
  }, 3000)
}

const startHold = () => {
  if (mood.value === 'sleep' || mood.value === 'angry') return
  holdTimer.value = setTimeout(() => {
    store.setMood('hug')
    setTimeout(() => store.setMood('happy'), 3000)
  }, 800)
}

const endHold = () => {
  clearTimeout(holdTimer.value)
}

const scheduleAngry = () => {
  const delay = Math.random() * 7200000 + 3600000
  angryTimer.value = setTimeout(() => {
    const hour = new Date().getHours()
    if (hour < 22 && hour > 7) {
      store.setMood('angry')
    }
    scheduleAngry()
  }, delay)
}

const checkSleep = () => {
  const hour = new Date().getHours()
  if (hour >= 22 || hour < 7) {
    store.setMood('sleep')
  } else if (mood.value === 'sleep') {
    store.setMood('happy')
  }

  const now = new Date()
  const nextCheck = new Date(now)
  nextCheck.setHours(now.getHours() + 1, 0, 0, 0)
  sleepTimer.value = setTimeout(checkSleep, nextCheck - now)
}

onMounted(() => {
  scheduleAngry()
  checkSleep()
})

onUnmounted(() => {
  clearTimeout(angryTimer.value)
  clearTimeout(sleepTimer.value)
})
</script>

<style scoped lang="scss">
.character-section {
  margin-bottom: 24px;
  animation: fadeInUp 0.6s 0.1s ease both;
  position: relative;
}

.character-card {
  background: var(--white);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  padding: 32px 20px 20px;
  text-align: center;
  cursor: pointer;
  user-select: none;
  transition: all 0.3s;
  position: relative;
  overflow: hidden;

  &:active {
    transform: scale(0.98);
  }

  &.sleeping {
    background: linear-gradient(180deg, #f8f4f8, #f0e8f0);
  }
}

.chars {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  transition: gap 0.5s;

  &.hugging {
    gap: 4px;
  }

  &.kissing {
    gap: 6px;
  }
}

.char {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  transition: transform 0.5s;
}

.char-name {
  font-size: 13px;
  font-weight: 600;
  color: var(--text);
}

.char-body {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  position: relative;
  transition: all 0.4s;
}

.boy-char .char-body {
  background: linear-gradient(135deg, #b8e4f0, #89cee0);
  box-shadow: 0 4px 16px rgba(120, 180, 200, 0.25);
}

.girl-char .char-body {
  background: linear-gradient(135deg, #ffb8c6, #f590a0);
  box-shadow: 0 4px 16px rgba(240, 140, 160, 0.25);
}

.char-face {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.eyes {
  display: flex;
  gap: 12px;
  position: absolute;
  top: 30px;
}

.eye {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #3d3d3d;
  display: block;
  transition: all 0.3s;
}

.angry .eye {
  height: 3px;
  border-radius: 2px;
  transform: rotate(-10deg);
}

.shy .eyes {
  gap: 8px;
}

.shy .eye {
  height: 4px;
  border-radius: 4px;
}

.sleeping .eye {
  height: 3px;
  border-radius: 3px;
  width: 10px;
}

.mouth {
  width: 10px;
  height: 5px;
  border-bottom: 2px solid #3d3d3d;
  border-radius: 0 0 10px 10px;
  position: absolute;
  top: 44px;
  transition: all 0.3s;
}

.angry .mouth {
  border-bottom: none;
  border-top: 2px solid #3d3d3d;
  border-radius: 10px 10px 0 0;
  top: 46px;
}

.shy .mouth {
  width: 8px;
  height: 4px;
}

.sleeping .mouth {
  width: 12px;
  height: 12px;
  border: 2px solid #3d3d3d;
  border-radius: 50%;
  border-top-color: transparent;
  border-left-color: transparent;
  border-bottom-color: transparent;
  top: 42px;
}

.blush {
  width: 10px;
  height: 6px;
  border-radius: 50%;
  background: rgba(255, 100, 130, 0.25);
  position: absolute;
  top: 42px;
  transition: opacity 0.3s;

  &.left  { left: 12px; }
  &.right { right: 12px; }
}

.shy .blush {
  background: rgba(255, 100, 130, 0.45);
}

.sleeping .blush {
  opacity: 0;
}

.char-hair {
  position: absolute;
  top: -6px;
  left: 4px;
  right: 4px;
  height: 24px;
  background: #5a4a3a;
  border-radius: 50% 50% 0 0;
  opacity: 0.3;
}

.girl-hair {
  background: #4a3a2a;
  height: 28px;
  top: -8px;
  left: 2px;
  right: 2px;
  border-radius: 50% 50% 0 0;

  &::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 50%;
    transform: translateX(-50%);
    width: 20px;
    height: 12px;
    background: #4a3a2a;
    border-radius: 0 0 50% 50%;
    opacity: 0.3;
  }
}

.bow {
  position: absolute;
  top: -12px;
  right: 4px;
  width: 16px;
  height: 16px;
  background: var(--pink);
  border-radius: 50% 50% 50% 0;
  transform: rotate(-20deg);

  &::after {
    content: '';
    position: absolute;
    left: -10px;
    top: 2px;
    width: 14px;
    height: 14px;
    background: var(--pink);
    border-radius: 50% 50% 0 50%;
  }
}

.heart-glow {
  font-size: 22px;
  color: var(--pink);
  transition: all 0.3s;
  animation: pulse 2s infinite ease-in-out;
  z-index: 2;

  &.beating {
    animation: heartbeat 0.6s infinite ease-in-out;
    color: #ff3366;
    font-size: 28px;
  }
}

.mood-tag {
  margin-top: 16px;
  display: inline-block;
  padding: 5px 20px;
  background: var(--pink-bg);
  border-radius: 20px;
  font-size: 15px;
  color: var(--pink);
  font-weight: 600;
}

.hint {
  margin-top: 10px;
  font-size: 12px;
  color: var(--text-light);
}

.sleep-hint {
  color: #c8b8d8;
}

.floating-hearts {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 10;
}

.floating-heart {
  position: absolute;
  bottom: 20%;
  color: var(--pink);
  animation: heartRise ease-out forwards;
  opacity: 0;
}

@keyframes heartRise {
  0%   { transform: translateY(0) scale(0.5); opacity: 1; }
  50%  { opacity: 1; }
  100% { transform: translateY(-200px) scale(1.4); opacity: 0; }
}

@keyframes heartbeat {
  0%, 100% { transform: scale(1); }
  15%  { transform: scale(1.3); }
  30%  { transform: scale(1); }
  45%  { transform: scale(1.2); }
  60%  { transform: scale(1); }
}
</style>
