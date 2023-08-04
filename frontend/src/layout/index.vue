<script>
import ScrollContainer from './components/scrollContainer'
import Navbar from './components/navbar'
import AppMain from './components/appMain'

export default {
    name: 'Layout',
    components: { ScrollContainer, Navbar, AppMain },
    data() {
        return {
            scrollY: 0,
            deltaY: 0,
            maxTransY: 560
        }
    },
    computed: {
        isDown() {
            return this.deltaY > 0
        },
        ratio() {
            return Math.min(this.scrollY / this.maxTransY * 100, 100) / 100
        },
        headerStyle() {
            let blurCount = 0, bgColor = 'transparent', shadow = 'none', transform = 'none'
            if (this.scrollY > 0) {
                blurCount = Math.min(this.scrollY / 50, 20)
                bgColor = `rgba(57, 57, 57, ${Math.min(this.ratio, .7)})`
                shadow = `0 2px 20px rgba(57, 57, 57, ${Math.min(this.ratio, .7)})`
            }
            if (this.scrollY > this.maxTransY && this.isDown) {
                const headerHeight = this.$refs.headerRef.clientHeight
                transform = `translate3d(0, ${-headerHeight}px, 1px)`
            }
            return {
                backgroundColor: bgColor,
                boxShadow: shadow,
                backdropFilter: `blur(${blurCount}px)`,
                transform: transform
            }
        }
    },
    methods: {
        handleScroll(e) {
            this.deltaY = e.scrollTop - this.scrollY
            this.scrollY = e.scrollTop
        }
    }
}
</script>

<template>
    <div class="layout">
        <ScrollContainer @handle-scroll="handleScroll">
            <header ref="headerRef" class="layout-navbar" :style="headerStyle">
                <Navbar />
            </header>
            <main class="layout-main">
                <AppMain />
            </main>
        </ScrollContainer>
    </div>
</template>

<style lang="scss" scoped>
.layout {
    width: 100%;
    height: 100%;
}

.layout-navbar {
    z-index: 100;
    position: sticky;
    top: 0;
    transition: transform .5s;
}
</style>
