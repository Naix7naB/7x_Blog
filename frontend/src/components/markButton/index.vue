<script>
import { goToPath } from '@/utils/util'

export default {
    functional: true,
    name: 'MarkButton',
    props: {
        type: {
            type: String,
            required: true
        },
        item: {
            type: Object,
            default() {
                return {
                    id: Date.now() + '',
                    name: ''
                }
            }
        }
    },
    render(h, ctx) {
        const { type, item } = ctx.props
        const children = []
        if (type) {
            const icon = type === 'tag' ? 'tag' : 'folder-open'
            children.push(
                <fa-icon class={['mark-button--icon', type]} icon={['fas', icon]} />
            )
        }
        if (item.name) {
            children.push(
                <span>{ item.name }</span>
            )
        }

        const getCurrentEvent = type => {
            return () => {
                const targetRouteName = type === 'tag' ? 'TagArticle' : 'ClassifyArticle'
                const targetRouteParams = type === 'tag' ?
                    { tid: item.id, name: item.name } :
                    { cid: item.id, name: item.name }
                goToPath({
                    target: targetRouteName,
                    params: targetRouteParams
                })
            }
        }

        return h(
            'span',
            {
                class: 'mark-button',
                on: {
                    click(e) {
                        e.stopPropagation()
                        const clickEvent = getCurrentEvent(type)
                        clickEvent()
                    }
                }
            },
            children
        )
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

.mark-button--icon.category {
    color: #ffd977;
}

.mark-button--icon.tag {
    color: #8c7bfd;
}
</style>
