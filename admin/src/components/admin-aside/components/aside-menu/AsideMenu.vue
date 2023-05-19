<script>
import AsideMenuTree from './components/aside-menu-tree/AsideMenuTree'

export default {
  name: 'AsideMenu',
  components: { AsideMenuTree },
  computed: {
    menuData() {
      const routes = this.$router.options.routes
      const filterArr = routes.filter(route => route.name === 'Admin')[0].children
      return this.handleMenu(filterArr)
    }
  },
  methods: {
    handleMenu(arr) {
      if (!arr.length) return []
      return arr.map(item => {
        return {
          name: item.name,
          icon: item.meta.icon,
          title: item.meta.title,
          children: item.children && this.handleMenu(item.children) || []
        }
      })
    }
  }
}
</script>

<template>
  <el-menu class="aside-menu" :default-active="$route.name" router>
    <AsideMenuTree :menuData="menuData" />
  </el-menu>
</template>

<style lang="scss" scoped>
.aside-menu {
  flex: 1;
  border: none;
}
</style>
