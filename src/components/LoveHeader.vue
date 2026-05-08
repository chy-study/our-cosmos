<template>
  <div class="header">
    <div class="header-decoration">
      <span class="deco-line"></span>
      <span class="deco-heart">♥</span>
      <span class="deco-line"></span>
    </div>
    <div class="avatars">
      <div class="avatar-ring boy-ring">
        <div class="avatar-inner boy-inner">
          <span class="avatar-emoji">🧑</span>
        </div>
      </div>
      <div class="heart-connector">♥</div>
      <div class="avatar-ring girl-ring">
        <div class="avatar-inner girl-inner">
          <span class="avatar-emoji">👩</span>
        </div>
      </div>
    </div>
    <h1 class="names">{{ boy }} <span class="and">&</span> {{ girl }}</h1>
    <p class="subtitle">我们的爱情小站</p>
  </div>
</template>

<script setup>
import config from '../config/love.config'

const { boy, girl } = config
</script>

<style scoped lang="scss">
.header {
  text-align: center;
  padding: 56px 0 20px;
  animation: fadeInDown 0.8s ease;
}

.header-decoration {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-bottom: 24px;
}

.deco-line {
  width: 40px;
  height: 1px;
  background: var(--pink-light);
  border-radius: 1px;
}

.deco-heart {
  font-size: 12px;
  color: var(--pink-light);
}

.avatars {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-bottom: 20px;
}

.avatar-ring {
  width: 68px;
  height: 68px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3px;
}

.boy-ring {
  background: linear-gradient(135deg, #a8d8ea, #7ec8e3);
  box-shadow: 0 4px 20px rgba(120, 180, 200, 0.3);
}

.girl-ring {
  background: linear-gradient(135deg, #ffb8c6, #f590a0);
  box-shadow: 0 4px 20px rgba(240, 140, 160, 0.3);
}

.avatar-inner {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar-emoji {
  font-size: 28px;
}

.heart-connector {
  font-size: 18px;
  color: var(--pink);
  animation: pulse 2s infinite ease-in-out;
}

.names {
  font-size: 28px;
  font-weight: 600;
  color: var(--text);
  letter-spacing: 2px;

  .and {
    font-weight: 300;
    color: var(--pink);
    margin: 0 4px;
  }
}

.subtitle {
  margin-top: 8px;
  font-size: 13px;
  color: var(--text-light);
  letter-spacing: 3px;
}
</style>
