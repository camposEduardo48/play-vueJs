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
      requiresAuth: true,
    },
  },
]
const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  // Verifica se a rota requer autenticação
  if (to.meta.requiresAuth) {
    // Recupera o token do localStorage
    const token = localStorage.getItem('authToken')

    if (token) {
      // Caso o token exista, permitir navegação
      next()
    } else {
      // Se o token não existir, redirecionar para a página de login
      next({ name: 'Login' })
    }
  } else {
    // Se a rota não requer autenticação, prosseguir normalmente
    next()
  }
})

export default router
