<script>
import About from './About'
import { mapGetters } from 'vuex'

export default {
    name: 'Intro',
    components: { About },
    computed: {
        ...mapGetters('website', ['getWebsiteInfo']),
        introStyle() {
            return {
                background: `url(${this.getWebsiteInfo.background})`
            }
        }
    },
    methods: {
        jumpEnter() {
            const offset = this.$refs.introRef.clientHeight
            this.$bus.$emit('scrollTo', { offset })
        }
    }
}
</script>

<template>
    <section ref="introRef" class="intro" :style="introStyle">
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
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
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
