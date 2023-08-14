<script>
import { formatDate } from '@/utils/util'

export default {
    name: 'CommentItem',
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
    methods: {
        formatDate
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
                        :class="['comment-info--name', { master: true }]"
                    />
                    <span class="comment-info--date">{{formatDate(comment.date)}}</span>
                </div>
                <div class="comment-info--body">
                    <span
                        v-if="comment.mention && comment.mention.id !== reviewer.id"
                        class="comment-info--metion"
                        :data-mention="comment.mention.nickname"
                    />
                    <span class="comment-info--content">{{comment.content}}</span>
                </div>
                <ul v-if="comment.replies && comment.replies.length !== 0">
                    <CommentItem
                        v-for="reply in comment.replies"
                        :key="reply.id"
                        :comment="reply"
                        :reviewer="comment.reviewer"
                    />
                </ul>
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

.comment-info--name.master {
    &::after {
        content: '博主';
        margin-left: 6px;
        padding: 1px 4px;
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
    margin: 16px 0 24px 0;
    padding: 20px;
    border-radius: 8px;
    word-break: break-word;
    color: #000000;
    background-color: #D4D4D4;
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
</style>
