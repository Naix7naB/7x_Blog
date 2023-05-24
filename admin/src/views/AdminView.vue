<script>
import { Layout, AdminAside, AdminHeader } from '@/components'

export default {
    name: 'AdminView',
    components: { Layout, AdminAside, AdminHeader }
}
</script>

<template>
    <Layout>
        <template #aside>
            <el-aside>
                <AdminAside />
            </el-aside>
        </template>
        <template #header>
            <el-header class="admin-header" height="80px">
                <AdminHeader />
            </el-header>
        </template>
        <template #main>
            <el-main>
                <h2 class="admin-main--title">{{ $route.meta.title }}</h2>
                <router-view />
            </el-main>
        </template>
    </Layout>
</template>

<style lang="scss" scoped>
.admin-header {
    background-color: #fff;
    box-shadow: 1PX 4PX 16PX rgba($color: $bg-reverse, $alpha: .5);
}

.admin-main--title {
    margin-bottom: 24PX
}
</style>
