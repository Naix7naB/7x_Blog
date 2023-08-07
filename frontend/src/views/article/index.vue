<script>
import VueMarkdown from 'vue-markdown'
import { formatDate, resolveUrl } from '@/utils/util'
import { mapGetters } from 'vuex'

import 'github-markdown-css/github-markdown-dark.css'
import 'highlight.js/styles/atom-one-dark.css'
import '@/assets/scss/highlight.scss'

export default {
    components: { VueMarkdown },
    data() {
        return {}
    },
    computed: {
        ...mapGetters('article', ['getArticleInfo'])
    },
    methods: {
        formatDate,
        resolveUrl,
        postrender(html) {
            return html.replace(/<pre>/gi, '<pre class="code-wrapper">').replace(/<code.+>/gi, '<code>')
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
        <article class="article-content markdown-body">
            <vue-markdown
                v-highlight
                :source="getArticleInfo.content"
                :html="false"
                :postrender="postrender"
            />
        </article>
    </div>
</template>

<style lang="scss" scoped>
/* 样式穿透 hook ElementUI 样式 */
:deep(.el-image) {
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
    position: absolute;
    left: 20%;
    bottom: 10px;
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

.article-content {
    min-width: 360px;
    max-width: 800px;
    margin: 0 auto;
    padding: 40px 20px;
    background-color: #24272d;
}
</style>
