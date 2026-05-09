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
            <span v-if="isFinished(item.date)">♥</span>
            <span v-else-if="item.date">●</span>
            <span v-else>✦</span>
          </div>
        </div>

        <div class="card">
          <div class="card-inner">
            <div class="card-header">
              <span class="milestone-icon">{{ iconFor(item.title) }}</span>
              <h3>{{ item.title }}</h3>
              <span class="card-tag" :class="tagClass(item)">{{ tagText(item) }}</span>
            </div>
            <div class="date-row" v-if="item.date">
              <svg viewBox="0 0 1024 1024" width="13" height="13"><path d="M853.3 138.7h-64V74.7c0-17.1-14.9-32-32-32s-32 14.9-32 32v64H298.7V74.7c0-17.1-14.9-32-32-32s-32 14.9-32 32v64h-64c-46.9 0-85.3 38.4-85.3 85.3v597.3c0 46.9 38.4 85.3 85.3 85.3h682.7c46.9 0 85.3-38.4 85.3-85.3V224c0-46.9-38.4-85.3-85.3-85.3zm-682.7 64h64v32c0 17.1 14.9 32 32 32s32-14.9 32-32v-32h426.7v32c0 17.1 14.9 32 32 32s32-14.9 32-32v-32h64c12.8 0 21.3 8.5 21.3 21.3v128H149.3V224c0-12.8 8.5-21.3 21.3-21.3zm682.7 661.3H170.7c-12.8 0-21.3-8.5-21.3-21.3V416h725.3v426.7c0 12.8-8.5 21.3-21.3 21.3z" fill="currentColor"/></svg>
              <span class="date-text">{{ item.date }}</span>
              <span class="days-badge" v-if="!isFinished(item.date)">倒计时 {{ daysLeft(item.date) }} 天</span>
            </div>
            <div class="date-row dream-date" v-else>
              <svg viewBox="0 0 1024 1024" width="13" height="13"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" fill="currentColor"/><path d="M512 274v238l168 100c11.4 6.8 15.2 21.4 8.4 32.8-4.5 7.6-12.6 11.8-21.2 11.8-3.9 0-7.9-1.1-11.4-3.2L480 550V274c0-13.3 10.7-24 24-24s24 10.7 24 24z" fill="currentColor"/></svg>
              <span>期待那一天的到来</span>
            </div>
          </div>
        </div>
      </div>

      <div class="timeline-end">
        <div class="end-dot">∞</div>
        <span>未完待续...</span>
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
  if (isFinished(item.date)) return '已达成'
  if (item.date) return '倒计时'
  return '未来可期'
}

const tagClass = (item) => {
  if (isFinished(item.date)) return 'tag-done'
  if (item.date) return 'tag-countdown'
  return 'tag-dream'
}
</script>

<style scoped lang="scss">
$text: #3d3d3d;

.timeline-wrap {
  max-width: 560px;
  margin: 0 auto;
  padding: 0 1rem;
}

