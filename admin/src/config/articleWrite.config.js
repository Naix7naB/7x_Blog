const formData = {
    title: '',
    description: '',
    classify: '',
    tags: [],
    cover_img: null,
    content: '',
    state: ''
}

const formItems = [
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
        prop: 'classify',
        label: '文章分类',
        placeholder: '请选择文章分类',
        rules: [{ required: true, message: '文章分类必填', trigger: 'change' }],
        others: {
            filterable: true,
            multiple: false
        },
        options: []
    },
    {
        type: 'select',
        prop: 'tags',
        label: '文章标签',
        placeholder: '请选择文章标签',
        rules: [{ required: true, message: '文章标签必填', trigger: 'change' }],
        others: {
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
        others: {
            uploadType: 0,
            autoUpload: false,
            listType: 'picture-card',
            limit: 1
        }
    },
    {
        type: 'slot',
        slotName: 'editor',
        prop: 'content',
        label: '文章内容'
    },
    {
        type: 'opt',
        position: 'center'
    }
]

export { formData, formItems }
