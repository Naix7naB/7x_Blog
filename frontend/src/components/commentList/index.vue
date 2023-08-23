<script>
import CommentItem from './CommentItem'

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
        <li v-for="comment in comments" :key="comment.id">
            <CommentItem :comment="comment" :comment_id="comment.id" :reviewer="comment.reviewer" />
        </li>
    </ul>
</template>
