import { formatDate } from '@/utils'

const tableColumns = [
    {
        type: 'image',
        prop: 'reviewer.avatar',
        label: '用户头像',
        minWidth: 100
    },
    {
        prop: 'reviewer.nickname',
        label: '评论用户',
        minWidth: 100
    },
    {
        prop: 'mention.nickname',
        label: '回复用户',
        minWidth: 100
    },
    {
        prop: 'topic_title',
        label: '所属文章',
        minWidth: 180
    },
    {
        prop: 'content',
        label: '评论内容',
        minWidth: 180
    },
    {
        prop: 'reply_id.content',
        label: '回复内容',
        minWidth: 180
    },
    {
        prop: 'created_at',
        label: '评论时间',
        minWidth: 160,
        formatter(val) {
            return formatDate(val)
        }
    },
    {
        type: 'opt',
        prop: 'opt',
        label: '操作',
        optType: ['delete']
    }
]

const headerFormItems = [
    {
        type: 'date',
        prop: 'dateRange',
        label: '创建时间',
        others: {
            type: 'daterange',
            startPlaceholder: '开始日期',
            endPlaceholder: '结束日期',
            rangeSeparator: '至'
        }
    },
    {
        type: 'opt',
        prop: 'opt'
    }
]

export { tableColumns, headerFormItems }
