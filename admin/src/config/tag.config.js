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
        align: 'center'
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
            type: 'daterange'
        }
    }
]

export { tableColumns, tablePager, formData, formItems }
