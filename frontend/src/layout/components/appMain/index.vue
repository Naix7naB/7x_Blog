<script>
export default {
    name: 'AppMain',
    data() {
        return {
            scroller: null
        }
    },
    watch: {
        $route() {
            this.refresh()
            this.scrollTo({ offset: 0 })
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
        <vuescroll ref="scroller" @handle-scroll="onScroll">
            <router-view :key="this.$route.name" />
        </vuescroll>
    </main>
</template>

<style lang="scss" scoped>
.app-main {
    @include bg-color(bg-primary);
    user-select: none;
    overflow: hidden;
    width: 100%;
    height: 100%;
    transition: background-color .3s ease-in-out;
}
</style>
