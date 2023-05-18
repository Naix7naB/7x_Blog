<script>
import { MENU_CONFIG } from './asideMenu.config'

export default {
  data() {
    return {
      menu: MENU_CONFIG,
      menuItem: () => import('./components/aside-menu-item/AsideMenuItem'),
      subMenuItem: () => import('./components/aside-submenu/AsideSubmenu')
    }
  }
}
</script>

<template>
  <el-menu class="aside-menu" :default-active="menu[0].index">
    <component
      v-for="item in menu"
      :key="item.index"
      :index="item.index"
      :icon="item.icon"
      :title="item.title"
      :children="item.children"
      :is="item.children ? subMenuItem : menuItem"
    />
  </el-menu>
</template>

<style lang="scss" scoped>
.aside-menu {
  flex: 1;
  border: none;
}
</style>
