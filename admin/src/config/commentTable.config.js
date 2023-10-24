import { formatDate } from '@/utils'

/* 评论管理页表格数据项配置内容 */
const columns = [
    {
        type: 'image',
        prop: 'reviewer.avatar',
        label: '用户头像',
        minWidth: 100
    },
    {
        prop: 'topic_title',
        label: '所属文章',
        minWidth: 180
    },
    {
        prop: 'reviewer.nickname',
        label: '评论用户',
        minWidth: 100
    },
    {
        prop: 'content',
        label: '评论内容',
        minWidth: 180
    },
    {
        prop: 'mention.nickname',
        label: '回复用户',
        minWidth: 100
    },
    {
        prop: 'reply_content',
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

/* 评论管理页查询表单配置内容 */
const queryForm = {
    data: {
        dateRange: null,
        topic_title: ''
    },
    items: [
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
        },
        {
            type: 'input',
            prop: 'topic_title',
            label: '文章标题',
            placeholder: '输入文章标题'
        }
    ]
}

export { columns, queryForm }
