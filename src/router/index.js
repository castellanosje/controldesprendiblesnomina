import { createRouter, createWebHistory } from 'vue-router';
import Nominas from '../views/Nominas.vue';
import Cuenta from '../views/Cuenta.vue';

const routes = [
  {
    path: '/',
    name: 'Nominas',
    component: Nominas
  },
  {
    path: '/cuenta',
    name: 'Cuenta',
    component: Cuenta
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
