<script>
import Navbar from './components/navbar'
import AppMain from './components/appMain'
import ScrollMixin from './mixins/scroll'

export default {
    name: 'Layout',
    components: { Navbar, AppMain },
    mixins: [ScrollMixin]
}
</script>

<template>
    <div class="layout">
        <v-scroll ref="scroller" @handle-scroll="onScroll">
            <Navbar />
            <AppMain />
        </v-scroll>
    </div>
</template>

<style lang="scss" scoped>
/* 样式穿透 hook VueScroll 样式 */
:deep(.__rail-is-vertical) {
  z-index: 900 !important;
}

/* 页面排版样式 */
.layout {
    @include full-fixed();
    background-color: #24272d;
}
</style>
