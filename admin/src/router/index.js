import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

import Layout from '@/layout/Layout'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        redirect: '/dashboard',
        component: Layout,
        children: [
            {
                path: '/dashboard',
                name: 'Dashboard',
                meta: {
                    icon: 'house',
                    title: '首页'
                },
                component: () => import('@/views/dashboard/index')
            }
        ]
    },
    {
        path: '/article',
        name: 'ArticleManagement',
        redirect: '/article/list',
        component: Layout,
        meta: {
            icon: 'file-pen',
            title: '文章管理'
        },
        children: [
            {
                path: 'list',
                name: 'ArticleList',
                meta: {
                    title: '文章列表'
                },
                component: () => import('@/views/article/list/index')
            },
            {
                path: 'write',
                name: 'ArticleWrite',
                meta: {
                    title: '编写文章'
                },
                component: () => import('@/views/article/write/index')
            },
            {
                path: 'tag',
                name: 'ArticleTag',
                meta: {
                    title: '文章标签'
                },
                component: () => import('@/views/article/tag/index')
            },
            {
                path: 'comment',
                name: 'ArticleComment',
                meta: {
                    title: '文章评论'
                },
                component: () => import('@/views/article/comment/index')
            }
        ]
    },
    {
        path: '/message',
        component: Layout,
        children: [
            {
                path: 'index',
                name: 'MessageManagement',
                meta: {
                    icon: 'pen-to-square',
                    title: '留言管理'
                },
                component: () => import('@/views/message/index')
            }
        ]
    },
    {
        path: '/user',
        component: Layout,
        children: [
            {
                path: 'index',
                name: 'UserManagement',
                meta: {
                    icon: 'user',
                    title: '用户管理'
                },
                component: () => import('@/views/user/index')
            }
        ]
    },
    {
        path: '/link',
        component: Layout,
        children: [
            {
                path: 'index',
                name: 'FriendLink',
                meta: {
                    icon: 'paperclip',
                    title: '友情链接'
                },
                component: () => import('@/views/friendLink/index')
            }
        ]
    },
    {
        hidden: true,
        path: '/login',
        name: 'Login',
        component: () => import('@/views/login/index')
    }
]

const router = new VueRouter({ routes })

/* 全局路由守卫 */
router.beforeEach((to, from, next) => {
    if (to.name === 'Login') return next()
    const token = store.getters['user/getToken']
    if (!token) return next({ name: 'Login' })
    next()
})

export default router
