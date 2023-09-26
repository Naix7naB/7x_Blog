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
    },
    methods: {
        showLogin(flag) {
            this.$emit('showLogin', flag)
        }
    }
}
</script>

<template>
    <div :class="['overlay-container', { 'on-right': !isShow } ]">
        <div :class="['overlay', { 'on-right': !isShow } ]">
            <transition :name="transitionName">
                <div v-if="!isShow" class="overlay-panel left" key="panel-left">
                    <p class="overlay-panel--title">已有账号？</p>
                    <p class="overlay-panel--desc">使用您的账号进行登录🚀</p>
                    <button class="form-button" @click="showLogin(true)">登录</button>
                </div>
                <div v-else class="overlay-panel right" key="panel-right">
                    <p class="overlay-panel--title">没有账号？</p>
                    <p class="overlay-panel--desc">立即注册吧😃</p>
                    <button class="form-button" @click="showLogin(false)">注册</button>
                </div>
            </transition>
        </div>
    </div>
</template>

<style lang="scss" scoped>
/* 覆盖层样式 */
.overlay-container {
    z-index: 100;
    overflow: hidden;
    position: absolute;
    top: 0;
    left: 50%;
    width: 50%;
    height: 100%;
    transition: transform .6s ease-in-out;
}

.overlay {
    position: relative;
    left: -100%;
    height: 100%;
    width: 200%;
    background-image: linear-gradient(90deg,#ff4b2b,#ff416c);
    transition: transform .6s ease-in-out;
}

.overlay-panel {
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 50%;
    height: 100%;
    padding: 0 40px;
    color: $cl-light-1;

    &.left {
        left: 0;
    }

    &.right {
        right: 0;
    }
}

.overlay-panel--title {
    font-size: 32px;
    font-weight: bold;
}

.overlay-panel--desc {
    font-size: $fz-small;
    padding: 50px 0 30px;
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
