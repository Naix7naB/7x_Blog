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
                component: () => import(/* webpackChunkName: "Dashboard" */ '@/views/dashboard')
            }
        ]
    },
    {
        path: '/article',
        redirect: '/article/list',
        component: Layout,
        meta: {
            category: 'article',
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
                component: () => import(/* webpackChunkName: "Article" */ '@/views/article/list')
            },
            {
                path: 'category',
                name: 'ArticleCategory',
                meta: {
                    title: '文章分类'
                },
                component: () =>
                    import(/* webpackChunkName: "Article" */ '@/views/article/category')
            },
            {
                path: 'tag',
                name: 'ArticleTag',
                meta: {
                    title: '文章标签'
                },
                component: () => import(/* webpackChunkName: "Article" */ '@/views/article/tag')
            }
        ]
    },
    {
        path: '/news',
        redirect: '/news/comment',
        component: Layout,
        meta: {
            icon: 'comment-dots',
            title: '消息管理'
        },
        children: [
            {
                path: 'comment',
                name: 'CommentManagement',
                meta: {
                    title: '评论管理'
                },
                component: () => import(/* webpackChunkName: "News" */ '@/views/news/comment')
            },
            {
                path: 'message',
                name: 'MessageManagement',
                meta: {
                    title: '留言管理'
                },
                component: () => import(/* webpackChunkName: "News" */ '@/views/news/message')
            }
        ]
    },
    {
        path: '/user',
        component: Layout,
        redirect: '/user/list',
        meta: {
            category: 'user',
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
                component: () => import(/* webpackChunkName: "User" */ '@/views/user/list')
            },
            {
                path: 'role',
                name: 'RoleList',
                meta: {
                    title: '角色列表'
                },
                component: () => import(/* webpackChunkName: "User" */ '@/views/user/role')
            }
        ]
    },
    {
        path: '/site',
        component: Layout,
        redirect: '/site/wegConfig',
        meta: {
            category: 'site',
            icon: 'gear',
            title: '网站管理'
        },
        children: [
            {
                path: 'wegConfig',
                name: 'WebConfig',
                meta: {
                    title: '网站配置'
                },
                component: () => import(/* webpackChunkName: "Site" */ '@/views/site/webConfig')
            },
            {
                path: 'friendLink',
                name: 'FriendLink',
                meta: {
                    title: '友情链接'
                },
                component: () => import(/* webpackChunkName: "Site" */ '@/views/site/friendLink')
            }
        ]
    },
    {
        hidden: true,
        path: '/login',
        name: 'Login',
        component: () => import(/* webpackChunkName: "Login" */ '@/views/login')
    }
]

const router = new VueRouter({ routes })

/* 全局路由守卫 */
router.beforeEach((to, from, next) => {
    const token = store.getters.token
    store.dispatch('user/initUserStore')
    if (!token) {
        to.name === 'Login' ? next() : next('/login')
    } else {
        store.dispatch('article/initArticleStore')
        to.name === 'Login' ? next('/') : next()
    }
})

export default router
