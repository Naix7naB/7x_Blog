<script>
import EmojiPicker from '@/components/emojiPicker'

export default {
    name: 'CommentEditor',
    components: { EmojiPicker },
    props: {
        autosize: {
            type: [Boolean, Object],
            default: false
        },
        maxLenth: {
            type: Number,
            default: 500
        },
        showCancelBtn: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            visible: true,
            comment: ''
        }
    },
    methods: {
        insert(emoji) {
            this.comment += emoji
        },
        clear() {
            this.comment = ''
        },
        submit() {
            this.$emit('post', this.comment)
            this.clear()
        },
        show() {
            if (this.visible) return false
            this.visible = true
        },
        hide() {
            if (!this.visible) return false
            this.visible = false
            this.clear()
        }
    }
}
</script>

<template>
    <div v-if="visible">
        <el-input
            v-model="comment"
            type="textarea"
            placeholder="些下点什么..."
            resize="none"
            :autosize="autosize"
            :maxlength="maxLenth"
        />
        <div class="comment-editor--action">
            <div class="editor-action--start">
                <emoji-picker @insert="insert" />
                <span class="editor-action--image"><fa-icon icon="far fa-image" /></span>
            </div>
            <div class="editor-action--end">
                <el-button v-if="showCancelBtn" type="plain" size="small" @click="hide">
                    取消
                </el-button>
                <el-button type="primary" size="small" :disabled="!comment" @click="submit">
                    发表
                </el-button>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
/* 样式穿透 hook ElementUI 样式 */
:deep(.el-textarea__inner) {
    padding: 16px;
}

/* 评论输入框样式 */
.comment-editor--action {
    display: flex;
    justify-content: space-between;
    margin: 10px 0;
}

.editor-action--start {
    display: flex;
    align-items: flex-start;
    font-size: $fz-medium-x;
}

.editor-action--image {
    margin-left: 10px;
    transition: transform .2s;
    cursor: pointer;

    &:hover {
        transform: scale(1.1);
    }
}
</style>
