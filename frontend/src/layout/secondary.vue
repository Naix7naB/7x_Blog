<script>
export default {
    name: 'SecondaryLayout',
    data() {
        return {
            label: ''
        }
    },
    computed: {
        background() {
            return process.env.VUE_APP_SCENERY_IMAGE_URL
        },
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
            <el-image class="is-background" fit="cover" :src="background" />
            <h3 class="cover-title">{{ secondTitle }}</h3>
        </div>
        <div class="secondary-content">
            <router-view />
        </div>
    </div>
</template>

<style lang="scss" scoped>
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
