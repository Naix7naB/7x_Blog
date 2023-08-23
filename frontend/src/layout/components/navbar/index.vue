<script>
import Logo from './Logo'
import Menu from './Menu'

export default {
    name: 'navbar',
    components: { Logo, Menu }
}
</script>

<template>
    <header class="navbar">
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
