<script>
import MarkButton from '@/components/markButton'

import { formatDate } from '@/utils/util'
import { mapGetters } from 'vuex'

export default {
    name: 'ArticleContent',
    components: { MarkButton },
    data() {
        return {
            viewerOption: {
                fullscreen: false,
                navbar: false,
                title: false,
                tooltip: false,
                toolbar: {
                    prev: true,
                    zoomIn: true,
                    zoomOut: true,
                    reset: true,
                    rotateLeft: true,
                    rotateRight: true,
                    next: true
                }
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
    <article class="article-content">
        <div class="markdown-body" v-highlight="info.content" v-viewer="viewerOption"></div>
        <p class="article-content--updated">
            <span>文章最后更新于</span>
            <span>{{ formatDate(info.updated_at) }}</span>
        </p>
        <div class="article-content--mark">
            <MarkButton type="category" :item="info.category" />
            <MarkButton type="tag" v-for="tag in info.tags" :key="tag.id" :item="tag" />
        </div>
        <div class="article-content--copyright">
            <p>作者：{{ info.author.nickname }}</p>
            <p>版权声明：转载请注明文章出处</p>
        </div>
        <div class="article-content--like">
            <fa-icon icon="far fa-heart" size="5x" />
        </div>
    </article>
</template>

<style lang="scss" scoped>
.article-content > * {
    margin-bottom: 32px;
}

.article-content--updated {
    user-select: none;
    font-size: $fz-small-s;
    border-left: 2px solid #2e8458;
}

.article-content--updated > span {
    padding-left: 8px;
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
