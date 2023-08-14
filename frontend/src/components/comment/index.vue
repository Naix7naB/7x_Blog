<script>
import CommentEditor from './components/commentEditor'
import CommentList from './components/commentList'

import { getArticleComments } from '@/apis/comment'
import { mapGetters } from 'vuex'

export default {
    name: 'Comment',
    components: { CommentEditor, CommentList },
    data() {
        return {
            comments: []
        }
    },
    computed: {
        ...mapGetters('article', ['getArticleInfo'])
    },
    methods: {
        onSubmit(comment) {
            if (this.postMethod && typeof this.postMethod === 'function') {
                this.postMethod(comment)
            }
        }
    },
    created() {
        getArticleComments(this.getArticleInfo.aid).then(({ data }) => {
            this.comments = data.list
        }).catch(err => this.$message.error(err.errMsg))
    }
}
</script>

<template>
    <div class="comment-container">
        <div class="comment-editor--wrapper">
            <div class="comment-editor--title">
                <fa-icon icon="fas fa-pen-to-square" />&nbsp;留言
            </div>
            <CommentEditor />
        </div>
        <div class="comment-list--wrapper">
            <div class="comment-list--stats">
                <span>Comments | </span>
                <span>{{getArticleInfo.comment_num}}条评论</span>
            </div>
            <CommentList :comments="comments" />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.comment-container {
    overflow: hidden;
}

.comment-editor--wrapper {
    margin: 40px 0;
}

.comment-editor--title {
    margin-bottom: 20px;
    font-size: $fz-large;
    font-weight: 700;
}

.comment-list--stats {
    user-select: none;
    margin-bottom: 30px;
    font-size: $fz-medium-x;
    color: #999999;
}
</style>
