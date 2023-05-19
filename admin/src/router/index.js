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
        meta: {
          icon: 'house',
          title: '首页'
        },
        component: () => import('@/views/HomeView')
      },
      {
        name: 'ArticleManagement',
        path: 'article',
        redirect: '/admin/article/list',
        meta: {
          icon: 'file-pen',
          title: '文章管理'
        },
        component: () => import('@/views/ArticleManagementView'),
        children: [
          {
            name: 'ArticleList',
            path: 'list',
            meta: {
              title: '文章列表'
            },
            component: () => import('@/views/ArticleListView')
          },
          {
            name: 'ArticleWrite',
            path: 'write',
            meta: {
              title: '编写文章'
            },
            component: () => import('@/views/ArticleWriteView')
          },
          {
            name: 'ArticleTag',
            path: 'tag',
            meta: {
              title: '文章标签'
            },
            component: () => import('@/views/ArticleTagView')
          },
          {
            name: 'ArticleComment',
            path: 'comment',
            meta: {
              title: '文章评论'
            },
            component: () => import('@/views/ArticleCommentView')
          }
        ]
      },
      {
        name: 'MessageManagement',
        path: 'message',
        meta: {
          icon: 'pen-to-square',
          title: '留言管理'
        },
        component: () => import('@/views/MessageManagementView')
      },
      {
        name: 'UserManagement',
        path: 'user',
        meta: {
          icon: 'user',
          title: '用户管理'
        },
        component: () => import('@/views/UserManagementView')
      },
      {
        name: 'FriendLink',
        path: 'link',
        meta: {
          icon: 'paperclip',
          title: '友情链接'
        },
        component: () => import('@/views/FriendLinkView')
      }
    ]
  }
]

const router = new VueRouter({ routes })

export default router
