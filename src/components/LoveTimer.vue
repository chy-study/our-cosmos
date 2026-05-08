<template>
  <div class="timer-section">
    <div class="timer-row">
      <div class="timer-item">
        <span class="num">{{ meetDays }}</span>
        <span class="label">相识天数</span>
      </div>
      <div class="divider"></div>
      <div class="timer-item highlight">
        <span class="num">{{ loveDays }}</span>
        <span class="label">相恋天数</span>
      </div>
      <div class="divider"></div>
      <div class="timer-item countdown-item">
        <span class="num countdown">{{ countdownDays }}</span>
        <span class="label">{{ countdownLabel }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import config from '../config/love.config'
import dayjs from 'dayjs'

const meetDays = ref(0)
const loveDays = ref(0)
const countdownDays = ref(0)
const countdownLabel = ref('')

let timer = null

const getNextMilestone = () => {
  const now = dayjs()
  const upcoming = config.milestones
    .filter(m => m.date && dayjs(m.date).isAfter(now))
    .sort((a, b) => dayjs(a.date).diff(dayjs(b.date)))[0]

  if (upcoming) {
    countdownLabel.value = `距"${upcoming.title}"`
    return dayjs(upcoming.date).diff(now, 'day')
  }
  return null
}

const update = () => {
  meetDays.value = dayjs().diff(dayjs(config.dates.meet), 'day')
  loveDays.value = dayjs().diff(dayjs(config.dates.loveStart), 'day')
  const cd = getNextMilestone()
  if (cd !== null) {
    countdownDays.value = cd
  }
}

onMounted(() => {
  update()
  timer = setInterval(update, 60000)
})

onUnmounted(() => {
  clearInterval(timer)
})
</script>

<style scoped lang="scss">
.timer-section {
  background: var(--white);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  padding: 28px 16px;
  margin-bottom: 24px;
  animation: fadeInUp 0.6s ease both;
}

.timer-row {
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.timer-item {
  text-align: center;
  flex: 1;
}

.num {
  display: block;
  font-size: 30px;
  font-weight: 700;
  color: var(--text);
  line-height: 1.3;
}

.highlight .num {
  color: var(--pink);
}

.countdown {
  color: var(--gold);
}

.label {
  display: block;
  font-size: 11px;
  color: var(--text-light);
  margin-top: 4px;
  letter-spacing: 0.5px;
  line-height: 1.4;
}

.divider {
  width: 1px;
  height: 40px;
  background: var(--pink-bg);
  border-radius: 1px;
}
</style>
