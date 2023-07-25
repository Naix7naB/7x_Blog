<script>
export default {
    data() {
        return {
            transitionName: ''
        }
    },
    watch: {
        $route(to, from) {
            if (from.path === '/') return false
            if (from.name === 'Intro') {
                this.transitionName = 'slide-down'
            }
            if (to.name === 'Intro') {
                this.transitionName = 'slide-up'
            }
        }
    }
}
</script>

<template>
    <div id="app" class="overlay">
        <transition :name="transitionName">
            <router-view />
        </transition>
    </div>
</template>

<style lang="scss" scoped>
#app {
    @include bg-image('@/assets/images/bg.png', no-repeat, center, cover);
}

.slide-down-enter-active,
.slide-down-leave-active,
.slide-up-enter-active,
.slide-up-leave-active {
    position: absolute;
    transition: all .7s;
}

.slide-down-enter,
.slide-up-leave-to {
    opacity: 0;
    transform: translate3d(0, 100%, 0);
}

.slide-up-enter,
.slide-down-leave-to {
    opacity: 0;
    transform: translate3d(0, -100%, 0);
}
</style>
