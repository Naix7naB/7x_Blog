<script>
import avatar from '@/assets/images/avatar-default.png'

export default {
    data() {
        return {
            avatar
        }
    }
}
</script>

<template>
    <div class="site-info">
        <el-avatar class="site-info--avatar" :size="120" :src="avatar" />
        <span class="site-info--name">#7x</span>
        <div class="site-info--data">
            <div class="info-data--wrapper">
                <span>文章</span>
                <span class="info-data--num">14</span>
            </div>
            <div class="info-data--wrapper">
                <span>分类</span>
                <span class="info-data--num">5</span>
            </div>
            <div class="info-data--wrapper">
                <span>访问量</span>
                <span class="info-data--num">1234</span>
            </div>
        </div>
        <span class="site-info--button"><fa-icon icon="far fa-star" /> 朋友圈</span>
    </div>
</template>

<style lang="scss" scoped>
.site-info{
    display: flex;
    flex-direction: column;
    align-items: center;
}

.site-info--avatar {
    margin-top: 20PX;
}

.site-info--name {
    font-size: 30px;
    font-weight: 700;
    margin: 20PX 0;
}

.site-info--data {
    display: flex;
    justify-content: space-around;
    width: 80%;
}

.info-data--wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.info-data--num {
    margin-top: 12PX;
}

.site-info--button {
    overflow: hidden;
    position: relative;
    z-index: 1;
    width: 64%;
    height: 36PX;
    line-height: 36PX;
    margin: 20PX 0 32PX;
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
