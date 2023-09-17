<script>
import HeatMap from './components/heatMap'
import PanelGroup from './components/panelGroup'
import ChartGroup from './components/chartGroup'

export default {
    name: 'Dashboard',
    components: { HeatMap, PanelGroup, ChartGroup },
    data() {
        return {
            gutter: 40
        }
    }
}
</script>

<template>
    <div>
        <PanelGroup :gutter="gutter" />
        <HeatMap :gutter="gutter" />
        <ChartGroup :gutter="gutter" />
    </div>
</template>

<style lang="scss">
.el-card {
    margin-top: 20px;
}
</style>
