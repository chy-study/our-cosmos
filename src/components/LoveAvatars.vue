<template>
  <div class="avatars-wrap">
    <div class="img-male">
      <div
        class="avatar-emoji boy-bg"
        :class="[boyMood, boyAnim, { hugging: isHugging, kissing: isKissing }]"
        @pointerdown="onPointerDown($event, 'boy')"
        @pointerup="onPointerUp"
        @pointerleave="onPointerUp"
        @click.stop="onAvatarClick('boy')"
      >
        {{ boyEmoji }}
      </div>
      <span>{{ boy }}</span>
    </div>

    <div class="love-icon" :class="{ hidden: isHugging || isKissing }">
      <img :src="likeSvg" alt="love" width="56" height="56" />
    </div>

    <div class="img-female">
      <div
        class="avatar-emoji girl-bg"
        :class="[girlMood, girlAnim, { hugging: isHugging, kissing: isKissing }]"
        @pointerdown="onPointerDown($event, 'girl')"
        @pointerup="onPointerUp"
        @pointerleave="onPointerUp"
        @click.stop="onAvatarClick('girl')"
      >
        {{ girlEmoji }}
      </div>
      <span>{{ girl }}</span>
    </div>

    <div v-if="showHearts" class="hearts-container">
      <span
        v-for="(style, i) in heartStyles"
        :key="i"
        class="heart-particle"
        :style="style"
      >❤</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import likeSvg from '../assets/images/like.svg'

const props = defineProps({
  boy: { type: String, required: true },
  girl: { type: String, required: true }
})

// ============ Mood State ============
const boyMood = ref('happy')
const girlMood = ref('happy')
const angryTarget = ref(null)
const angryClicks = ref(0)

// ============ Animation State ============
const boyAnim = ref('')
const girlAnim = ref('')
const isHugging = ref(false)
const isKissing = ref(false)
const showHearts = ref(false)
const heartStyles = ref([])

// ============ Interaction State ============
let longPressTimer = null
let clickTimer = null
let longPressFired = false
let shyTimer = null
let sleepInterval = null
let angryTimeout = null

// ============ Emojis ============
const boyEmoji = computed(() => getEmoji(boyMood.value))
const girlEmoji = computed(() => getEmoji(girlMood.value))

function getEmoji(mood) {
  switch (mood) {
    case 'happy': return '😊'
    case 'angry': return '😠'
    case 'shy': return '😳'
    case 'sleeping': return '😴'
    default: return '😊'
  }
}

// ============ Sleep Detection ============
function isSleepHours() {
  const h = new Date().getHours()
  return h >= 22 || h < 7
}

function checkSleep() {
  if (isSleepHours()) {
    if (boyMood.value !== 'sleeping') {
      localStorage.setItem('love_avatars_pre_sleep_boy', boyMood.value)
      boyMood.value = 'sleeping'
    }
    if (girlMood.value !== 'sleeping') {
      localStorage.setItem('love_avatars_pre_sleep_girl', girlMood.value)
      girlMood.value = 'sleeping'
    }
  } else {
    if (boyMood.value === 'sleeping') {
      boyMood.value = localStorage.getItem('love_avatars_pre_sleep_boy') || 'happy'
    }
    if (girlMood.value === 'sleeping') {
      girlMood.value = localStorage.getItem('love_avatars_pre_sleep_girl') || 'happy'
    }
  }
}

// ============ Angry System ============
function scheduleAngry() {
  const hours = 6 + Math.random() * 3
  const delayMs = hours * 60 * 60 * 1000
  const nextTime = Date.now() + delayMs
  localStorage.setItem('love_avatars_next_angry', nextTime.toString())

  angryTimeout = setTimeout(() => {
    triggerAngry()
  }, delayMs)
}

function triggerAngry() {
  if (isSleepHours()) {
    const now = new Date()
    const wakeUp = new Date(now)
    wakeUp.setHours(7, 0, 0, 0)
    if (now.getHours() >= 22) wakeUp.setDate(wakeUp.getDate() + 1)
    angryTimeout = setTimeout(() => triggerAngry(), wakeUp - now)
    return
  }

  const target = Math.random() > 0.5 ? 'boy' : 'girl'
  angryTarget.value = target
  angryClicks.value = 0

  if (target === 'boy') {
    boyMood.value = 'angry'
  } else {
    girlMood.value = 'angry'
  }

  localStorage.setItem('love_avatars_angry_target', target)
  localStorage.setItem('love_avatars_angry_clicks', '0')
}

