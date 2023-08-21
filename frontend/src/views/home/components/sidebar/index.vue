<script>
import InfoCard from '@/components/infoCard'

export default {
    components: { InfoCard },
    data() {
        return {
            componentList: [
                {
                    name: 'WebsiteInfo',
                    icon: null,
                    label: null,
                    cmp: () => import('./WebsiteInfo')
                },
                {
                    name: 'SearchBar',
                    icon: {
                        type: 'solid',
                        name: 'magnifying-glass'
                    },
                    label: '搜索文章',
                    cmp: () => import('./SearchBar')
                },
                {
                    name: 'ArticleRecommend',
                    icon: {
                        type: 'solid',
                        name: 'book-open'
                    },
                    label: '推荐文章',
                    cmp: () => import('./ArticleRecommend')
                },
                {
                    name: 'Classify',
                    icon: {
                        type: 'regular',
                        name: 'folder-open'
                    },
                    label: '分类',
                    cmp: () => import('./Classify')
                }
            ]
        }
    }
}
</script>

<template>
    <div class="sidebar">
        <InfoCard
            custom-class="sidebar-item shadow-box"
            v-for="item in componentList"
            :key="item.name"
            :icon-type="item.icon?.type"
            :icon-name="item.icon?.name"
            :label="item.label"
        >
            <component :is="item.cmp" />
        </InfoCard>
    </div>
</template>

<style lang="scss" scoped>
/* 侧边栏样式 */
.sidebar {
    width: 30%;
    max-width: 320px;
    margin-right: 40px;
}

.sidebar-item:not(:first-of-type) {
    margin-top: 40px;
}

/* 媒体查询样式 */
@media screen and (max-width: 1100px) {
    .sidebar {
        width: 100%;
        max-width: 100%;
        margin-right: 0;
        margin-bottom: 40px;
    }
}
</style>
