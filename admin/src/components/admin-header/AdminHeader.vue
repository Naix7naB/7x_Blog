<script>
import avatar from '@/assets/images/avatar-default.png'

export default {
    name: 'AdminHeader',
    data() {
        return {
            defaultAvatar: avatar
        }
    }
}
</script>

<template>
    <div class="admin-header--wrap">
        <div class="header-notify">
            <el-badge value="2">
                <fa-icon :icon="['fas', 'bell']" />
            </el-badge>
        </div>
        <el-dropdown class="header-dropdown" placement="bottom">
            <el-avatar :src="defaultAvatar"></el-avatar>
            <span class="dropdown-name">Naixxx</span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>个人资料</el-dropdown-item>
                <el-dropdown-item>修改密码</el-dropdown-item>
                <el-dropdown-item>
                    <fa-icon :icon="['fas', 'arrow-right-from-bracket']" />
                    <span class="dropdown-quit">退出</span>
                </el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
</template>

<style lang="scss" scoped>
.admin-header--wrap {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 100%;

    .header-notify,
    .header-dropdown {
        margin: 0 16PX;
        @include pointer();
    }

    .header-dropdown {
        display: flex;
        align-items: center;
        font-size: $fz-large;
    }

    .dropdown-name {
        padding-left: 10PX;
    }
}

.dropdown-quit {
    padding-left: 6PX;
}
</style>
