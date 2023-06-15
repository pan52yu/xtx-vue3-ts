import {createRouter, createWebHashHistory} from 'vue-router'
import Layout from '@/views/layout/index.vue'
import Home from '@/views/home/index.vue'

const router = createRouter({
    scrollBehavior(to, from, savedPosition) {
        return {top: 0}
    },
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            component: Layout,
            children: [
                {
                    path: '',
                    component: Home,
                },
                {
                    path: '/category/:id',
                    component: () => import('@/views/category/index.vue'),
                },
                {
                    path: '/category/sub/:id',
                    component: () => import('@/views/category/sub.vue'),
                },
                {
                    path: '/goods/:id',
                    component: () => import('@/views/goods/index.vue'),
                },
                {
                    path: '/cart',
                    component: () => import('@/views/cart/index.vue')
                },
                {
                    path: '/member/checkout',
                    component: () => import('@/views/member/pay/checkout.vue')
                }
            ],
        },
        {
            path: '/login',
            component: () => import('@/views/login/index.vue')
        },
        {
            path: '/playground',
            component: () => import('@/views/playground/index.vue')
        }
    ]
})
export default router