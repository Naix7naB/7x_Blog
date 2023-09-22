<script>
import { mapGetters } from 'vuex'

export default {
    name: 'SiteInfo',
    computed: {
        ...mapGetters('site', ['getSiteInfo'])
    }
}
</script>

<template>
    <div class="site-info">
        <el-avatar :size="120" :src="getSiteInfo?.host.avatar" />
        <span class="site-info--name">{{ getSiteInfo?.host.nickname }}</span>
        <div class="site-info--meta">
            <div class="info-meta--item">
                <span>文章</span>
                <span class="info-meta--num">{{ getSiteInfo.article_count }}</span>
            </div>
            <div class="info-meta--item">
                <span>分类</span>
                <span class="info-meta--num">{{ getSiteInfo.category_count }}</span>
            </div>
            <div class="info-meta--item">
                <span>标签</span>
                <span class="info-meta--num">{{ getSiteInfo.tag_count }}</span>
            </div>
        </div>
        <span class="site-info--button"><fa-icon icon="far fa-star" /> 朋友圈</span>
    </div>
</template>

<style lang="scss" scoped>
:deep(.el-avatar) {
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
    font-size: 30px;
    font-weight: 700;
    padding: 20px 0;
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
    background-color: #2e9e96;
    cursor: pointer;

    &::before {
        content: '';
        z-index: -1;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        transform: scaleX(0);
        transform-origin: 0;
        transition: transform .5s cubic-bezier(.45,1.64,.47,.66);
        background-image: linear-gradient(90deg, #b71c00, #ad0027);
    }

    &:hover::before {
        transform: scaleX(1);
    }
}
</style>
