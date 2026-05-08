<template>
  <div class="quote-section">
    <div class="quote-card">
      <div class="quote-mark">"</div>
      <p class="quote-text">{{ currentQuote }}</p>
      <button class="refresh-btn" @click="nextQuote" title="换一句">↻</button>
    </div>

    <div class="custom-quotes" v-if="showCustom">
      <div class="custom-form">
        <input
          v-model="newQuote"
          type="text"
          placeholder="添加一句情话..."
          class="quote-input"
          @keyup.enter="addQuote"
        />
        <button class="quote-add-btn" @click="addQuote">添加</button>
      </div>
      <div class="custom-list">
        <div
          class="custom-item"
          v-for="(q, i) in customQuotes"
          :key="i"
        >
          <span>{{ q }}</span>
          <button class="del-btn" @click="removeQuote(i)">×</button>
        </div>
      </div>
    </div>

    <button class="toggle-custom" @click="showCustom = !showCustom">
      {{ showCustom ? '收起' : '+ 自定义情话' }}
    </button>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import defaultQuotes from '../config/quotes.config'

const STORAGE_KEY = 'couple_love_quotes'
const quoteIndex = ref(new Date().getDate())

const loadCustom = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) return JSON.parse(stored)
  } catch (e) { /* ignore */ }
  return []
}

const saveCustom = () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(customQuotes.value))
}

const customQuotes = ref(loadCustom())
const showCustom = ref(false)
const newQuote = ref('')

const allQuotes = computed(() => [...defaultQuotes, ...customQuotes.value])

const currentQuote = computed(() => {
  const list = allQuotes.value
  if (list.length === 0) return '写下你们的第一句情话吧~'
  return list[quoteIndex.value % list.length]
})

const nextQuote = () => {
  quoteIndex.value++
}

const addQuote = () => {
  const text = newQuote.value.trim()
  if (!text) return
  customQuotes.value.push(text)
  saveCustom()
  newQuote.value = ''
}

const removeQuote = (i) => {
  customQuotes.value.splice(i, 1)
  saveCustom()
}
</script>

<style scoped lang="scss">
.quote-section {
  margin-bottom: 24px;
  animation: fadeInUp 0.6s 0.2s ease both;
}

.quote-card {
  background: var(--white);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  padding: 32px 28px;
  text-align: center;
  position: relative;
}

.quote-mark {
  font-size: 44px;
  color: var(--pink-light);
  font-family: Georgia, serif;
  line-height: 1;
  margin-bottom: 6px;
}

.quote-text {
  font-size: 18px;
  line-height: 1.9;
  color: var(--text);
  font-weight: 400;
  min-height: 40px;
}

.refresh-btn {
  position: absolute;
  top: 12px;
  right: 16px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--pink-bg);
  color: var(--pink);
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;

  &:hover {
    background: var(--pink);
    color: #fff;
    transform: rotate(180deg);
  }
}

.toggle-custom {
  display: block;
  margin: 10px auto 0;
  padding: 6px 16px;
  background: transparent;
  color: var(--text-light);
  font-size: 12px;
  transition: color 0.2s;

  &:hover {
    color: var(--pink);
  }
}

.custom-form {
  display: flex;
  gap: 8px;
  margin-top: 12px;
}

.quote-input {
  flex: 1;
  padding: 10px 14px;
  border-radius: var(--radius-sm);
  background: var(--white);
  box-shadow: var(--shadow);
  font-size: 13px;

  &:focus {
    box-shadow: 0 0 0 3px var(--pink-bg), var(--shadow);
  }
}

.quote-add-btn {
  padding: 10px 18px;
  background: var(--pink);
  color: #fff;
  border-radius: var(--radius-sm);
  font-size: 13px;
  font-weight: 600;
  transition: all 0.2s;

  &:hover { background: var(--pink-dark); }
}

.custom-list {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-top: 10px;
}

.custom-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  background: var(--white);
  border-radius: var(--radius-sm);
  box-shadow: var(--shadow);
  font-size: 13px;
  color: var(--text);

  .del-btn {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: #eee;
    color: #999;
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;

    &:hover {
      background: #ff4444;
      color: #fff;
    }
  }
}
</style>
