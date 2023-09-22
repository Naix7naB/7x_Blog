<script>
import About from './About'

import { getWaveHtml } from '@/apis/other'
import { mapGetters } from 'vuex'

export default {
    name: 'Intro',
    components: { About },
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
        },
        insertWaveHtml() {
            const wave = document.querySelector('.hans-container')
            if (wave) return false
            getWaveHtml().then(res => {
                new Function(res.data)()
                const wave = document.querySelector('.hans-container')
                wave.style.position = 'absolute'
                wave.style.opacity = 0.8
                this.$refs.intro.appendChild(wave.parentElement)
            }).catch(err => {
                this.$message.error(err.errMsg || err)
            })
        }
    },
    mounted() {
        this.insertWaveHtml()
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
    bottom: 10px;
    left: 50%;
    padding: 10px;
    color: $cl-theme;
    background-color: transparent;
    transform: translateX(-50%);
    cursor: pointer;
}
</style>
