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
    justify-content: flex-end;
}

.navbar-menu--item {
    margin: 0 4PX;
    padding: 8PX;
    border-radius: 6PX;
    text-align: center;
    transition: background-color .3s ease-in;
    cursor: pointer;

    &:hover {
        background-color: $bg-theme-ll;
    }
}

.menu-item--title {
    margin-left: 8PX;
}
</style>
