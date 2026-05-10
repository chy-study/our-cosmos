<template>
  <div>
    <!-- Hero Section -->
    <div class="bg-wrap">
      <div class="bg-img">
        <div class="central central-800">
          <div class="middle animated fadeInDown">
            <LoveAvatars :boy="boy" :girl="girl" />
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
          <div class="card flex-h animated fadeInUp" @click="$router.push('/timeline')">
            <div class="card-icon">📅</div>
            <div class="text">
              <span>里程碑</span>
              <p>记录我们一起走过的日子</p>
            </div>
          </div>
          <div class="card flex-h animated fadeInUp delay-1" @click="$router.push('/diary')">
            <div class="card-icon">📝</div>
            <div class="text">
              <span>日记</span>
              <p>在这里写下我们的故事</p>
            </div>
          </div>
          <div class="card flex-h animated fadeInUp delay-2" @click="$router.push('/wish')">
            <div class="card-icon">✨</div>
            <div class="text">
              <span>心愿清单</span>
              <p>你我之间的约定</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import LoveTimer from '../components/LoveTimer.vue'
import LoveAvatars from '../components/LoveAvatars.vue'
import config from '../config/love.config'

const { boy, girl } = config
</script>

<style scoped>
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
  padding: 5rem 1.5rem;
  border-radius: 3rem;
  user-select: none;
  animation: fadeInDown 0.8s ease;
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

.card:hover .card-icon {
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

@media (max-width: 768px) {
  .card { grid-column: span 6; }
  .middle { border-radius: 2rem; padding: 1.5rem 1rem; }
}
</style>
