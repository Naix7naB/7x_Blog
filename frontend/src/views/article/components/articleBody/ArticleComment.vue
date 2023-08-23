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
        handlePost(comment) {
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
        <div class="article-comment--editor">
            <div class="comment-editor--title"><fa-icon icon="fas fa-pen-to-square" /> 评论</div>
            <CommentEditor :autosize="{ minRows: 7, maxRows: 10 }" @post="handlePost" />
        </div>
        <div>
            <div class="comment-stats">
                <span>Comments</span>
                <span class="comment-stats--count">{{ comments.length }}条评论</span>
            </div>
            <CommentList :comments="comments" />
        </div>
    </div>
</template>

<style lang="scss" scoped>
/* 文章评论样式 */
.article-comment {
    overflow: hidden;
}

.article-comment--editor {
    margin: 40px 0;
}

.comment-editor--title {
    user-select: none;
    margin-bottom: 20px;
    font-size: $fz-large;
    font-weight: 700;
}

.comment-stats {
    user-select: none;
    margin-bottom: 30px;
    line-height: $lh-medium-x;
    font-size: $fz-medium-x;
    color: #999999;
}

.comment-stats--count {
    position: relative;
    margin-left: 16px;

    &::before {
        content: '';
        position: absolute;
        top: 4px;
        left: -8px;
        width: 1px;
        height: 16px;
        background-color: #999999;
        transform: scaleX(.5);
    }
}
</style>
