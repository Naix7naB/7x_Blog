import { formatDate } from '@/utils'

const tableColumns = [
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
