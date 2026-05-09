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
        }"
      >
        <div class="dot-wrap">
          <div class="dot">
            <span class="dot-icon" v-if="isFinished(item.date)">
              <svg viewBox="0 0 24 24" width="14" height="14"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" fill="currentColor"/></svg>
            </span>
            <span class="dot-icon" v-else-if="item.date">
              <svg viewBox="0 0 24 24" width="8" height="8"><circle cx="12" cy="12" r="6" fill="currentColor"/></svg>
            </span>
            <span class="dot-icon" v-else>
              <svg viewBox="0 0 24 24" width="12" height="12"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="currentColor"/></svg>
            </span>
          </div>
        </div>

        <div class="card">
          <div class="card-inner">
            <div class="card-header">
              <span class="milestone-icon">{{ iconFor(item.title) }}</span>
              <h3>{{ item.title }}</h3>
              <span v-if="tagText(item)" class="card-tag" :class="tagClass(item)">{{ tagText(item) }}</span>
            </div>
            <div class="date-row" v-if="item.date">
              <span class="date-text">{{ item.date }}</span>
              <span class="date-dot">·</span>
              <span class="days-badge" v-if="!isFinished(item.date)">{{ daysLeft(item.date) }} 天后</span>
            </div>
            <div class="date-row dream-date" v-else>
              <span>期待那一天的到来</span>
            </div>
          </div>
        </div>
      </div>

      <div class="timeline-end">
        <span>∞</span>
        <small>未完待续</small>
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

const daysAgo = (date) => {
  return dayjs().diff(dayjs(date), 'day')
}

const iconFor = (title) => {
  const map = {
    '相识': '👋', '第一次聊天': '💬', '第一次见面': '🫂', '确定关系': '💝',
    '恋爱100天': '💯', '第一次跨年': '🎆', '恋爱一周年': '🌹', '第一次旅行': '✈️',
    '恋爱两周年': '💕', '恋爱三周年': '💖', '求婚': '💍', '领证': '📋',
    '婚礼': '💒', '结婚一周年': '🎂', '蜜月旅行': '🏖️', '买房': '🏠',
    '生宝宝': '👶', '宝宝1岁': '🎈', '结婚五周年': '🥂', '宝宝上幼儿园': '🎒',
    '结婚十周年': '💎', '永远在一起': '🌟',
  }
  return map[title] || '📌'
}

const tagText = (item) => {
  if (isFinished(item.date)) return ''
  if (item.date) return '倒计时'
  return '未来可期'
}

const tagClass = (item) => {
  if (isFinished(item.date)) return ''
  if (item.date) return 'tag-countdown'
  return 'tag-dream'
}
</script>

<style scoped lang="scss">
.timeline-wrap {
  max-width: 520px;
  margin: 0 auto;
  padding: 0 1rem;
}

// ---- Title ----
.title {
  text-align: center;
  padding: 2rem 0 2.5rem;

  h1 {
    font-size: 1.7rem;
    font-weight: 700;
    color: #4a4a4a;
    letter-spacing: 0.06em;
    margin-bottom: 0.4rem;
  }

  p {
    font-size: 0.88rem;
    color: #b0a0a5;
    font-weight: 400;
  }
}

// ---- Timeline ----
.timeline {
  position: relative;
  padding-bottom: 1.5rem;
}

.line {
  position: absolute;
  left: 1.1rem;
  top: 0;
  bottom: 0;
  width: 1.5px;
  background: #e8dde0;
  border-radius: 1px;
}

// ---- Node ----
.node {
  position: relative;
  padding-left: 2.8rem;
  margin-bottom: 1.6rem;
  animation: fadeSlideIn 0.5s ease both;

  @for $i from 0 through 25 {
    &:nth-child(#{$i + 1}) {
      animation-delay: #{$i * 0.06}s;
    }
  }
}

// ---- Dot ----
.dot-wrap {
  position: absolute;
  left: 0;
  top: 0.9rem;
  z-index: 3;
}

.dot {
  width: 2.2rem;
  height: 2.2rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  border: 1.5px solid #e8dde0;
  transition: all 0.3s;
}

.dot-icon {
  display: flex;
  align-items: center;
  justify-content: center;
}

.done .dot {
  background: #eafaf1;
  border-color: #5cdb95;
  color: #5cdb95;
}

.upcoming .dot {
  border-color: #d4a0b8;
  color: #c96d9c;
}

.dream .dot {
  background: #faf7fa;
  border-color: #d4c8d8;
  color: #b89dc4;
}

// ---- Card ----
.card-inner {
  background: #fff;
  border-radius: 0.9rem;
  padding: 1.1rem 1.3rem;
  border: 1px solid #f0ecee;
  transition: all 0.25s;

  &:hover {
    border-color: #e8d5dc;
    box-shadow: 0 3px 16px rgba(0,0,0,0.04);
  }
}

.card-header {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  margin-bottom: 0.4rem;
}

.milestone-icon {
  font-size: 1.15rem;
  flex-shrink: 0;
  line-height: 1;
}

.card-inner h3 {
  font-size: 1.05rem;
  font-weight: 600;
  color: #3d3d3d;
  flex: 1;
}

.card-tag {
  font-size: 0.65rem;
  padding: 0.15rem 0.55rem;
  border-radius: 0.6rem;
  font-weight: 600;
  flex-shrink: 0;
}

.tag-countdown {
  background: #fff5f5;
  color: #e8788a;
}

.tag-dream {
  background: #f8f4fa;
  color: #a080b0;
}

// ---- Date ----
.date-row {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.8rem;
  color: #b0a0a5;
}

.date-text {
  font-variant-numeric: tabular-nums;
}

.date-dot {
  color: #d4c8d0;
}

.days-badge {
  font-weight: 500;
  color: #c96d9c;
}

.days-badge.done-badge {
  color: #b0a0a5;
}

.dream-date {
  color: #c4b8c0;
  font-style: italic;
}

// ---- Timeline End ----
.timeline-end {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 1rem;
  gap: 0.3rem;

  span {
    font-size: 1.1rem;
    font-weight: 600;
    color: #d4c8d8;
  }

  small {
    font-size: 0.78rem;
    color: #d0c5ca;
    letter-spacing: 0.04em;
  }
}

// ---- Animations ----
@keyframes fadeSlideIn {
  from { opacity: 0; transform: translateY(14px); }
  to   { opacity: 1; transform: translateY(0); }
}

@media (max-width: 480px) {
  .title h1 { font-size: 1.5rem; }
  .card-inner { padding: 1rem 1.1rem; }
  .card-inner h3 { font-size: 0.98rem; }
  .dot { width: 2rem; height: 2rem; }
  .node { padding-left: 2.5rem; }
}
</style>
