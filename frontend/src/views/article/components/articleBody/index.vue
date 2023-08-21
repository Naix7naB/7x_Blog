<script>
import Comment from '@/components/comment'
import MarkButton from '@/components/markButton'

import { formatDate } from '@/utils/util'
import { mapGetters } from 'vuex'

export default {
    name: 'ArticleBody',
    components: { ArticleComment: Comment, MarkButton },
    data() {
        return {
            viewerOption: {
                button: false,
                mavable: false,
                navbar: false
            }
        }
    },
    computed: {
        ...mapGetters('article', { info: 'getArticleInfo' })
    },
    methods: {
        formatDate
    }
}
</script>

<template>
    <div class="article-body">
        <article class="article-content">
            <div class="markdown-body" v-highlight="info.content" v-viewer="viewerOption"></div>
            <p class="article-content--updated">
                <span style="margin-right: 8px;">文章最后更新于</span>
                <span>{{ formatDate(info.updated_at) }}</span>
            </p>
            <div class="article-content--mark">
                <MarkButton type="classify">{{ info.classify.name }}</MarkButton>
                <MarkButton type="tag" v-for="tag in info.tags" :key="tag.id">
                    {{ tag.name }}
                </MarkButton>
            </div>
            <div class="article-content--copyright">
                <p>作者：{{ info.author.nickname }}</p>
                <p>版权声明：转载请注明文章出处</p>
            </div>
            <div class="article-content--like">
                <fa-icon icon="far fa-heart" size="5x" />
            </div>
        </article>
        <ArticleComment />
    </div>
</template>

<style lang="scss" scoped>
/* 文章内容样式 */
.article-body {
    min-width: 360px;
    max-width: 800px;
    margin: 0 auto;
    padding: 40px 20px;
}

.article-content > * {
    margin-bottom: 32px;
}

.article-content--updated {
    user-select: none;
    font-size: $fz-small-s;
    line-height: $lh-small-s;
}

.article-content--mark {
    text-align: right;
}

.article-content--copyright {
    user-select: none;
    margin-bottom: 54px;
    padding: 10px 20px;
    line-height: 2;
    border-left: 3px solid #03a9f4;
    border-radius: 4px;
    color: #000;
    background-color: #dfeef8;
}

.article-content--like {
    text-align: center;
}
</style>
