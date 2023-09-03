<script>
import resize from '../mixins/resize'
import useChart from './chart'
import { option } from '@/config/chart.config'

export default {
    mixins: [resize],
    props: {
        width: {
            type: String,
            default: '100%'
        },
        height: {
            type: String,
            default: '300px'
        }
    },
    data() {
        return {
            chart: null
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.chart = useChart(this.$refs.pieChart, option)
        })
    },
    beforeDestroy() {
        if (!this.chart) return false
        this.chart.dispose()
        this.chart = null
    }
}
</script>

<template>
    <div ref="pieChart" :style="{ width: width, height: height }"></div>
</template>
