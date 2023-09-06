<script>
import { operatorType } from '@/config/tableOperator.config'

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
        const config = { size, ...operatorType[type] }
        if (showIcon === false) {
            delete config.icon
        }
        Object.assign(ctx.data.attrs, config)
        return <el-button { ...ctx.data } >{ config.text }</el-button>
    }
}
</script>
