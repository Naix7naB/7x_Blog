<script>
import Comment from '@/components/comment'

import { postComment } from '@/apis/comment'
import { formatDate, resolveUrl } from '@/utils/util'
import { mapGetters } from 'vuex'

export default {
    components: { Comment },
    provide() {
        return {
            submitEvent: this.submitComment
        }
    },
    computed: {
        ...mapGetters('article', ['getArticleInfo'])
    },
    methods: {
        formatDate,
        resolveUrl,
        submitComment(comment) {
            postComment({ aid: this.getArticleInfo.aid, content: comment })
                .then(() => this.$message.success('发布评论'))
                .catch(err => this.$message.error(err.errMsg))
        }
    }
}
</script>

<template>
    <div class="article-container" v-if="getArticleInfo">
        <div class="article-head">
            <el-image fit="cover" :src="resolveUrl(getArticleInfo.cover_img)" />
            <div class="article-head--meta">
                <h3 class="article-meta--title">{{getArticleInfo.title}}</h3>
                <div>
                    <fa-icon icon="fas fa-user" />
                    <span class="article-meta--num">{{getArticleInfo.author.nickname}}</span>
                    &nbsp;
                    <fa-icon icon="fas fa-calendar-days" />
                    <span class="article-meta--num">{{formatDate(getArticleInfo.created_at)}}</span>
                    &nbsp;
                    <fa-icon icon="fas fa-fire" />
                    <span class="article-meta--num">{{getArticleInfo.view_num}}</span>
                    &nbsp;
                    <fa-icon icon="fas fa-comment" />
                    <span class="article-meta--num">{{getArticleInfo.comment_num}}</span>
                    &nbsp;
                    <fa-icon icon="fas fa-heart" />
                    <span class="article-meta--num">{{getArticleInfo.like_num}}</span>
                </div>
            </div>
        </div>
        <div class="article-body">
            <article>
                <div class="markdown-body" v-highlight="getArticleInfo.content"></div>
                <p class="article-time--update">
                    文章最后更新于&nbsp;{{formatDate(getArticleInfo.updated_at)}}
                </p>
                <div class="article-tag--wrapper">tags</div>
            </article>
            <Comment />
        </div>
    </div>
</template>

<style lang="scss" scoped>
/* 样式穿透 hook ElementUI 样式 */
:deep(.el-image) {
    @include layer-mask();
    display: block;
    height: 100%;
}

:deep(.el-image img) {
    object-position: top;
}

/* 文章详情页面样式 */
.article-head {
    position: relative;
    height: 40vh;
}

.article-head--meta {
    user-select: none;
    position: absolute;
    left: 20%;
    bottom: 20px;
    color: #ffffff;
}

.article-meta--title {
    margin-bottom: 16px;
    font-size: 32px;
    font-weight: 700;
}

.article-meta--num {
    margin-left: 4px;
}

.article-body {
    min-width: 360px;
    max-width: 800px;
    margin: 0 auto;
    padding: 40px 20px;
}

.article-time--update {
    user-select: none;
    margin: 20px 0;
    font-size: $fz-small-s;
}
</style>
