import { formatDate } from '@/utils'

const tableColumns = [
    {
        prop: 'name',
        label: '分类名称',
        minWidth: 120,
        align: 'center'
    },
    {
        prop: 'creator.nickname',
        label: '创建者',
        minWidth: 120,
        align: 'center'
    },
    {
        prop: 'articles.length',
        label: '文章数',
        minWidth: 120,
        align: 'center'
    },
    {
        prop: 'created_at',
        label: '创建时间',
        minWidth: 120,
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
        fixed: 'right',
        optType: ['edit', 'delete']
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
