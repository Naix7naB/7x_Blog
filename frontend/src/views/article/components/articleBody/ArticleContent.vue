<script>
import MarkButton from '@/components/markButton'

import { formatDate } from '@/utils/util'

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
        articleInfo() {
            return this.$store.getters.articleInfo
        }
    },
    methods: {
        formatDate
    }
}
</script>

<template>
    <div class="article-content">
        <article class="markdown-body" v-highlight="articleInfo?.content" v-viewer="viewerOption" />
        <p class="article-content--updated">
            <span>文章最后更新于</span>
            <span>{{ formatDate(articleInfo?.updated_at) }}</span>
        </p>
        <div class="article-content--mark">
            <MarkButton type="category" :item="articleInfo.category" />
            <MarkButton type="tag" v-for="tag in articleInfo?.tags" :key="tag.id" :item="tag" />
        </div>
        <div class="article-content--copyright">
            <p>作者：{{ articleInfo?.author.nickname }}</p>
            <p>版权声明：转载请注明文章出处</p>
        </div>
        <div class="article-content--like">
            <fa-icon icon="far fa-heart" size="5x" />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.article-content > * {
    margin-bottom: 32px;
}

.article-content--updated {
    @include text-color(text-muted);
    font-size: $fz-xs;
    border-left: 2px solid $cl-lightgreen;
    transition: color .3s ease-in-out;
}

.article-content--updated > span {
    padding-left: 8px;
}

.article-content--mark {
    text-align: right;
}

.article-content--copyright {
    margin-bottom: 54px;
    padding: 10px 20px;
    line-height: $lh-2x;
    border-radius: 4px;
    border-left: 3px solid $cl-lightblue;
    color: $cl-dark-7;
    background-color: rgb(223, 238, 248);
}

.article-content--like {
    text-align: center;
}
</style>
