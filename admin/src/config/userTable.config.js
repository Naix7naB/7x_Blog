import { formatDate } from '@/utils'

/* 用户列表页表格数据项配置内容 */
const columns = [
    {
        type: 'image',
        prop: 'avatar',
        label: '头像',
        minWidth: 100
    },
    {
        prop: 'username',
        label: '账号',
        minWidth: 100
    },
    {
        prop: 'nickname',
        label: '昵称',
        minWidth: 100
    },
    {
        prop: 'role.label',
        label: '用户角色',
        minWidth: 100
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

/* 用户列表页查找配置内容 */
const query = {
    form: {
        data: {
            nickname: '',
            role: ''
        },
        items: [
            {
                type: 'input',
                prop: 'nickname',
                label: '用户昵称',
                placeholder: '输入用户昵称'
            },
            {
                type: 'input',
                prop: 'role',
                label: '用户角色',
                placeholder: '输入用户角色'
            }
        ]
    }
}

/* 用户列表页弹窗配置内容 */
const popup = {
    config: {
        title: '新增用户',
        width: '60%'
    },
    form: {
        data: {
            username: '',
            password: '',
            nickname: '',
            avatar: '',
            email: '',
            role: ''
        },
        items: [
            {
                type: 'input',
                prop: 'username',
                label: '账号',
                placeholder: '输入账号',
                rules: [{ required: true, message: '账号不能为空', trigger: 'blur' }]
            },
            {
                type: 'input',
                prop: 'password',
                label: '密码',
                placeholder: '输入密码',
                rules: [{ required: true, message: '密码不能为空', trigger: 'blur' }]
            },
            {
                type: 'input',
                prop: 'nickname',
                label: '昵称',
                placeholder: '输入昵称',
                rules: [{ required: true, message: '昵称不能为空', trigger: 'blur' }]
            },
            {
                type: 'upload',
                prop: 'avatar',
                label: '头像',
                others: {
                    name: 'avatar',
                    multiple: false
                }
            },
            {
                type: 'input',
                prop: 'email',
                label: '邮箱',
                placeholder: '输入邮箱'
            },
            {
                type: 'input',
                prop: 'role',
                label: '用户角色',
                placeholder: '输入角色名称',
                rules: [{ required: true, message: '用户角色不能为空', trigger: 'blur' }]
            }
        ]
    }
}

export { columns, query, popup }
