import Vue from 'vue'
import VueRouter from 'vue-router'

import store from '@/store'
import Layout from '@/layout'

Vue.use(VueRouter)

const routes = [
    {
        hide: true,
        path: '/intro',
        name: 'Intro',
        component: () => import('@/views/intro')
    },
    {
        path: '/home',
        redirect: '/home',
        component: Layout,
        children: [
            {
                path: '/',
                name: 'Home',
                meta: {
                    icon: 'home',
                    title: '主页'
                },
                component: () => import('@/views/home')
            }
        ]
    },
    {
        path: '/classify',
        redirect: '/classify',
        component: Layout,
        children: [
            {
                path: '/classify',
                name: 'Classify',
                meta: {
                    icon: 'folder-open',
                    title: '分类'
                },
                component: () => import('@/views/classify')
            }
        ]
    },
    {
        path: '/tag',
        redirect: '/tag',
        component: Layout,
        children: [
            {
                path: '/tag',
                name: 'Tag',
                meta: {
                    icon: 'bookmark',
                    title: '标签'
                },
                component: () => import('@/views/home')
            }
        ]
    },
    {
        path: '/archive',
        redirect: '/archive',
        component: Layout,
        children: [
            {
                path: '/archive',
                name: 'Archive',
                meta: {
                    icon: 'box-archive',
                    title: '归档'
                },
                component: () => import('@/views/home')
            }
        ]
    },
    {
        path: '/message',
        redirect: '/message',
        component: Layout,
        children: [
            {
                path: '/message',
                name: 'message',
                meta: {
                    icon: 'message',
                    title: '留言'
                },
                component: () => import('@/views/home')
            }
        ]
    },
    {
        hide: true,
        path: '/article',
        component: Layout,
        children: [
            {
                path: ':aid',
                name: 'Article',
                component: () => import('@/views/article')
            }
        ]
    },
    {
        hide: true,
        path: '/login',
        name: 'Login',
        component: () => import('@/views/login')
    },
    {
        hide: true,
        path: '/',
        redirect: '/intro'
    }
]

const router = new VueRouter({ routes })

router.beforeEach((to, from, next) => {
    let websiteInfo = store.getters['getWebsiteInfo']
    if (!websiteInfo) {
        store.dispatch('loadWebsiteInfo')
    }
    next()
})

export default router
