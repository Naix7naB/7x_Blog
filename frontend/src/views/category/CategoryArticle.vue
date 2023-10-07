<script>
import ArticleList from '@/components/articleList'

import { getCategoryArticles } from '@/apis/article'

export default {
    name: 'CategoryPage',
    components: { ArticleList },
    data() {
        return {
            articles: []
        }
    },
    created() {
        const { cid, name } = this.$route.params
        this.$store.dispatch('setting/setLoadingState', true)
        getCategoryArticles({ category_id: cid }).then(({ data }) => {
            this.articles = data.list
            this.$bus.$emit('setLabel', name)
            this.$store.dispatch('setting/setLoadingState', false)
        }).catch(err => {
            this.$message.error(err.errMsg || err)
        })
    }
}
</script>

<template>
    <div class="category-article">
        <ArticleList :list="articles" />
    </div>
</template>
