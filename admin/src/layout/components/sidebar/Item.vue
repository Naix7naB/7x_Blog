<script>
export default {
    name: 'MenuItem',
    functional: true,
    props: {
        icon: {
            type: String,
            default: ''
        },
        title: {
            type: String,
            default: ''
        }
    },
    render(h, ctx) {
        const { icon, title } = ctx.props
        const vnodes = []
        if (icon) {
            vnodes.push(<fa-icon class="menu-icon" icon={['fas', icon]} />)
        }
        if (title) {
            vnodes.push(<span slot='title'>{title}</span>)
        }
        return vnodes
    }
}
</script>

<style lang="scss" scoped>
.menu-icon {
    margin-right: 10px;
}
</style>
