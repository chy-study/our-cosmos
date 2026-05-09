<template>
  <div>
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
              <span>恋爱日记</span>
              <p>在这里写下我们的故事</p>
            </div>
          </div>
          <div class="card-b flex-h animated fadeInUp delay-3" @click="$router.push('/wish')">
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

@media (max-width: 768px) {
  .card { grid-column: span 6; }
  .card-b { grid-column: span 12; width: 100%; }
  .avatar-circle { width: 4rem; height: 4rem; font-size: 1.5rem; }
  .middle { border-radius: 2rem; padding: 1.5rem 1rem; }
}
</style>
