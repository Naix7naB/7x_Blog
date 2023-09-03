import { formatDate } from '@/utils'

const tableColumns = [
    {
        prop: 'name',
        label: '标识',
        minWidth: 120,
        align: 'center'
    },
    {
        prop: 'label',
        label: '名称',
        minWidth: 120,
        align: 'center'
    },
    {
        prop: 'includes.length',
        label: '用户数量',
        minWidth: 120,
        align: 'center'
    },
    {
        prop: 'creator.nickname',
        label: '创建用户',
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
        optType: ['edit', 'check', 'delete']
    }
]

export { tableColumns }