function resolveAngry() {
  if (angryTarget.value === 'boy') boyMood.value = 'happy'
  if (angryTarget.value === 'girl') girlMood.value = 'happy'

  angryTarget.value = null
  angryClicks.value = 0
  localStorage.removeItem('love_avatars_angry_target')
  localStorage.removeItem('love_avatars_angry_clicks')

  scheduleAngry()
}

// ============ Pointer Events ============
function onPointerDown(e, avatar) {
  if (isHugging.value || isKissing.value) return
  longPressFired = false

  longPressTimer = setTimeout(() => {
    longPressFired = true
    doHug()
  }, 3000)
}

function onPointerUp() {
  if (longPressTimer) {
    clearTimeout(longPressTimer)
    longPressTimer = null
  }
}

// ============ Click Handling ============
function onAvatarClick(avatar) {
  if (longPressFired) {
    longPressFired = false
    return
  }
  if (isHugging.value || isKissing.value) return

  if (clickTimer) {
    clearTimeout(clickTimer)
    clickTimer = null
    doKiss()
  } else {
    clickTimer = setTimeout(() => {
      clickTimer = null
      handleSingleClick(avatar)
    }, 300)
  }
}

function handleSingleClick(avatar) {
  // Wake up sleeping avatars
  if (boyMood.value === 'sleeping' || girlMood.value === 'sleeping') {
    boyMood.value = localStorage.getItem('love_avatars_pre_sleep_boy') || 'happy'
    girlMood.value = localStorage.getItem('love_avatars_pre_sleep_girl') || 'happy'
    return
  }

  // Apology click on angry avatar
  if (angryTarget.value === avatar) {
    angryClicks.value++
    localStorage.setItem('love_avatars_angry_clicks', angryClicks.value.toString())

    if (avatar === 'boy') {
      boyAnim.value = 'shake'
      setTimeout(() => { boyAnim.value = '' }, 500)
    } else {
      girlAnim.value = 'shake'
      setTimeout(() => { girlAnim.value = '' }, 500)
    }

    if (angryClicks.value >= 10) {
      resolveAngry()
    }
    return
  }

  // Normal click on non-angry → shy
  if (avatar === 'boy' && boyMood.value === 'happy') {
    boyMood.value = 'shy'
    boyAnim.value = 'shy-anim'
    clearTimeout(shyTimer)
    shyTimer = setTimeout(() => {
      if (boyMood.value === 'shy') boyMood.value = 'happy'
      boyAnim.value = ''
    }, 2000)
  } else if (avatar === 'girl' && girlMood.value === 'happy') {
    girlMood.value = 'shy'
    girlAnim.value = 'shy-anim'
    clearTimeout(shyTimer)
    shyTimer = setTimeout(() => {
      if (girlMood.value === 'shy') girlMood.value = 'happy'
      girlAnim.value = ''
    }, 2000)
  }
}

// ============ Kiss (Double Click) ============
function doKiss() {
  isKissing.value = true
  showHearts.value = true
  heartStyles.value = Array.from({ length: 12 }, (_, i) => ({
    '--tx': `${Math.cos((i / 12) * Math.PI * 2) * 50}px`,
    '--ty': `${Math.sin((i / 12) * Math.PI * 2) * 50 - 40}px`,
    animationDelay: `${i * 0.04}s`
  }))

  setTimeout(() => {
    isKissing.value = false
    showHearts.value = false
    heartStyles.value = []
  }, 1500)
}

// ============ Hug (Long Press) ============
function doHug() {
  isHugging.value = true

  setTimeout(() => {
    isHugging.value = false
  }, 2000)
}

