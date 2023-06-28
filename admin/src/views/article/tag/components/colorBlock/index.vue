<script>
export default {
    name: 'ColorBlock',
    functional: true,
    props: {
        color: {
            type: String,
            default: 'rgba(0, 0, 0, 0)'
        },
        sideWidth: {
            type: String,
            default: '32px'
        }
    },
    render(h, ctx) {
        const { color, sideWidth } = ctx.props
        const colorBlockStyle = {
            width: sideWidth,
            height: sideWidth,
            backgroundColor: color
        }
        return <i class="color-block" style={ Object.assign(colorBlockStyle, ctx.data.style) } />
    }
}
</script>

<style lang="scss" scoped>
.color-block {
    display: block;
}
</style>
