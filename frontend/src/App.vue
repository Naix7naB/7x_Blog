<script>
export default {
    data() {
        return {
            transitionName: ''
        }
    },
    watch: {
        $route(to, from) {
            if (from.path === '/') return false
            if (from.name === 'Intro') {
                this.transitionName = 'slide-down'
            }
            if (to.name === 'Intro') {
                this.transitionName = 'slide-up'
            }
        }
    }
}
</script>

<template>
    <transition :name="transitionName">
        <router-view />
    </transition>
</template>
