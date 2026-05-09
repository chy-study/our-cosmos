<template>
  <div class="timeline-wrap">
    <div class="title">
      <h1>我们的故事</h1>
      <p>总有些惊奇的际遇，比方说当我遇见你</p>
    </div>

    <div class="timeline">
      <div class="line"></div>

      <div
        class="node"
        v-for="(item, idx) in milestones"
        :key="item.title"
        :class="{
          done: isFinished(item.date),
          upcoming: item.date && !isFinished(item.date),
          dream: !item.date,
          left: idx % 2 === 0,
          right: idx % 2 !== 0
        }"
      >
        <div class="dot-wrap">
          <div class="dot">
            <span v-if="isFinished(item.date)">♥</span>
            <span v-else-if="item.date">○</span>
            <span v-else>✧</span>
          </div>
        </div>

        <div class="card">
          <div class="card-tag" v-if="isFinished(item.date)">已完成</div>
          <div class="card-tag upcoming-tag" v-else-if="item.date">进行中</div>
          <div class="card-tag dream-tag" v-else>未来可期</div>

          <h3>{{ item.title }}</h3>
          <div class="date-row" v-if="item.date">
            <svg viewBox="0 0 1024 1024" width="14" height="14"><path d="M853.333333 138.666667h-64V74.666667c0-17.066667-14.933333-32-32-32s-32 14.933333-32 32v64H298.666667V74.666667c0-17.066667-14.933333-32-32-32s-32 14.933333-32 32v64H170.666667c-46.933333 0-85.333333 38.4-85.333334 85.333333v597.333333c0 46.933333 38.4 85.333333 85.333334 85.333334h682.666666c46.933333 0 85.333333-38.4 85.333334-85.333334V224c0-46.933333-38.4-85.333333-85.333334-85.333333z m-682.666666 64h64V234.666667c0 17.066667 14.933333 32 32 32s32-14.933333 32-32V202.666667h426.666666V234.666667c0 17.066667 14.933333 32 32 32s32-14.933333 32-32V202.666667h64c12.8 0 21.333333 8.533333 21.333334 21.333333v128H149.333333V224c0-12.8 8.533333-21.333333 21.333334-21.333333z m682.666666 661.333333H170.666667c-12.8 0-21.333333-8.533333-21.333334-21.333333V416h725.333334v426.666667c0 12.8-8.533333 21.333333-21.333334 21.333333z" fill="#e8788a"/></svg>
            <span>{{ item.date }}</span>
            <span class="days-badge countdown" v-if="!isFinished(item.date)">还有 {{ daysLeft(item.date) }} 天</span>
          </div>
          <div class="date-row dream-date" v-else>
            <svg viewBox="0 0 1024 1024" width="14" height="14"><path d="M512 0C229.2 0 0 229.2 0 512s229.2 512 512 512 512-229.2 512-512S794.8 0 512 0z m256 554.7H554.7V768c0 23.6-19.1 42.7-42.7 42.7s-42.7-19.1-42.7-42.7V554.7H298.7c-23.6 0-42.7-19.1-42.7-42.7s19.1-42.7 42.7-42.7h170.7V298.7c0-23.6 19.1-42.7 42.7-42.7s42.7 19.1 42.7 42.7v170.6H768c23.6 0 42.7 19.1 42.7 42.7s-19.1 42.7-42.7 42.7z" fill="#c9a8b2"/></svg>
            <span>期待中</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import config from '../config/love.config'
import dayjs from 'dayjs'

const milestones = config.milestones

const isFinished = (date) => {
  if (!date) return false
  return dayjs(date).isBefore(dayjs()) || dayjs(date).isSame(dayjs(), 'day')
}

const daysLeft = (date) => {
  return dayjs(date).diff(dayjs(), 'day')
}
</script>

<style scoped lang="scss">
.timeline-wrap {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 1rem;
}

.title {
  text-align: center;
  padding: 2rem 0 2.5rem;

  h1 {
    font-size: 1.8rem;
    font-weight: 800;
    background: linear-gradient(135deg, #e8788a, #c96d9c);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 0.5rem;
  }

  p {
    font-size: 0.95rem;
    color: #b0a0a5;
    font-weight: 400;
  }
}

.timeline {
  position: relative;
  padding: 0 0 2rem;
}

.line {
  position: absolute;
  left: 0.85rem;
  top: 0;
  bottom: 0;
  width: 3px;
  background: linear-gradient(180deg, #f5a5b8 0%, #e8788a 30%, #d4a0b8 60%, #c9b8d0 100%);
  border-radius: 3px;
}

.node {
  position: relative;
  display: flex;
  align-items: flex-start;
  margin-bottom: 1.8rem;
  padding-left: 2.8rem;
  animation: fadeSlideIn 0.5s ease both;

  @for $i from 0 through 25 {
    &:nth-child(#{$i + 1}) {
      animation-delay: #{$i * 0.08}s;
    }
  }
}

.dot-wrap {
  position: absolute;
  left: 0;
  top: 0.6rem;
  z-index: 2;
}

.dot {
  width: 1.8rem;
  height: 1.8rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.85rem;
  background: #fff;
  box-shadow: 0 0 0 3px #fff, 0 1px 6px rgba(0,0,0,0.1);
  transition: all 0.3s;
}

.done .dot {
  background: #fce4ec;
  color: #e8788a;
  box-shadow: 0 0 0 3px #fff, 0 0 0 5px rgba(232,120,138,0.2), 0 1px 6px rgba(0,0,0,0.1);
}

.upcoming .dot {
  color: #d4a0b8;
}

.dream .dot {
  color: #c9b8d0;
}

.card {
  background: #fff;
  border-radius: 1rem;
  box-shadow: 0 1px 12px rgba(0,0,0,0.05);
  border: 1px solid #f0ecee;
  padding: 1.2rem 1.5rem;
  flex: 1;
  position: relative;
  transition: all 0.25s;

  &:hover {
    box-shadow: 0 4px 20px rgba(232,120,138,0.1);
    border-color: #f5d5dc;
    transform: translateY(-1px);
  }

  h3 {
    font-size: 1.15rem;
    font-weight: 700;
    color: #4a4a4a;
    margin-bottom: 0.4rem;
  }
}

.date-row {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.85rem;
  color: #9a8a8f;

  svg {
    flex-shrink: 0;
  }
}

.dream-date {
  color: #c9b8d0;
  font-style: italic;
}

.days-badge {
  margin-left: 0.3rem;
  font-size: 0.75rem;
  padding: 0.15rem 0.6rem;
  border-radius: 1rem;
  font-weight: 600;
  background: #e8f8ef;
  color: #2cdc87;
}

.days-badge.countdown {
  background: #fff3f0;
  color: #e8788a;
}

.card-tag {
  position: absolute;
  top: -0.5rem;
  right: 1rem;
  font-size: 0.7rem;
  padding: 0.15rem 0.7rem;
  border-radius: 1rem;
  font-weight: 600;
  background: #e8f8ef;
  color: #2cdc87;
}

.upcoming-tag {
  background: #fff3f0;
  color: #e8788a;
}

.dream-tag {
  background: #f5f0f7;
  color: #b89dc4;
}

@keyframes fadeSlideIn {
  from {
    opacity: 0;
    transform: translateY(15px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .title h1 { font-size: 1.5rem; }
  .card { padding: 1rem 1.2rem; }
  .card h3 { font-size: 1.05rem; }
}
</style>
