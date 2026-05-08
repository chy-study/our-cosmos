<template>
  <div class="diary-section">
    <h3 class="section-title">
      恋爱日记
      <span class="count">已写 {{ diaries.length }} 篇</span>
    </h3>

    <div class="diary-list">
      <div
        class="diary-card"
        v-for="(item, i) in diaries"
        :key="i"
        :style="{ animationDelay: (i * 0.06) + 's' }"
      >
        <div class="card-header">
          <div class="author-info">
            <div class="author-avatar" :class="item.author === boy ? 'boy' : 'girl'">
              {{ item.author === boy ? '♂' : '♀' }}
            </div>
            <span class="author-name">{{ item.author }}</span>
          </div>
          <span class="card-date">{{ item.date }}</span>
        </div>
        <h4 class="card-title">{{ item.title }}</h4>
        <p class="card-content">{{ item.content }}</p>
      </div>
    </div>

    <div class="add-diary">
      <div class="add-form" v-if="showForm">
        <input
          v-model="newTitle"
          type="text"
          placeholder="标题..."
          class="form-input"
        />
        <textarea
          v-model="newContent"
          rows="3"
          placeholder="写下今天想说的话..."
          class="form-textarea"
        ></textarea>
        <div class="form-actions">
          <select v-model="newAuthor" class="author-select">
            <option :value="boy">{{ boy }}</option>
            <option :value="girl">{{ girl }}</option>
          </select>
          <button class="btn-cancel" @click="showForm = false">取消</button>
          <button class="btn-submit" @click="addDiary">发布</button>
        </div>
      </div>
      <button class="btn-add" v-else @click="showForm = true">
        + 写日记
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import defaultDiaries from '../config/diary.config'
import config from '../config/love.config'

const { boy, girl } = config
const STORAGE_KEY = 'couple_love_diaries'

const loadDiaries = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) return JSON.parse(stored)
  } catch (e) { /* ignore */ }
  return [...defaultDiaries]
}

const saveDiaries = () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(diaries.value))
}

const diaries = ref(loadDiaries())
const showForm = ref(false)
const newTitle = ref('')
const newContent = ref('')
const newAuthor = ref(boy)

const addDiary = () => {
  if (!newTitle.value.trim() || !newContent.value.trim()) return
  const today = new Date()
  const dateStr = today.getFullYear() + '-' +
    String(today.getMonth() + 1).padStart(2, '0') + '-' +
    String(today.getDate()).padStart(2, '0')

  diaries.value.unshift({
    title: newTitle.value.trim(),
    author: newAuthor.value,
    content: newContent.value.trim(),
    date: dateStr
  })

  saveDiaries()
  newTitle.value = ''
  newContent.value = ''
  showForm.value = false
}
</script>

<style scoped lang="scss">
.diary-section {
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

.diary-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 16px;
}

.diary-card {
  background: var(--white);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  padding: 20px;
  animation: fadeInUp 0.5s ease both;
  transition: box-shadow 0.3s;

  &:hover {
    box-shadow: var(--shadow-hover);
  }
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}

.author-info {
  display: flex;
  align-items: center;
  gap: 8px;
}

.author-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  color: #fff;

  &.boy {
    background: linear-gradient(135deg, #a8d8ea, #7ec8e3);
  }
  &.girl {
    background: linear-gradient(135deg, #f5a5b8, #e8788a);
  }
}

.author-name {
  font-size: 13px;
  font-weight: 600;
  color: var(--text);
}

.card-date {
  font-size: 11px;
  color: var(--text-light);
}

.card-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--pink);
  margin-bottom: 8px;
}

.card-content {
  font-size: 14px;
  line-height: 1.8;
  color: #666;
}

.add-diary {
  text-align: center;
}

.btn-add {
  width: 100%;
  padding: 14px;
  background: var(--white);
  border: 2px dashed var(--pink-light);
  border-radius: var(--radius);
  color: var(--pink);
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    border-color: var(--pink);
    background: var(--pink-bg);
  }
}

.add-form {
  background: var(--white);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.form-input,
.form-textarea {
  width: 100%;
  padding: 10px 14px;
  border-radius: var(--radius-sm);
  background: #f5f5f5;
  font-size: 14px;
  transition: all 0.3s;
  resize: vertical;

  &:focus {
    background: #fff;
    box-shadow: 0 0 0 3px var(--pink-bg);
  }
}

.form-actions {
  display: flex;
  align-items: center;
  gap: 8px;
  justify-content: flex-end;
}

.author-select {
  padding: 8px 12px;
  border-radius: var(--radius-sm);
  border: 1px solid #e0e0e0;
  font-size: 13px;
  color: var(--text);
  background: #f5f5f5;
  margin-right: auto;
}

.btn-cancel {
  padding: 8px 18px;
  background: #eee;
  border-radius: var(--radius-sm);
  color: var(--text-light);
  font-size: 13px;
  font-weight: 600;
  transition: all 0.2s;

  &:hover { background: #e0e0e0; }
}

.btn-submit {
  padding: 8px 22px;
  background: var(--pink);
  border-radius: var(--radius-sm);
  color: #fff;
  font-size: 13px;
  font-weight: 600;
  transition: all 0.2s;

  &:hover { background: var(--pink-dark); }
}
</style>
