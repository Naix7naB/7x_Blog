export default {
    data() {
        return {
            scroller: null,
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
        onScroll(e) {
            this.deltaY = e.scrollTop - this.scrollY
            this.scrollY = e.scrollTop
        },
        scrollTo({ offset, duration = 1000 }) {
            this.$refs.scroller.scrollTo({ y: offset }, duration, 'easeOutCubic')
        },
        refresh() {
            this.$refs.scroller.refresh()
        },
        stop() {
            this.$refs.scroller.stop()
        }
    },
    mounted() {
        if (this.$refs.scroller) {
            this.refresh()
            this.$bus.$on('scrollTo', this.scrollTo)
        }
    },
    beforeDestroy() {
        if (this.$refs.scroller) {
            this.stop()
        }
    }
}
