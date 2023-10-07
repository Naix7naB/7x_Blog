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
    @include bg-color(bg-highlight);
    @include shadow-color(shadow, .8);
    width: 80%;
    margin: 40px auto;
    padding: 40px;
    min-width: 360px;
    max-width: 920px;
    border-radius: .5em;
    transition: background-color .3s ease-in-out, box-shadow .3s ease-in-out;
}
</style>
