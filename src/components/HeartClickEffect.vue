<template>
  <div></div>
</template>

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  document.addEventListener('click', (e) => {
    // Don't create hearts when clicking interactive elements
    if (e.target.closest('button, input, textarea, select, .character-card, .music-player')) return

    const heart = document.createElement('div')
    const emojis = ['❤️', '💕', '💖', '💗', '💓', '🧡', '💛', '❤', '💚']
    heart.innerHTML = emojis[Math.floor(Math.random() * emojis.length)]
    heart.style.cssText = `
      position: fixed;
      left: ${e.clientX}px;
      top: ${e.clientY}px;
      font-size: ${14 + Math.random() * 16}px;
      pointer-events: none;
      z-index: 9999;
      color: #ff5c8a;
      animation: heartFloatClick 1.2s ease-out forwards;
      transform: translate(-50%, -50%);
    `
    document.body.appendChild(heart)
    setTimeout(() => heart.remove(), 1300)
  })
})
</script>

<style>
@keyframes heartFloatClick {
  0%   { transform: translate(-50%, -50%) scale(0.3); opacity: 1; }
  30%  { transform: translate(-50%, -80%) scale(1.2); opacity: 0.9; }
  100% { transform: translate(-50%, -200%) scale(0.8); opacity: 0; }
}
</style>
