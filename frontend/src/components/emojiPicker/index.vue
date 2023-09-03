<script>
import { Picker as EmojiMartPicker, EmojiIndex } from 'emoji-mart-vue-fast'
import EmojiTwitter from 'emoji-mart-vue-fast/data/twitter.json'
import 'emoji-mart-vue-fast/css/emoji-mart.css'

export default {
    functional: true,
    name: 'EmojiPicker',
    props: {
        showCategory: {
            type: Boolean,
            default: true
        },
        showSearch: {
            type: Boolean,
            default: true
        },
        pickerStyle: {
            type: Object,
            default: () => {
                return {
                    width: '100%',
                    height: '100%'
                }
            }
        }
    },
    render(h, ctx) {
        const { showCategory, showSearch, pickerStyle } = ctx.props
        const i18n = {
            search: '搜索',
            notfound: '没有找到对应表情',
            categories: {
                search: '搜索结果',
                recent: '最近使用',
                smileys: '心情',
                people: '人物',
                nature: '动物与大自然',
                foods: '食物与饮料',
                activity: '活动',
                places: '旅行与地点',
                objects: '物品',
                symbols: '符号',
                flags: '旗',
                custom: '自定义'
            }
        }

        const emojiData = new EmojiIndex(EmojiTwitter)

        return h(EmojiMartPicker, {
            props: {
                set: 'twitter',
                data: emojiData,
                emojiTooltip: true,
                i18n: i18n,
                pickerStyles: pickerStyle,
                showCategories: showCategory,
                showPreview: false,
                showSearch: showSearch,
                showSkinTones: false
            },
            on: {
                select(emoji) {
                    ctx.listeners.emoji(emoji.native)
                }
            }
        })
    }
}
</script>
