<template>
  <div class="quote-section">
    <div class="quote-card">
      <div class="quote-mark">"</div>
      <p class="quote-text">{{ quote }}</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import quotes from '../config/quotes.config'

const quote = computed(() => {
  const day = new Date().getDate()
  return quotes[day % quotes.length]
})
</script>

<style scoped lang="scss">
.quote-section {
  max-width: 800px;
  margin: 0 auto;
  animation: fadeInUp 0.6s 0.2s ease both;
}

.quote-card {
  background: #fff;
  border-radius: 1.5rem;
  box-shadow: var(--card-shadow);
  border: 1px solid rgba(208,206,206,0.4);
  padding: 2.5rem 2rem;
  text-align: center;
}

.quote-mark {
  font-size: 3rem;
  color: #e8d5d8;
  font-family: Georgia, serif;
  line-height: 1;
  margin-bottom: 0.5rem;
}

.quote-text {
  font-size: 1.2rem;
  line-height: 2;
  color: var(--text);
  font-weight: 700;
}
</style>
