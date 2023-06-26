<script>
export default {
    name: 'OperationBtn',
    functional: true,
    props: {
        type: {
            type: String,
            default: 'edit'
        }
    },
    render(h, ctx) {
        const { type } = ctx.props
        const config = { size: 'mini' }
        if (type === 'edit') {
            config.type = 'primary'
            config.text = '编辑'
        }
        if (type === 'check') {
            config.type = ''
            config.text = '查看'
        }
        if (type === 'delete') {
            config.type = 'danger'
            config.text = '删除'
        }
        Object.assign(ctx.data.attrs, config)
        return <el-button { ...ctx.data } >{config.text}</el-button>
    }
}
</script>
