<script>
import InforCard from './InfoCard.vue'
import CardLabel from './CardLabel.vue'

export default {
    name: 'Sidebar',
    components: { InforCard, CardLabel },
    data() {
        return {
            componentList: [
                {
                    name: 'SiteInfo',
                    label: false,
                    cmp: () => import('./SiteInfo')
                },
                {
                    name: 'SearchBar',
                    label: {
                        icon: 'magnifying-glass',
                        text: '搜索文章'
                    },
                    cmp: () => import('./SearchBar')
                },
                {
                    label: {
                        icon: 'book-open',
                        text: '推荐文章'
                    },
                    name: 'ArticleRecommend',
                    cmp: () => import('./ArticleRecommend')
                },
                {
                    label: {
                        icon: 'folder-open',
                        text: '分类'
                    },
                    name: 'Category',
                    cmp: () => import('./Category')
                },
                {
                    label: {
                        icon: 'bookmark',
                        text: '标签'
                    },
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
        <InforCard v-for="item in componentList" :key="item.name">
            <CardLabel
                slot="label"
                v-if="item.label"
                :icon="item.label.icon"
                :text="item.label.text"
            />
            <component :is="item.cmp" />
        </InforCard>
    </div>
</template>
