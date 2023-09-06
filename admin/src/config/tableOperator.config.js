const operatorType = {
    add: {
        type: 'primary',
        text: '添加',
        icon: 'el-icon-plus'
    },
    edit: {
        type: 'primary',
        text: '编辑',
        icon: 'el-icon-edit'
    },
    check: {
        type: '',
        text: '查看',
        icon: 'el-icon-view'
    },
    delete: {
        type: 'danger',
        text: '删除',
        icon: 'el-icon-delete'
    },
    batchDelete: {
        type: 'danger',
        text: '批量删除',
        icon: 'el-icon-delete'
    },
    query: {
        type: 'primary',
        text: '查找',
        icon: 'el-icon-search'
    },
    reset: {
        type: '',
        text: '重置',
        icon: 'el-icon-refresh'
    }
}

export { operatorType }
