const tableColumns = [
    {
        prop: 'title',
        label: '文章标题',
        minWidth: '120',
        align: 'center'
    },
    {
        type: 'slot',
        slotName: 'coverImg',
        prop: 'cover_img',
        label: '文章封面',
        minWidth: '120',
        align: 'center'
    },
    {
        prop: 'author.nickname',
        label: '文章作者',
        minWidth: '120',
        align: 'center'
    },
    {
        prop: 'view_num',
        label: '浏览量',
        minWidth: '120',
        align: 'center'
    },
    {
        prop: 'like_num',
        label: '点赞数',
        minWidth: '120',
        align: 'center'
    },
    {
        prop: 'comment_num',
        label: '评论数',
        minWidth: '120',
        align: 'center'
    },
    {
        type: 'slot',
        slotName: 'tag',
        label: '文章标签',
        minWidth: '120',
        align: 'center'
    },
    {
        prop: 'createdAt',
        label: '创建时间',
        minWidth: '120',
        align: 'center'
    },
    {
        type: 'opt',
        label: '操作',
        align: 'center',
        fixed: 'right',
        options: [
            {
                type: 'primary',
                size: 'mini',
                text: '编辑',
                act: 'edit'
            },
            {
                type: 'danger',
                size: 'mini',
                text: '删除',
                act: 'delete'
            }
        ]
    }
]

const tablePager = {
    page: 1,
    size: 10,
    total: 0
}

export { tableColumns, tablePager }
