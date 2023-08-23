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
        path: '/classify',
        redirect: '/classify',
        component: Layout,
        children: [
            {
                path: '/classify',
                meta: {
                    icon: 'folder-open',
                    title: '分类'
                },
                component: SecondaryLayout,
                children: [
                    {
                        path: '',
                        name: 'ClassifyList',
                        meta: {
                            secondTitle: '分类',
                            showBack: false
                        },
                        component: () => import('@/views/classify/ClassifyList')
                    },
                    {
                        path: ':classifyId',
                        name: 'ClassifyArticle',
                        meta: {
                            secondTitle: '分类',
                            showBack: true
                        },
                        component: () => import('@/views/classify/ClassifyArticle')
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
                            secondTitle: '标签',
                            showBack: false
                        },
                        component: () => import('@/views/tag/TagList')
                    },
                    {
                        path: ':tagId',
                        name: 'TagArticle',
                        meta: {
                            secondTitle: '标签',
                            showBack: true
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
        redirect: '/home'
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
