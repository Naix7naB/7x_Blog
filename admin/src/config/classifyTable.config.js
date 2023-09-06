import { formatDate } from '@/utils'

const columns = [
    {
        prop: 'name',
        label: '分类名称',
        minWidth: 160
    },
    {
        prop: 'creator.nickname',
        label: '创建者',
        minWidth: 160
    },
    {
        prop: 'articles.length',
        label: '文章数',
        minWidth: 160
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

export { columns }
