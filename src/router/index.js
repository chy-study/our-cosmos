import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/timeline', name: 'timeline', component: () => import('../views/TimelinePage.vue') },
  { path: '/diary', name: 'diary', component: () => import('../views/DiaryPage.vue') },
  { path: '/wish', name: 'wish', component: () => import('../views/WishPage.vue') },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
