<script>
import InfoCard from '@/components/infoCard'

export default {
    name: 'Sidebar',
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
                },
                {
                    name: 'Tag',
                    icon: {
                        type: 'solid',
                        name: 'bookmark'
                    },
                    label: '标签',
                    cmp: () => import('./Tag')
                }
            ]
        }
    }
}
</script>

<template>
    <div>
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
.sidebar-item:not(:first-of-type) {
    margin-top: 40px;
}
</style>
