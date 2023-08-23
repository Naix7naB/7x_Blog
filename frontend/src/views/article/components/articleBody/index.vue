<script>
import ArticleContent from './ArticleContent'
import ArticleComment from './ArticleComment'

export default {
    name: 'ArticleBody',
    components: { ArticleContent, ArticleComment }
}
</script>

<template>
    <div class="article-body">
        <ArticleContent />
        <ArticleComment />
    </div>
</template>

<style lang="scss" scoped>
/* 文章样式 */
.article-body {
    min-width: 360px;
    max-width: 800px;
    margin: 0 auto;
    padding: 40px 20px;
}
</style>
