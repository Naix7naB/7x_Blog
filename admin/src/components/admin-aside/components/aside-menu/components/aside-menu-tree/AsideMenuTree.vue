<script>
export default {
    name: 'AsideMenuTree',
    props: {
        menuData: {
            type: Array,
            default: () => []
        }
    }
}
</script>

<template>
    <div>
        <template v-for="item in menuData">
            <el-submenu v-if="item.children.length" :key="item.name" :index="item.name">
                <template #title>
                    <fa-icon v-if="item.icon" class="menu-icon" :icon="['fas', item.icon]" />
                    <span>{{ item.title }}</span>
                </template>
                <AsideMenuTree :menuData="item.children" />
            </el-submenu>
            <el-menu-item v-else :key="item.name" :index="item.name" :route="{ name: item.name }">
                <fa-icon v-if="item.icon" class="menu-icon" :icon="['fas', item.icon]" />
                <span slot="title">{{ item.title }}</span>
            </el-menu-item>
        </template>
    </div>
</template>

<style lang="scss" scoped>
.menu-icon {
    margin-right: 10PX;
}
</style>
