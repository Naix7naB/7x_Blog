<script>
import ArticleList from '@/components/articleList'

import { getTagArticles } from '@/apis/article'

export default {
    name: 'TagArticle',
    components: { ArticleList },
    data() {
        return {
            articles: []
        }
    },
    created() {
        const { tid, name } = this.$route.params
        getTagArticles({ tag_id: tid }).then(({ data }) => {
            this.articles = data.list
            this.$bus.$emit('setLabel', name)
        }).catch(err => {
            this.$message.error(err.errMsg || err)
        })
    }
}
</script>

<template>
    <div class="tag-article">
        <ArticleList :list="articles" />
    </div>
</template>
