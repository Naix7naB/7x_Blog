import { formatDate } from '@/utils'

/* 文章列表页表格数据项配置内容 */
const columns = [
    {
        prop: 'title',
        label: '文章标题',
        minWidth: 180
    },
    {
        type: 'image',
        prop: 'cover_img',
        label: '文章封面',
        minWidth: 120
    },
    {
        prop: 'author.nickname',
        label: '文章作者',
        minWidth: 100
    },
    {
        prop: 'view_count',
        label: '浏览量',
        minWidth: 80
    },
    {
        prop: 'like_count',
        label: '点赞数',
        minWidth: 80
    },
    {
        prop: 'comment_count',
        label: '评论数',
        minWidth: 80
    },
    {
        prop: 'classify.name',
        label: '所属分类',
        minWidth: 100
    },
    {
        type: 'slot',
        slotName: 'tag',
        prop: 'tags',
        label: '文章标签'
    },
    {
        prop: 'created_at',
        label: '创建时间',
        minWidth: 160,
        formatter(val) {
            return formatDate(val)
        }
    },
    {
        type: 'opt',
        prop: 'opt',
        label: '操作',
        optType: ['edit', 'delete']
    }
]

/* 文章列表页查找配置内容 */
const query = {
    form: {
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
}

/* 文章列表页弹窗配置内容 */
const popup = {
    config: {
        title: '新增文章',
        fullscreen: true
    },
    form: {
        data: {
            title: '',
            description: '',
            classify: '',
            tags: [],
            cover_img: null,
            content: '',
            state: ''
        },
        items: [
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
                    listType: 'picture-card',
                    limit: 1
                }
            },
            {
                type: 'slot',
                slotName: 'editor',
                prop: 'content',
                label: '文章内容'
            }
        ]
    }
}

export { columns, query, popup }
