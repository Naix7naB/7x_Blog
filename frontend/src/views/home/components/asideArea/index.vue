<script>
export default {
    data() {
        return {
            componentList: [
                {
                    name: 'SiteInfo',
                    cmp: () => import('./SiteInfo')
                },
                {
                    name: 'SearchBox',
                    cmp: () => import('./SearchBox')
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
        <li class="aside-area--item" v-for="item in componentList" :key="item.name">
            <component :is="item.cmp" />
        </li>
    </ul>
</template>

<style lang="scss" scoped>
.aside-area--wrapper {
    width: 30%;
    max-width: 320PX;
    margin-right: 40PX;
}

.aside-area--item {
    user-select: none;
    overflow: hidden;
    border-radius: 10PX;
    background-color: #24272d;
    box-shadow: 0 1PX 20PX -6PX rgba(0,0,0,0.5);
    transition: box-shadow .3s ease;

    &:not(:first-of-type) {
        margin-top: 40PX;
        padding: 24PX;
    }

    &:hover {
        box-shadow: 0 5PX 10PX 5PX rgba(78, 85, 98, 0.4);
    }
}

@media screen and (max-width: 1100PX) {
    .aside-area--wrapper {
        width: 100%;
        max-width: 100%;
        margin-right: 0;
        margin-bottom: 40PX;
    }
}
</style>
