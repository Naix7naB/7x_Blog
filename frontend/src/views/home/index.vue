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
    <div>
        <div class="home-intro">
            <Intro />
        </div>
        <div class="home-main">
            <div class="home-sidebar">
                <Sidebar />
            </div>
            <div class="home-content">
                <ArticleList :list="articleList" />
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
/* 主页样式 */
.home-intro {
    height: 100vh;
}

.home-main {
    display: flex;
    justify-content: center;
    width: 90%;
    margin: 80px auto 0;
    padding: 40px;
}

.home-sidebar {
    width: 30%;
    max-width: 320px;
    margin-right: 40px;
}


.home-content {
    width: 70%;
    max-width: 980px;
    min-height: calc(100vh - 160px);
}

/* 媒体查询样式 */
@media screen and (max-width: 1100px) {
    .home-main {
        flex-direction: column;
        width: 100%;
    }

    .home-sidebar {
        width: 100%;
        max-width: 100%;
        margin-right: 0;
        margin-bottom: 40px;
    }

    .home-content {
        width: 100%;
        max-width: 100%;
    }
}
</style>
