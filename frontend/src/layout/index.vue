<script>
import Navbar from './components/navbar'
import AppMain from './components/appMain'
import Toolbar from './components/toolbar'

export default {
    name: 'PageLayout',
    components: { Navbar, AppMain, Toolbar }
}
</script>

<template>
    <div class="page-layout">
        <Navbar />
        <Toolbar />
        <AppMain />
    </div>
</template>

<style lang="scss">
/* 页面排版样式 */
.page-layout {
    @include fullscreen();
}
</style>
