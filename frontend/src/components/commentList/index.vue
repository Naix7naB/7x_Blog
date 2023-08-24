<script>
import CommentItem from './CommentItem'

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
        totalComment() {
            return this.comments.reduce((total, comment, idx) => {
                return idx + comment.reply_count + 1
            }, 0)
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
                    :comment="comment"
                    :comment_id="comment.id"
                    :reviewer="comment.reviewer"
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
