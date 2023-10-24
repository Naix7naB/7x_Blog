<script>
import VueScroll from 'vuescroll/dist/vuescroll-native'
import VueScrollConfig from '@/config/vuescroll.config'

export default {
    name: 'AppMain',
    components: { VueScroll },
    data() {
        return {
            scroller: null,
            scrollerOps: VueScrollConfig
        }
    },
    watch: {
        $route() {
            this.refresh()
            this.scrollTo({ offset: 0, duration: 100 })
        }
    },
    methods: {
        onScroll(position) {
            this.$store.dispatch('scroll/setScrollY', position.scrollTop)
        },
        scrollTo({ offset, duration = 1000 }) {
            this.scroller && this.scroller.scrollTo({ y: offset }, duration)
        },
        refresh() {
            this.scroller && this.scroller.refresh()
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.scroller = this.$refs.scroller
            this.$bus.$on('scrollTo', this.scrollTo)
        })
    }
}
</script>

<template>
    <main class="app-main">
        <vue-scroll ref="scroller" :ops="scrollerOps" @handle-scroll="onScroll">
            <router-view :key="this.$route.name" />
        </vue-scroll>
    </main>
</template>

<style lang="scss" scoped>
.app-main {
    @include bg-color(bg-primary);
    user-select: none;
    width: 100%;
    height: 100%;
    transition: background-color .3s ease-in-out;
}
</style>
