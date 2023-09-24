<script>
import { getRecommendArticles, getArticleInfoById } from '@/apis/article'
import { formatDate, goToPath } from '@/utils/util'
import { mapActions } from 'vuex'

export default {
    name: 'ArticleRecommend',
    data() {
        return {
            recommendList: []
        }
    },
    methods: {
        ...mapActions('article', ['setArticleInfo']),
        formatDate,
        async toArticleDetail(aid) {
            try {
                const { data } = await getArticleInfoById(aid)
                this.setArticleInfo(data)
                goToPath({ target: 'Article', params: { aid } })
            } catch (err) {
                this.$message.error(err.errMsg || err)
            }
        }
    },
    created() {
        getRecommendArticles().then(({ data }) => {
            this.recommendList = data.list
        }).catch(err => {
            this.$message.error(err.errMsg || err)
        })
    }
}
</script>

<template>
    <div class="sidebar-card">
        <div class="sidebar-card--label">
            <fa-icon icon="fas fa-book-open" />
            <span>推荐文章</span>
        </div>
        <ul>
            <li
                class="recommend-item"
                v-for="article in recommendList"
                :key="article.id"
                @click="toArticleDetail(article.id)"
            >
                <el-image class="recommend-inset" fit="cover" :src="article.cover_img" />
                <div class="recommend-info">
                    <p class="recommend-info--title">{{ article.description }}</p>
                    <p class="recommend-info--date">
                        <fa-icon icon="fas fa-clock" />
                        <span
                            style="margin-left: 6px;"
                            v-text="formatDate(article.created_at, 'YYYY-MM-DD')"
                        ></span>
                    </p>
                </div>
            </li>
        </ul>
    </div>
</template>

<style lang="scss" scoped>
/* 样式穿透 hook ElementUI 样式 */
:deep(.el-image__inner) {
    aspect-ratio: 16 / 9;
}

/* 推荐文章卡片样式 */
.recommend-item {
    display: flex;
    cursor: pointer;

    &:not(:first-of-type) {
        margin-top: 20px;
    }
}

.recommend-inset {
    flex-shrink: 0;
    width: calc(40% - 10px);
    margin-right: 10px;
    border-radius: 4px;
}

.recommend-info {
    width: 60%;
    font-size: $fz-medium;
}

.recommend-info--title,
.recommend-info--date {
    @include nowrap();
}

.recommend-info--date {
    margin-top: 12px;
    font-size: $fz-small-s;
}
</style>
