import {createRouter, createWebHashHistory} from 'vue-router'
import Layout from '@/views/layout/index.vue'
import Home from '@/views/home/index.vue'
import useStore from "@/store";

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
                },
                {
                    path: '/member/pay',
                    component: import('@/views/member/pay/index.vue')
                },
                {
                    path: '/pay/callback',
                    component: () => import('@/views/member/pay/callback.vue')
                },
                {
                    path: '/member',
                    component: () => import('@/views/member/layout/index.vue'),
                    children: [
                        {
                            path: '',
                            component: () => import('@/views/member/home/index.vue')
                        },
                        {
                            path: 'order',
                            component: () => import('@/views/member/order/index.vue')
                        }
                    ]
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

// 配置路由导航守卫，拦截 /member开头的所有的地址
router.beforeEach((to, from, next) => {
    // 判断用户登没登录
    const {cart} = useStore()
    if (cart.isLogin) {
        next()
    } else {
        if (to.path.includes('/member')) {
            next({
                path: '/login',
                query: {
                    redirectUrl: to.fullPath
                }
            })
        } else {
            next()
        }
    }
})
