<script>
export default {
    props: {
        list: {
            type: Array,
            required: true
        }
    }
}
</script>

<template>
    <ul class="navbar-menu">
        <li class="navbar-menu--item" v-for="item in list" :key="item.name">
            <fa-icon :icon="['fas', item.icon]" />
            <span class="menu-item--title">{{item.title}}</span>
        </li>
    </ul>
</template>

<style lang="scss" scoped>
.navbar-menu {
    display: flex;
}

.navbar-menu--item {
    width: 100PX;
    margin: 0 6PX;
    padding: 12PX;
    border-radius: 4PX;
    text-align: center;

    &:hover {
        background-color: rgba($color: #333, $alpha: .7);
    }
}

.menu-item--title {
    margin-left: 8PX;
}
</style>
