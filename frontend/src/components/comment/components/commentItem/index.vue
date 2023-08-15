<script>
import CommentEditor from '../commentEditor'
import { formatDate } from '@/utils/util'
import { mapGetters } from 'vuex'

export default {
    name: 'CommentItem',
    components: { CommentEditor },
    props: {
        comment: {
            type: Object,
            required: true
        },
        reviewer: {
            type: Object,
            default: () => {}
        }
    },
    computed: {
        ...mapGetters(['getWebsiteInfo']),
        isHost() {
            return uid => {
                return uid === this.getWebsiteInfo.host.id
            }
        }
    },
    methods: {
        formatDate,
        showEditor() {
            this.$refs.reply.show()
        }
    }
}
</script>

<template>
    <li>
        <div class="comment-info--wrapper">
            <el-avatar :src="comment.reviewer.avatar" />
            <div class="comment-info">
                <div class="comment-info--head">
                    <span
                        v-text="comment.reviewer.nickname"
                        class="comment-info--name"
                        :data-host="isHost(comment.reviewer.id)"
                        :data-uid="comment.reviewer.id"
                    />
                    <span class="comment-info--date">{{formatDate(comment.created_at)}}</span>
                </div>
                <div class="comment-info--body">
                    <span
                        v-if="comment.mention && comment.mention.id !== reviewer.id"
                        class="comment-info--metion"
                        :data-mention="comment.mention.nickname"
                    />
                    <span class="comment-info--content">{{comment.content}}</span>
                    <span class="comment-info--reply" @click="showEditor">回复</span>
                </div>
                <ul v-if="comment.replies && comment.replies.length !== 0">
                    <CommentItem
                        v-for="reply in comment.replies"
                        :key="reply.id"
                        :comment="reply"
                        :reviewer="comment.reviewer"
                    />
                </ul>
                <transition>
                    <CommentEditor
                        ref="reply"
                        comment-type="reply"
                        :autosize="{ minRows: 1, maxRows: 3 }"
                    />
                </transition>
            </div>
        </div>
    </li>
</template>

<style lang="scss" scoped>
.comment-info--wrapper {
    display: flex;
}

.comment-info {
    flex: 1;
    padding-left: 12px;
}

.comment-info--head {
    user-select: none;
    line-height: $lh-small-s;
}

.comment-info--name {
    font-size: $fz-medium;
    font-weight: 700;
    color: #f29141;
}

[data-host=true] {
    &::after {
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

.comment-info--date {
    margin-left: 12px;
    font-size: $fz-small-s;
    color: #999999;
}

.comment-info--body {
    position: relative;
    margin: 16px 0 24px 0;
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
    font-weight: 700;
    color: #1f7ce7eb;

    &::before {
        content: '@' attr(data-mention) ':';
    }
}

.comment-info--reply {
    opacity: 0;
    position: absolute;
    top: 20px;
    right: 20px;
    padding: 0 6px;
    border-radius: 4px;
    border: 1px solid #1f7ce7eb;
    color: #1f7ce7eb;
    font-size: $fz-small;
    cursor: pointer;
    transition: all .2s;

    &:hover {
        color: #e1e1e1;
        background-color: #1f7ce7eb;
    }
}
</style>
