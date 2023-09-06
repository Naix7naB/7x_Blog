const config = {
    title: '新增文章',
    width: '40%'
}

const form = {
    data: {
        name: ''
    },
    items: [
        {
            type: 'input',
            prop: 'name',
            label: '分类名称',
            placeholder: '输入分类名称',
            rules: [{ required: true, message: '分类名称不能为空', trigger: 'blur' }]
        }
    ]
}

export { config, form }
