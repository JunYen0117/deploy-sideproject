import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/addproduct',
    name: 'addproduct',
    component: () => import('../views/AddProduct.vue')
  },
  {
    path: '/test2',
    name: 'test2',
    component: () => import('../views/TestTest2.vue')
  },
  {
    path: '/test3',
    name: 'test3',
    component: () => import('../views/TestTest3.vue')
  },
  {
    path: '/',
    name: 'home',
    component: () => import('../views/Home.vue')
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
    path: '/productdetail/:id',
    name: 'productdetail',
    component: () => import('../views/ProductDetail.vue')
  },
  {
    path: '/shoppingcart',
    name: 'shoppingcart',
    component: () => import('../views/ShoppingCart.vue')
  },
  {
    path: '/weather',
    name: 'weather',
    component: () => import('../views/weatherAPI.vue')
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('../views/DashBoard.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: 'active'
})

export default router
