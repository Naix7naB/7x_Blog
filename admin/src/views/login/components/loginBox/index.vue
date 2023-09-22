<script>
import BaseForm from '@/components/form'
import { login, register } from '@/apis/login'
import { encrypt } from '@/utils'
import { login as loginForm, register as registerForm } from '@/config/loginForm.config'
import { mapActions } from 'vuex'

export default {
    name: 'LoginBox',
    components: { BaseForm },
    props: {
        isShow: {
            type: Boolean,
            required: true
        }
    },
    computed: {
        loginForm() {
            return loginForm
        },
        registerForm() {
            return registerForm
        },
        transitionName() {
            return this.isShow ? 'out-up' : 'pull-out'
        },
        getFormTitle() {
            return this.isShow ? '登录' : '注册'
        },
        currentForm() {
            return this.isShow ? this.$refs.login : this.$refs.register
        },
        currentRequest() {
            return this.isShow ? login : register
        }
    },
    methods: {
        ...mapActions('user', ['loadKey', 'setToken', 'setUserInfo']),
        handleRequest() {
            this.currentForm.submitForm(async data => {
                /* 获取加密密钥 处理表单数据 */
                await this.loadKey()
                const encryptKey = this.$store.getters.key
                /* 对密码进行加密处理 */
                data.password = encrypt(data.password, encryptKey)
                this.currentRequest(data).then(res => {
                    const { token, ...userInfo } = res.data
                    this.setToken(token)
                    this.setUserInfo(userInfo)
                    this.reset()
                    this.$router.push('/')
                    this.$notify.success(res.errMsg)
                }).catch(err => {
                    this.$message.error(err.errMsg || err)
                })
            })
        },
        reset() {
            this.currentForm.resetFormData()
        }
    }
}
</script>

<template>
    <div class="login-box">
        <transition :name="transitionName">
            <div v-if="isShow" class="form-container login-form" key="login">
                <BaseForm ref="login" v-bind="loginForm">
                    <span slot="title" class="form-title">{{ getFormTitle }}</span>
                    <el-button slot="opt" type="primary" round @click="handleRequest">
                        {{ getFormTitle }}
                    </el-button>
                </BaseForm>
            </div>
            <div v-else class="form-container register-form" key="register">
                <BaseForm ref="register" v-bind="registerForm">
                    <span slot="title" class="form-title">{{ getFormTitle }}</span>
                    <el-button slot="opt" type="primary" round @click="handleRequest">
                        {{ getFormTitle }}
                    </el-button>
                </BaseForm>
            </div>
        </transition>
        <div class="form-mask"></div>
    </div>
</template>

<style lang="scss" scoped>
/* 样式穿透 hook ElementUI 样式 */
:deep(.el-form) {
    width: 100%;
    padding: 50px;
}

:deep(.el-form-item) {
    margin: 0;
}

:deep(.el-form-item + .el-form-item) {
    margin-top: 20px;
}

:deep(.el-form-item[type='opt']) {
    margin-top: 30px;
}

:deep(.el-input input) {
    border: 0;
    border-radius: 0;
    border-bottom: 1px solid;
}

:deep(.el-button) {
    width: 100%;
}

/* 登录/注册 表单样式 */
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
    display: flex;
    position: absolute;
    top: 0;
    width: 50%;
    height: 100%;
    align-items: center;
}

.login-form {
    left: 0;
}

.register-form {
    right: 0;
}

.form-title {
    font-weight: bold;
    font-size: 32px;
    color: #000000;
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
    transform: translate3d(0, 30%, 0);
}

.pull-out-leave-to.login-form {
    opacity: 0;
    transform: translate3d(0, -30%, 0);
}

.pull-out-enter.registry-form,
.out-up-leave-to.registry-form {
    z-index: 5;
    opacity: 0;
    transform: translate3d(-30%, 0, 0);
}

.out-up-enter-active,
.out-up-leave-active,
.pull-out-enter-active,
.pull-out-leave-active {
    transition: all .6s ease-in-out;
}
</style>
