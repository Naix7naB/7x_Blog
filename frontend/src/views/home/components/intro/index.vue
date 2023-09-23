<script>
import About from './About'
import Wave from './Wave'

import { mapGetters } from 'vuex'

export default {
    name: 'Intro',
    components: { About, Wave },
    computed: {
        ...mapGetters('site', ['getSiteInfo']),
        introStyle() {
            return {
                background: `url(${this.getSiteInfo.background})`
            }
        }
    },
    methods: {
        jumpEnter() {
            const offset = this.$refs.intro.clientHeight
            this.$bus.$emit('scrollTo', { offset })
        }
    }
}
</script>

<template>
    <section ref="intro" class="intro" :style="introStyle">
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
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
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
