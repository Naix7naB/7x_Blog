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
        type: 'tag',
        prop: 'role.label',
        label: '用户角色',
        minWidth: 100,
        handler(val) {
            return {
                type: val === '超级管理员' ? 'danger' : 'primary',
                effect: 'dark',
                value: val
            }
        }
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

/* 用户列表页查询表单配置内容 */
const queryForm = {
    data: {
        dateRange: null,
        nickname: ''
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
            prop: 'nickname',
            label: '用户昵称',
            placeholder: '输入用户昵称'
        }
    ]
}

/* 用户列表页弹窗表单配置内容 */
const popupForm = {
    data: {
        username: '',
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
            type: 'select',
            prop: 'role',
            label: '用户角色',
            placeholder: '选择角色名称',
            rules: [{ required: true, message: '用户角色不能为空', trigger: 'change' }],
            others: {
                filterable: true,
                multiple: false
            },
            options: []
        }
    ]
}

export { columns, queryForm, popupForm }
