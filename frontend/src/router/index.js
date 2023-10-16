import Vue from 'vue'
import VueRouter from 'vue-router'

import store from '@/store'
import Layout from '@/layout'
import SecondaryLayout from '@/layout/secondary'

Vue.use(VueRouter)

const routes = [
    {
        path: '/home',
        redirect: '/home',
        component: Layout,
        meta: {
            icon: 'home',
            title: '主页'
        },
        children: [
            {
                path: '/',
                name: 'Home',
                component: () => import('@/views/home')
            }
        ]
    },
    {
        path: '/category',
        redirect: '/category',
        component: Layout,
        meta: {
            icon: 'folder-open',
            title: '分类'
        },
        children: [
            {
                path: '/category',
                component: SecondaryLayout,
                children: [
                    {
                        path: '',
                        name: 'CategoryList',
                        meta: {
                            secondTitle: '分类'
                        },
                        component: () => import('@/views/category/CategoryList')
                    },
                    {
                        path: ':cid',
                        name: 'CategoryArticle',
                        meta: {
                            secondTitle: '分类'
                        },
                        component: () => import('@/views/category/CategoryArticle')
                    }
                ]
            }
        ]
    },
    {
        path: '/tag',
        redirect: '/tag',
        meta: {
            icon: 'bookmark',
            title: '标签'
        },
        component: Layout,
        children: [
            {
                path: '/tag',
                component: SecondaryLayout,
                children: [
                    {
                        path: '',
                        name: 'TagList',
                        meta: {
                            secondTitle: '标签'
                        },
                        component: () => import('@/views/tag/TagList')
                    },
                    {
                        path: ':tid',
                        name: 'TagArticle',
                        meta: {
                            secondTitle: '标签'
                        },
                        component: () => import('@/views/tag/TagArticle')
                    }
                ]
            }
        ]
    },
    {
        path: '/archive',
        redirect: '/archive',
        meta: {
            icon: 'box-archive',
            title: '归档'
        },
        component: Layout,
        children: [
            {
                path: '/archive',
                component: SecondaryLayout,
                children: [
                    {
                        path: '',
                        name: 'Archive',
                        meta: {
                            secondTitle: '归档'
                        },
                        component: () => import('@/views/archive')
                    }
                ]
            }
        ]
    },
    {
        path: '/message',
        redirect: '/message',
        meta: {
            icon: 'message',
            title: '留言'
        },
        component: Layout,
        children: [
            {
                path: '/message',
                component: SecondaryLayout,
                children: [
                    {
                        path: '',
                        name: 'Message',
                        meta: {
                            secondTitle: '留言板'
                        },
                        component: () => import('@/views/message')
                    }
                ]
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
        path: '/user',
        component: Layout,
        children: [
            {
                path: '/user',
                name: 'User',
                component: () => import('@/views/user')
            }
        ]
    },
    {
        hide: true,
        path: '/login',
        redirect: '/login',
        component: Layout,
        children: [
            {
                path: '/login',
                name: 'Login',
                component: () => import('@/views/login')
            }
        ]
    },
    {
        hide: true,
        path: '/',
        redirect: '/home'
    }
]

const router = new VueRouter({ routes })

router.beforeEach((to, from, next) => {
    store.dispatch('setting/initTheme')
    store.dispatch('site/loadSiteInfo')
    next()
})

export default router
