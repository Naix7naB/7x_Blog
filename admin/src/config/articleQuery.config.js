const form = {
    data: {
        dateRange: [],
        title: ''
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
            prop: 'title',
            label: '文章标题',
            placeholder: '输入文章标题'
        }
    ]
}

export { form }
