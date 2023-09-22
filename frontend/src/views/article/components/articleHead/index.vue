<script>
import { formatDate } from '@/utils/util'
import { mapGetters } from 'vuex'

export default {
    name: 'ArticleHead',
    computed: {
        ...mapGetters('article', { info: 'getArticleInfo' })
    },
    methods: {
        formatDate
    }
}
</script>

<template>
    <div class="article-head">
        <el-image class="background" fit="cover" :src="info.cover_img" />
        <div class="article-head--meta">
            <h3 class="article-meta--title">{{ info.title }}</h3>
            <div class="article-meta--content">
                <div class="article-meta--item">
                    <fa-icon icon="fas fa-user" />
                    <span class="article-meta--num">{{ info.author.nickname }}</span>
                </div>
                <div class="article-meta--item">
                    <fa-icon icon="fas fa-calendar-days" />
                    <span class="article-meta--num">{{ formatDate(info.created_at) }}</span>
                </div>
                <div class="article-meta--item">
                    <fa-icon icon="fas fa-fire" />
                    <span class="article-meta--num">{{ info.view_count }}</span>
                </div>
                <div class="article-meta--item">
                    <fa-icon icon="fas fa-comment" />
                    <span class="article-meta--num">{{ info.comment_count }}</span>
                </div>
                <div class="article-meta--item">
                    <fa-icon icon="fas fa-heart" />
                    <span class="article-meta--num">{{ info.like_count }}</span>
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
    user-select: none;
    position: absolute;
    left: 20%;
    bottom: 20px;
    color: #f1f1f1;
}

.article-meta--title {
    margin-bottom: 16px;
    font-size: 32px;
    font-weight: 700;
}

.article-meta--content {
    display: flex;
    line-height: $lh-small-s;
    font-size: $fz-small;
}

.article-meta--item {
    position: relative;
    display: flex;
    align-items: center;
}

.article-meta--item + .article-meta--item {
    margin-left: 20px;

    &::before {
        content: '';
        position: absolute;
        width: 1px;
        height: 10px;
        top: 5px;
        left: -10px;
        background-color: rgba($color: #f1f1f1, $alpha: .7);
        transform: scaleX(.5);
    }
}

.article-meta--num {
    margin-left: 6px;
}
</style>
