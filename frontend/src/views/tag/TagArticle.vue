<script>
import ArticleList from '@/components/articleList'

import { getArticleList } from '@/apis/article'

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
    methods: {
        getArticleList,
        beforeLoad() {
            this.$bus.$emit('setLabel', this.tagLabel)
        }
    }
}
</script>

<template>
    <div class="tag-article">
        <ArticleList :requestApi="getArticleList" :filter="filter" @beforeLoad="beforeLoad" />
    </div>
</template>
