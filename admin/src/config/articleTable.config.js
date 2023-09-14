import store from '@/store'
import { formatDate } from '@/utils'

function handleFormItemOptions(name) {
    const list = store.getters[`article/get${name}List`]
    return list.map(item => {
        return {
            label: item.name,
            value: item.id
        }
    })
}

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
        type: 'tag',
        prop: 'category.name',
        label: '所属分类',
        minWidth: 100,
        handler(val) {
            return {
                type: 'warning',
                value: val
            }
        }
    },
    {
        type: 'tag',
        prop: 'tags',
        label: '文章标签',
        minWidth: 100,
        handler(val) {
            return {
                key: val.id,
                value: val.name
            }
        }
    },
    {
        type: 'tag',
        prop: 'published',
        label: '文章状态',
        minWidth: 100,
        handler(val) {
            return {
                type: val ? 'success' : 'warning',
                value: val ? '已发布' : '未发布'
            }
        }
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

/* 文章列表页查询表单配置内容 */
const queryForm = {
    data: {
        title: '',
        category: '',
        tags: ''
    },
    items: [
        {
            type: 'input',
            prop: 'title',
            label: '文章标题',
            placeholder: '输入文章标题'
        },
        {
            type: 'select',
            prop: 'category',
            label: '文章分类',
            placeholder: '选择文章分类',
            others: {
                filterable: true,
                multiple: false
            },
            options: handleFormItemOptions('Category')
        },
        {
            type: 'select',
            prop: 'tags',
            label: '文章标签',
            placeholder: '选择文章标签',
            others: {
                filterable: true,
                multiple: false
            },
            options: handleFormItemOptions('Tag')
        }
    ]
}

/* 文章列表页弹窗表单配置内容 */
const popupForm = {
    data: {
        title: '',
        description: '',
        category: '',
        tags: [],
        cover_img: '',
        content: '',
        published: false
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
            prop: 'category',
            label: '文章分类',
            placeholder: '请选择文章分类',
            rules: [{ required: true, message: '文章分类必填', trigger: 'change' }],
            others: {
                filterable: true,
                multiple: false
            },
            options: handleFormItemOptions('Category')
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
            options: handleFormItemOptions('Tag')
        },
        {
            type: 'upload',
            prop: 'cover_img',
            label: '选择封面',
            others: {
                name: 'cover_img',
                multiple: false
            }
        },
        {
            type: 'slot',
            slotName: 'editor',
            prop: 'content',
            label: '文章内容'
        },
        {
            type: 'switch',
            prop: 'published',
            label: '是否发布'
        }
    ]
}

export { columns, queryForm, popupForm }
