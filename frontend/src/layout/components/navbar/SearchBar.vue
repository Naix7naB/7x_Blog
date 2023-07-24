<script>
export default {
    data() {
        return {
            isExtended: false,
            value: ''
        }
    },
    computed: {
        clearable() {
            return this.isExtended && this.value
        }
    },
    methods: {
        focusInput() {
            this.$nextTick(() => {
                this.$refs.input.focus()
            })
        },
        extend() {
            this.isExtended = true
            this.focusInput()
        },
        collapse() {
            if (this.value) return false
            this.isExtended = false
        },
        clear() {
            this.value = ''
            this.focusInput()
        },
        search() {
            console.log(this.value)
        }
    }
}
</script>

<template>
    <div class="search-bar">
        <span class="search-bar--prefix" @click="extend">
            <fa-icon icon="fas fa-magnifying-glass" size="lg" />
        </span>
        <transition name="extend">
            <input
                v-if="isExtended"
                ref="input"
                class="search-bar--input"
                type="text"
                v-model="value"
                @blur="collapse"
                @keyup.enter="search"
            />
        </transition>
        <span v-if="clearable" class="search-bar--suffix" @click="clear">
            <fa-icon icon="fas fa-xmark" size="lg" />
        </span>
    </div>
</template>

<style lang="scss" scoped>
.search-bar {
    overflow: hidden;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40PX;
    border-radius: 4PX;
    background-color: #fff;
}

.search-bar--prefix {
    @include pointer();
    padding: 10PX;
}

.search-bar--input {
    width: 160PX;
    height: 100%;
    padding-right: 40PX;
}

.search-bar--suffix {
    @include pointer();
    position: absolute;
    right: 10PX;
}

.extend-enter,
.extend-leave-to {
    width: 0;
    padding: 0;
}

.extend-enter-active,
.extend-leave-active {
    transition: all .5s cubic-bezier(0.4, 0, 0, 1);
}
</style>
