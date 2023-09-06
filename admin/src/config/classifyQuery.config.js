const form = {
    data: {
        dateRange: [],
        name: ''
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
            prop: 'name',
            label: '分类名称',
            placeholder: '输入分类名称'
        }
    ]
}

export { form }
