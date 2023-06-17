import { formatDate } from '@/utils'

const tableColumns = [
    {
        prop: 'title',
        label: '文章标题',
        minWidth: '120',
        align: 'center'
    },
    {
        type: 'slot',
        slotName: 'cover_img',
        prop: 'cover_img',
        label: '文章封面',
        minWidth: '120',
        align: 'center'
    },
    {
        prop: 'author.nickname',
        label: '文章作者',
        minWidth: '120',
        align: 'center'
    },
    {
        prop: 'view_num',
        label: '浏览量',
        minWidth: '120',
        align: 'center'
    },
    {
        prop: 'like_num',
        label: '点赞数',
        minWidth: '120',
        align: 'center'
    },
    {
        prop: 'comment_num',
        label: '评论数',
        minWidth: '120',
        align: 'center'
    },
    {
        type: 'slot',
        slotName: 'tag',
        prop: 'tag',
        label: '文章标签',
        minWidth: '120',
        align: 'center'
    },
    {
        prop: 'created_at',
        label: '创建时间',
        minWidth: '120',
        align: 'center',
        formatter: (row, column, cellVal, idx) => {
            return formatDate(cellVal)
        }
    },
    {
        type: 'opt',
        prop: 'opt',
        label: '操作',
        align: 'center',
        fixed: 'right'
    }
]

export { tableColumns }
