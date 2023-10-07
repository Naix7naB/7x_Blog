<script>
import ArticleList from '@/components/articleList'

import { getArticleList } from '@/apis/article'

export default {
    name: 'CategoryPage',
    components: { ArticleList },
    computed: {
        filter() {
            return {
                category: this.$route.params.cid
            }
        },
        categoryLabel() {
            return this.$route.params.name
        }
    },
    methods: {
        getArticleList,
        beforeLoad() {
            this.$bus.$emit('setLabel', this.categoryLabel)
        }
    }
}
</script>

<template>
    <div class="category-article">
        <ArticleList :requestApi="getArticleList" :filter="filter" @beforeLoad="beforeLoad" />
    </div>
</template>
