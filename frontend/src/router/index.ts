import Dashboard from '@/views/Dashboard.vue'
import Login from '@/views/Login.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/', name: 'Login', component: Login,
  },
  {
    path: '/dashboard', name: 'Dashboard', component: Dashboard, meta: {}
  }
]
const router = createRouter({
  history:
    createWebHistory(), 
    routes,
})

export default router
