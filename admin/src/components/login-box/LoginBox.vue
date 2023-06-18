<script>
import { BaseForm } from '../base'
import { loginData, loginItems } from '@/config/login.config'
import { registryData, registryItems } from '@/config/registry.config'

export default {
    name: 'LoginBox',
    components: { BaseForm },
    props: {
        isShow: {
            type: Boolean,
            required: true
        }
    },
    data() {
        return {
            loginData,
            loginItems,
            registryData,
            registryItems,
            loginOptItems: [
                {
                    text: '登录',
                    type: 'primary',
                    round: true,
                    action: () => {
                        console.log('login')
                    }
                }
            ],
            registryOptItems: [
                {
                    text: '注册',
                    type: 'primary',
                    round: true,
                    action: () => {
                        console.log('registry')
                    }
                }
            ]
        }
    },
    computed: {
        formTitle() {
            return this.isShow ? '登录' : '注册'
        },
        transitionName() {
            return this.isShow ? 'out-up' : 'pull-out'
        }
    },
    methods: {
        resetFormData() {
            this.$refs.loginForm && this.$refs.loginForm.resetForm()
            this.$refs.registryForm && this.$refs.registryForm.resetForm()
        }
    }
}
</script>

<template>
    <div class="login-box">
        <transition :name="transitionName">
            <div v-if="isShow" class="form-container login-form" key="login">
                <BaseForm
                    ref="loginForm"
                    hideRequiredAsterisk
                    :formData="loginData"
                    :formItems="loginItems"
                    :optItems="loginOptItems"
                >
                    <span slot="title" class="form-title">{{ formTitle }}</span>
                </BaseForm>
            </div>
            <div v-else class="form-container registry-form" key="registry">
                <BaseForm
                    ref="registryForm"
                    hideRequiredAsterisk
                    :formData="registryData"
                    :formItems="registryItems"
                    :optItems="registryOptItems"
                >
                    <span slot="title" class="form-title">{{ formTitle }}</span>
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
    padding: 50PX;
}

:deep(.el-form-item) {
    margin: 0;
}

:deep(.el-form-item + .el-form-item) {
    margin-top: 20PX;
}

:deep(.el-form-item[type='opt']) {
    margin-top: 30PX;
}

:deep(.el-input input) {
    border: 0;
    border-radius: 0;
    border-bottom: 1PX solid;
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
    background-color: #fff;
}

.form-container {
    z-index: 20;
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

.registry-form {
    right: 0;
}

.form-title {
    font-weight: bold;
    font-size: 32px;
    color: rgba($color: #000000, $alpha: 1);
}

.form-mask {
    z-index: 10;
    position: absolute;
    top: 0;
    left: 0;
    width: 50%;
    height: 100%;
    background: #ffffff;
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
    opacity: 1;
    transition: all .6s ease-in-out;
}
</style>
