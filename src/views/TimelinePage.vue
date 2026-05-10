<template>
  <div class="page-wrapper">
    <div class="page-content">
      <MilestoneTimeline />
    </div>
  </div>
</template>

<script setup>
import MilestoneTimeline from '../components/MilestoneTimeline.vue'
</script>

<style scoped>
.page-wrapper {
  background-image:
    linear-gradient(to right, rgba(0, 0, 0, 0.04) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(0, 0, 0, 0.04) 1px, transparent 1px);
  background-size: 20px 20px;
}

.page-content {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
}
</style>
