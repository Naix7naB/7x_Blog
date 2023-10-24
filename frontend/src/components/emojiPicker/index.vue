<script>
import { Picker as EmojiMartPicker, EmojiIndex } from 'emoji-mart-vue-fast'

import { getEmojiJsonData } from '@/apis/other'
import { emojiType, i18n } from '@/config/emoji.config'
import { isEmpty } from 'lodash-es'

export default {
    name: 'EmojiPicker',
    components: { EmojiMartPicker },
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
    data() {
        return {
            emojiData: {},
            emojiType: emojiType,
            emojiI18n: i18n
        }
    },
    computed: {
        existData() {
            return !isEmpty(this.emojiData)
        }
    },
    methods: {
        /* 加载外部的json文件 */
        async loadExternalEmojiJson() {
            try {
                let emojiJson = this.$store.getters.emojiJson
                if (!emojiJson) {
                    const { data } = await getEmojiJsonData(this.emojiType)
                    this.$store.dispatch('setting/setEmojiJson', data)
                    emojiJson = data
                }
                this.emojiData = new EmojiIndex(emojiJson)
            } catch (err) {
                this.$message.error('获取表情包失败')
            }
        },
        /* 选中表情 */
        onSelectEmoji(emoji) {
            this.$emit('emoji', emoji.native)
        }
    },
    created() {
        this.loadExternalEmojiJson()
    }
}
</script>

<template>
    <div
        class="emoji-picker--wrapper"
        v-loading="$store.getters.isLoading"
        element-loading-text="拼命加载中"
        element-loading-background="transparent"
    >
        <emoji-mart-picker
            v-if="existData"
            :set="emojiType"
            :data="emojiData"
            :i18n="emojiI18n"
            :emojiTooltip="true"
            :pickerStyles="pickerStyle"
            :showCategories="showCategory"
            :showSearch="showSearch"
            :showSkinTones="false"
            :showPreview="false"
            @select="onSelectEmoji"
        />
    </div>
</template>

<style lang="scss" scoped>
.emoji-picker--wrapper {
    min-height: 200px;
}
</style>
