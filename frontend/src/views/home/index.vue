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
        <div class="home-page--container">
            <AsideArea />
            <RecentArticle />
        </div>
    </section>
</template>

<style lang="scss" scoped>
.home-page--container {
    display: flex;
    justify-content: center;
    width: 90%;
    margin: 0 auto;
    padding: 40PX;
}

@media screen and (max-width: 1100PX) {
    .home-page--container {
        flex-direction: column;
        width: 100%;
    }
}
</style>
