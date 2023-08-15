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
        redirect: '/home/index',
        component: Layout,
        children: [
            {
                path: 'index',
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
        redirect: '/classify/index',
        component: Layout,
        children: [
            {
                path: 'index',
                name: 'Classify',
                meta: {
                    icon: 'folder-open',
                    title: '分类'
                },
                component: () => import('@/views/home')
            }
        ]
    },
    {
        path: '/tag',
        redirect: '/tag/index',
        component: Layout,
        children: [
            {
                path: 'index',
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
        redirect: '/archive/index',
        component: Layout,
        children: [
            {
                path: 'index',
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
        redirect: '/message/index',
        component: Layout,
        children: [
            {
                path: 'index',
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

export default router
