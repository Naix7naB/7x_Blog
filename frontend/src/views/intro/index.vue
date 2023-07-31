<script>
import InfoCard from './InfoCard'

export default {
    components: { InfoCard }
}
</script>

<template>
    <section class="intro-container">
        <InfoCard />
        <span class="intro-enter--button" @click="$router.push({ name: 'Home' })">
            <fa-icon
                bounce
                size="3x"
                icon="fa-solid fa-caret-down"
                style="--fa-animation-duration: 2s"
            />
        </span>
    </section>
</template>

<style lang="scss" scoped>
.intro-container {
    width: 100%;
    height: 100%;
}

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
