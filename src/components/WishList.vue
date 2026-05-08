<template>
  <div class="central">
    <div class="title">
      <h1>总有些惊奇的际遇 比方说当我遇见你</h1>
    </div>
    <div class="card">
      <div class="list_texts">
        <div class="lovelist">
          <div
            class="list-item"
            v-for="item in wishes"
            :key="item.title"
          >
            <div class="item-main" @click="toggleItem(item)">
              <i class="icon" :class="item.done ? 'done' : 'undone'">
                {{ item.done ? '●' : '○' }}
              </i>
              <span :class="item.done ? 'finished' : 'unfinished'">{{ item.title }}</span>
            </div>
            <div class="item-detail" v-if="expanded === item.title && item.detail">
              <p>{{ item.detail }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import wishesData from '../config/wish.config'

const wishes = ref(wishesData.map(w => ({
  ...w,
  detail: w.detail || ''
})))
const expanded = ref(null)

const toggleItem = (item) => {
  if (expanded.value === item.title) {
    expanded.value = null
  } else {
    expanded.value = item.title
  }
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

.lovelist {
  display: flex;
  flex-direction: column;
}

.list-item {
  border-bottom: 1px solid rgba(208,206,206,0.4);
  transition: all 0.2s;

  &:last-child {
    border-bottom: none;
  }
}

.item-main {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 0.9rem 0;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    padding-left: 0.5rem;
  }

  .icon {
    font-style: normal;
    font-size: 1.4rem;
    flex-shrink: 0;
    transition: all 0.3s;
  }

  .done {
    color: #2cdc87;
  }

  .undone {
    color: #ddd;
  }

  span {
    font-size: 1.1rem;
    font-weight: 700;
  }

  .finished {
    color: var(--text);
  }

  .unfinished {
    color: #aeaeae;
  }
}

.item-detail {
  padding: 0 2rem 1rem;
  animation: fadeInUp 0.3s ease;

  p {
    font-size: 0.9rem;
    color: var(--text-light);
    line-height: 1.6;
  }
}

@media (max-width: 768px) {
  .list_texts { padding: 1rem 1.2rem; }
  .item-main span { font-size: 1rem; }
}
</style>
