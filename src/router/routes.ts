import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', redirect: '/order-book' },
      { path: '/order-book', component: () => import('pages/order-book.page.vue') },
      { path: '/settings', component: () => import('pages/settings.page.vue') },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/error-not-found.page.vue'),
  },
]

export default routes
