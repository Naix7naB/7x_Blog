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
            label: '标签名称',
            placeholder: '输入标签名称'
        },
        {
            type: 'slot',
            slotName: 'query'
        },
        {
            type: 'slot',
            slotName: 'reset'
        }
    ]
}

export { form }
