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
    <div class="article-recommend">
        <div class="article-recommend--label"><fa-icon icon="fas fa-book-open" /> 推荐文章</div>
        <ul>
            <li class="article-recommend--item" v-for="article in recommendList" :key="article.id">
                <el-image class="article-recommend--inset" fit="cover" :src="article.cover_img" />
                <div class="article-recommend--info">
                    <p class="article-info--title">{{ article.description }}</p>
                    <p class="article-info--date">
                        <fa-icon icon="fas fa-clock" /> {{ formatDate(article.created_at) }}
                    </p>
                </div>
            </li>
        </ul>
    </div>
</template>

<style lang="scss" scoped>
/* 推荐文章卡片样式 */
.article-recommend--item {
    display: flex;
    cursor: pointer;

    &:not(:first-of-type) {
        margin-top: 20px;
    }
}

.article-recommend--label {
    margin-bottom: 20px;
    font-size: $fz-medium-x;
}

.article-recommend--inset {
    flex-shrink: 0;
    width: calc(40% - 10px);
    margin-right: 10px;
    border-radius: 4px;
}

.article-recommend--info {
    width: 60%;
    font-size: $fz-medium;
}

.article-info--title,
.article-info--date {
    @include nowrap();
}

.article-info--date {
    margin-top: 12px;
    font-size: $fz-small-s;
}
</style>
