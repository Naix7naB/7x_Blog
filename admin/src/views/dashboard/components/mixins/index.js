import echarts from '@/plugins/echarts'

import { debounce } from '@/utils'

export default {
    data() {
        return {
            $_chart: null,
            $_sidebarElm: null,
            $_resizeHandler: null
        }
    },
    methods: {
        $_initChart() {
            this.$_chart = echarts.init(this.$refs.chart)
        },
        $_setChartOption(opt) {
            this.$_chart.setOption(opt)
        },
        $_destroyChart() {
            this.$_chart && this.$_chart.dispose()
            this.$_chart = null
        },
        $_initResizeEvent() {
            window.addEventListener('resize', this.$_resizeHandler)
        },
        $_destroyResizeEvent() {
            window.removeEventListener('resize', this.$_resizeHandler)
        },
        $_sidebarResizeHandler(e) {
            if (e.propertyName === 'width') {
                this.$_resizeHandler()
            }
        },
        $_initSidebarResizeEvent() {
            this.$_sidebarElm = document.getElementsByClassName('sidebar-container')[0]
            this.$_sidebarElm &&
                this.$_sidebarElm.addEventListener('transitionend', this.$_sidebarResizeHandler)
        },
        $_destroySidebarResizeEvent() {
            this.$_sidebarElm &&
                this.$_sidebarElm.removeEventListener('transitionend', this.$_sidebarResizeHandler)
        }
    },
    mounted() {
        this.$_resizeHandler = debounce(() => {
            if (this.$_chart) {
                this.$_chart.resize()
            }
        }, 100)
        this.$_initChart()
        this.$_initResizeEvent()
        this.$_initSidebarResizeEvent()
    },
    beforeDestroy() {
        this.$_destroyChart()
        this.$_destroyResizeEvent()
        this.$_destroySidebarResizeEvent()
    },
    activated() {
        this.$_initResizeEvent()
        this.$_initSidebarResizeEvent()
    },
    deactivated() {
        this.$_destroyResizeEvent()
        this.$_destroySidebarResizeEvent()
    }
}
