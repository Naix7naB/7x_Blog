import { formatDate } from '@/utils'

const tableColumns = [
    {
        prop: 'name',
        label: '标识',
        minWidth: 120
    },
    {
        prop: 'label',
        label: '名称',
        minWidth: 120
    },
    {
        prop: 'includes.length',
        label: '用户数量',
        minWidth: 120
    },
    {
        prop: 'creator.nickname',
        label: '创建用户',
        minWidth: 120
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
        optType: ['edit', 'check', 'delete']
    }
]

export { tableColumns }
