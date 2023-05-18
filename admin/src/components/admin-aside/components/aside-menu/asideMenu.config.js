export const MENU_CONFIG = [
  {
    index: 'home',
    icon: 'house',
    title: '首页'
  },
  {
    index: 'article-management',
    icon: 'file-pen',
    title: '编写文章',
    children: [
      {
        index: 'article-list',
        title: '文章列表'
      },
      {
        index: 'article-write',
        title: '编写文章'
      },
      {
        index: 'article-tag',
        title: '文章标签'
      },
      {
        index: 'article-commet',
        title: '文章评论'
      }
    ]
  },
  {
    index: 'message',
    icon: 'pen-to-square',
    title: '留言'
  },
  {
    index: 'user',
    icon: 'user',
    title: '用户'
  },
  {
    index: 'link',
    icon: 'paperclip',
    title: '友链'
  }
]
