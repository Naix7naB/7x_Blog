<script>
import mixin from '../mixins'
import { pieChart } from '@/config/chart.config'

export default {
    mixins: [mixin],
    props: {
        height: {
            type: String,
            default: '400px'
        }
    },
    computed: {
        chartOpt() {
            return pieChart
        },
        chartStyle() {
            return {
                width: '100%',
                height: '100%'
            }
        }
    },
    mounted() {
        this.$_setChartOption(this.chartOpt)
    }
}
</script>

<template>
    <div class="chart-pie dashboard-card" :style="{ height }">
        <div ref="chart" :style="chartStyle"></div>
    </div>
</template>
