import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import('@/views/Login.vue'),
    meta: {
      title: `Login - Acesse sua conta`,
    },
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('@/views/Dashboard.vue'),
    meta: {
      title: `@ - Dashboard`,
    },
  },
]
const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
