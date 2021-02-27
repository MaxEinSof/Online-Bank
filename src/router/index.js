import { createRouter, createWebHistory } from 'vue-router';
import store from '@/store';
import Home from '@/views/Home.vue';

const router = createRouter({
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home,
            meta: {
                layout: 'main',
                auth: true,
            },
        },
        {
            path: '/request/:id',
            name: 'Request',
            component: () => import('@/views/Request.vue'),
            meta: {
                layout: 'main',
                auth: true,
            },
        },
        {
            path: '/help',
            name: 'Help',
            component: () => import('@/views/Help.vue'),
            meta: {
                layout: 'main',
                auth: true,
            },
        },
        {
            path: '/auth',
            name: 'Auth',
            component: () => import('@/views/Auth.vue'),
            meta: {
                layout: 'auth',
            },
        },
    ],
    history: createWebHistory(process.env.BASE_URL),
    linkActiveClass: 'active',
    linkExactActiveClass: 'active',
});

router.beforeEach((to, from, next) => {
    const isAuthRequired = to.meta.auth;

    if (isAuthRequired && store.getters['auth/isAuthenticated']) {
        next();
    } else if (isAuthRequired && !store.getters['auth/isAuthenticated']) {
        next('/auth?message=auth');
    } else {
        next();
    }
});

export default router;
