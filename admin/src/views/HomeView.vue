<script>
import { Table } from '@/components'

export default {
  name: 'HomeView',
  components: { Table },
  data() {
    return {}
  }
}
</script>

<template>
  <Table>
    <template #table-header>table-header</template>
  </Table>
</template>

<style lang="scss" scoped>
.header {
  background-color: #fff;
  box-shadow: 1PX 4PX 16PX rgba($color: $bg-reverse, $alpha: .5);
}
</style>
