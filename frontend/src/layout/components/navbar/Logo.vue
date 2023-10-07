<script>
export default {
    name: 'Logo',
    computed: {
        siteName() {
            return this.$store.getters.siteInfo?.name
        }
    }
}
</script>

<template>
    <h1 class="navbar-logo">
        <span class="navbar-logo--wrapper"><fa-icon icon="fas fa-blog" /> {{ siteName }}</span>
    </h1>
</template>

<style lang="scss" scoped>
/* 导航栏logo样式 */
.navbar-logo--wrapper {
    color: inherit;
    font-size: $fz-2x;
    font-weight: 700;
    transition: color .3s ease-in-out;
    cursor: pointer;
}
</style>
