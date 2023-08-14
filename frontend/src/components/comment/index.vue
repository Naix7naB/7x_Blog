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
            comments: [],
            spin: false
        }
    },
    computed: {
        ...mapGetters('article', ['getArticleInfo']),
        refreshBtnStyle() {
            return {
                '--fa-animation-duration': '.7s',
                '--fa-animation-iteration-count': 1,
                '--fa-animation-timing': 'cubic-bezier(0,.15,.38,1.35)'
            }
        }
    },
    methods: {
        getCommentList(cb) {
            getArticleComments(this.getArticleInfo.aid).then(({ data }) => {
                this.comments = data.list
                if (cb && typeof cb === 'function') {
                    cb()
                }
            }).catch(err => {
                this.$message.error(err.errMsg)
            })
        },
        refresh() {
            if (this.spin) return false
            this.spin = true
            setTimeout(() => {
                this.spin = false
                this.getCommentList(() => {
                    this.$message.success('刷新评论')
                })
            }, 1000)
        },
        onSubmit(comment) {
            if (this.postMethod && typeof this.postMethod === 'function') {
                this.postMethod(comment)
            }
        }
    },
    created() {
        this.getCommentList()
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
                <span>Comments</span>
                <span class="comment-stats--count">{{comments.length}}条评论</span>
                <span class="comment-stats--refresh" @click="refresh">
                    <fa-icon
                        :icon="['fas', 'rotate-right']"
                        :spin="spin"
                        :style="refreshBtnStyle"
                    />
                </span>
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

.comment-stats--refresh {
    float: right;
    cursor: pointer;
}
</style>
