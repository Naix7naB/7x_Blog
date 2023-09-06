import { formatDate } from '@/utils'

/* 文章分类页表格数据项配置内容 */
const columns = [
    {
        prop: 'name',
        label: '分类名称',
        minWidth: 160
    },
    {
        prop: 'creator.nickname',
        label: '创建者',
        minWidth: 160
    },
    {
        prop: 'articles.length',
        label: '文章数',
        minWidth: 160
    },
    {
        prop: 'created_at',
        label: '创建时间',
        minWidth: 160,
        formatter(val) {
            return formatDate(val)
        }
    },
    {
        type: 'opt',
        prop: 'opt',
        label: '操作',
        optType: ['edit', 'delete']
    }
]

/* 文章分类页查找配置内容 */
const query = {
    form: {
        data: {
            dateRange: [],
            name: ''
        },
        items: [
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
                type: 'input',
                prop: 'name',
                label: '分类名称',
                placeholder: '输入分类名称'
            }
        ]
    }
}

/* 文章分类页弹窗配置内容 */
const popup = {
    config: {
        title: '新增文章',
        width: '40%'
    },
    form: {
        data: {
            name: ''
        },
        items: [
            {
                type: 'input',
                prop: 'name',
                label: '分类名称',
                placeholder: '输入分类名称',
                rules: [{ required: true, message: '分类名称不能为空', trigger: 'blur' }]
            }
        ]
    }
}

export { columns, query, popup }
