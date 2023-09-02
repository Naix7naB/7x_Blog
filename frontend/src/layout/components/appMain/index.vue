<script>
import { mapActions } from 'vuex'

export default {
    name: 'AppMain',
    data() {
        return {
            scroller: null
        }
    },
    methods: {
        ...mapActions(['setScrollY']),
        onScroll(position) {
            this.setScrollY(Math.floor(position.scrollTop))
        },
        scrollTo({ offset, duration = 1000 }) {
            this.scroller.scrollTo({ y: offset }, duration)
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
    overflow: hidden;
    width: 100%;
    height: 100%;
}
</style>
