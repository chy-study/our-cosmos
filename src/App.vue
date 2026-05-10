<template>
  <FestivalEffects />
  <HeartClickEffect />
  <!-- Fixed Header -->
  <div class="header-wrap">
    <div class="header">
      <div class="logo" @click="$router.push('/')">
        <h1>{{ boy }} & {{ girl }}</h1>
      </div>
      <div class="word">{{ dailyQuote }}</div>
    </div>
  </div>

  <!-- Page Content -->
  <div class="page-container">
    <router-view />
  </div>

  <!-- Floating Sidebar -->
  <div class="sidebar">
    <ul>
      <li class="sidebar-item music-item">
        <MusicPlayer />
      </li>
      <li class="sidebar-item" title="返回顶部" @click="scrollToTop">
        <svg viewBox="0 0 1024 1024" width="20" height="20"><path d="M898.346667 932.693333c-9.088 9.088-18.176 9.088-31.744 4.565334L512.853333 738.133333l-354.346666 200.234667c-13.653333 4.522667-22.741333 4.522667-31.786667-4.522667-9.045333-9.045333-9.045333-18.133333-9.045333-27.221333l373.418666-835.626667c0.042667-9.045333 13.653333-13.653333 22.741334-13.653333 9.088 0 18.133333 9.045333 22.656 13.568l366.421333 839.125333c4.48 4.522667-0.042667 18.133333-4.608 22.698667z" fill="#ffffff"/></svg>
      </li>
      <li class="sidebar-item" title="回到首页" @click="$router.push('/')">
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
import MusicPlayer from './components/MusicPlayer.vue'
import FestivalEffects from './components/FestivalEffects.vue'
import HeartClickEffect from './components/HeartClickEffect.vue'
import config from './config/love.config'
import quotes from './config/quotes.config'

const { boy, girl } = config

function hashDate(dateStr) {
  let hash = 0
  for (let i = 0; i < dateStr.length; i++) {
    hash = ((hash << 5) - hash) + dateStr.charCodeAt(i)
    hash |= 0
  }
  return Math.abs(hash)
}

const now = new Date()
const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`
const dailyQuote = quotes[hashDate(today) % quotes.length]

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
  cursor: pointer;
}

.logo h1 {
  font-size: 1.3rem;
  font-weight: 700;
  color: #616161;
}

.word {
  font-size: 1.3rem;
  font-weight: 700;
  text-align: right;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #616161;
}

/* ===== Page Container ===== */
.page-container {
  padding-top: 4.5rem;
}

/* ===== Sidebar ===== */
.sidebar {
  position: fixed;
  right: 1rem;
  bottom: 3rem;
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

@media (max-width: 768px) {
  .word { display: none; }
}
</style>
