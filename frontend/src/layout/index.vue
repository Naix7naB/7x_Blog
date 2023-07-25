<script>
import { Navbar, AppMain } from './components'

export default {
    name: 'Layout',
    components: { Navbar, AppMain }
}
</script>

<template>
    <div class="layout">
        <header class="layout-navbar">
            <Navbar />
        </header>
        <main class="layout-main">
            <AppMain />
        </main>
    </div>
</template>

<style lang="scss" scoped>
.layout {
    width: 100%;
    height: 100%;
}

.layout-navbar {
    background-color: #fff;
    box-shadow: 1px 4px 16px rgba($color: $bg-reverse, $alpha: .5);
}

.layout-main {
    height: 100%;
}
</style>
