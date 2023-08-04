<script>
import AsideArea from './components/asideArea'
import RecentArticle from './components/recentArticle'

export default {
    components: { AsideArea, RecentArticle },
    data() {
        return {}
    }
}
</script>

<template>
    <section class="home-page">
        <AsideArea />
        <RecentArticle />
    </section>
</template>

<style lang="scss" scoped>
/* 主页样式 */
.home-page {
    display: flex;
    justify-content: center;
    width: 90%;
    margin: 0 auto;
    padding: 40PX;
}

/* 媒体查询样式 */
@media screen and (max-width: 1100PX) {
    .home-page {
        flex-direction: column;
        width: 100%;
    }
}
</style>
