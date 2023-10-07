<script>
import MarkButton from '../markButton'

import { getArticleInfoById } from '@/apis/article'
import { formatDate, goToPath } from '@/utils/util'

export default {
    name: 'ArticleList',
    components: { MarkButton },
    props: {
        list: {
            type: Array,
            default: () => []
        }
    },
    methods: {
        formatDate,
        async toArticleDetail(aid) {
            try {
                const { data } = await getArticleInfoById(aid)
                this.$store.dispatch('article/setArticleInfo', data)
                goToPath({ target: 'Article', params: { aid } })
            } catch (err) {
                this.$message.error(err.errMsg || err)
            }
        }
    }
}
</script>

<template>
    <ul class="article-list" v-loading="!list.length">
        <li
            class="article-item"
            v-for="(article, idx) in list"
            :key="article.id"
            @click="toArticleDetail(article.id)"
        >
            <div
                class="article-item--wrapper article-image"
                :on-left="idx % 2 === 0"
                :on-right="idx % 2 === 1"
            >
                <el-image :src="article.cover_img" fit="cover" lazy />
            </div>
            <div
                class="article-item--wrapper article-info"
                :on-left="idx % 2 === 1"
                :on-right="idx % 2 === 0"
            >
                <p class="article-info--meta">
                    <fa-icon icon="fas fa-calendar-days" />
                    <span>发布于 {{ formatDate(article.created_at) }}</span>
                </p>
                <h4 class="article-info--title">{{ article.title }}</h4>
                <div class="article-info--meta">
                    <span class="article-meta--item">
                        <fa-icon icon="fas fa-fire" />
                        <span>热度 {{ article.view_count }}</span>
                    </span>
                    <span class="article-meta--item">
                        <fa-icon icon="fas fa-comment" />
                        <span>评论 {{ article.comment_count }}</span>
                    </span>
                    <span class="article-meta--item">
                        <fa-icon icon="fas fa-heart" />
                        <span>喜欢 {{ article.like_count }}</span>
                    </span>
                </div>
                <p class="article-info--desc">{{ article.description }}</p>
                <div class="article-info--marked">
                    <MarkButton type="category" :item="article.category" />
                    <MarkButton type="tag" v-for="tag in article.tags" :key="tag.id" :item="tag" />
                </div>
            </div>
        </li>
    </ul>
</template>

<style lang="scss" scoped>
/* 样式穿透 hook ElementUI 样式 */
:deep(.el-image__inner) {
    transition: transform .7s ease;
}

/* 文章列表样式 */
.article-list {
    width: 100%;
    height: 100%;
}

.article-item {
    @include bg-color(bg-highlight);
    @include shadow-color(shadow, .8);
    overflow: hidden;
    position: relative;
    display: flex;
    height: 300px;
    border-radius: 10px;
    font-size: $fz-sm;
    cursor: pointer;
    transition: background-color .3s ease-in-out, box-shadow .3s ease;

    &:not(:first-of-type) {
        margin-top: 40px;
    }

    &:hover {
        @include shadow-color(shadow-hover, .5, 1);

        & ::deep(.el-image__inner) {
            transform: scale(1.2);
        }
    }
}

.article-item--wrapper {
    position: absolute;
    top: 0;
    height: 100%;

    &[on-left] {
        left: 0;
    }

    &[on-right] {
        right: 0;
        text-align: right;
    }
}

.article-image {
    width: 45%;
}

.article-info {
    width: 55%;
    padding: 24px 36px;
}

.article-info--meta {
    @include nowrap();
    @include text-color(text-muted);
    line-height: $lh-sm;
    font-weight: 200;
    transition: color .3s ease-in-out;

    & span {
        margin-left: 6px;
    }
}

.article-info--title {
    @include nowrap();
    @include text-color(text-primary, .8);
    padding: 22px 0;
    font-size: $fz-lg;
    transition: color .3s ease-in-out;
}

.article-meta--item {
    display: inline-flex;
    align-items: center;

    &:not(:first-of-type) {
        margin-left: 12px;
    }
}

.article-info--desc {
    @include nowrap-multiple(4);
    @include text-color(text-secondary, .85);
    padding: 14px 0 20px 0;
    line-height: $lh-md;
    font-size: $fz-md;
    transition: color .3s ease-in-out;
}

.article-info--marked {
    position: absolute;
    bottom: 24px;
}

.article-item--wrapper[on-right] .article-info--marked {
    right: 36px;
}

/* 媒体查询样式 */
@media screen and (max-width: 700px) {
    .article-item {
        flex-direction: column;
        height: 500px;
    }

    .article-item--wrapper {
        position: initial;
        width: 100%;

        &[on-right] {
            text-align: initial;
        }
    }

    .article-image {
        height: 200px;
    }

    .article-info {
        position: relative;
        height: 300px;
    }

    .article-info--marked {
        right: 36px;
    }
}
</style>
