<script>
import CommentEditor from '@/components/commentEditor'
import CommentList from '@/components/commentList'

import { leaveComment } from '@/apis/comment'

export default {
    name: 'ArticleComment',
    components: { CommentEditor, CommentList },
    computed: {
        articleInfo() {
            return this.$store.getters.articleInfo
        },
        stats() {
            return {
                label: 'Comment',
                total: this.articleInfo.comment_count
            }
        },
        topic() {
            return {
                type: 'article',
                title: this.articleInfo.title,
                id: this.articleInfo.id
            }
        }
    },
    methods: {
        postComment(comment) {
            leaveComment({
                topic_type: this.topic.type,
                topic_title: this.topic.title,
                topic_id: this.topic.id,
                content: comment
            }).then(res => {
                this.$message.success(res.errMsg)
                this.$refs.commentList.refresh()
            }).catch(err => {
                this.$message.error(err.errMsg || err)
            })
        }
    }
}
</script>

<template>
    <div class="article-comment">
        <CommentEditor
            title="评论"
            :type="topic.type"
            :autosize="{ minRows: 7, maxRows: 10 }"
            @post="postComment"
        />
        <CommentList ref="commentList" :topic="topic" :stats="stats" />
    </div>
</template>

<style lang="scss" scoped>
/* 文章评论样式 */
.article-comment {
    padding: 40px 0;

    & > div:not(:first-of-type) {
        margin-top: 40px;
    }
}
</style>
