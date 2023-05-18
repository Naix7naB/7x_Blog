<script>
export default {
  name: 'AsideMenuItem',
  props: {
    index: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      default: null
    },
    title: {
      type: String,
      required: true
    }
  }
}
</script>

<template>
  <el-menu-item class="menu-item" :index="index">
    <fa-icon v-if="icon" :icon="['fas', icon]" class="menu-item--icon" />
    <span class="menu-title">{{ title }}</span>
  </el-menu-item>
</template>

<style lang="scss" scoped>
.menu-item--icon {
  margin-right: 10PX;
}
</style>
