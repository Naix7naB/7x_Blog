import { formatDate } from '@/utils'

/* 留言管理页表格数据项配置内容 */
const columns = [
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

/* 留言管理页查询表单配置内容 */
const queryForm = {
    data: {
        nickname: '',
        content: '',
        dateRange: []
    },
    items: [
        {
            type: 'input',
            prop: 'nickname',
            label: '评论用户',
            placeholder: '输入评论用户'
        },
        {
            type: 'input',
            prop: 'content',
            label: '评论内容',
            placeholder: '输入评论内容'
        },
        {
            type: 'date',
            prop: 'dateRange',
            label: '评论时间',
            others: {
                type: 'daterange',
                startPlaceholder: '开始日期',
                endPlaceholder: '结束日期',
                rangeSeparator: '至'
            }
        }
    ]
}

export { columns, queryForm }
