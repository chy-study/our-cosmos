<template>
  <div class="time">
    <span class="time-title">这是我们一起走过的</span>
    <div class="time-digits">
      <span class="digit-group"><b>{{ loveDays }}</b><em>天</em></span>
      <span class="digit-group"><b>{{ loveHours }}</b><em>时</em></span>
      <span class="digit-group"><b>{{ loveMinutes }}</b><em>分</em></span>
      <span class="digit-group"><b>{{ loveSeconds }}</b><em>秒</em></span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import config from '../config/love.config'

const loveDays = ref(0)
const loveHours = ref(0)
const loveMinutes = ref(0)
const loveSeconds = ref(0)

let timer = null

const update = () => {
  const birth = new Date(config.dates.loveStart + 'T00:00:00')
  const now = new Date()
  const diff = now - birth
  loveDays.value = Math.floor(diff / (24 * 60 * 60 * 1000))
  loveHours.value = Math.floor((diff % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000))
  loveMinutes.value = Math.floor((diff % (60 * 60 * 1000)) / (60 * 1000))
  loveSeconds.value = Math.floor((diff % (60 * 1000)) / 1000)
}

onMounted(() => {
  update()
  timer = setInterval(update, 1000)
})

onUnmounted(() => {
  clearInterval(timer)
})
</script>

<style scoped lang="scss">
.time {
  text-align: center;
  padding: 2rem 0 1rem;

  .time-title {
    font-size: 1.5rem;
    display: block;
    background-image: linear-gradient(270deg, #ff4500, #ffa500, #ffd700, #90ee90, #00ffff, #1e90ff, #9370db, #ff69b4, #ff4500);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    animation: rainbow 60s linear infinite;
    font-weight: 700;
    margin-bottom: 0.5rem;
  }
}

.time-digits {
  text-align: center;
}

.digit-group {
  display: inline-flex;
  align-items: baseline;
  justify-content: center;
  width: 5em;
}

b {
  font-size: 2.5rem;
  font-weight: 700;
  color: #4a4a4a;
  display: inline-block;
  text-align: center;
  width: 2.8em;
}

em {
  font-style: normal;
  font-size: 1rem;
  color: var(--text-light);
  margin-left: 0.15em;
}
</style>
