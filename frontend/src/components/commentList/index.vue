<script>
import CommentItem from './CommentItem'

export default {
    name: 'CommentList',
    components: { CommentItem },
    props: {
        stats: {
            type: Object,
            default: () => null
        },
        comments: {
            type: Array,
            default: () => []
        }
    },
    computed: {
        currentReplyId() {
            return this.$store.getters.replyId
        }
    },
    methods: {
        onReply(id) {
            this.$store.dispatch('comment/setReplyId', id)
        }
    }
}
</script>

<template>
    <div>
        <div v-if="stats" class="comment-stats">
            <span>{{ stats.label }}</span>
            <span class="comment-stats--count">{{ stats.total }}条评论</span>
        </div>
        <ul v-if="comments && comments.length !== 0">
            <li v-for="comment in comments" :key="comment.id">
                <CommentItem
                    :topId="comment.id"
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
    @include text-color(text-muted);
    margin-bottom: 30px;
    line-height: $lh-xm;
    font-size: $fz-xm;
    transition: color .3s ease-in-out;
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
        background-color: rgba($color: $cl-gray-1, $alpha: .5);
        transform: scaleX(.5);
    }
}
</style>
