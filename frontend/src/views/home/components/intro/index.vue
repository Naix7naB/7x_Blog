<script>
import About from './About'

export default {
    name: 'Intro',
    components: { About },
    methods: {
        jumpEnter() {
            const offset = this.$refs.introRef.clientHeight
            this.$bus.$emit('scrollTo', { offset })
        }
    }
}
</script>

<template>
    <section class="intro" ref="introRef">
        <About />
        <span class="intro-enter" @click="jumpEnter">
            <fa-icon
                bounce
                size="3x"
                icon="fa-solid fa-caret-down"
                style="--fa-animation-duration: 2s"
            />
        </span>
    </section>
</template>

<style lang="scss" scoped>
/* 网站介绍页面样式 */
.intro {
    @include layer-mask();
    @include bg-image('@/assets/images/bg.png', no-repeat, center, cover);
    width: 100%;
    height: 100%;
}

.intro-enter {
    position: absolute;
    bottom: 2px;
    left: 50%;
    padding: 10px;
    color: $cl-theme;
    background-color: transparent;
    transform: translateX(-50%);
    cursor: pointer;
}
</style>
