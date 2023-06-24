import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

import Layout from '@/layout'

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
                component: () => import('@/views/dashboard')
            }
        ]
    },
    {
        path: '/article',
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
                component: () => import('@/views/article/list')
            },
            {
                path: 'write',
                name: 'ArticleWrite',
                meta: {
                    title: '编写文章'
                },
                component: () => import('@/views/article/write')
            },
            {
                path: 'tag',
                name: 'ArticleTag',
                meta: {
                    title: '文章标签'
                },
                component: () => import('@/views/article/tag')
            },
            {
                path: 'comment',
                name: 'ArticleComment',
                meta: {
                    title: '文章评论'
                },
                component: () => import('@/views/article/comment')
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
                component: () => import('@/views/message')
            }
        ]
    },
    {
        path: '/user',
        component: Layout,
        meta: {
            icon: 'user',
            title: '用户管理'
        },
        children: [
            {
                path: 'list',
                name: 'UserList',
                meta: {
                    title: '用户列表'
                },
                component: () => import('@/views/user/list')
            },
            {
                path: 'role',
                name: 'RoleList',
                meta: {
                    title: '角色列表'
                },
                component: () => import('@/views/user/role')
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
                component: () => import('@/views/friendLink')
            }
        ]
    },
    {
        hidden: true,
        path: '/login',
        name: 'Login',
        component: () => import('@/views/login')
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
