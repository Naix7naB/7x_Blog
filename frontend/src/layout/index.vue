<script>
import Navbar from './components/navbar'
import AppMain from './components/appMain'

import { mapActions } from 'vuex'

export default {
    name: 'PageLayout',
    components: { Navbar, AppMain },
    methods: {
        ...mapActions(['setScrollY']),
        onScroll({ scrollTop }) {
            this.setScrollY(scrollTop)
        },
        scrollTo({ offset, duration = 1000 }) {
            this.$refs.scroller.scrollTo({ y: offset }, duration, 'easeInOutCubic')
        }
    },
    mounted() {
        this.$bus.$on('scrollTo', this.scrollTo)
        this.$refs.scroller.refresh()
    },
    beforeDestroy() {
        this.$refs.scroller.stop()
    }
}
</script>

<template>
    <div class="page-layout">
        <v-scroll ref="scroller" @handle-scroll="onScroll">
            <Navbar />
            <AppMain />
        </v-scroll>
    </div>
</template>

<style lang="scss">
/* 样式穿透 hook ElementUI 样式 */
.el-image {
    display: block !important;
    height: 100% !important;
}

.el-image__inner {
    object-position: top !important;
}

/* 样式穿透 hook VueScroll 样式 */
.__rail-is-vertical {
  z-index: 900 !important;
}

/* 页面排版样式 */
.page-layout {
    @include full-fixed();
    background-color: #24272d;
}
</style>
