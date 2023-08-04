import Vue from 'vue'
import VueRouter from 'vue-router'

import Layout from '@/layout'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        redirect: '/intro'
    },
    {
        path: '/intro',
        name: 'Intro',
        component: () => import('@/views/intro')
    },
    {
        path: '/home',
        redirect: '/home/index',
        component: Layout,
        children: [
            {
                path: 'index',
                name: 'Home',
                component: () => import('@/views/home')
            }
        ]
    },
    {
        hide: true,
        path: '/login',
        name: 'Login',
        component: () => import('@/views/login')
    }
]

const router = new VueRouter({ routes })

export default router
