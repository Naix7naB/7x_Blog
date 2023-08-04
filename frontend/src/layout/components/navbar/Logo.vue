<script>
export default {
    data() {
        return {
            siteName: '#7x\'s blog'
        }
    }
}
</script>

<template>
    <h1 class="navbar-logo">
        <span class="navbar-logo--wrapper" @click="$router.push({ name: 'Intro' })">
            <fa-icon icon="fas fa-blog" /> {{siteName}}
        </span>
    </h1>
</template>

<style lang="scss" scoped>
/* 导航栏logo样式 */
.navbar-logo--wrapper {
    font-size: 36px;
    font-weight: 700;
    cursor: pointer;
}
</style>
