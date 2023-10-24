<script>
import Logo from './Logo'
import Menu from './Menu'

export default {
    name: 'Navbar',
    components: { Logo, Menu },
    computed: {
        navbarStyle() {
            const theme = this.$store.getters.theme
            const scrollTop = this.$store.getters.scrollTop
            const scrollRatio = this.$store.getters.scrollRatio
            const navbarVisibility = this.$store.getters.navbarVisibility
            const alpha = Math.min(scrollRatio, .9)
            let blurCount = 0, bgColor = 'transparent', color = 'rgba(237, 237, 237, .8)', shadow = 'none', transform = 'none'
            if (scrollTop > 0) {
                color = theme === 'light' ? 'rgba(51, 52, 53, .8)' : color
                bgColor = theme === 'light' ? `rgba(223, 223, 223, ${alpha})` : `rgba(51, 52, 53, ${alpha})`
                shadow = theme === 'light' ? `0 2px 30px 0 rgba(193, 193, 193, ${alpha})` : `0 2px 30px 0 rgba(65, 66, 67, ${alpha})`
                blurCount = Math.min(scrollTop / 50, 20)
            }
            if (navbarVisibility) {
                transform = 'translate(0, -80px)'
            }
            return {
                color: color,
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
    transition: transform .5s ease;
}
</style>
