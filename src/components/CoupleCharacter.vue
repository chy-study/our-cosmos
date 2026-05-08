<template>
  <div class="character-wrap">
    <div class="character-card"
      @click="shy"
      @dblclick="kiss"
      @mousedown="startHold"
      @mouseup="endHold"
      @touchstart="startHold"
      @touchend="endHold"
    >
      <div class="chars">
        <div class="char">
          <div class="avatar boy">♂</div>
          <span>{{ boy }}</span>
        </div>
        <div class="love-icon">♥</div>
        <div class="char">
          <div class="avatar girl">♀</div>
          <span>{{ girl }}</span>
        </div>
      </div>
      <div class="mood-badge">{{ moodText }}</div>
      <p class="hint">单击害羞 · 双击亲亲 · 长按抱抱</p>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useLoveStore } from '../stores/loveStore'
import config from '../config/love.config'

const { boy, girl } = config
const store = useLoveStore()
const timer = ref(null)

const moodText = computed(() => {
  const map = {
    happy: '😊 开心',
    angry: '😡 生气啦',
    shy: '🥰 害羞了',
    kiss: '💋 亲亲',
    hug: '🤗 抱抱',
    sleep: '😴 睡着啦'
  }
  return map[store.characterMood] || '😊 开心'
})

const shy = () => {
  store.setMood('shy')
  setTimeout(() => store.setMood('happy'), 2000)
}

const kiss = () => {
  store.setMood('kiss')
  setTimeout(() => store.setMood('happy'), 3000)
}

const startHold = () => {
  timer.value = setTimeout(() => {
    store.setMood('hug')
    setTimeout(() => store.setMood('happy'), 3000)
  }, 800)
}

const endHold = () => clearTimeout(timer.value)

const randomAngry = () => {
  const delay = Math.random() * 7200000 + 3600000
  setTimeout(() => {
    store.setMood('angry')
    randomAngry()
  }, delay)
}

const checkSleep = () => {
  const hour = new Date().getHours()
  if (hour >= 22 || hour <= 7) store.setMood('sleep')
}

onMounted(() => {
  randomAngry()
  checkSleep()
})
</script>

<style scoped lang="scss">
.character-wrap {
  display: flex;
  justify-content: center;
}

.character-card {
  background: #fff;
  border-radius: 2rem;
  box-shadow: var(--card-shadow);
  border: 1px solid rgba(208,206,206,0.4);
  padding: 2rem 2.5rem;
  text-align: center;
  cursor: pointer;
  user-select: none;
  transition: all 0.2s;
  width: 100%;
  max-width: 380px;

  &:hover {
    box-shadow: var(--card-hover-shadow);
  }

  &:active {
    transform: scale(0.98);
  }
}

.chars {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.2rem;
}

.char span {
  display: block;
  font-size: 1rem;
  font-weight: 700;
  margin-top: 0.4rem;
  color: var(--text);
}

.avatar {
  width: 4.5rem;
  height: 4.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
  color: #fff;
  border: 0.15rem solid #fff;
  box-shadow: 0 2px 12px rgba(0,0,0,0.1);
  animation: float 3s infinite ease-in-out;
}

.boy { background: linear-gradient(135deg, #a8d8ea, #7ec8e3); }
.girl { background: linear-gradient(135deg, #f5a5b8, #e8788a); animation-delay: 0.5s; }

.love-icon {
  font-size: 1.8rem;
  color: var(--pink);
  animation: heartbeat 2s linear infinite;
}

.mood-badge {
  margin-top: 1rem;
  display: inline-block;
  padding: 0.3rem 1.5rem;
  background: #fef0f3;
  border-radius: 2rem;
  font-size: 1rem;
  color: var(--pink);
  font-weight: 700;
}

.hint {
  margin-top: 0.8rem;
  font-size: 0.8rem;
  color: var(--text-light);
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}
</style>
