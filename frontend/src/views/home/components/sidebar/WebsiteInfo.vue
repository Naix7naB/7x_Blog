<script>
import { mapGetters } from 'vuex'

export default {
    name: 'WebsiteInfo',
    computed: {
        ...mapGetters('website', ['getWebsiteInfo'])
    }
}
</script>

<template>
    <div class="website-info">
        <el-avatar :size="120" :src="getWebsiteInfo?.host.avatar" />
        <span class="website-info--name">{{ getWebsiteInfo?.host.nickname }}</span>
        <div class="website-info--meta">
            <div class="info-meta--item">
                <span>文章</span>
                <span class="info-meta--num">14</span>
            </div>
            <div class="info-meta--item">
                <span>分类</span>
                <span class="info-meta--num">5</span>
            </div>
            <div class="info-meta--item">
                <span>访问量</span>
                <span class="info-meta--num">1234</span>
            </div>
        </div>
        <span class="website-info--button"><fa-icon icon="far fa-star" /> 朋友圈</span>
    </div>
</template>

<style lang="scss" scoped>
/* 网站信息卡片样式 */
.website-info{
    display: flex;
    flex-direction: column;
    align-items: center;
}

.website-info--name {
    font-size: 30px;
    font-weight: 700;
    padding: 20px 0;
}

.website-info--meta {
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

.website-info--button {
    overflow: hidden;
    position: relative;
    z-index: 1;
    width: 64%;
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
