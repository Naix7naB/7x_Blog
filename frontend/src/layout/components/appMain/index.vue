<script>
export default {
    name: 'AppMain'
}
</script>

<template>
    <main class="app-main">
        <transition name="fade" mode="out-in">
            <router-view :key="this.$route.name" />
        </transition>
    </main>
</template>

<style lang="scss" scoped>
.app-main {
    overflow: hidden;
}
</style>
