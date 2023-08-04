<script>
import avatar from '@/assets/images/avatar-default.png'

export default {
    props: {
        list: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            avatar
        }
    }
}
</script>

<template>
    <div class="navbar-menu">
        <ul class="navbar-menu--list">
            <li class="navbar-menu--item" v-for="item in list" :key="item.name">
                <fa-icon :icon="['fas', item.icon]" />
                <span class="menu-item--title">{{item.title}}</span>
            </li>
        </ul>
        <div class="navbar-menu--avatar">
            <el-avatar size="small" :src="avatar">
                <fa-icon icon="fas fa-user" />
            </el-avatar>
        </div>
    </div>
</template>

<style lang="scss" scoped>
:deep(.el-avatar) {
    display: block;
}

.navbar-menu {
    display: flex;
    justify-content: flex-end;
    align-items: center;
}

.navbar-menu--list {
    @include clearfix();
}

.navbar-menu--item {
    float: left;
    margin: 0 4PX;
    padding: 8PX;
    border-radius: 6PX;
    transition: background-color .3s ease-in;
    cursor: pointer;

    &:hover {
        background-color: $bg-theme-ll;
    }
}

.menu-item--title {
    margin-left: 8PX;
}

.navbar-menu--avatar {
    margin-left: 10px;
    cursor: pointer;
}
</style>
