<script>
import { mapGetters } from 'vuex'

export default {
    name: 'Logo',
    computed: {
        ...mapGetters('website', ['getWebsiteInfo'])
    }
}
</script>

<template>
    <h1 class="navbar-logo">
        <span class="navbar-logo--wrapper">
            <fa-icon icon="fas fa-blog" /> {{ getWebsiteInfo?.name }}
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
