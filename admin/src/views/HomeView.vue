<script>
import { Layout, AdminAside } from '@/components'

export default {
  name: 'HomeView',
  components: { Layout, AdminAside },
  data() {
    return {}
  }
}
</script>

<template>
  <Layout>
    <template #aside>
      <AdminAside />
    </template>
    <template #header>
      <el-header>header</el-header>
    </template>
    <template #main>
      <el-main>main</el-main>
    </template>
  </Layout>
</template>

<style lang="scss" scoped></style>
