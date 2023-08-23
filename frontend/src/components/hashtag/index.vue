<script>
export default {
    name: 'Hashtag',
    props: {
        tagId: {
            type: String,
            required: true
        },
        tagName: {
            type: String,
            required: true
        },
        count: {
            type: Number,
            required: true
        },
        color: {
            type: String,
            default: ''
        }
    },
    computed: {
        tagStyle() {
            return {
                color: this.color
            }
        }
    },
    methods: {
        onClick() {
            this.$emit('choose', {
                tagId: this.tagId,
                tagName: this.tagName
            })
        }
    }
}
</script>

<template>
    <div class="hashtag" :style="tagStyle" @click="onClick">
        <span class="hashtag-icon">#</span>
        <span class="hashtag-name" :data-count="count">{{ tagName }}</span>
    </div>
</template>

<style lang="scss" scoped>
/* 标签样式 */
.hashtag {
    user-select: none;
    display: flex;
    align-items: center;
    margin: 10px;
    padding: 16px 20px;
    border-radius: 8px;
    border: 1px solid #343435;
    background-color: #1d1e21;
    box-shadow: 0 0 20px -10px #6c6c6b;
    transition: all .3s;
    cursor: pointer;

    &:hover {
        color: #c6c1b9 !important;
        border: 1px solid #646464;
        background-color: #2c478a;
        transform: scale(1.1);
    }
}

.hashtag-icon {
    font-size: $fz-large-x;
}

.hashtag-name {
    position: relative;
    padding: 0 16px 0 4px;
    font-size: 28px;

    &::after {
        content: attr(data-count);
        position: absolute;
        top: -6px;
        right: -10px;
        width: 1em;
        height: 1em;
        padding: 2px;
        font-size: $fz-medium;
        text-align: center;
        border-radius: 50%;
        background-color: rgba($color: #2a2929, $alpha: .5);
    }
}
</style>
