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
        const { tagId, tagName } = this.$route.params
        getTagArticles({ tag_id: tagId }).then(({ data }) => {
            this.articles = data.list
            this.$bus.$emit('setLabel', tagName)
        }).catch(err => {
            this.$message.error(err.errMsg)
        })
    }
}
</script>

<template>
    <div class="tag-article">
        <ArticleList :list="articles" />
    </div>
</template>

<style lang="scss" scoped>
/* 标签文章列表样式 */
.tag-article {
    padding: 40px;
}
</style>
