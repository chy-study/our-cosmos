<template>
  <div class="central bg">
    <div class="title">
      <h1>在这里写下我们的故事</h1>
    </div>
    <h3>已写下 <b>{{ diaries.length }}</b> 篇日记</h3>

    <div class="row">
      <div class="card col-12">
        <!-- Diary entries -->
        <div class="leavform animated fadeInUp" v-for="item in diaries" :key="item.title">
          <div class="textinfo">
            <div class="MsgTopInfo">
              <i class="time">{{ item.date }}</i>
            </div>
            <div class="user_info">
              <div class="avatar-circle" :class="item.author === boy ? 'boy-avatar' : 'girl-avatar'">
                {{ item.author === boy ? '♂' : '♀' }}
              </div>
              <div class="head_content">
                <span class="name">{{ item.author }}</span>
              </div>
            </div>
            <h4 class="diary-title">{{ item.title }}</h4>
            <div class="text">{{ item.content }}</div>
          </div>
        </div>

        <!-- Input form -->
        <div class="inputbox">
          <textarea
            id="wenben"
            v-model="newContent"
            rows="3"
            placeholder="写下今天的恋爱日记..."
          ></textarea>
        </div>
        <div class="inputbox" style="margin-top: 0; padding-top: 0; border-top: none;">
          <input
            class="rig"
            type="text"
            v-model="newTitle"
            placeholder="标题"
            style="width: 50%;"
          />
          <button class="submit-btn" @click="addDiary">发布日记</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import diariesData from '../config/diary.config'
import config from '../config/love.config'

const { boy } = config
const diaries = ref([...diariesData])
const newTitle = ref('')
const newContent = ref('')

const addDiary = () => {
  if (!newTitle.value.trim() || !newContent.value.trim()) return
  const today = new Date()
  const dateStr = today.getFullYear() + '-' +
    String(today.getMonth() + 1).padStart(2, '0') + '-' +
    String(today.getDate()).padStart(2, '0')

  diaries.value.unshift({
    title: newTitle.value.trim(),
    author: boy,
    content: newContent.value.trim(),
    date: dateStr
  })
  newTitle.value = ''
  newContent.value = ''
}
</script>

<style scoped lang="scss">
.central.bg {
  max-width: 800px;
  margin: 0 auto;
  background: #fff;
  border-radius: 2rem;
  padding: 1rem 1.5rem;
  box-shadow: var(--card-shadow);
  border: 1px solid rgba(208,206,206,0.4);
}

.title {
  text-align: center;
  padding: 1rem 0 0;

  h1 {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--text);
  }
}

h3 {
  text-align: center;
  font-size: 1.2rem;
  padding: 1rem 0 1.5rem;
  font-weight: 700;

  b {
    font-size: 2rem;
    color: var(--gold);
    text-shadow: 0 2px 3px rgba(255,183,17,0.36);
  }
}

.card {
  background: transparent;
  box-shadow: none;
  border: none;
  padding: 0;
}

.leavform {
  margin: 1.2rem 0;
}

.textinfo {
  padding: 1.2rem 1.2rem 0.5rem;
  border-radius: 1rem;
  box-shadow: 0 0 35px 0 rgba(172,178,185,0.22);
  transition: all 0.2s;
  position: relative;
}

.textinfo:hover {
  background: #f9f9f9;
}

.MsgTopInfo {
  position: absolute;
  top: 0.5rem;
  right: 0.8rem;
}

.time {
  font-size: 0.8rem;
  color: var(--text-light);
  font-style: normal;
}

.user_info {
  display: flex;
  align-items: center;
  gap: 0.8rem;
}

.avatar-circle {
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  color: #fff;
  box-shadow: 0 2px 15px rgba(0,0,0,0.15);
  border: 2px solid #fff;
  flex-shrink: 0;
}

.boy-avatar { background: linear-gradient(135deg, #a8d8ea, #7ec8e3); }
.girl-avatar { background: linear-gradient(135deg, #f5a5b8, #e8788a); }

.head_content .name {
  font-size: 1rem;
  font-weight: 700;
}

.diary-title {
  font-size: 1rem;
  font-weight: 700;
  margin-top: 0.6rem;
  color: var(--pink);
}

.text {
  margin-top: 0.6rem;
  padding: 0.8rem 0;
  color: #3d3d3d;
  border-top: 1px dashed #e0e0e0;
  line-height: 1.8;
  font-size: 0.95rem;
}

.inputbox {
  margin-top: 1.5rem;
  padding: 1.5rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.8rem;
  border-top: 1px solid #e8e8e8;
  flex-wrap: wrap;
}

.inputbox input,
#wenben {
  border: none;
  padding: 0.8rem 1.2rem;
  box-shadow: 0 2px 10px 0 rgba(148,147,147,0.15);
  border-radius: 0.8rem;
  background: #f3f4f6;
  font-size: 0.95rem;
  transition: all 0.3s;
}

.inputbox input:focus,
#wenben:focus {
  background: #fff;
  box-shadow: 0 2px 15px 0 rgba(148,147,147,0.25);
}

#wenben {
  width: 100%;
  resize: vertical;
}

.rig {
  flex: 1;
  min-width: 120px;
}

.submit-btn {
  padding: 0.8rem 1.5rem;
  background: var(--pink);
  color: #fff;
  border: none;
  border-radius: 0.8rem;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
  font-family: 'Noto Serif SC', serif;

  &:hover {
    background: #e8507a;
  }
}

@media (max-width: 768px) {
  .central.bg { border-radius: 1rem; padding: 0.5rem 1rem; }
  .inputbox { flex-direction: column; }
  .rig { width: 100% !important; }
  .submit-btn { width: 100%; }
}
</style>
