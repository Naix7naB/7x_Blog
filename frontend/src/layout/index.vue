<script>
import Navbar from './components/navbar'
import AppMain from './components/appMain'

export default {
    name: 'PageLayout',
    components: { Navbar, AppMain },
    data() {
        return {
            scrollY: 0,
            maxTransformY: 1200,
            navbarStyle: null
        }
    },
    methods: {
        onScroll({ scrollTop }) {
            let blurCount = 0, bgColor = 'transparent', shadow = 'none', transform = 'none'
            const isDown = scrollTop - this.scrollY > 0
            const ratio = Math.min((scrollTop / this.maxTransformY) * 100, 100) / 100
            if (scrollTop > 0) {
                blurCount = Math.min(scrollTop / 50, 20)
                bgColor = `rgba(55, 56, 58, ${Math.min(ratio, .9)})`
                shadow = `0 2px 30px 0 rgba(85, 86, 88, ${Math.min(ratio, .8)})`
            }
            if (scrollTop > this.maxTransformY && isDown) {
                transform = 'translate3d(0, -80px, 1px)'
            }
            this.scrollY = scrollTop
            this.navbarStyle = {
                backgroundColor: bgColor,
                backdropFilter: `blur(${blurCount}px)`,
                boxShadow: shadow,
                transform: transform
            }
        },
        scrollTo({ offset, duration = 1000 }) {
            this.$refs.scroller.scrollTo({ y: offset }, duration, 'easeInOutCubic')
        }
    },
    mounted() {
        this.$bus.$on('scrollTo', this.scrollTo)
        this.$refs.scroller.refresh()
    },
    beforeDestroy() {
        this.$refs.scroller.stop()
    }
}
</script>

<template>
    <div class="page-layout">
        <v-scroll ref="scroller" @handle-scroll="onScroll">
            <Navbar :style="navbarStyle" />
            <AppMain />
        </v-scroll>
    </div>
</template>

<style lang="scss" scope>
/* 样式穿透 hook VueScroll 样式 */
.__rail-is-vertical {
  z-index: 900 !important;
}

/* 页面排版样式 */
.page-layout {
    @include full-fixed();
    background-color: #24272d;
}
</style>
