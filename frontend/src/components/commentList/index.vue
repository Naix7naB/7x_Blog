<script>
import CommentItem from './CommentItem'

import { mapActions, mapGetters } from 'vuex'

export default {
    name: 'CommentList',
    components: { CommentItem },
    props: {
        showStats: {
            type: Boolean,
            default: false
        },
        statsLabel: {
            type: String,
            default: ''
        },
        comments: {
            type: Array,
            default: () => []
        }
    },
    computed: {
        ...mapGetters('comment', ['currentReplyId']),
        totalComment() {
            return this.comments.reduce((total, comment) => {
                total += comment.reply_count + 1
                return total
            }, 0)
        }
    },
    methods: {
        ...mapActions('comment', ['setReplyId']),
        onReply(id) {
            this.setReplyId(id)
        }
    }
}
</script>

<template>
    <div>
        <div v-if="showStats" class="comment-stats">
            <span>{{ statsLabel }}</span>
            <span class="comment-stats--count">{{ totalComment }}条评论</span>
        </div>
        <ul v-if="comments && comments.length !== 0">
            <li v-for="comment in comments" :key="comment.id">
                <CommentItem
                    :top-id="comment.id"
                    :comment="comment"
                    :replying="currentReplyId === comment.id"
                    @reply="onReply"
                />
            </li>
        </ul>
    </div>
</template>

<style lang="scss" scoped>
.comment-stats {
    user-select: none;
    margin-bottom: 30px;
    line-height: $lh-medium-x;
    font-size: $fz-medium-x;
    color: #999999;
}

.comment-stats--count {
    position: relative;
    margin-left: 20px;

    &::before {
        content: '';
        position: absolute;
        top: 6px;
        left: -10px;
        width: 1px;
        height: 12px;
        background-color: rgba($color: #aaa, $alpha: .5);
        transform: scaleX(.5);
    }
}
</style>
