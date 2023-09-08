import { formatDate } from '@/utils'

/* 文章标签页表格数据项配置内容 */
const columns = [
    {
        prop: 'name',
        label: '标签名称',
        minWidth: 120
    },
    {
        prop: 'description',
        label: '标签描述',
        minWidth: 120
    },
    {
        type: 'slot',
        prop: 'color',
        slotName: 'tagColor',
        label: '标签背景色',
        minWidth: 120
    },
    {
        prop: 'creator.nickname',
        label: '创建用户',
        minWidth: 120
    },
    {
        prop: 'articles.length',
        label: '文章数',
        minWidth: 120
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

/* 文章标签页查询表单配置内容 */
const queryForm = {
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
        }
    ]
}

/* 文章标签页弹窗表单配置内容 */
const popupForm = {
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

export { columns, queryForm, popupForm }
