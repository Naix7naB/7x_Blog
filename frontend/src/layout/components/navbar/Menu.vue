<script>
import { mapActions, mapGetters } from 'vuex'
import { goToPath } from '@/utils/util'

export default {
    name: 'Menu',
    data() {
        return {
            titleMap: {
                login: '登陆',
                logout: '登出',
                personal: '个人中心'
            }
        }
    },
    computed: {
        ...mapGetters('user', ['isLogin', 'getUserInfo']),
        dropdownCommand() {
            return this.isLogin ? 'logout' : 'login'
        },
        showing() {
            return this.$router.options.routes.filter(route => !route.hide)
        }
    },
    methods: {
        ...mapActions('user', ['clearUserInfo']),
        ...mapActions('article', ['clearArticleInfo']),
        handleCommand(command) {
            command = command.charAt(0).toUpperCase() + command.slice(1)
            const methodName = 'command' + command
            this[methodName]()
        },
        commandPersonal() {
            console.log('personal center')
        },
        commandLogin() {
            goToPath({ target: 'Login' })
        },
        commandLogout() {
            this.clearUserInfo()
            this.clearArticleInfo()
            goToPath({ target: 'Home' })
            this.$forceUpdate()
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
        <el-dropdown
            class="navbar-menu--avatar"
            placement="bottom"
            trigger="click"
            size="small"
            @command="handleCommand"
        >
            <el-avatar size="small" :src="getUserInfo?.avatar">
                <fa-icon icon="fas fa-user" />
            </el-avatar>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item v-if="isLogin" command="personal">
                    <fa-icon icon="fas fa-user" />
                    <span class="dropdown-item--title">{{ titleMap['personal'] }}</span>
                </el-dropdown-item>
                <el-dropdown-item :command="dropdownCommand">
                    <fa-icon icon="fas fa-right-from-bracket" />
                    <span class="dropdown-item--title">{{ titleMap[dropdownCommand] }}</span>
                </el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
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

.dropdown-item--title {
    margin-left: 6px;
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
