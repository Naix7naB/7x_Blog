<script>
import ArticleList from '@/components/articleList'

import { getClassifyArticles } from '@/apis/article'

export default {
    name: 'ClassifyPage',
    components: {  ArticleList },
    data() {
        return {
            articles: []
        }
    },
    created() {
        const { cid, name } = this.$route.params
        getClassifyArticles({ classify_id: cid }).then(({ data }) => {
            this.articles = data.list
            this.$bus.$emit('setLabel', name)
        }).catch(err => {
            this.$message.error(err.errMsg || err)
        })
    }
}
</script>

<template>
    <div class="classify-article">
        <ArticleList :list="articles" />
    </div>
</template>

<style lang="scss" scoped>
/* 分类文章列表样式 */
</style>
