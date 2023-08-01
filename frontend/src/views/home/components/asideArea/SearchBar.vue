<script>
export default {
    data() {
        return {
            value: ''
        }
    },
    computed: {
        clearable() {
            return this.value
        }
    },
    methods: {
        clear() {
            this.value = ''
        },
        search() {
            console.log(this.value)
        }
    }
}
</script>

<template>
    <div class="search-bar">
        <div class="search-bar--label"><fa-icon icon="fas fa-magnifying-glass" /> 搜索文章</div>
        <div class="search-bar--input">
            <input type="text" placeholder="搜索文章" v-model="value" @keyup.enter="search" />
            <span v-if="clearable" class="search-bar--clear" @click="clear">
                <fa-icon icon="fas fa-xmark" />
            </span>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.search-bar--label {
    margin-bottom: 16PX;
    font-size: $fz-medium-x;
    font-weight: 700;
}

.search-bar--input {
    position: relative;
}

.search-bar--input input {
    width: 100%;
    height: 30PX;
    padding: 0 32PX 0 14PX;
    border: 2PX solid #39c5bb;
    border-radius: 2rem;
    background-color: #ffffff;
}

.search-bar--clear {
    position: absolute;
    top: 3PX;
    right: 12PX;
    padding: 4PX;
    cursor: pointer;
}

[data-icon="magnifying-glass"] {
    vertical-align: -.2em;
}
</style>
