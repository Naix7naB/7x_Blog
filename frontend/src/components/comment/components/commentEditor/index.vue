<script>
import EmojiPicker from '@/components/emojiPicker'

export default {
    name: 'CommentEditor',
    components: { EmojiPicker },
    inject: ['submitEvent'],
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
        submit() {
            this.submitEvent(this.comment)
            this.clear()
        }
    }
}
</script>

<template>
    <div>
        <el-input
            v-model="comment"
            type="textarea"
            placeholder="些下点什么..."
            resize="vertical"
            :maxlength="500"
            :rows="7"
        />
        <div class="comment-editor--action">
            <div class="editor-action--start">
                <emoji-picker @insert="insert" />
                <span class="editor-action--image"><fa-icon icon="far fa-image" /></span>
            </div>
            <div class="editor-action--end">
                <el-button size="small" @click="submit" :disabled="!comment">发表</el-button>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
:deep(.el-textarea__inner) {
    padding: 16px;
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
