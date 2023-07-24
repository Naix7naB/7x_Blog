<script>
import { Navbar, AppMain } from './components'

export default {
    name: 'Layout',
    components: { Navbar, AppMain }
}
</script>

<template>
    <el-container class="layout">
        <el-header class="layout-navbar" height="80px">
            <Navbar />
        </el-header>
        <el-main>
            <AppMain />
        </el-main>
    </el-container>
</template>

<style lang="scss" scoped>
.layout {
    width: 100%;
    height: 100%;
}

.layout-navbar {
    background-color: #fff;
    box-shadow: 1px 4px 16px rgba($color: $bg-reverse, $alpha: .5);
}
</style>
