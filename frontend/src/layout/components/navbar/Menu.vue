<script>
import { mapActions } from 'vuex'
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
        isLogin() {
            return this.$store.getters.isLogin
        },
        userInfo() {
            return this.$store.getters.userInfo
        },
        dropdownCommand() {
            return this.$store.getters.isLogin ? 'logout' : 'login'
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
            this.$notify.success('退出登陆')
        }
    }
}
</script>

<template>
    <div class="navbar-menu">
        <ul class="navbar-menu--list">
            <li class="navbar-menu--item" v-for="item in showing" :key="item.path">
                <router-link :to="item.redirect">
                    <fa-icon :icon="['fas', item.meta.icon]" />
                    <span class="menu-item--title">{{ item.meta.title }}</span>
                </router-link>
            </li>
        </ul>
        <el-dropdown class="navbar-menu--avatar" size="medium" @command="handleCommand">
            <el-avatar size="small" :src="userInfo?.avatar">
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
    display: flex;
    align-items: center;
    transition: color .3s ease-in-out;
}

.navbar-menu--item {
    padding: 0 8px;
}

.navbar-menu--item a {
    position: relative;
    color: inherit;

    & > svg {
        color: inherit;
    }

    &::before {
        @include bg-color(text-primary, .8);
        content: '';
        position: absolute;
        bottom: -6px;
        left: 50%;
        width: 0;
        height: 3px;
        border-radius: 4px;
        transform: translateX(-50%);
        transition: width .3s ease-in-out;
    }

    &:hover::before {
        width: 100%;
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
