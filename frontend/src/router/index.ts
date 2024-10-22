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
      title: `Dashboard - Gerenciador de tarefas`,
      // requiresAuth: true,
    },
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('@/views/Profile.vue'),
    meta: {
      title: `Perfil - Informações`
    }
  }
]
const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
