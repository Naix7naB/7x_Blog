<script>
import CommentItem from '../commentItem'

export default {
    name: 'CommentList',
    components: { CommentItem },
    props: {
        comments: {
            type: Array,
            default: () => []
        }
    }
}
</script>

<template>
    <ul v-if="comments && comments.length !== 0">
        <CommentItem
            v-for="comment in comments"
            :key="comment.id"
            :comment="comment"
            :reviewer="comment.reviewer"
        />
    </ul>
</template>
