<script>
import HashtagList from '@/components/hashtagList'
import ArticleList from '@/components/articleList'

import { getClassifyList } from '@/apis/classify'
import { getClassifyArticles } from '@/apis/article'

export default {
    name: 'ClassifyPage',
    components: { HashtagList, ArticleList },
    data() {
        return {
            tags: [],
            articles: [],
            pageTitle: '分类',
            showBackBtn: false,
            showArticles: false
        }
    },
    methods: {
        initList() {
            this.pageTitle = '分类'
            this.showBackBtn = false
            this.showArticles = false
            getClassifyList().then(({ data }) => {
                this.tags = data.list
            }).catch(err => {
                this.$message.error(err.errMsg)
            })
        },
        onChoose(item) {
            this.pageTitle = '#' + item.name
            getClassifyArticles({ classify_id: item.id }).then(({ data }) => {
                this.articles = data.list
                this.showBackBtn = true
                this.showArticles = true
            }).catch(err => {
                this.$message.error(err.errMsg)
            })
        }
    },
    created() {
        this.initList()
    }
}
</script>

<template>
    <div class="classify-page">
        <div class="classify-head">
            <span v-if="showBackBtn" class="classify-back" @click="initList">
                <fa-icon icon="fas fa-arrow-left" /> 返回
            </span>
            <div class="classify-title">{{ pageTitle }}</div>
        </div>
        <div class="classify-list">
            <HashtagList v-if="!showArticles" :tags="tags" @choose="onChoose" />
            <ArticleList v-else :list="articles" />
        </div>
    </div>
</template>

<style lang="scss" scoped>
/* 分类页面样式 */
.classify-page {
    max-width: 1400px;
    min-height: calc(100vh - 80px);
    margin: 80px auto 0;
    padding: 40px;
}

.classify-head {
    user-select: none;
    display: flex;
    align-items: center;
    font-size: $fz-large;
}

.classify-back {
    position: relative;
    margin-right: 24px;
    cursor: pointer;

    &::after {
        content: '';
        position: absolute;
        top: 2px;
        right: -10px;
        width: 1px;
        height: 20px;
        background-color: rgba($color: #fff, $alpha: .5);
        transform: scaleX(.5);
    }
}

.classify-title {
    font-size: 32px;
    font-weight: 700;
}

.classify-list {
    display: flex;
    justify-content: center;
    padding: 40px;
}
</style>
