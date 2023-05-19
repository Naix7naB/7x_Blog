export const MENU_CONFIG = [
  {
    index: '/admin/index',
    icon: 'house',
    title: '首页'
  },
  {
    index: '/admin/article',
    icon: 'file-pen',
    title: '文章管理',
    children: [
      {
        index: '/admin/article/list',
        title: '文章列表'
      },
      {
        index: '/admin/article/write',
        title: '编写文章'
      },
      {
        index: '/admin/article/tag',
        title: '文章标签'
      },
      {
        index: '/admin/article/comment',
        title: '文章评论'
      }
    ]
  },
  {
    index: '/admin/message',
    icon: 'pen-to-square',
    title: '留言管理'
  },
  {
    index: '/admin/user',
    icon: 'user',
    title: '用户管理'
  },
  {
    index: '/admin/link',
    icon: 'paperclip',
    title: '友情链接'
  }
]
