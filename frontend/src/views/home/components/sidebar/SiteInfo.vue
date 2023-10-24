<script>
export default {
    name: 'SiteInfo',
    computed: {
        siteInfo() {
            return this.$store.getters.siteInfo
        }
    }
}
</script>

<template>
    <div class="site-info">
        <el-avatar :size="120" :src="siteInfo?.host.avatar" />
        <span class="site-info--name">{{ siteInfo?.host.nickname }}</span>
        <div class="site-info--meta">
            <div class="info-meta--item">
                <span>文章</span>
                <span class="info-meta--num">{{ siteInfo?.article_count }}</span>
            </div>
            <div class="info-meta--item">
                <span>分类</span>
                <span class="info-meta--num">{{ siteInfo?.category_count }}</span>
            </div>
            <div class="info-meta--item">
                <span>标签</span>
                <span class="info-meta--num">{{ siteInfo?.tag_count }}</span>
            </div>
        </div>
        <span class="site-info--button"><fa-icon icon="far fa-star" /> 朋友圈</span>
    </div>
</template>

<style lang="scss" scoped>
/* 样式穿透 hook ElementUI 样式 */
.site-info > :deep(.el-avatar) {
    transition: transform .8s ease;

    &:hover {
        transform: rotate(360deg);
    }
}

/* 网站信息卡片样式 */
.site-info{
    display: flex;
    flex-direction: column;
    align-items: center;
}

.site-info--name {
    padding: 20px 0;
    font-size: $fz-2x;
    font-weight: 700;
}

.site-info--meta {
    display: flex;
    justify-content: space-around;
    width: 80%;
}

.info-meta--item {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.info-meta--num {
    margin-top: 12px;
}

.site-info--button {
    overflow: hidden;
    position: relative;
    z-index: 1;
    width: 90%;
    height: 36px;
    line-height: 36px;
    margin-top: 32px;
    text-align: center;
    border-radius: 1rem;
    color: rgba($color: $cl-light-3, $alpha: .8);
    background-color: $cl-lightgreen;
    cursor: pointer;

    &::before {
        content: '';
        z-index: -1;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-image: $cl-gradual-red;
        transform: scaleX(0);
        transform-origin: 0;
        transition: transform .5s cubic-bezier(.45, 1.64, .47, .66);
    }

    &:hover::before {
        transform: scaleX(1);
    }
}
</style>
