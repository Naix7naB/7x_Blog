<script>
import { BaseTable } from '@/components'

export default {
  name: 'HomeView',
  components: { BaseTable },
  data() {
    return {}
  }
}
</script>

<template>
  <BaseTable>
    <template #table-header>table-header</template>
  </BaseTable>
</template>

<style lang="scss" scoped>
.header {
  background-color: #fff;
  box-shadow: 1PX 4PX 16PX rgba($color: $bg-reverse, $alpha: .5);
}
</style>
