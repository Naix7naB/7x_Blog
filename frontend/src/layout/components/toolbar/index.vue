<script>
export default {
    name: 'Toolbar',
    computed: {
        theme() {
            return this.$store.getters.theme
        },
        showBack2Top() {
            const scrollTop = this.$store.getters.scrollTop
            const screenHeight = window.screen.height
            return Math.ceil(scrollTop) >= Math.ceil(screenHeight / 2)
        }
    },
    methods: {
        toggleTheme() {
            this.$store.dispatch('setting/toggleTheme')
        },
        back2top() {
            if (this.showBack2Top) {
                this.$bus.$emit('scrollTo', { offset: 0 })
            }
        }
    }
}
</script>

<template>
    <div class="toolbar">
        <div class="toolbar-item" @click="toggleTheme">
            <transition name="rotate" mode="out-in">
                <span v-if="theme === 'dark'" key="light">
                    <fa-icon icon="fas fa-sun" size="xl" />
                </span>
                <span v-else key="dark">
                    <fa-icon icon="fas fa-moon" size="xl" />
                </span>
            </transition>
        </div>
        <div v-if="showBack2Top" class="toolbar-item" @click="back2top">
            <span><fa-icon icon="fas fa-arrow-up" size="xl" /></span>
        </div>
    </div>
</template>

<style lang="scss" scoped>
/* 工具栏样式 */
.toolbar {
    z-index: 10;
    position: fixed;
    right: 2em;
    bottom: 2em;
}

.toolbar-item {
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 36px;
    height: 36px;
    cursor: pointer;
}

.toolbar-item svg{
    @include text-color(text-secondary, .9);
    transition: color .3s ease-in-out;
}

.rotate-enter-active,
.rotate-leave-active {
    transition: transform .3s ease-in-out;
}

.rotate-enter,
.rotate-leave-to {
    transform: rotate(360deg);
}
</style>
