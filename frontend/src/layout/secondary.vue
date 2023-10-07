<script>
import cover from '@/assets/images/bg.png'

export default {
    name: 'SecondaryLayout',
    data() {
        return {
            cover,
            label: ''
        }
    },
    computed: {
        secondTitle() {
            const base = this.$route.meta.secondTitle
            return this.label ? base + ' - ' + this.label : base
        }
    },
    methods: {
        setLabel(plain) {
            this.label = plain
        }
    },
    mounted() {
        this.$bus.$on('setLabel', this.setLabel)
    }
}
</script>

<template>
    <div>
        <div class="secondary-cover">
            <el-image fit="cover" :src="cover" />
            <h3 class="cover-title">{{ secondTitle }}</h3>
        </div>
        <div class="secondary-content">
            <router-view />
        </div>
    </div>
</template>

<style lang="scss" scoped>
/* 样式穿透 hook ElementUI 样式 */
:deep(.secondary-cover > .el-image) {
    @include image-mask();
}

/* 次级页面排版样式 */
.secondary-cover {
    position: relative;
    height: 30vh;
}

.cover-title {
    position: absolute;
    top: 50%;
    left: 50%;
    font-size: 36px;
    transform: translate(-50%, -50%);
}

.secondary-content {
    margin: 0 auto;
    padding: 80px 40px;
    max-width: 1000px;
}
</style>
