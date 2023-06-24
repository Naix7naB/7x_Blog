<script>
export default {
    name: 'LoginOverlay',
    props: {
        isShow: {
            type: Boolean,
            required: true
        }
    },
    computed: {
        transitionName() {
            return this.isShow ? 'slide-up' : 'slide-down'
        }
    }
}
</script>

<template>
    <div :class="['overlay-container', 'has-transition', { 'on-right': !isShow } ]">
        <div :class="['overlay', 'has-transition', { 'on-right': !isShow } ]">
            <transition :name="transitionName">
                <div v-if="!isShow" class="overlay-panel overlay-left" key="panel-left">
                    <p class="overlay-panel--title">已有账号？</p>
                    <p class="overlay-panel--desc">请使用您的账号进行登录</p>
                    <el-button round @click="$emit('showLogin')">登录</el-button>
                </div>
                <div v-else class="overlay-panel overlay-right" key="panel-right">
                    <p class="overlay-panel--title">没有账号？</p>
                    <p class="overlay-panel--desc">立即注册加入我们，和我们一起开始旅程吧</p>
                    <el-button round @click="$emit('showLogin')">注册</el-button>
                </div>
            </transition>
        </div>
    </div>
</template>

<style lang="scss" scoped>
/* 样式穿透 hook ElementUI 样式 */
:deep(.el-button) {
    padding: 12PX 48PX;
    color: #ffffff;
    border-color: rgba($color: #ffffff, $alpha: 1);
    background-color: transparent;
}

/* 覆盖层样式 */
.overlay-container {
    z-index: 100;
    overflow: hidden;
    position: absolute;
    top: 0;
    left: 50%;
    width: 50%;
    height: 100%;
}

.overlay {
    position: relative;
    left: -100%;
    height: 100%;
    width: 200%;
    background-image: linear-gradient(to left top, #8841d6, #8245d6, #7c49d6, #774cd6, #714fd5, #6758d9, #5e60db, #5568dd, #4876e0, #4182e1, #428ee0, #4b98de);
}

.overlay-panel {
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 50%;
    height: 100%;
    padding: 0 40PX;
    color: #fff;
}

.overlay-right {
    right: 0;
}

.overlay-left {
    left: 0;
}

.overlay-panel--title {
    font-size: 32PX;
    font-weight: bold;
}

.overlay-panel--desc {
    font-size: $fz-medium;
    padding: 30PX 0 40PX;
}

.has-transition {
    transition: transform .6s ease-in-out;
}

.on-right {
    &.overlay-container {
        transform: translate3d(-100%, 0, 0);
    }
    &.overlay {
        transform: translate3d(50%, 0, 0);
    }
}

/* 过渡效果 */
.slide-up-enter,
.slide-up-leave-to {
    opacity: 0;
    transform: translate3d(0, -30%, 0);
}

.slide-down-enter,
.slide-down-leave-to {
    opacity: 0;
    transform: translate3d(0, 30%, 0);
}

.slide-up-enter-active,
.slide-up-leave-active,
.slide-down-enter-active,
.slide-down-leave-active {
    transition: all .6s ease-in-out;
}
</style>
