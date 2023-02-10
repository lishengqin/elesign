import { createRouter, createWebHashHistory } from 'vue-router';
const routes = [
  {
    name: '/',
    redirect: '/elesign',
  },
  {
    component: () => import('../example/layout/index.vue'),
    children: [
      {
        name: 'elesigncode',
        path: '/elesigncode',
        component: () => import('../example/elesigncode.vue'),
      },
      {
        name: 'elesign',
        path: '/elesign',
        component: () => import('../example/elesign.vue'),
      },
      {
        name: 'graffiti',
        path: '/graffiti',
        component: () => import('../example/graffiti.vue'),
      },
    ],
  },
];
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
export default router;
