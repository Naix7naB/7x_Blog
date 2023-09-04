import { formatDate } from '@/utils'

const tableColumns = [
    {
        type: 'image',
        prop: 'avatar',
        label: '头像',
        minWidth: 120
    },
    {
        prop: 'username',
        label: '账号',
        minWidth: 120
    },
    {
        prop: 'nickname',
        label: '昵称',
        minWidth: 120
    },
    {
        prop: 'role.label',
        label: '用户角色',
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
