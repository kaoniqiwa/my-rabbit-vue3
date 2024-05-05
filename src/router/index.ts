import { createRouter, createWebHistory } from 'vue-router'

import Login from '@/views/Login/index.vue'
import Layout from '@/views/Layout/index.vue'

const router = createRouter({
  // vite 提供的项目根路径
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'layout',
      component: Layout,
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('@/views/Home/index.vue')
        },
        {
          path: 'category/:id',
          name: 'category',
          component: () => import('@/views/Category/index.vue')
        },
        {
          path: 'category/sub/:id',
          name: 'sub',
          component: () => import('@/views/SubCategory/index.vue')
        },
        {
          path: 'detail/:id',
          name: 'detail',
          component: () => import('@/views/Detail/index.vue')
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {
        top: 0,
        left: 0,
        behavior: 'smooth'
      }
    }
  }
})

export default router
