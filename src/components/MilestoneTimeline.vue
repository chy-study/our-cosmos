<template>
  <div class="central">
    <div class="title">
      <h1>总有些惊奇的际遇 比方说当我遇见你</h1>
    </div>
    <div class="card">
      <div class="list_texts">
        <div class="milestone-list">
          <div
            class="milestone-item"
            v-for="item in milestones"
            :key="item.title"
            :class="{ done: isFinished(item.date) }"
          >
            <i class="icon">{{ isFinished(item.date) ? '●' : '○' }}</i>
            <span :class="isFinished(item.date) ? 'finished' : 'unfinished'">{{ item.title }}</span>
            <small>{{ item.date || '期待中' }}</small>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import config from '../config/love.config'

const milestones = config.milestones

const isFinished = (date) => {
  if (!date) return false
  return new Date(date) <= new Date()
}
</script>

<style scoped lang="scss">
.central {
  max-width: 800px;
  margin: 0 auto;
}

.title {
  text-align: center;
  padding: 1rem 0 1.5rem;

  h1 {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--text);
  }
}

.card {
  background: #fff;
  border-radius: 1.5rem;
  box-shadow: var(--card-shadow);
  border: 1px solid var(--border-color);
  overflow: hidden;
}

.list_texts {
  padding: 1.5rem 2rem;
}

.milestone-list {
  display: flex;
  flex-direction: column;
}

.milestone-item {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 0.9rem 0;
  border-bottom: 1px solid #eaeaea;
  cursor: pointer;
  transition: all 0.2s;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: #fafafa;
    margin: 0 -1rem;
    padding-left: 1rem;
    padding-right: 1rem;
    border-radius: 0.5rem;
  }

  .icon {
    font-style: normal;
    font-size: 1.2rem;
    flex-shrink: 0;
  }

  span {
    font-size: 1.1rem;
    font-weight: 700;
    flex: 1;
  }

  small {
    font-size: 0.8rem;
    color: var(--text-light);
  }
}

.done {
  .icon { color: #2cdc87; }
}

.unfinished {
  color: #aeaeae;
}

.finished {
  color: var(--text);
}

@media (max-width: 768px) {
  .list_texts { padding: 1rem 1.2rem; }
  .milestone-item span { font-size: 1rem; }
}
</style>
