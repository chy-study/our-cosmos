<template>
  <div></div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'

const emojis = ['❤️', '💕', '💖', '💗', '💓', '🧡', '💛', '❤', '💚', '💙', '💜', '🤎']

function createHeart(x, y) {
  const heart = document.createElement('div')
  heart.innerHTML = emojis[Math.floor(Math.random() * emojis.length)]
  heart.style.cssText = `
    position: fixed;
    left: ${x}px;
    top: ${y}px;
    font-size: ${14 + Math.random() * 16}px;
    pointer-events: none;
    z-index: 9999;
    color: #ff5c8a;
    animation: heartFloatClick 1.2s ease-out forwards;
    transform: translate(-50%, -50%);
  `
  document.body.appendChild(heart)
  setTimeout(() => heart.remove(), 1300)
}

// --- random hearts (独立于点击，最多同时4个) ---
let randomHeartCount = 0
const randomTimers = []

function spawnRandomHeart() {
  if (randomHeartCount >= 4) return
  randomHeartCount++
  const x = Math.random() * window.innerWidth
  const y = Math.random() * window.innerHeight
  const heart = document.createElement('div')
  heart.innerHTML = emojis[Math.floor(Math.random() * emojis.length)]
  heart.style.cssText = `
    position: fixed;
    left: ${x}px;
    top: ${y}px;
    font-size: ${14 + Math.random() * 16}px;
    pointer-events: none;
    z-index: 9999;
    color: #ff5c8a;
    animation: heartFloatRandom 2s ease-out forwards;
    transform: translate(-50%, -50%);
  `
  document.body.appendChild(heart)
  setTimeout(() => {
    heart.remove()
    randomHeartCount--
  }, 2100)
}

function startChain() {
  const delay = 500 + Math.random() * 2000
  const timer = setTimeout(() => {
    spawnRandomHeart()
    startChain()
  }, delay)
  randomTimers.push(timer)
}

onMounted(() => {
  document.addEventListener('click', onClick)
  // 启动2条独立生成链，各自随机节奏，互不等待
  for (let i = 0; i < 2; i++) {
    startChain()
  }
})

onUnmounted(() => {
  document.removeEventListener('click', onClick)
  randomTimers.forEach(clearTimeout)
})

function onClick(e) {
  if (e.target.closest('button, input, textarea, select, .character-card, .music-player')) return
  createHeart(e.clientX, e.clientY)
}
</script>

<style>
@keyframes heartFloatClick {
  0%   { transform: translate(-50%, -50%) scale(0.3); opacity: 1; }
  30%  { transform: translate(-50%, -80%) scale(1.2); opacity: 0.9; }
  100% { transform: translate(-50%, -200%) scale(0.8); opacity: 0; }
}

@keyframes heartFloatRandom {
  0%   { transform: translate(-50%, -50%) scale(0.3); opacity: 1; }
  20%  { transform: translate(-50%, -70%) scale(1.1); opacity: 0.95; }
  100% { transform: translate(-50%, -260%) scale(0.6); opacity: 0; }
}
</style>
