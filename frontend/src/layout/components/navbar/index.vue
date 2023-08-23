<script>
import Logo from './Logo'
import Menu from './Menu'
import ScrollMixin from '@/layout/mixins/scroll'

export default {
    name: 'navbar',
    components: { Logo, Menu },
    mixins: [ScrollMixin],
    computed: {
        navbarStyle() {
            let blurCount = 0, bgColor = 'transparent', shadow = 'none', transform = 'none'
            if (this.scrollY > 0) {
                blurCount = Math.min(this.scrollY / 50, 20)
                bgColor = `rgba(57, 57, 57, ${Math.min(this.ratio, .7)})`
                shadow = `0 2px 20px rgba(57, 57, 57, ${Math.min(this.ratio, .7)})`
            }
            if (this.scrollY > this.maxTransformY && this.isScrollDown) {
                transform = 'translate3d(0, 80px, 1px)'
            }
            return {
                backgroundColor: bgColor,
                backdropFilter: `blur(${blurCount}px)`,
                boxShadow: shadow,
                transform: transform
            }
        }
    }
}
</script>

<template>
    <header class="navbar" :style="navbarStyle">
        <el-row type="flex" align="middle">
            <el-col :xs="16" :sm="8">
                <Logo />
            </el-col>
            <el-col :xs="8" :sm="16">
                <Menu />
            </el-col>
        </el-row>
    </header>
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
