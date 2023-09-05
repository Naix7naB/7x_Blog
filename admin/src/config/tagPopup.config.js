const config = {
    title: '新增标签',
    width: '40%'
}

const form = {
    data: {
        name: '',
        description: '',
        color: ''
    },
    items: [
        {
            type: 'input',
            prop: 'name',
            label: '标签名称',
            placeholder: '输入标签名称',
            rules: [{ required: true, message: '标签名称不能为空', trigger: 'blur' }]
        },
        {
            type: 'input',
            prop: 'description',
            label: '标签描述',
            placeholder: '输入标签描述'
        },
        {
            type: 'slot',
            slotName: 'colorPicker',
            prop: 'color',
            label: '标签颜色'
        }
    ]
}

export { config, form }
