<script>
const buttonMap = {
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

export default {
    name: 'OperationBtn',
    functional: true,
    props: {
        type: {
            type: String,
            default: 'edit'
        },
        size: {
            type: String,
            default: 'mini'
        },
        showIcon: {
            type: Boolean,
            default: false
        }
    },
    render(h, ctx) {
        const { type, size, showIcon } = ctx.props
        const config = { size, ...buttonMap[type] }
        if (showIcon === false) {
            delete config.icon
        }
        Object.assign(ctx.data.attrs, config)
        return <el-button { ...ctx.data } >{ config.text }</el-button>
    }
}
</script>
