export default {
    data() {
        return {
            scrollY: 0,
            deltaY: 0,
            maxTransformY: 600
        }
    },
    computed: {
        isScrollDown() {
            return this.deltaY > 0
        },
        scrollRatio() {
            return Math.min((this.scrollY / this.maxTransformY) * 100, 100) / 100
        }
    },
    methods: {
        initScroller() {
            this.$bus.$on('scrollTo', this.scrollTo)
            this.refreshScroller()
        },
        onScroll(e) {
            this.deltaY = e.scrollTop - this.scrollY
            this.scrollY = e.scrollTop
        },
        scrollTo({ offset, duration = 1000 }) {
            this.$refs.scroller.scrollTo({ y: offset }, duration, 'easeInOutCubic')
        },
        refreshScroller() {
            this.$refs.scroller.refresh()
        },
        destroyScroller() {
            this.$refs.scroller.stop()
        }
    },
    mounted() {
        if (this.$refs.scroller) {
            this.initScroller()
        }
    },
    beforeDestroy() {
        if (this.$refs.scroller) {
            this.destroyScroller()
        }
    }
}
