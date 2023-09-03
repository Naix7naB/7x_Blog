<script>
export default {
    name: 'AppMain'
}
</script>

<template>
    <!-- <transition name="fade" mode="out-in"> -->
    <router-view :key="this.$route.name" />
    <!-- </transition> -->
</template>

<style lang="scss" scoped></style>
