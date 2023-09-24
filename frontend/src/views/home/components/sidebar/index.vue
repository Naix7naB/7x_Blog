<script>
export default {
    name: 'Sidebar',
    data() {
        return {
            componentList: [
                {
                    name: 'SiteInfo',
                    cmp: () => import('./SiteInfo')
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
                    name: 'Category',
                    cmp: () => import('./Category')
                },
                {
                    name: 'Tag',
                    cmp: () => import('./Tag')
                }
            ]
        }
    }
}
</script>

<template>
    <div>
        <component
            class="shadow-box"
            v-for="item in componentList"
            :key="item.name"
            :is="item.cmp"
        />
    </div>
</template>

<style lang="scss" scoped>
/* 侧边栏样式 */
:deep(.sidebar-card) {
    margin-bottom: 40px;
    padding: 24px;
    border-radius: 10px;
    background-color: #24272d;
}

:deep(.sidebar-card--label) {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    line-height: $lh-medium;
    font-size: $fz-medium-x;
    font-weight: 700;

    & > span {
        margin-left: 6px;
    }
}
</style>
