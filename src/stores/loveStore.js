import { defineStore } from 'pinia'

export const useLoveStore = defineStore('love', {
  state: () => ({
    characterMood: 'happy'
  }),

  actions: {
    setMood(mood) {
      this.characterMood = mood
    }
  }
})
