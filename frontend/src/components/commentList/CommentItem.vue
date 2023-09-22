<script>
import CommentEditor from '@/components/commentEditor'

import { leaveComment } from '@/apis/comment'
import { formatDate } from '@/utils/util'
import { mapGetters } from 'vuex'

export default {
    name: 'CommentItem',
    components: { CommentEditor },
    inject: ['topic'],
    props: {
        topId: {
            type: String,
            required: true
        },
        comment: {
            type: Object,
            required: true
        },
        replying: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        ...mapGetters('site', ['getSiteInfo']),
        ...mapGetters('comment', ['currentReplyId']),
        isHost() {
            return uid => {
                return uid === this.getSiteInfo.host.id
            }
        }
    },
    methods: {
        formatDate,
        onReply() {
            this.$emit('reply', this.comment.id)
        },
        onReplyReply(id) {
            this.$emit('reply', id)
        },
        cancelReply() {
            this.$emit('reply', '')
        },
        postReply(reply) {
            leaveComment({
                topic_type: this.topic.type,
                topic_title: this.topic.title,
                topic_id: this.topic.id,
                mention: this.comment.reviewer.id,
                comment_id: this.topId,
                reply_id: this.comment.id,
                content: reply
            }).then(res => {
                this.$message.success(res.errMsg)
                this.$bus.$emit('refreshComments')
                this.$emit('reply', '')
            }).catch(err => {
                this.$message.error(err.errMsg || err)
            })
        }
    }
}
</script>

<template>
    <div class="comment-info--wrapper">
        <el-avatar :src="comment.reviewer.avatar" />
        <div ref="commentRef" class="comment-info">
            <div class="comment-info--head">
                <span
                    v-text="comment.reviewer.nickname"
                    class="comment-info--name"
                    :data-host="isHost(comment.reviewer.id)"
                    :data-uid="comment.reviewer.id"
                />
                <span class="comment-info--date">{{ formatDate(comment.created_at) }}</span>
                <span class="comment-action--reply" @click="onReply">回复</span>
            </div>
            <div class="comment-info--body">
                <span
                    v-if="comment.mention && comment.reply_id !== topId"
                    class="comment-info--metion"
                    :data-mention="comment.mention.nickname"
                />
                <span class="comment-info--content">{{ comment.content }}</span>
            </div>
            <CommentEditor
                v-if="replying"
                :replyId="comment.id"
                @cancel="cancelReply"
                @post="postReply"
            />
            <ul v-if="comment.replies && comment.replies.length !== 0">
                <li v-for="reply in comment.replies" :key="reply.id">
                    <CommentItem
                        :topId="comment.id"
                        :comment="reply"
                        :replying="currentReplyId === reply.id"
                        @reply="onReplyReply"
                    />
                </li>
            </ul>
        </div>
    </div>
</template>

<style lang="scss" scoped>
/* 样式穿透 hook ElementUI 样式 */
:deep(.el-avatar) {
    margin-right: 12px;
}

/* 评论内容样式 */
.comment-info--wrapper {
    display: flex;
}

.comment-info {
    flex: 1;
    position: relative;
}

.comment-info--head {
    user-select: none;
    line-height: $lh-small-s;
}

.comment-info--name {
    font-size: $fz-medium;
    font-weight: 700;
    color: #f29141;

    &[data-host=true]::after {
        content: '博主';
        margin-left: 6px;
        padding: 0 4px;
        font-size: $fz-small-s;
        font-weight: 400;
        color: #67c23a;
        border: 1px solid #67c23a;
        border-radius: 4px;
        vertical-align: 1px;
    }
}

.comment-action--reply {
    float: right;
    padding: 0 6px;
    border-radius: 3px;
    font-size: $fz-small;
    color: #e1e1e1;
    background-color: #1363bfe6;
    transition: background-color .2s;
    cursor: pointer;

    &:hover {
        background-color: #2f7ad0e6;
    }
}

.comment-info--date {
    margin-left: 12px;
    font-size: $fz-small-s;
    color: #999999;
}

.comment-info--body {
    position: relative;
    margin: 16px 0 20px;
    padding: 20px;
    line-height: $lh-small-s;
    border-radius: 8px;
    word-break: break-word;
    color: #000000;
    background-color: #d4d4d4;

    &:hover .comment-info--reply {
        opacity: 1;
    }
}

.comment-info--metion {
    user-select: none;
    margin-right: 6px;
    color: #1f7ce7eb;

    &::before {
        content: '@' attr(data-mention) ':';
    }
}
</style>
