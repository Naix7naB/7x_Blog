<script>
import AsideLogo from './components/aside-logo/AsideLogo'
import AsideMenu from './components/aside-menu/AsideMenu'

export default {
    name: 'AdminAside',
    components: { AsideLogo, AsideMenu },
    data() {
        return {}
    }
}
</script>

<template>
    <div class="admin-aside">
        <AsideLogo />
        <AsideMenu />
    </div>
</template>

<style lang="scss" scoped>
.admin-aside {
    display: flex;
    flex-direction: column;
    height: 100%;
    color: #303133;
    background-color: #fff;
}
</style>
