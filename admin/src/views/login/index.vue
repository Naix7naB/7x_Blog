<script>
import { LoginBox, LoginOverlay } from '@/components'

export default {
    name: 'Login',
    components: { LoginBox, LoginOverlay },
    data() {
        return {
            isShow: true
        }
    },
    methods: {
        showLogin() {
            this.isShow = !this.isShow
            this.$refs.loginBox.reset()
        }
    }
}
</script>

<template>
    <div class="admin-login--container">
        <div class="admin-login">
            <LoginBox ref="loginBox" :isShow="isShow" />
            <LoginOverlay :isShow="isShow" @showLogin="showLogin" />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.admin-login--container {
    @include full-fixed();
    background-image: linear-gradient(to left top, #8841d6, #8245d6, #7c49d6, #774cd6, #714fd5, #6758d9, #5e60db, #5568dd, #4876e0, #4182e1, #428ee0, #4b98de);
}

.admin-login {
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
</style>
