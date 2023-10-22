<script>
import LoginBox from './components/loginBox'
import LoginOverlay from './components/loginOverlay'

export default {
    name: 'LoginPage',
    components: { LoginBox, LoginOverlay },
    data() {
        return {
            isShow: true
        }
    },
    computed: {
        background() {
            return process.env.VUE_APP_SCENERY_IMAGE_API_PATH
        }
    },
    methods: {
        showLogin(flag) {
            this.isShow = flag
            this.$refs.loginBox.resetFormData()
        }
    }
}
</script>

<template>
    <div class="login-page">
        <el-image class="is-background" fit="cover" :src="background" />
        <div class="login-container">
            <LoginBox ref="loginBox" :isShow="isShow" />
            <LoginOverlay :isShow="isShow" @showLogin="showLogin" />
        </div>
    </div>
</template>

<style lang="scss">
/* 登录/注册页面样式 */
.login-page {
    @include fullscreen();
}

.login-container {
    opacity: .93;
    overflow: hidden;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 768px;
    min-height: 480px;
    border-radius: 10px;
    transform: translate(-50%, -50%);
    box-shadow: 0 14px 28px rgba(0, 0, 0, .2), 0 10px 10px rgba(0, 0, 0, .2);
}

.form-button {
    padding: 12px 48px;
    font-size: $fz-md;
    color: $cl-light-1;
    border: 1px solid $cl-light-1;
    border-radius: 2em;
    background-color: transparent;
    cursor: pointer;
}
</style>
