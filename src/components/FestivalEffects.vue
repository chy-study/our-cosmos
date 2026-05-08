<template>
  <div :class="['festival-bg', theme]">
    <div class="particles" v-if="theme !== 'default'">
      <span v-for="n in 12" :key="n" class="particle" :style="particleStyle(n)"></span>
    </div>
  </div>
</template>

<script setup>
import { getFestivalTheme } from '../utils/festival'

const theme = getFestivalTheme()

const particleStyle = (n) => ({
  left: ((n * 37 + 13) % 100) + '%',
  animationDelay: (n * 0.4) + 's',
  animationDuration: (3 + (n % 4)) + 's',
  fontSize: (12 + (n % 16)) + 'px',
  opacity: 0.3 + (n % 5) * 0.1
})
</script>

<style scoped lang="scss">
.festival-bg {
  position: fixed;
  inset: 0;
  z-index: -1;
  transition: background 0.8s;

  &.valentine  { background: linear-gradient(170deg, #fce4ec, #fdf2f4, #fff5f8); }
  &.christmas  { background: linear-gradient(170deg, #f3e5e5, #fff5f5, #fff); }
  &.newyear    { background: linear-gradient(170deg, #fff8e7, #fffdf5, #fff); }
  &.national   { background: linear-gradient(170deg, #fde8e8, #fff5f5, #fff); }
  &.default    { background: linear-gradient(170deg, #fdf2f4, #faf5f7, #f8f4f8); }
}

.particles {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
}

.particle {
  position: absolute;
  top: -20px;
  animation: particleFall linear infinite;

  &::before {
    content: '♥';
    color: var(--pink-light, #f5d5db);
  }
}

@keyframes particleFall {
  0%   { transform: translateY(-20px) rotate(0deg); opacity: 0; }
  20%  { opacity: 0.6; }
  100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
}
</style>
