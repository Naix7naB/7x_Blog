<script>
import Typed from 'typed.js'

export default {
    props: {
        text: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            typed: null,
            options: {
                strings: this.text,
                typeSpeed: 100,
                startDelay: 1000,
                backSpeed: 60,
                backDelay: 2500,
                cursorChar: '_',
                loop: true
            }
        }
    },
    mounted() {
        this.typed = new Typed('.typical', this.options)
    },
    beforeDestroy() {
        this.typed.destroy()
        this.typed = null
    }
}
</script>

<template>
    <span class="typical"></span>
</template>

<style lang="scss" scoped>
.typical {
    font-weight: 700;
}
</style>
