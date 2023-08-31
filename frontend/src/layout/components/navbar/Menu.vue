<script>
import avatar from '@/assets/images/avatar-default.png'

export default {
    name: 'Menu',
    data() {
        return {
            avatar
        }
    },
    computed: {
        showing() {
            return this.$router.options.routes.filter(route => !route.hide)
        }
    }
}
</script>

<template>
    <div class="navbar-menu">
        <ul class="navbar-menu--list">
            <li class="navbar-menu--item" v-for="item in showing" :key="item.path">
                <router-link :to="item.redirect">
                    <fa-icon :icon="['fas', item.children[0].meta.icon]" />
                    <span class="menu-item--title">{{ item.children[0].meta.title }}</span>
                </router-link>
            </li>
        </ul>
        <div class="navbar-menu--avatar">
            <el-avatar size="small" :src="avatar">
                <fa-icon icon="fas fa-user" />
            </el-avatar>
        </div>
        <span class="navbar-menu--operation"><fa-icon icon="fas fa-sliders" size="2x" /></span>
    </div>
</template>

<style lang="scss" scoped>
/* 导航栏菜单样式 */
.navbar-menu {
    display: flex;
    justify-content: flex-end;
    align-items: center;
}

/* 菜单列表样式 */
.navbar-menu--list {
    @include clearfix();
}

.navbar-menu--item {
    float: left;
    margin: 0 4px;
    padding: 6px 8px;
    border-radius: 6px;
    transition: background-color .3s ease-in;

    &:hover {
        background-color: $bg-theme-ll;
    }
}

.menu-item--title {
    margin-left: 6px;
}

/* 菜单头像样式 */
.navbar-menu--avatar {
    margin-left: 10px;
    cursor: pointer;
}

.navbar-menu--operation {
    cursor: pointer;
}

/* 媒体查询样式 */
@media screen and (max-width: 1000px) {
    .navbar-menu--list,
    .navbar-menu--avatar {
        display: none !important;
    }
}

@media screen and (min-width: 1000px) {
    .navbar-menu--operation {
        display: none !important;
    }
}
</style>
