<script>
export default {
  name: 'Layout'
}
</script>

<template>
  <el-container class="layout">
    <slot name="aside"></slot>
    <el-container>
      <slot name="header"></slot>
      <slot name="main"></slot>
      <slot name="footer"></slot>
    </el-container>
  </el-container>
</template>

<style lang="scss" scoped>
.layout {
  @include full-fixed();
}
</style>
