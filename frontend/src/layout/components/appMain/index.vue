<script>
import ScrollContainer from './ScrollContainer'

export default {
    name: 'AppMain',
    components: { ScrollContainer }
}
</script>

<template>
    <ScrollContainer>
        <transition name="fade" mode="out-in">
            <router-view :key="this.$route.name" />
        </transition>
    </ScrollContainer>
</template>

<style lang="scss" scoped></style>
