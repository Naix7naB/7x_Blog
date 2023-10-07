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
                backgroundColor: this.color
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
        <span class="hashtag-name">{{ tagName }}</span>
        <span class="hashtag-count">{{ count }}</span>
    </div>
</template>

<style lang="scss" scoped>
/* 标签样式 */
.hashtag {
    @include shadow-color(shadow, .8);
    display: flex;
    align-items: center;
    margin: 10px;
    padding: 16px 20px;
    border-radius: 4px;
    background-color: $cl-dark-1;
    transition: background-color .3s ease, box-shadow .3s ease, transform .3s ease;
    cursor: pointer;

    &:hover {
        @include shadow-color(shadow-hover, .5, 1);
        background-color: rgb(44, 71, 138) !important;
        transform: scale(1.1);
    }
}

.hashtag-icon {
    font-size: $fz-large-x;
}

.hashtag-name {
    padding: 0 10px 0 4px;
    font-size: 28px;
}

.hashtag-count {
    padding: 8px 6px;
    text-align: center;
    font-size: $fz-medium;
    border-radius: 4px;
    background-color: rgba($color: $cl-dark-7, $alpha: .5);
}
</style>
