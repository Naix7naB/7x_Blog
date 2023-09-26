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
    @include bg-color(bg-sub-theme);
    margin-bottom: 40px;
    padding: 24px;
    border-radius: 10px;
}
</style>
