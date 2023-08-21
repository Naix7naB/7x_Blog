<script>
export default {
    functional: true,
    name: 'MarkButton',
    props: {
        type: {
            type: String,
            required: true
        },
        text: {
            type: String,
            default: ''
        }
    },
    render(h, ctx) {
        const { type, text } = ctx.props
        const children = []
        if (type) {
            children.push(
                <fa-icon class={['mark-button--icon', type]} icon={['fas', type === 'tag' ? 'tag' : 'folder-open']} />
            )
        }
        if (text) {
            children.push(
                <span>{ text }</span>
            )
        }
        if (!text && ctx.slots().default) {
            children.push(
                ctx.slots().default.map(vnode => {
                    if (!vnode.tag) {
                        return (
                            <span>{ vnode.text.trim() }</span>
                        )
                    }
                    return vnode
                })
            )
        }

        return h('span', { class: 'mark-button' }, children)
    }
}
</script>

<style lang="scss" scoped>
/* 标记按钮样式 */
.mark-button {
    padding: 2px 12px;
    line-height: 20px;
    border-radius: 2px;
    font-size: $fz-small;
    color: #777;
    background-color: #ddd;
    transition: all .2s;
    cursor: pointer;

    &:not(:first-of-type) {
        margin-left: 10px;
    }

    &:hover {
        color: #eee;
        background-color: orange;
    }
}

.mark-button--icon {
    margin-right: 4px;
}

.mark-button--icon.classify {
    color: #ffd977;
}

.mark-button--icon.tag {
    color: #8c7bfd;
}
</style>
