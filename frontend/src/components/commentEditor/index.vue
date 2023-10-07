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
            comment: '',
            showEmoji: false,
            showUpload: false
        }
    },
    computed: {
        pickerStyle() {
            return {
                width: '100%',
                height: '200px',
                marginBottom: '20px'
            }
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
        },
        toggleEmojiShowing() {
            this.showEmoji = !this.showEmoji
        },
        toggleUploadShowing() {
            this.$message.warning('此功能暂未开放')
            this.showUpload = !this.showUpload
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
                <span class="action-button" @click="toggleEmojiShowing">
                    <fa-icon icon="far fa-face-laugh" />
                </span>
                <span class="action-button" @click="toggleUploadShowing">
                    <fa-icon icon="far fa-image" />
                </span>
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
        <EmojiPicker
            v-if="showEmoji"
            :showCategory="false"
            :showSearch="false"
            :pickerStyle="pickerStyle"
            @emoji="insert"
        />
    </div>
</template>

<style lang="scss" scoped>
/* 样式穿透 hook ElementUI 样式 */
:deep(.el-textarea__inner) {
    padding: 16px;

    &:focus {
        border-color: $cl-name;
    }
}

/* 评论输入框样式 */
.comment-editor--title {
    @include text-color(text-primary, .8);
    margin-bottom: 20px;
    font-size: $fz-large;
    font-weight: 700;
    transition: color .3s ease-in-out;
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

.action-button {
    @include text-color(text-primary, .8);
    transition: color .3s ease-in-out, transform .2s ease;
    cursor: pointer;

    &:hover {
        transform: scale(1.1);
    }

    &:not(:first-of-type) {
        margin-left: 10px;
    }
}
</style>
