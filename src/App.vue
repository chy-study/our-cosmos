<template>
  <FestivalEffects />
  <HeartClickEffect />
  <MusicPlayer />

  <!-- Fixed Header -->
  <div class="header-wrap">
    <div class="header">
      <div class="logo">
        <h1>{{ boy }} & {{ girl }}</h1>
      </div>
      <div class="word">{{ subtitle }}</div>
    </div>
  </div>

  <!-- Hero Section -->
  <div class="bg-wrap">
    <div class="bg-img">
      <div class="central central-800">
        <div class="middle animated fadeInDown">
          <div class="img-male">
            <div class="avatar-circle boy-avatar">♂</div>
            <span>{{ boy }}</span>
          </div>
          <div class="love-icon">
            <svg viewBox="0 0 1024 1024" width="56" height="56">
              <path d="M866.944 256.768c-95.488-95.488-250.496-95.488-345.984 0l-13.312 13.312-9.472-9.472c-93.824-93.824-246.656-100.736-343.68-10.368-101.888 94.976-104.064 254.592-6.4 352.256l13.568 13.568 299.264 299.264c25.728 25.728 67.584 25.728 93.44 0l312.576-312.576c95.488-95.488 95.488-250.368 0-345.984z" fill="#ff5c8a"/>
            </svg>
          </div>
          <div class="img-female">
            <div class="avatar-circle girl-avatar">♀</div>
            <span>{{ girl }}</span>
          </div>
        </div>
      </div>
      <svg class="waves" xmlns="http://www.w3.org/2000/svg" viewBox="0 24 150 28" preserveAspectRatio="none">
        <defs>
          <path id="wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"/>
        </defs>
        <g class="parallax">
          <use xlink:href="#wave" x="48" y="0" fill="rgba(255,255,255,0.7)"/>
          <use xlink:href="#wave" x="48" y="3" fill="rgba(255,255,255,0.5)"/>
          <use xlink:href="#wave" x="48" y="5" fill="rgba(255,255,255,0.3)"/>
          <use xlink:href="#wave" x="48" y="7" fill="#fff"/>
        </g>
      </svg>
    </div>
  </div>

  <div class="main-content">
    <!-- Time Counter -->
    <LoveTimer />

    <!-- Navigation Cards -->
    <div class="card-wrap">
      <div class="row central">
        <div class="card flex-h animated fadeInUp" @click="scrollTo('timeline')">
          <div class="card-icon">📅</div>
          <div class="text">
            <span>里程碑</span>
            <p>记录我们一起走过的日子</p>
          </div>
        </div>
        <div class="card flex-h animated fadeInUp delay-1" @click="scrollTo('diary')">
          <div class="card-icon">📝</div>
          <div class="text">
            <span>恋爱日记</span>
            <p>在这里写下我们的故事</p>
          </div>
        </div>
        <div class="card flex-h animated fadeInUp delay-2" @click="scrollTo('quotes')">
          <div class="card-icon">💌</div>
          <div class="text">
            <span>每日情话</span>
            <p>世界上最浪漫的情话</p>
          </div>
        </div>
        <div class="card-b flex-h animated fadeInUp delay-3" @click="scrollTo('character')">
          <div class="card-icon">💑</div>
          <div class="text">
            <span>情侣互动</span>
            <p>点一点，看看Ta的心情</p>
          </div>
        </div>
        <div class="card-b flex-h animated fadeInUp delay-4" @click="scrollTo('wish')">
          <div class="card-icon">✨</div>
          <div class="text">
            <span>心愿清单</span>
            <p>你我之间的约定</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Sections -->
    <div id="character" class="section">
      <CoupleCharacter />
    </div>

    <div id="quotes" class="section">
      <LoveQuotes />
    </div>

    <div id="timeline" class="section">
      <MilestoneTimeline />
    </div>

    <div id="diary" class="section">
      <DiaryList />
    </div>

    <div id="wish" class="section">
      <WishList />
    </div>
  </div>

  <!-- Floating Sidebar -->
  <div class="sidebar">
    <ul>
      <li class="sidebar-item" title="返回顶部" @click="scrollToTop">
        <svg viewBox="0 0 1024 1024" width="20" height="20"><path d="M898.346667 932.693333c-9.088 9.088-18.176 9.088-31.744 4.565334L512.853333 738.133333l-354.346666 200.234667c-13.653333 4.522667-22.741333 4.522667-31.786667-4.522667-9.045333-9.045333-9.045333-18.133333-9.045333-27.221333l373.418666-835.626667c0.042667-9.045333 13.653333-13.653333 22.741334-13.653333 9.088 0 18.133333 9.045333 22.656 13.568l366.421333 839.125333c4.48 4.522667-0.042667 18.133333-4.608 22.698667z" fill="#ffffff"/></svg>
      </li>
      <li class="sidebar-item" title="回到首页" @click="scrollToTop">
        <svg viewBox="0 0 1024 1024" width="20" height="20"><path d="M920.38 408.41L584.24 65.21c-19.1-17.18-44.43-26.65-71.33-26.65-26.89 0-52.23 9.46-71.33 26.65l-336.12 343.2c-3.52 3.6-5.48 8.31-5.48 13.19v474.47c0.01 50.74 45.48 92.02 101.35 92.02H347.6c11.43 0 20.69-8.72 20.69-19.47V699.74c0-29.27 26.9-53.09 59.95-53.09h167.5c33.06 0 59.95 23.81 59.95 53.09v268.89c0 10.75 9.26 19.47 20.69 19.47h148.11c55.88 0 101.34-41.28 101.34-92.03V421.61c0.02-4.89-1.93-9.6-5.45-13.2z" fill="#ffffff"/></svg>
      </li>
    </ul>
  </div>

  <div class="footer-warp">
    <div class="footer">
      <p>Copyright © 2025 - 2026 Forever & Always</p>
    </div>
  </div>
