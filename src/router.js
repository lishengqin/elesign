import { createRouter, createWebHashHistory } from 'vue-router';
const routes = [
  {
    name: '/',
    redirect: '/elesign',
  },
  {
    name: 'elesign',
    path: '/elesign',
    component: () => import('@/views/elesign.vue'),
  },
  {
    name: 'elesigncode',
    path: '/elesigncode',
    component: () => import('@/views/elesigncode.vue'),
  },
];
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
export default router;
