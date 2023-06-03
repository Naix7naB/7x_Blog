const formData = {
    title: '',
    description: '',
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
        prop: 'tags',
        label: '文章标签',
        placeholder: '请输入文章标签',
        rules: [{ required: true, message: '请填写文章标签', trigger: 'change' }],
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
        prop: 'state',
        position: 'center',
        options: [
            {
                'data-state': 'draft',
                text: '存草稿',
                plain: true,
                act: 'draft'
            },
            {
                'data-state': 'released',
                text: '发布',
                type: 'primary',
                act: 'release'
            }
        ]
    }
]

export { formData, formItems }
