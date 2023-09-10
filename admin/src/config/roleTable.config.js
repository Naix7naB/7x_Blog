import { formatDate } from '@/utils'

/* 用户角色页表格数据项配置内容 */
const columns = [
    {
        type: 'tag',
        prop: 'label',
        label: '名称',
        minWidth: 120,
        handler(val) {
            return {
                type: val === '超级管理员' ? 'danger' : 'primary',
                effect: 'dark',
                value: val
            }
        }
    },
    {
        prop: 'name',
        label: '标识',
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
        optType: ['edit', 'delete']
    }
]

/* 用户角色页查询表单配置内容 */
const queryForm = {
    data: {
        dateRange: null
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
        }
    ]
}

/* 用户角色页弹窗表单配置内容 */
const popupForm = {
    data: {
        name: '',
        label: ''
    },
    items: [
        {
            type: 'input',
            prop: 'name',
            label: '角色名称',
            placeholder: '输入角色名称',
            rules: [{ required: true, message: '角色名称不能为空', trigger: 'blur' }]
        },
        {
            type: 'input',
            prop: 'label',
            label: '角色别称',
            placeholder: '输入角色别称',
            rules: [{ required: true, message: '角色别称不能为空', trigger: 'blur' }]
        }
    ]
}

export { columns, queryForm, popupForm }
