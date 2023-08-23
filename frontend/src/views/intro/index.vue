<script>
import InfoCard from './components/infoCard'

export default {
    components: { InfoCard }
}
</script>

<template>
    <section class="intro-page">
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
/* 网站介绍页面样式 */
.intro-page {
    @include full-fixed();
    @include layer-mask(fixed);
    @include bg-image('@/assets/images/bg.png', no-repeat, center, cover);
}

.intro-enter--button {
    position: absolute;
    bottom: 2px;
    left: 50%;
    padding: 10px;
    color: $cl-theme;
    background-color: transparent;
    transform: translateX(-50%);
    cursor: pointer;
}
</style>
