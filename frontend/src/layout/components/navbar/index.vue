<script>
import Logo from './Logo'
import Menu from './Menu'

import { mapGetters } from 'vuex'

export default {
    name: 'Navbar',
    components: { Logo, Menu },
    computed: {
        ...mapGetters(['getScrollY', 'getScrollRatio', 'getNavbarShowState']),
        navbarStyle() {
            let blurCount = 0, bgColor = 'transparent', shadow = 'none', transform = 'none'
            if (this.getScrollY > 0) {
                blurCount = Math.min(this.getScrollY / 50, 20)
                bgColor = `rgba(55, 56, 58, ${Math.min(this.getScrollRatio, .9)})`
                shadow = `0 2px 30px 0 rgba(85, 86, 88, ${Math.min(this.getScrollRatio, .8)})`
            }
            if (this.getNavbarShowState) {
                transform = 'translate3d(0, -80px, 1px)'
            }
            return {
                backdropFilter: `blur(${blurCount}px)`,
                backgroundColor: bgColor,
                boxShadow: shadow,
                transform: transform
            }
        }
    }
}
</script>

<template>
    <el-row class="navbar" tag="header" type="flex" align="middle" :style="navbarStyle">
        <el-col :xs="16" :sm="8">
            <Logo />
        </el-col>
        <el-col :xs="8" :sm="16">
            <Menu />
        </el-col>
    </el-row>
</template>

<style lang="scss" scoped>
/* 导航栏样式 */
.navbar {
    z-index: 100;
    position: fixed;
    top: 0;
    width: 100%;
    height: 80px;
    padding: 1% 5%;
    transition: transform .5s;
}
</style>
