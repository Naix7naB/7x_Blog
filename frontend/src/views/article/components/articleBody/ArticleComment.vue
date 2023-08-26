<script>
import CommentEditor from '@/components/commentEditor'
import CommentList from '@/components/commentList'

import { getArticleComments, leaveComment } from '@/apis/comment'
import { mapGetters } from 'vuex'

export default {
    name: 'ArticleComment',
    components: { CommentEditor, CommentList },
    data() {
        return {
            comments: []
        }
    },
    computed: {
        ...mapGetters('article', { info: 'getArticleInfo' })
    },
    methods: {
        async getComments() {
            try {
                const { data } = await getArticleComments({ aid: this.info.id })
                this.comments = data.list
            } catch (err) {
                this.$message.error(err || err.errMsg)
            }
        },
        postComment(comment) {
            leaveComment({
                topic_type: 'article_comment',
                topic_id: this.info.id,
                content: comment
            }).then(res => {
                this.$message.success(res.errMsg)
                this.getComments()
            }).catch(err => {
                this.$message.error(err.errMsg)
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
        <CommentEditor title="评论" :autosize="{ minRows: 7, maxRows: 10 }" @post="postComment" />
        <CommentList statsLabel="Comments" :showStats="true" :comments="comments" />
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
