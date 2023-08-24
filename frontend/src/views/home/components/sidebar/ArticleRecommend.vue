<script>
import { getRecommendArticles } from '@/apis/article'
import { formatDate } from '@/utils/util'

export default {
    name: 'ArticleRecommend',
    data() {
        return {
            recommendList: []
        }
    },
    methods: {
        formatDate
    },
    created() {
        getRecommendArticles().then(({ data }) => {
            this.recommendList = data.list
        }).catch(err => {
            this.$message.error(err.errMsg)
        })
    }
}
</script>

<template>
    <ul>
        <li class="recommend-item" v-for="article in recommendList" :key="article.id">
            <el-image class="recommend-inset" fit="cover" :src="article.cover_img" />
            <div class="recommend-info">
                <p class="recommend-info--title">{{ article.description }}</p>
                <p class="recommend-info--date">
                    <fa-icon icon="fas fa-clock" /> {{ formatDate(article.created_at) }}
                </p>
            </div>
        </li>
    </ul>
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
