import { createRouter, createWebHistory } from 'vue-router'
import LoginRoom from '../views/Login.vue';
import Register from '../views/Register.vue';
import Room from '../views/Room.vue';
import Home from '@/components/Home.vue'
import { getTokenCookie } from "@/api/cookie";
import Main from '@/views/Main.vue';
import Event from '@/components/Event.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { 
      path: '/login', 
      component: LoginRoom 
    },
    { 
      path: '/register', 
      component: Register 
    },
    { 
      path: '/room/:kode', 
      component: Room ,
      meta: { requiresAuth: true }
    },
    {
      path : '/',
      name: 'beranda',
      component: Main,
      meta: { requiresAuth: true },
      children: [
        {
          path: '/',
          name: 'home',
          component: Home,
        },
        {
          path: '/event',
          name: 'event',
          component: Event,
        },
      ],
    },
  ]
});

const authMiddleware = (to, from, next) => {
  const isAuthenticated = getTokenCookie(); 

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      next('/login');
    } else {
      next();
    }
  } else {
    next();
  }
};


router.beforeEach(authMiddleware);
export default router
