<script>
import { InfoCard, EnterButton } from './components'

export default {
    components: { InfoCard, EnterButton }
}
</script>

<template>
    <section class="intro-container">
        <InfoCard />
        <EnterButton />
    </section>
</template>

<style lang="scss" scoped>
.intro-container {
    width: 100%;
    height: 100%;
}
</style>
