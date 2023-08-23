<script>
import Intro from './components/intro'
import Sidebar from './components/sidebar'
import ArticleList from '@/components/articleList'

import { getArticleList } from '@/apis/article'

export default {
    name: 'HomePage',
    components: { Intro, Sidebar, ArticleList },
    data() {
        return {
            articleList: []
        }
    },
    methods: {
        changeList(list) {
            this.articleList = list
        }
    },
    created() {
        this.$bus.$on('changeList', this.changeList)
        getArticleList().then(({ data }) => {
            this.articleList = data.list
        }).catch(err => {
            this.$message.error(err.errMsg)
        })
    }
}
</script>

<template>
    <div>
        <div class="home-intro">
            <Intro />
        </div>
        <div class="home-content">
            <Sidebar />
            <ArticleList :list="articleList" />
        </div>
    </div>
</template>

<style lang="scss" scoped>
/* 主页样式 */
.home-intro {
    height: 100vh;
}

.home-content {
    display: flex;
    justify-content: center;
    width: 90%;
    margin: 80px auto 0;
    padding: 40px;
}

/* 媒体查询样式 */
@media screen and (max-width: 1100px) {
    .home-content {
        flex-direction: column;
        width: 100%;
    }
}
</style>
