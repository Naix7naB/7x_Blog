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
      <el-header class="header" height="80px">
        <AdminHeader />
      </el-header>
    </template>
    <template #main>
      <el-main>
        <router-view />
      </el-main>
    </template>
  </Layout>
</template>

<style lang="scss" scoped>
.header {
  background-color: #fff;
  box-shadow: 1PX 4PX 16PX rgba($color: $bg-reverse, $alpha: .5);
}
</style>
