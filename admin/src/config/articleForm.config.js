const data = {
    title: '',
    description: '',
    tags: [],
    cover_img: null,
    content: '',
    state: ''
}

const items = [
    {
        type: 'input',
        prop: 'title',
        label: '文章标题',
        placeholder: '请输入文章标题',
        rules: [{ required: true, message: '请填写文章标题', trigger: 'blur' }]
    },
    {
        type: 'input',
        prop: 'description',
        label: '文章描述',
        placeholder: '请输入文章描述',
        rules: [{ required: true, message: '请填写文章描述', trigger: 'blur' }]
    },
    {
        type: 'select',
        prop: 'tags',
        label: '文章标签',
        placeholder: '请输入文章标签',
        rules: [{ required: true, message: '请填写文章标签', trigger: 'change' }],
        others: {
            allowCreate: true,
            defaultFirstOption: true,
            filterable: true,
            multiple: true,
            multipleLimit: 5
        },
        options: []
    },
    {
        type: 'upload',
        prop: 'cover_img',
        label: '选择封面',
        uploadType: 0,
        limit: 1
    },
    {
        type: 'slot',
        slotName: 'editor',
        prop: 'content',
        label: '文章内容'
    },
    {
        type: 'slot',
        slotName: 'submit',
        prop: 'state'
    }
]

export { data, items }
