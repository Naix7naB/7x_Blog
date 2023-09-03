import { formatDate } from '@/utils'

const tableColumns = [
    {
        type: 'image',
        prop: 'avatar',
        label: '头像',
        minWidth: 120,
        align: 'center'
    },
    {
        prop: 'username',
        label: '账号',
        minWidth: 120,
        align: 'center'
    },
    {
        prop: 'nickname',
        label: '昵称',
        minWidth: 120,
        align: 'center'
    },
    {
        prop: 'role.label',
        label: '用户角色',
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