// ---- Title ----
.title {
  text-align: center;
  padding: 2rem 0 3rem;

  .title-icon {
    font-size: 2.4rem;
    margin-bottom: 0.5rem;
    animation: float 3s infinite ease-in-out;
  }

  h1 {
    font-size: 2rem;
    font-weight: 800;
    background: linear-gradient(135deg, #e8788a 0%, #c96d9c 50%, #b880a8 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    letter-spacing: 0.08em;
    margin-bottom: 0.5rem;
  }

  p {
    font-size: 0.95rem;
    color: #b8a8ad;
    font-weight: 400;
    letter-spacing: 0.05em;
  }
}

// ---- Timeline ----
.timeline {
  position: relative;
  padding-bottom: 1rem;
}

.line {
  position: absolute;
  left: 1.45rem;
  top: 0;
  bottom: 0;
  width: 2px;
  background: linear-gradient(180deg,
    rgba(232,120,138,0.1) 0%,
    rgba(232,120,138,0.4) 8%,
    rgba(232,120,138,0.5) 25%,
    rgba(201,109,156,0.4) 55%,
    rgba(184,128,168,0.25) 80%,
    rgba(184,128,168,0.05) 100%
  );
  border-radius: 1px;
}

// ---- Node ----
.node {
  position: relative;
  padding-left: 3rem;
  margin-bottom: 0.6rem;
  animation: fadeSlideIn 0.55s ease both;

  @for $i from 0 through 25 {
    &:nth-child(#{$i + 1}) {
      animation-delay: #{$i * 0.07}s;
    }
  }
}

// ---- Dot ----
.dot-wrap {
  position: absolute;
  left: 0.25rem;
  top: 1.2rem;
  z-index: 3;
}

.dot {
  width: 2.4rem;
  height: 2.4rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  background: #fff;
  border: 2px solid #e8dde0;
  box-shadow: 0 0 0 4px #fff, 0 1px 8px rgba(0,0,0,0.06);
  transition: all 0.35s;
}

.done .dot {
  background: linear-gradient(135deg, #fef0f3, #fce4ec);
  border-color: #e8788a;
  color: #e8788a;
  box-shadow: 0 0 0 4px #fff, 0 0 0 8px rgba(232,120,138,0.13), 0 1px 8px rgba(0,0,0,0.06);
}

.upcoming .dot {
  border-color: #d4a0b8;
  color: #c96d9c;
  box-shadow: 0 0 0 4px #fff, 0 0 0 8px rgba(201,109,156,0.08), 0 1px 8px rgba(0,0,0,0.05);
}

.dream .dot {
  background: linear-gradient(135deg, #fdfaff, #f5e8f0);
  border-color: #c9b8d0;
  color: #b89dc4;
  font-size: 0.7rem;
}

// ---- Card ----
.card-inner {
  background: #fff;
  border-radius: 1.2rem;
  padding: 1.3rem 1.5rem;
  box-shadow: 0 2px 16px rgba(0,0,0,0.04), 0 1px 3px rgba(0,0,0,0.03);
  border: 1px solid rgba(220,210,215,0.35);
  transition: all 0.3s;

  &:hover {
    box-shadow: 0 6px 24px rgba(232,120,138,0.08), 0 2px 6px rgba(0,0,0,0.04);
    border-color: rgba(232,120,138,0.2);
    transform: translateY(-2px);
  }
}

.card-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.milestone-icon {
  font-size: 1.3rem;
  flex-shrink: 0;
}

.card-inner h3 {
  font-size: 1.12rem;
  font-weight: 700;
  color: $text;
  letter-spacing: 0.03em;
  flex: 1;
}

.card-tag {
  font-size: 0.68rem;
  padding: 0.18rem 0.65rem;
  border-radius: 1rem;
  font-weight: 600;
  letter-spacing: 0.03em;
  flex-shrink: 0;
}

.tag-done {
  background: #e8f8ef;
  color: #3cba7e;
}

.tag-countdown {
  background: #fff3f0;
  color: #e8788a;
}

.tag-dream {
  background: #f5f0f7;
  color: #a080b0;
}

.date-row {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.82rem;
  color: #a8989d;
  background: #faf8f9;
  padding: 0.35rem 0.7rem;
  border-radius: 0.5rem;

  svg {
    flex-shrink: 0;
    opacity: 0.65;
  }
}

.date-text {
  font-variant-numeric: tabular-nums;
}

.dream-date {
  color: #bcacb4;
  background: #faf7fa;
}

.days-badge {
  margin-left: 0.3rem;
  font-size: 0.73rem;
  font-weight: 600;
  color: #e8788a;
}

// ---- Timeline End ----
.timeline-end {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 0.8rem;
  gap: 0.4rem;

  .end-dot {
    width: 2.6rem;
    height: 2.6rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
    font-weight: 700;
    color: #c9b8d0;
    background: #fff;
    border: 2px dashed #dcccd5;
    position: relative;
    z-index: 2;
  }

  span {
    font-size: 0.82rem;
    color: #c9b8d0;
    letter-spacing: 0.05em;
  }
}

// ---- Animations ----
@keyframes fadeSlideIn {
  from { opacity: 0; transform: translateY(18px); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50%      { transform: translateY(-6px); }
}

@media (max-width: 480px) {
  .title h1 { font-size: 1.5rem; }
  .card-inner { padding: 1rem 1.1rem; }
  .card-inner h3 { font-size: 1rem; }
  .dot { width: 2rem; height: 2rem; }
  .node { padding-left: 2.5rem; }
  .line { left: 1.2rem; }
  .dot-wrap { left: 0.1rem; }
}
</style>
