import { formatDate } from '@/utils/util'

const tableColumns = [
    {
        prop: 'name',
        label: '标签名称',
        minWidth: '120',
        align: 'center'
    },
    {
        prop: 'color',
        label: '标签背景色',
        minWidth: '120',
        align: 'center'
    },
    {
        prop: 'createdAt',
        label: '创建时间',
        minWidth: '120',
        align: 'center',
        formatter: (row, column, cellVal, idx) => {
            return formatDate(cellVal)
        }
    },
    {
        type: 'opt',
        label: '操作',
        align: 'center',
        fixed: 'right',
        options: [
            {
                type: 'primary',
                size: 'mini',
                text: '编辑',
                act: 'edit'
            },
            {
                type: 'danger',
                size: 'mini',
                text: '删除',
                act: 'delete'
            }
        ]
    }
]

const tablePager = {
    page: 1,
    size: 10,
    total: 0
}

const formConfig = {
    inline: true
}

const formData = {
    name: '',
    createdAt: ''
}

const formItems = [
    {
        type: 'input',
        prop: 'name',
        label: '标签名称',
        placeholder: '输入标签名称'
    },
    {
        type: 'date',
        prop: 'createdAt',
        label: '创建时间',
        others: {
            type: 'daterange',
            startPlaceholder: '开始日期',
            endPlaceholder: '结束日期',
            rangeSep: '至'
        }
    },
    {
        type: 'opt',
        options: [
            {
                type: 'primary',
                size: 'default',
                text: '查询',
                act: 'search'
            },
            {
                type: 'primary',
                size: 'default',
                text: '创建',
                act: 'create'
            }
        ]
    }
]

export { tableColumns, tablePager, formConfig, formData, formItems }
