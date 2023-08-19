<script>
export default {
    data() {
        return {
            componentList: [
                {
                    name: 'WebsiteInfo',
                    cmp: () => import('./WebsiteInfo')
                },
                {
                    name: 'SearchBar',
                    cmp: () => import('./SearchBar')
                },
                {
                    name: 'ArticleRecommend',
                    cmp: () => import('./ArticleRecommend')
                },
                {
                    name: 'ArticleClassify',
                    cmp: () => import('./ArticleClassify')
                }
            ]
        }
    }
}
</script>

<template>
    <ul class="aside-area--wrapper">
        <li class="aside-area--item shadow-box" v-for="item in componentList" :key="item.name">
            <component :is="item.cmp" />
        </li>
    </ul>
</template>

<style lang="scss" scoped>
/* 侧边栏样式 */
.aside-area--wrapper {
    width: 30%;
    max-width: 320px;
    margin-right: 40px;
}

.aside-area--item {
    overflow: hidden;
    border-radius: 10px;
    background-color: #24272d;

    &:not(:first-of-type) {
        margin-top: 40px;
        padding: 24px;
    }
}

/* 媒体查询样式 */
@media screen and (max-width: 1100px) {
    .aside-area--wrapper {
        width: 100%;
        max-width: 100%;
        margin-right: 0;
        margin-bottom: 40px;
    }
}
</style>
