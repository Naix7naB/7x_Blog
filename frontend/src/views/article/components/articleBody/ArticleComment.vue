<script>
import CommentEditor from '@/components/commentEditor'
import CommentList from '@/components/commentList'

import { getCommentList, leaveComment } from '@/apis/comment'

export default {
    name: 'ArticleComment',
    components: { CommentEditor, CommentList },
    provide() {
        return {
            topic: this.topic
        }
    },
    data() {
        return {
            comments: []
        }
    },
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
        async getComments() {
            try {
                const { data } = await getCommentList({
                    topic_type: this.topic.type,
                    topic_id: this.topic.id
                })
                this.comments = data.list
            } catch (err) {
                this.$message.error(err.errMsg || err)
            }
        },
        postComment(comment) {
            leaveComment({
                topic_type: this.topic.type,
                topic_title: this.topic.title,
                topic_id: this.topic.id,
                content: comment
            }).then(res => {
                this.$message.success(res.errMsg)
                this.getComments()
            }).catch(err => {
                this.$message.error(err.errMsg || err)
            })
        }
    },
    created() {
        this.getComments()
        this.$bus.$on('refreshComments', this.getComments)
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
        <CommentList :stats="stats" :comments="comments" />
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
