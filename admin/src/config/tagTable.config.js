import { formatDate } from '@/utils'

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
        optType: ['check', 'delete']
    }
]

export { columns }
