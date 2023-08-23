<script>
import cover from '@/assets/images/bg.png'

export default {
    name: 'SecondaryLayout',
    data() {
        return {
            cover,
            title: ''
        }
    },
    methods: {
        assignTitle(text) {
            this.title = text
        },
        goBack() {
            this.$router.back()
        }
    },
    mounted() {
        this.$bus.$on('assignTitle', this.assignTitle)
    }
}
</script>

<template>
    <div>
        <div class="secondary-cover">
            <el-image fit="cover" :src="cover" />
            <h3 class="cover-title">{{ title }}</h3>
            <span v-if="$route.meta.showBack" class="back-button" @click="goBack">
                <fa-icon icon="fas fa-arrow-left" /> 返回
            </span>
        </div>
        <div class="secondary-content">
            <router-view />
        </div>
    </div>
</template>

<style lang="scss" scoped>
/* 样式穿透 hook ElementUI 样式 */
:deep(.el-image) {
    @include layer-mask();
    display: block;
    height: 100%;
}

:deep(.el-image img) {
    object-position: top;
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

.back-button {
    user-select: none;
    position: relative;
    bottom: 50px;
    left: 20%;
    padding: 4px 10px;
    border-radius: 6px;
    background-color: #8f5b23;
    cursor: pointer;
}

.secondary-content {
    max-width: 1200px;
    margin: 0 auto;
}
</style>
