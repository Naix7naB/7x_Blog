<script>
export default {
    name: 'InfoCard',
    props: {
        iconType: {
            type: String,
            default: 'solid'
        },
        iconName: {
            type: String,
            default: ''
        },
        label: {
            type: String,
            default: ''
        },
        customClass: {
            type: String,
            default: ''
        }
    }
}
</script>

<template>
    <div :class="['info-card', customClass]">
        <div v-if="label && iconName" class="info-card--label">
            <fa-icon :icon="[iconType === 'solid' ? 'fas' : 'far', iconName]" />
            <span style="margin-left: 6px;">{{ label }}</span>
        </div>
        <slot name="default"></slot>
    </div>
</template>

<style lang="scss" scoped>
/* 卡片样式 */
.info-card {
    padding: 24px;
    border-radius: 10px;
    background-color: #24272d;
}

.info-card--label {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    line-height: $lh-medium;
    font-size: $fz-medium-x;
    font-weight: 700;
}
</style>
