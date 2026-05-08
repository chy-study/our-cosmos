<template>
  <div class="milestone-section">
    <h3 class="section-title">我们的旅程</h3>
    <div class="milestone-scroll" ref="scrollRef">
      <div class="road">
        <div
          v-for="(item, i) in milestones"
          :key="item.title"
          class="stop"
          :class="{
            done: isDone(item),
            current: isCurrent(item),
            future: isFuture(item)
          }"
        >
          <div class="stop-dot">
            <span class="dot-icon">{{ isDone(item) ? '✓' : isCurrent(item) ? '♥' : '' }}</span>
          </div>
          <div class="stop-card">
            <span class="stop-title">{{ item.title }}</span>
            <span class="stop-date" v-if="item.date">{{ item.date }}</span>
            <span class="stop-date waiting" v-else>期待中</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, nextTick } from 'vue'
import config from '../config/love.config'

const milestones = config.milestones
const scrollRef = ref(null)

const isDone = (item) => {
  if (!item.date) return false
  return new Date(item.date) < new Date()
}

const isCurrent = (item) => {
  if (!item.date) return false
  return new Date(item.date).toDateString() === new Date().toDateString()
}

const isFuture = (item) => {
  if (!item.date) return true
  return new Date(item.date) > new Date()
}

onMounted(() => {
  nextTick(() => {
    if (!scrollRef.value) return
    const doneNodes = scrollRef.value.querySelectorAll('.stop.done')
    const last = doneNodes[doneNodes.length - 1]
    if (last) {
      scrollRef.value.scrollTo({
        left: last.offsetLeft - scrollRef.value.clientWidth / 2 + last.offsetWidth / 2,
        behavior: 'smooth'
      })
    }
  })
})
</script>

<style scoped lang="scss">
.milestone-section {
  margin-bottom: 24px;
}

.section-title {
  font-size: 13px;
  font-weight: 500;
  color: var(--text-light);
  letter-spacing: 2px;
  margin-bottom: 14px;
  padding-left: 4px;
}

.milestone-scroll {
  overflow-x: auto;
  overflow-y: visible;
  -webkit-overflow-scrolling: touch;
  padding: 16px 0 8px;
  scrollbar-width: none;
  &::-webkit-scrollbar { display: none; }
}

.road {
  display: flex;
  align-items: flex-start;
  gap: 0;
  position: relative;
  padding: 20px 24px 16px;
  min-width: max-content;

  &::before {
    content: '';
    position: absolute;
    left: 24px;
    right: 24px;
    top: 34px;
    height: 3px;
    border-radius: 2px;
    background: var(--pink-light);
  }
}

.stop {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  width: 90px;
  flex-shrink: 0;
  z-index: 1;
}

.stop-dot {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: #eee;
  border: 3px solid var(--pink-light);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  transition: all 0.4s;
  position: relative;
  z-index: 2;

  .dot-icon {
    font-size: 12px;
    color: #fff;
    font-weight: 700;
  }
}

.stop.done .stop-dot {
  background: var(--pink);
  border-color: var(--pink);
  box-shadow: 0 0 0 6px var(--pink-bg);
}

.stop.current .stop-dot {
  background: var(--pink);
  border-color: var(--pink);
  box-shadow: 0 0 0 6px var(--pink-bg);
  animation: pulse 1.5s infinite ease-in-out;
}

.stop.future .stop-dot {
  background: #f5f0f1;
  border-color: #e8dde0;
}

.stop-card {
  text-align: center;
}

.stop-title {
  display: block;
  font-size: 12px;
  font-weight: 500;
  color: #bbb;
  line-height: 1.3;
  transition: color 0.3s;
}

.stop.done .stop-title {
  color: var(--text);
}

.stop.current .stop-title {
  color: var(--pink);
  font-weight: 700;
}

.stop-date {
  display: block;
  font-size: 10px;
  color: #ccc;
  margin-top: 3px;
  transition: color 0.3s;

  &.waiting {
    font-style: italic;
    color: #ddd;
  }
}

.stop.done .stop-date {
  color: var(--text-light);
}
</style>
