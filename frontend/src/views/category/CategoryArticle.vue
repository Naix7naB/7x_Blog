<script>
import ArticleList from '@/components/articleList'

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
    created() {
        this.$bus.$emit('setLabel', this.categoryLabel)
    }
}
</script>

<template>
    <ArticleList :filter="filter" />
</template>
