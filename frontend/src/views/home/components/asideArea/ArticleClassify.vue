<script>
export default {
    data() {
        return {}
    }
}
</script>

<template>
    <div class="article-classify">
        <div class="article-classify--label"><fa-icon icon="far fa-folder-open" /> 文章分类</div>
        <ul>
            <li class="article-classify-item"><fa-icon icon="fas fa-angle-right" /> 生活</li>
            <li class="article-classify-item"><fa-icon icon="fas fa-angle-right" /> 学习</li>
            <li class="article-classify-item"><fa-icon icon="fas fa-angle-right" /> 笔记</li>
            <li class="article-classify-item"><fa-icon icon="fas fa-angle-right" /> 影评</li>
        </ul>
    </div>
</template>

<style lang="scss" scoped>
/* 文章分类卡片样式 */
.article-classify--label {
    margin-bottom: 20px;
    font-size: $fz-medium-x;
}

.article-classify-item {
    line-height: $lh-large-x;
    padding: 0 20px;
    border-radius: 1rem;
    transition: background-color .3s ease;
    cursor: pointer;

    &:not(:first-of-type) {
        margin-top: 6px;
    }

    &:hover {
        background-color: rgb(173, 121, 24);
    }
}
</style>
