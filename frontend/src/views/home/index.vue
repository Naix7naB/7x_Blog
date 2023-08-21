<script>
import Sidebar from './components/sidebar'
import ArticleList from '@/components/articleList'

import { getArticleList } from '@/apis/article'

export default {
    name: 'HomePage',
    components: { Sidebar, ArticleList },
    data() {
        return {
            articleList: []
        }
    },
    created() {
        getArticleList().then(({ data }) => {
            this.articleList = data.list
        }).catch(err => {
            this.$message.error(err.errMsg)
        })
    }
}
</script>

<template>
    <section class="home-page">
        <Sidebar />
        <ArticleList :list="articleList" />
    </section>
</template>

<style lang="scss" scoped>
/* 主页样式 */
.home-page {
    display: flex;
    justify-content: center;
    width: 90%;
    margin: 80px auto 0;
    padding: 40px;
}

/* 媒体查询样式 */
@media screen and (max-width: 1100px) {
    .home-page {
        flex-direction: column;
        width: 100%;
    }
}
</style>
