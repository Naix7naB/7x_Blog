<script>
import { formatDate } from '@/utils/util'

export default {
    name: 'ArticleHead',
    computed: {
        articleInfo() {
            return this.$store.getters.articleInfo
        }
    },
    methods: {
        formatDate
    }
}
</script>

<template>
    <div class="article-head">
        <el-image class="is-background" fit="cover" :src="articleInfo?.cover_img" lazy />
        <div class="article-head--meta">
            <h3 class="article-meta--title">{{ articleInfo?.title }}</h3>
            <div class="article-meta--content">
                <div class="article-meta--item">
                    <fa-icon icon="fas fa-user" />
                    <span class="article-meta--num">{{ articleInfo?.author.nickname }}</span>
                </div>
                <div class="article-meta--item">
                    <fa-icon icon="fas fa-calendar-days" />
                    <span class="article-meta--num">{{ formatDate(articleInfo?.created_at) }}</span>
                </div>
                <div class="article-meta--item">
                    <fa-icon icon="fas fa-fire" />
                    <span class="article-meta--num">{{ articleInfo?.view_count }}</span>
                </div>
                <div class="article-meta--item">
                    <fa-icon icon="fas fa-comment" />
                    <span class="article-meta--num">{{ articleInfo?.comment_count }}</span>
                </div>
                <div class="article-meta--item">
                    <fa-icon icon="fas fa-heart" />
                    <span class="article-meta--num">{{ articleInfo?.like_count }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
/* 文章头部样式 */
.article-head {
    position: relative;
    height: 40vh;
}

.article-head--meta {
    position: absolute;
    left: 20%;
    bottom: 20px;
    color: $cl-light-1;
}

.article-meta--title {
    margin-bottom: 16px;
    font-size: $fz-2x;
    font-weight: 700;
}

.article-meta--content {
    display: flex;
    line-height: $lh-xs;
    font-size: $fz-sm;
}

.article-meta--item {
    position: relative;
    display: flex;
    align-items: center;
}

.article-meta--item + .article-meta--item {
    margin-left: 26px;

    &::before {
        content: '•';
        position: absolute;
        top: 1px;
        left: -20px;
        color: $cl-light-1;
    }
}

.article-meta--num {
    margin-left: 4px;
}
</style>
