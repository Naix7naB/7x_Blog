<script>
import { assign } from 'lodash-es'

export default {
    name: 'ColorBlock',
    functional: true,
    props: {
        color: {
            type: String,
            default: 'rgba(0, 0, 0, 0)'
        },
        size: {
            type: String,
            default: '32px'
        }
    },
    render(h, ctx) {
        const { color, size } = ctx.props
        const colorBlockStyle = {
            width: size,
            height: size,
            backgroundColor: color
        }
        return <i class="color-block" style={ assign(colorBlockStyle, ctx.data.style) } />
    }
}
</script>

<style lang="scss" scoped>
.color-block {
    display: block;
    margin: auto;
}
</style>
