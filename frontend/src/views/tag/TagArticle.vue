<script>
import ArticleList from '@/components/articleList'

export default {
    name: 'TagArticle',
    components: { ArticleList },
    computed: {
        filter() {
            return {
                tags: {
                    $in: [this.$route.params.tid]
                }
            }
        },
        tagLabel() {
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