// ============ Lifecycle ============
onMounted(() => {
  const savedTarget = localStorage.getItem('love_avatars_angry_target')
  const savedClicks = localStorage.getItem('love_avatars_angry_clicks')
  const nextAngry = localStorage.getItem('love_avatars_next_angry')

  if (savedTarget) {
    angryTarget.value = savedTarget
    angryClicks.value = parseInt(savedClicks) || 0
    if (savedTarget === 'boy') boyMood.value = 'angry'
    if (savedTarget === 'girl') girlMood.value = 'angry'
  }

  checkSleep()

  if (nextAngry) {
    const remaining = parseInt(nextAngry) - Date.now()
    if (remaining <= 0) {
      if (!angryTarget.value) triggerAngry()
    } else {
      angryTimeout = setTimeout(() => {
        if (!angryTarget.value) triggerAngry()
      }, Math.max(remaining, 1000))
    }
  } else if (!angryTarget.value) {
    scheduleAngry()
  }

  sleepInterval = setInterval(checkSleep, 60000)
})

onUnmounted(() => {
  clearTimeout(longPressTimer)
  clearTimeout(clickTimer)
  clearTimeout(shyTimer)
  clearInterval(sleepInterval)
  clearTimeout(angryTimeout)
})
</script>

<style scoped>
.avatars-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 3rem;
  position: relative;
}

/* ===== Avatar Emoji ===== */
.img-male, .img-female {
  text-align: center;
}

.avatar-emoji {
  width: 6rem;
  height: 6rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3.5rem;
  margin: 0 auto;
  border: 0.2rem solid #fff;
  cursor: pointer;
  user-select: none;
  transition: transform 0.5s ease, opacity 0.5s ease;
  position: relative;
}

.boy-bg {
  background: linear-gradient(135deg, #a8d8ea, #7ec8e3);
}

.girl-bg {
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

/* ===== Emotion States ===== */
.sleeping {
  opacity: 0.7;
  animation: sleepFloat 3s ease-in-out infinite;
}

.angry {
  animation: angryPulse 1.5s ease-in-out infinite;
}

.shy {
  filter: brightness(1.15) saturate(1.3);
}

/* ===== Animation Classes ===== */
.shake {
  animation: shake 0.5s ease;
}

.shy-anim {
  animation: shyBounce 0.6s ease;
}

/* ===== Hug Animation ===== */
.hugging.boy-bg {
  transform: translateX(35px);
}

.hugging.girl-bg {
  transform: translateX(-35px);
}

.love-icon {
  animation: heartbeat 2s linear infinite;
  flex-shrink: 0;
}

.love-icon.hidden {
  opacity: 0;
  transition: opacity 0.4s ease;
}

/* ===== Kiss Animation ===== */
.kissing.boy-bg {
  transform: translateX(18px) scale(1.05);
}

.kissing.girl-bg {
  transform: translateX(-18px) scale(1.05);
}

.hugging.angry, .kissing.angry,
.hugging.sleeping, .kissing.sleeping {
  animation: none;
}

/* ===== Heart Particles ===== */
.hearts-container {
  position: absolute;
  top: 50%;
  left: 50%;
  pointer-events: none;
  z-index: 10;
}

.heart-particle {
  position: absolute;
  animation: heartBurst 1.2s ease-out forwards;
}

/* ===== Keyframes ===== */
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  20% { transform: translateX(-8px) rotate(-3deg); }
  40% { transform: translateX(8px) rotate(3deg); }
  60% { transform: translateX(-6px) rotate(-2deg); }
  80% { transform: translateX(6px) rotate(2deg); }
}

@keyframes shyBounce {
  0% { transform: scale(1); }
  30% { transform: scale(0.85); }
  60% { transform: scale(1.08); }
  100% { transform: scale(1); }
}

@keyframes angryPulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.08); }
}

@keyframes sleepFloat {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-4px); }
}

@keyframes heartBurst {
  0% {
    transform: translate(0, 0) scale(0.3);
    opacity: 1;
  }
  50% {
    opacity: 0.9;
    transform: translate(calc(var(--tx) * 0.5), calc(var(--ty) * 0.5)) scale(1.2);
  }
  100% {
    transform: translate(var(--tx), var(--ty)) scale(0.6);
    opacity: 0;
  }
}
</style>
