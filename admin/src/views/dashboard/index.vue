<script>
import HeatMap from './components/heatMap'
import PanelGroup from './components/panelGroup'
import ChartGroup from './components/chartGroup'

export default {
    name: 'Dashboard',
    components: { HeatMap, PanelGroup, ChartGroup },
    data() {
        return {}
    }
}
</script>

<template>
    <div class="dashboard">
        <PanelGroup />
        <HeatMap />
        <ChartGroup />
    </div>
</template>

<style lang="scss">
.dashboard {
    padding: 24px 0;
}
</style>
