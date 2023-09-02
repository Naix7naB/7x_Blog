<script>
import Navbar from './components/navbar'
import AppMain from './components/appMain'

export default {
    name: 'PageLayout',
    components: { Navbar, AppMain }
}
</script>

<template>
    <div class="page-layout">
        <Navbar />
        <AppMain />
    </div>
</template>

<style lang="scss">
/* 样式穿透 hook ElementUI 样式 */
.el-avatar {
    display: block !important;
}

.el-image {
    display: block !important;
    height: 100% !important;
}

.el-image.background {
    @include layer-mask();
}

.el-image__inner {
    object-position: center !important;
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
