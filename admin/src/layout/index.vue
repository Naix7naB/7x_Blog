<script>
import Sidebar from './components/sidebar'
import Navbar from './components/navbar'
import AppMain from './components/appMain'

export default {
    name: 'Layout',
    components: { Sidebar, Navbar, AppMain }
}
</script>

<template>
    <el-container class="layout">
        <el-aside>
            <Sidebar />
        </el-aside>
        <el-container>
            <el-header class="layout-navbar" height="80px">
                <Navbar />
            </el-header>
            <el-main>
                <AppMain />
            </el-main>
        </el-container>
    </el-container>
</template>

<style lang="scss" scoped>
.layout {
    @include full-fixed();
}

.layout-navbar {
    background-color: #fff;
    box-shadow: 1px 4px 16px rgba($color: $bg-reverse, $alpha: .5);
}
</style>
