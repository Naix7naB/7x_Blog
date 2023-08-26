<script>
import EmojiPicker from '@/components/emojiPicker'

export default {
    name: 'CommentEditor',
    components: { EmojiPicker },
    props: {
        title: {
            type: String,
            default: ''
        },
        replyId: {
            type: String,
            default: ''
        },
        autosize: {
            type: Object,
            default: () => {
                return {
                    minRows: 1,
                    maxRows: 5
                }
            }
        },
        maxLenth: {
            type: Number,
            default: 500
        }
    },
    data() {
        return {
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
        cancel() {
            this.$emit('cancel')
            this.clear()
        },
        submit() {
            this.$emit('post', this.comment)
            this.clear()
        }
    }
}
</script>

<template>
    <div>
        <div v-if="title" class="comment-editor--title">
            <fa-icon icon="fas fa-pen-to-square" /> {{ title }}
        </div>
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
                <el-button v-if="!!replyId" type="plain" size="small" @click="cancel">
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
.comment-editor--title {
    user-select: none;
    margin-bottom: 20px;
    font-size: $fz-large;
    font-weight: 700;
}

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
