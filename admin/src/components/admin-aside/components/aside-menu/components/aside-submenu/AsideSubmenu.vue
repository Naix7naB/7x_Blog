<script>
import AsideMenuItem from '../aside-menu-item/AsideMenuItem'

export default {
  name: 'AsideSubmenu',
  components: { AsideMenuItem },
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
    },
    children: {
      type: Array,
      required: true
    }
  }
}
</script>

<template>
  <el-submenu :index="index">
    <template #title>
      <fa-icon v-if="icon" :icon="['fas', icon]" class="sub-menu--icon" />
      <span>{{ title }}</span>
    </template>
    <AsideMenuItem
      v-for="child in children"
      :key="child.index"
      :index="child.index"
      :title="child.title"
    />
  </el-submenu>
</template>

<style lang="scss" scoped>
.sub-menu--icon {
  margin-right: 10PX;
}
</style>
