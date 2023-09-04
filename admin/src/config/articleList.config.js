import { formatDate } from '@/utils'

const tableColumns = [
    {
        prop: 'title',
        label: '文章标题',
        minWidth: 180
    },
    {
        type: 'image',
        prop: 'cover_img',
        label: '文章封面',
        minWidth: 120
    },
    {
        prop: 'author.nickname',
        label: '文章作者',
        minWidth: 100
    },
    {
        prop: 'view_count',
        label: '浏览量',
        minWidth: 80
    },
    {
        prop: 'like_count',
        label: '点赞数',
        minWidth: 80
    },
    {
        prop: 'comment_count',
        label: '评论数',
        minWidth: 80
    },
    {
        prop: 'classify.name',
        label: '所属分类',
        minWidth: 100
    },
    {
        type: 'slot',
        slotName: 'tag',
        prop: 'tags',
        label: '文章标签'
    },
    {
        prop: 'created_at',
        label: '创建时间',
        minWidth: 160,
        formatter: (row, column, cellVal, idx) => {
            return formatDate(cellVal)
        }
    },
    {
        type: 'opt',
        prop: 'opt',
        label: '操作',
        optType: ['edit', 'delete']
    }
]

export { tableColumns }
