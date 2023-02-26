import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/music',
    name: 'music',
    component: () => import('../views/MusicView.vue')
  },
  {
    path: '/shoppingmall',
    name: 'shoppingmall',
    component: () => import('../views/ShoppingMall.vue')
  },
  {
    path: '/shoppingcart',
    name: 'shoppingcart',
    component: () => import('../views/ShoppingCart.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: 'active'
})

export default router
