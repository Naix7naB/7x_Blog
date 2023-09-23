<script>
import About from './About'
import Wave from './Wave'

export default {
    name: 'Intro',
    components: { About, Wave },
    data() {
        return {
            intro: null
        }
    },
    methods: {
        /* 滚动值内容区域 */
        jumpEnter() {
            const offset = this.intro.clientHeight
            this.$bus.$emit('scrollTo', { offset })
        },
        /* 每十分钟刷新背景图片 */
        refreshImageInterval(delay = 600 * 1000) {
            return setInterval(() => {
                const timestamp = Date.now()
                this.intro.style.backgroundImage = `url(https://t.mwm.moe/ai/?timestamp=${timestamp})`
            }, delay)
        }
    },
    mounted() {
        this.intro = this.$refs.intro
        window.addEventListener('load', () => {
            window.$timer = this.refreshImageInterval()
        })
        window.addEventListener('beforeunload', () => {
            clearInterval(window.$timer)
            window.$timer = null
        })
    }
}
</script>

<template>
    <section ref="intro" class="intro">
        <About />
        <span class="intro-enter" @click="jumpEnter">
            <fa-icon
                bounce
                size="3x"
                icon="fa-solid fa-caret-down"
                style="--fa-animation-duration: 2s"
            />
        </span>
        <span class="intro-wave">
            <Wave />
        </span>
    </section>
</template>

<style lang="scss" scoped>
/* 网站介绍页面样式 */
.intro {
    @include layer-mask();
    @include bg-image('https://t.mwm.moe/ai');
    width: 100%;
    height: 100%;
}

.intro-enter {
    z-index: 100;
    position: absolute;
    bottom: 40px;
    left: 50%;
    padding: 10px;
    color: $cl-theme;
    background-color: transparent;
    transform: translateX(-50%);
    cursor: pointer;
}

.intro-wave {
    z-index: 99;
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 120px;
}
</style>
