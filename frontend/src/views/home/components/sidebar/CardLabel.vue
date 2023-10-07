<script>
export default {
    name: 'CardLabe',
    functional: true,
    props: {
        icon: {
            type: String,
            required: true
        },
        text: {
            type: String,
            required: true
        }
    },
    render(h, ctx) {
        const { icon, text } = ctx.props
        const vnodes = []
        if (icon) {
            const iconVnode = h('fa-icon', {
                props: {
                    icon: ['fas', icon]
                }
            })
            vnodes.push(iconVnode)
        }
        if (text) {
            const textVnode = h('span', text)
            vnodes.push(textVnode)
        }

        return h(
            'div',
            {
                class: 'card-label'
            },
            vnodes
        )
    }
}
</script>

<style lang="scss" scoped>
.card-label {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    line-height: $lh-md;
    font-size: $fz-xm;

    & > svg {
        color: inherit;
    }

    & > span {
        margin-left: 6px;
    }
}
</style>