</template>

<script setup>
import LoveTimer from './components/LoveTimer.vue'
import MilestoneTimeline from './components/MilestoneTimeline.vue'
import CoupleCharacter from './components/CoupleCharacter.vue'
import LoveQuotes from './components/LoveQuotes.vue'
import DiaryList from './components/DiaryList.vue'
import WishList from './components/WishList.vue'
import MusicPlayer from './components/MusicPlayer.vue'
import FestivalEffects from './components/FestivalEffects.vue'
import HeartClickEffect from './components/HeartClickEffect.vue'
import config from './config/love.config'

const { boy, girl } = config
const subtitle = '爱晨雾漫过青瓦，爱暮色染透篱笆，更爱与君并肩立，看遍这人间烟火里的朝暮与年华。'

const scrollTo = (id) => {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<style scoped>
/* ===== Header ===== */
.header-wrap {
  width: 100%;
  height: 4.5rem;
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  backdrop-filter: blur(20px);
  background: rgba(255,255,255,0.69);
  color: #707070;
  box-shadow: 0 2px 15px 0 rgba(115,111,111,0.1);
}

.header {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  gap: 1rem;
}

.logo {
  flex-shrink: 0;
}

.logo h1 {
  font-size: 1.3rem;
  font-weight: 700;
  color: #616161;
}

.word {
  font-weight: 400;
  font-size: 0.9rem;
  text-align: right;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #616161;
}

/* ===== Hero ===== */
.bg-wrap {
  margin-bottom: 2rem;
}

.bg-img {
  width: 100%;
  background: linear-gradient(135deg, #fce4ec, #f8bbd0, #f48fb1);
  padding-top: 5rem;
  position: relative;
}

.central-800 {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
}

.middle {
  display: flex;
  align-items: center;
  justify-content: space-around;
  backdrop-filter: blur(20px);
  background: rgba(207,207,207,0.63);
  padding: 2.5rem 1.5rem;
  border-radius: 3rem;
  user-select: none;
  animation: fadeInDown 0.8s ease;
}

.img-male, .img-female {
  text-align: center;
}

.avatar-circle {
  width: 6rem;
  height: 6rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.2rem;
  color: #fff;
  margin: 0 auto;
  border: 0.2rem solid #fff;
}

.boy-avatar {
  background: linear-gradient(135deg, #a8d8ea, #7ec8e3);
}

.girl-avatar {
  background: linear-gradient(135deg, #f5a5b8, #e8788a);
}

.img-male span, .img-female span {
  display: block;
  text-align: center;
  font-size: 1.2rem;
  margin-top: 0.6rem;
  color: #fff;
  font-weight: 700;
}

.love-icon {
  animation: heartbeat 2s linear infinite;
}

.waves {
  position: relative;
  width: 100%;
  height: 3rem;
  margin-top: 2rem;
  margin-bottom: -7px;
}

.parallax > use {
  animation: moveForever 25s cubic-bezier(0.55, 0.5, 0.45, 0.5) infinite;
}
.parallax > use:nth-child(1) { animation-delay: -2s; animation-duration: 7s; }
.parallax > use:nth-child(2) { animation-delay: -3s; animation-duration: 10s; }
.parallax > use:nth-child(3) { animation-delay: -4s; animation-duration: 13s; }
.parallax > use:nth-child(4) { animation-delay: -5s; animation-duration: 20s; }

/* ===== Main Content ===== */
.main-content {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

/* ===== Navigation Cards ===== */
.card-wrap {
  margin-bottom: 2rem;
}

.row {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 1.5rem;
}

.card {
  grid-column: span 4;
  padding: 1.5rem;
  border-radius: 1.5rem;
  background: #fff;
  box-shadow: var(--card-shadow);
  border: 1px solid rgba(208,206,206,0.4);
  cursor: pointer;
  transition: all 0.2s;
}

.card:hover {
  box-shadow: var(--card-hover-shadow);
  background: #f8f8f8;
  border-color: transparent;
}

.card-b {
  grid-column: span 6;
  width: 90%;
  margin: 0 auto;
  padding: 1.5rem;
  border-radius: 2rem;
  background: #fff;
  box-shadow: var(--card-shadow);
  border: 1px solid rgba(208,206,206,0.4);
  cursor: pointer;
  transition: all 0.2s;
}

.card-b:hover {
  box-shadow: var(--card-hover-shadow);
  background: #f8f8f8;
  border-color: transparent;
}

.flex-h {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.card-icon {
  font-size: 2.5rem;
  flex-shrink: 0;
  transition: transform 0.5s;
}

.card:hover .card-icon,
.card-b:hover .card-icon {
  transform: rotate(-20deg) scale(1.1);
}

.text span {
  font-size: 1.4rem;
  font-weight: 700;
  display: block;
  margin-bottom: 0.25rem;
}

.text p {
  font-size: 0.9rem;
  color: var(--text-light);
  font-weight: 400;
}

.animated { animation: fadeInUp 0.6s ease both; }
.delay-1 { animation-delay: 0.08s; }
.delay-2 { animation-delay: 0.16s; }
.delay-3 { animation-delay: 0.24s; }
.delay-4 { animation-delay: 0.32s; }

/* ===== Sections ===== */
.section {
  margin-bottom: 2rem;
}

/* ===== Sidebar ===== */
.sidebar {
  position: fixed;
  right: 1rem;
  bottom: 6rem;
  z-index: 99;
}

.sidebar ul {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.sidebar-item {
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background: rgba(100,100,100,0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  backdrop-filter: blur(10px);
}

.sidebar-item:hover {
  background: rgba(120,120,120,0.85);
  transform: scale(1.1);
}

/* ===== Footer ===== */
.footer-warp {
  text-align: center;
  padding: 3rem 0;
  color: var(--text-light);
  font-size: 0.85rem;
}

/* ===== Responsive ===== */
@media (max-width: 768px) {
  .card { grid-column: span 6; }
  .card-b { grid-column: span 12; width: 100%; }
  .word { display: none; }
  .avatar-circle { width: 4rem; height: 4rem; font-size: 1.5rem; }
  .middle { border-radius: 2rem; padding: 1.5rem 1rem; }
}
</style>
