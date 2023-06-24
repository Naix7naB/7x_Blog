<script>
import Logo from './Logo'
import SidebarItem from './SidebarItem'

export default {
    components: { Logo, SidebarItem },
    computed: {
        routes() {
            return this.$router.options.routes
        }
    }
}
</script>

<template>
    <div class="sidebar-wrap">
        <Logo />
        <el-menu mode="vertical" :default-active="$route.name" router>
            <SidebarItem v-for="route in routes" :key="route.path" :item="route" />
        </el-menu>
    </div>
</template>

<style lang="scss" scoped>
:deep(.el-menu) {
    border: 0;
}

.sidebar-wrap {
    display: flex;
    flex-direction: column;
    height: 100%;
    color: #303133;
    background-color: #fff;
}
</style>
