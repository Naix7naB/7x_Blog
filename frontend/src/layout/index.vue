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
/* 样式穿透 hook ElementUI 样式 */
.el-avatar {
    display: block !important;
}

.el-image {
    display: block !important;
    height: 100% !important;
}

.el-image.background {
    @include image-mask();
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
    @include fullscreen();
    @include text-color(text-primary);
    @include bg-color(bg-theme);
    user-select: none;
    transition: color .5s ease-in-out, background-color .5s ease-in-out;
}
</style>
