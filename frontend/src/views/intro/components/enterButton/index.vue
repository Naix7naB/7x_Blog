<script>
export default {
    name: 'EnterButton'
}
</script>

<template>
    <span class="intro-enter--button" @click="$router.push({ name: 'Home' })">
        <fa-icon
            bounce
            size="3x"
            icon="fa-solid fa-caret-down"
            style="--fa-animation-duration: 2s"
        />
    </span>
</template>

<style lang="scss" scoped>
.intro-enter--button {
    @include pointer();
    position: absolute;
    bottom: 2PX;
    left: 50%;
    padding: 10PX;
    color: $cl-theme;
    background-color: transparent;
    transform: translateX(-50%);
}
</style>
