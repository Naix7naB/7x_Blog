<script>
import LoginForm from './LoginForm'
import { mapActions } from 'vuex'
import { login, registry } from '@/apis/login'
import { encrypt, goToPath } from '@/utils/util'
import { loginData, loginItems } from '@/config/login.config'
import { registerData, registerItems } from '@/config/register.config'

export default {
    name: 'LoginBox',
    components: { LoginForm },
    props: {
        isShow: {
            type: Boolean,
            required: true
        }
    },
    computed: {
        /* 过渡名称 */
        transitionName() {
            return this.isShow ? 'out-up' : 'pull-out'
        },
        /* 当前表单标题 */
        currentFormTitle() {
            return this.isShow ? '登录' : '注册'
        },
        /* 当前表单数据 */
        currentFormData() {
            return this.isShow ? loginData : registerData
        },
        /* 当前表单每项配置 */
        currentFormItems() {
            return this.isShow ? loginItems : registerItems
        },
        /* 当前表单元素 */
        currentFormRef() {
            return this.isShow ? this.$refs.loginForm : this.$refs.registerForm
        },
        /* 当前表单提交的请求方法 */
        currentRequest() {
            return this.isShow ? login : registry
        },
        /* 当前表单操作按钮配置 */
        currentFormOpt() {
            return {
                action: this.handleRequest,
                config: {
                    type: 'primary',
                    round: true,
                    text: this.currentFormTitle
                }
            }
        }
    },
    methods: {
        ...mapActions('user', ['loadKey', 'setToken', 'setUserInfo']),
        async handleRequest(data) {
            /* 验证表单 */
            if (!this.currentFormRef.isValidate()) {
                this.$message.warning('表单验证失败')
                return false
            }
            /* 获取加密密钥 处理表单数据 */
            await this.loadKey()
            const encryptKey = this.$store.getters.key
            data.password = encrypt(data.password, encryptKey)
            /* 发送请求 */
            this.currentRequest(data).then(res => {
                const { token, ...userInfo } = res.data
                this.setToken(token)
                this.setUserInfo(userInfo)
                this.reset()
                goToPath({ target: 'Home' })
                this.$notify.success(res.errMsg)
            }).catch(err => {
                this.$message.error(err.errMsg || err)
            })
        },
        reset() {
            this.currentFormRef.resetForm()
        }
    }
}
</script>

<template>
    <div class="login-box">
        <transition :name="transitionName">
            <div v-if="isShow" key="login" class="form-container login-form">
                <LoginForm
                    ref="loginForm"
                    :title="currentFormTitle"
                    :raw="currentFormData"
                    :items="currentFormItems"
                    :optItem="currentFormOpt"
                />
            </div>
            <div v-else key="register" class="form-container register-form">
                <LoginForm
                    ref="registerForm"
                    :title="currentFormTitle"
                    :raw="currentFormData"
                    :items="currentFormItems"
                    :optItem="currentFormOpt"
                />
            </div>
        </transition>
        <div class="form-mask"></div>
    </div>
</template>

<style lang="scss" scoped>
/* 登录/注册 基础样式 */
.login-box {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #ffffff;
}

.form-container {
    z-index: 15;
    position: absolute;
    display: flex;
    align-items: center;
    top: 0;
    width: 50%;
    height: 100%;

    &.login-form {
        left: 0;
    }

    &.register-form {
        right: 0;
    }
}

.form-mask {
    z-index: 10;
    position: absolute;
    top: 0;
    left: 0;
    width: 50%;
    height: 100%;
    background-color: #ffffff;
}

/* 过渡效果 */
.out-up-enter.login-form {
    opacity: 0;
    transform: translate3d(0, 50%, 0);
}

.pull-out-leave-to.login-form {
    opacity: 0;
    transform: translate3d(0, -50%, 0);
}

.pull-out-enter.register-form,
.out-up-leave-to.register-form {
    z-index: 5;
    opacity: 0;
    transform: translate3d(-50%, 0, 0);
}

.out-up-enter-active,
.out-up-leave-active,
.pull-out-enter-active,
.pull-out-leave-active {
    transition: all .6s ease-in-out;
}
</style>
