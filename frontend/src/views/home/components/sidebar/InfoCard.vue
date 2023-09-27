<script>
export default {
    name: 'InfoCard',
    data() {
        return {}
    }
}
</script>

<template>
    <div class="info-card">
        <slot name="label" />
        <slot name="default" />
    </div>
</template>

<style lang="scss" scoped>
.info-card {
    @include bg-color(bg-highlight);
    @include shadow-color(shadow, .8, shadow-hover, .5);
    margin-bottom: 40px;
    padding: 24px;
    border-radius: 10px;
    transition: background-color .5s ease-in-out, box-shadow .3s ease;
}
</style>
