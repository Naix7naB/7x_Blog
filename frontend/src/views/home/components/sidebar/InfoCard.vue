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
    @include text-color(text-primary, .8);
    @include bg-color(bg-highlight);
    @include shadow-color(shadow, .8);
    margin-bottom: 40px;
    padding: 24px;
    border-radius: 10px;
    transition: color .3s ease-in-out, background-color .3s ease-in-out, box-shadow .3s ease;

    &:hover {
        @include shadow-color(shadow-hover, .5, 1);
    }
}
</style>
