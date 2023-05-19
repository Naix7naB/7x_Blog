import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/admin'
  },
  {
    name: 'Admin',
    path: '/admin',
    redirect: '/admin/index',
    component: () => import('@/views/AdminView'),
    children: [
      {
        name: 'Home',
        path: 'index',
        component: () => import('@/views/HomeView')
      },
      {
        name: 'ArticleManagement',
        path: 'article',
        redirect: '/admin/article/list',
        component: () => import('@/views/ArticleManagementView'),
        children: [
          {
            name: 'ArticleList',
            path: 'list',
            component: () => import('@/views/HomeView')
          },
          {
            name: 'ArticleWrite',
            path: 'write',
            component: () => import('@/views/HomeView')
          },
          {
            name: 'ArticleTag',
            path: 'tag',
            component: () => import('@/views/HomeView')
          },
          {
            name: 'ArticleComment',
            path: 'comment',
            component: () => import('@/views/HomeView')
          }
        ]
      },
      {
        name: 'MessageMangement',
        path: 'message',
        component: () => import('@/views/HomeView')
      },
      {
        name: 'UserManagement',
        path: 'user',
        component: () => import('@/views/HomeView')
      },
      {
        name: 'FriendLink',
        path: 'link',
        component: () => import('@/views/HomeView')
      }
    ]
  }
]

const router = new VueRouter({ routes })

export default router
