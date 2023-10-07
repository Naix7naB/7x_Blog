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
                <fa-icon icon={['fas', icon]} />
            )
        }
        if (item.name) {
            children.push(
                <span>{ item.name }</span>
            )
        }

        const getCurrentEvent = type => {
            return () => {
                const targetRouteName = type === 'tag' ? 'TagArticle' : 'CategoryArticle'
                const targetRouteParams = type === 'tag' ?
                    { tid: item.id, name: item.name } :
                    { cid: item.id, name: item.name }
                goToPath({
                    target: targetRouteName,
                    params: targetRouteParams
                })
            }
        }

        const clickEvent = getCurrentEvent(type)

        return h(
            'span',
            {
                class: 'mark-button',
                on: {
                    click(e) {
                        e.stopPropagation()
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
    color: $cl-gray-7;
    background-color: $cl-light-5;
    transition: color .3s ease, background-color .3s ease;
    cursor: pointer;

    &:not(:first-of-type) {
        margin-left: 10px;
    }

    &:hover {
        color: $cl-light-3;
        background-color: $cl-accent-l;
    }
}

.mark-button > span{
    margin-left: 4px;
}
</style>
