import { formatDate } from '@/utils/util'

const tableHeaderData = [
    {
        field: 'articleTitle',
        label: '文章标题'
    },
    {
        field: 'articleCover',
        label: '文章封面'
    },
    {
        field: 'articleAuthor',
        label: '文章作者'
    },
    {
        field: 'articleViews',
        label: '浏览量'
    },
    {
        field: 'articleLikes',
        label: '点赞数'
    },
    {
        field: 'articleComments',
        label: '评论数'
    },
    {
        field: 'articleTag',
        label: '文章标签'
    },
    {
        field: 'createdTime',
        label: '创建时间'
    },
    {
        field: 'operation',
        label: '操作'
    }
]

const tableData = [
    {
        articleTitle: 'test_article1',
        articleCover: 'corver_url1',
        articleAuthor: 'Naixxx',
        articleViews: '78',
        articleLikes: '10',
        articleComments: '5',
        articleTag: '前端',
        createdTime: formatDate(),
        operation: ''
    },
    {
        articleTitle: 'test_article2',
        articleCover: 'corver_url2',
        articleAuthor: 'Naixxx',
        articleViews: '67',
        articleLikes: '6',
        articleComments: '3',
        articleTag: '前端',
        createdTime: formatDate(),
        operation: ''
    },
    {
        articleTitle: 'test_article3',
        articleCover: 'corver_url3',
        articleAuthor: 'Naixxx',
        articleViews: '198',
        articleLikes: '25',
        articleComments: '29',
        articleTag: '前端',
        createdTime: formatDate(),
        operation: ''
    },
    {
        articleTitle: 'test_article4',
        articleCover: 'corver_url4',
        articleAuthor: 'Naixxx',
        articleViews: '65',
        articleLikes: '5',
        articleComments: '6',
        articleTag: '前端',
        createdTime: formatDate(),
        operation: ''
    },
    {
        articleTitle: 'test_article5',
        articleCover: 'corver_url5',
        articleAuthor: 'Naixxx',
        articleViews: '117',
        articleLikes: '22',
        articleComments: '17',
        articleTag: '前端',
        createdTime: formatDate(),
        operation: ''
    }
]

export { tableHeaderData, tableData }
