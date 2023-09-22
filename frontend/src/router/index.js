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
        path: '/category',
        redirect: '/category',
        component: Layout,
        children: [
            {
                path: '/category',
                meta: {
                    icon: 'folder-open',
                    title: '分类'
                },
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
        component: Layout,
        children: [
            {
                path: '/tag',
                meta: {
                    icon: 'bookmark',
                    title: '标签'
                },
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
        component: Layout,
        children: [
            {
                path: '/archive',
                meta: {
                    icon: 'box-archive',
                    title: '归档'
                },
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
        component: Layout,
        children: [
            {
                path: '/message',
                meta: {
                    icon: 'message',
                    title: '留言'
                },
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
    store.dispatch('site/loadSiteInfo')
    next()
})

export default router
