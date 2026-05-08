<template>
  <div class="wish-section">
    <h3 class="section-title">
      心愿清单
      <span class="count">{{ doneCount }}/{{ wishes.length }}</span>
    </h3>

    <div class="wish-list">
      <div
        class="wish-item"
        v-for="(item, i) in wishes"
        :key="i"
        :class="{ done: item.done }"
        @click="toggleWish(i)"
      >
        <div class="wish-check" :class="{ checked: item.done }">
          <span v-if="item.done" class="check-mark">✓</span>
        </div>
        <span class="wish-title">{{ item.title }}</span>
      </div>
    </div>

    <div class="add-wish">
      <form @submit.prevent="addWish" class="wish-form">
        <input
          v-model="newWish"
          type="text"
          placeholder="添加一个新的愿望..."
          class="wish-input"
        />
        <button type="submit" class="wish-btn">+</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import defaultWishes from '../config/wish.config'

const STORAGE_KEY = 'couple_love_wishes'

const loadWishes = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) return JSON.parse(stored)
  } catch (e) { /* ignore */ }
  return defaultWishes.map(w => ({ ...w }))
}

const saveWishes = () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(wishes.value))
}

const wishes = ref(loadWishes())
const newWish = ref('')

const doneCount = computed(() => wishes.value.filter(w => w.done).length)

const toggleWish = (i) => {
  wishes.value[i].done = !wishes.value[i].done
  saveWishes()
}

const addWish = () => {
  const text = newWish.value.trim()
  if (!text) return
  wishes.value.push({ title: text, done: false })
  saveWishes()
  newWish.value = ''
}
</script>

<style scoped lang="scss">
.wish-section {
  margin-bottom: 24px;
}

.section-title {
  font-size: 13px;
  font-weight: 500;
  color: var(--text-light);
  letter-spacing: 2px;
  margin-bottom: 12px;
  padding-left: 4px;
  display: flex;
  align-items: baseline;
  gap: 8px;
}

.count {
  font-size: 11px;
  color: var(--pink-light);
  letter-spacing: 1px;
}

.wish-list {
  background: var(--white);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  padding: 6px 18px;
  margin-bottom: 12px;
}

.wish-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 0;
  cursor: pointer;
  border-bottom: 1px solid #f5f0f1;
  transition: all 0.2s;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    padding-left: 4px;
  }

  &.done {
    .wish-title {
      text-decoration: line-through;
      color: #ccc;
    }
  }
}

.wish-check {
  width: 22px;
  height: 22px;
  border-radius: 6px;
  border: 2px solid #e0d8da;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all 0.3s;

  &.checked {
    background: var(--pink);
    border-color: var(--pink);
  }
}

.check-mark {
  color: #fff;
  font-size: 13px;
  font-weight: 700;
}

.wish-title {
  font-size: 15px;
  color: var(--text);
  transition: all 0.3s;
}

.add-wish {
  /* spacing handled by margin */
}

.wish-form {
  display: flex;
  gap: 8px;
}

.wish-input {
  flex: 1;
  padding: 12px 16px;
  border-radius: var(--radius);
  background: var(--white);
  box-shadow: var(--shadow);
  font-size: 14px;
  transition: all 0.3s;

  &:focus {
    box-shadow: 0 0 0 3px var(--pink-bg), var(--shadow);
  }
}

.wish-btn {
  width: 48px;
  height: 48px;
  border-radius: var(--radius);
  background: var(--pink);
  color: #fff;
  font-size: 22px;
  font-weight: 300;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  flex-shrink: 0;

  &:hover {
    background: var(--pink-dark);
  }
}
</style>
