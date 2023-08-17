<script>
import MarkButton from  '@/components/markButton'

import { getArticleList, getArticleInfoById } from '@/apis/article'
import { formatDate } from '@/utils/util'
import { mapActions } from 'vuex'

export default {
    components: { MarkButton },
    data() {
        return {
            recentArticles: []
        }
    },
    methods: {
        ...mapActions('article', ['setArticleInfo']),
        formatDate,
        selected(e) {
            let target = e.target
            if (target.className === 'recent-article--wrapper') return false
            while(!target.classList.contains('recent-article--item')) {
                target = target.parentElement
            }
            getArticleInfoById(target.dataset.aid).then(({ data }) => {
                const { id: aid, ...info } = data
                this.setArticleInfo({ aid, ...info })
                this.$router.push(`/article/${aid}`)
            }).catch(err => {
                this.$message.error(err.errMsg)
            })
        }
    },
    mounted() {
        getArticleList().then(({ data }) => {
            this.recentArticles = data.list
        }).catch(err => {
            this.$message.error(err.errMsg)
        })
    }
}
</script>

<template>
    <ul class="recent-article--wrapper" @click="selected">
        <li
            class="recent-article--item shadow-box"
            v-for="(item, idx) in recentArticles"
            :key="item.id"
            :data-aid="item.id"
        >
            <div
                :class="['article-item--wrapper', 'recent-article--image', { left: idx % 2 === 0, right: idx % 2 === 1 }]"
            >
                <el-image :src="item.cover_img" fit="cover" />
            </div>
            <div
                :class="['article-item--wrapper', 'recent-article--info', { left: idx % 2 === 1, right: idx % 2 === 0 }]"
            >
                <div class="article-info--meta date">
                    <fa-icon icon="fas fa-calendar-days" /> 发布于
                    {{formatDate(item.created_at, 'YYYY-MM-DD hh:mm:ss')}}
                </div>
                <h3 class="article-info--title">{{item.title}}</h3>
                <div class="article-info--meta data">
                    <span><fa-icon icon="fas fa-fire" /> 热度 {{item.view_num}}</span>
                    <span><fa-icon icon="fas fa-comment" /> 评论 {{item.comment_num}}</span>
                    <span><fa-icon icon="fas fa-heart" /> 喜欢 {{item.like_num}}</span>
                </div>
                <p class="article-info--desc">{{item.description}}</p>
                <div class="article-info--label">
                    <MarkButton type="classify">{{item.classify.name}}</MarkButton>
                    <MarkButton type="tag">{{item.classify.name}}</MarkButton>
                </div>
            </div>
        </li>
    </ul>
</template>

<style lang="scss" scoped>
/* 样式穿透 hook ElementUI 样式 */
:deep(.el-image) {
    width: 100%;
    height: 100%;
}

:deep(.el-image__inner) {
    transform: scale(1);
    transition: transform .7s ease;
}

/* 最近文章样式 */
.recent-article--wrapper {
    width: 70%;
    max-width: 980px;
}

.recent-article--item {
    overflow: hidden;
    position: relative;
    display: flex;
    height: 300px;
    margin-bottom: 40px;
    border-radius: 10px;
    background-color: #24272d;
    cursor: pointer;

    &:hover :deep(.el-image__inner) {
        transform: scale(1.2);
    }
}

.article-item--wrapper {
    position: absolute;
    top: 0;
    height: 100%;

    &.left {
        left: 0;
    }

    &.right {
        right: 0;
        text-align: right;
    }

    &.right .article-info--label {
        right: 36px;
    }
}

.recent-article--image {
    width: 40%;
}

.recent-article--info {
    width: 60%;
    padding: 24px 36px;
}

.article-info--meta {
    @include nowrap();
    font-size: $fz-small;

    &.data {
        margin-bottom: 14px;
    }

    &.data>span:not(:first-of-type) {
        margin-left: 12px;
    }
}

.article-info--title {
    @include nowrap();
    margin: 22px 0;
    font-size: $fz-large;
}

.article-info--desc {
    @include nowrap-multiple(4);
    line-height: 1.5;
}

.article-info--label {
    position: absolute;
    bottom: 24px;
}

/* 媒体查询样式 */
@media screen and (max-width: 1100px) {
    .recent-article--wrapper {
        width: 100%;
        max-width: 100%;
    }
}

@media screen and (max-width: 700px) {
    .recent-article--item {
        flex-direction: column;
        height: 500px;
    }

    .article-item--wrapper {
        position: initial;
        width: 100%;

        &.right {
            text-align: initial;
        }
    }

    .recent-article--image {
        height: 200px;
    }

    .recent-article--info {
        position: relative;
        height: 300px;
    }

    .article-info--label {
        right: 36px;
    }
}
</style>
