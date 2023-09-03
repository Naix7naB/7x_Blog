<script>
import TagCloud from 'TagCloud'

export default {
    props: {
        width: {
            type: String,
            default: '100%'
        },
        height: {
            type: String,
            default: '300px'
        }
    },
    data() {
        return {
            tagcloud: null,
            texts: ['Vue', 'Nodejs', 'JavaScript', 'CSS'],
            options: {
                keep: false,
                initSpeed: 'fast',
                maxSpeed: 'fast',
                containerClass: 'tag-cloud',
                itemClass: 'tag-cloud--item',
                useContainerInlineStyles: false
            }
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.tagcloud = TagCloud(this.$refs.tagCloud, this.texts, this.options)
        })
    },
    beforeDestroy() {
        if (!this.tagcloud) return false
        this.tagcloud.destroy()
        this.tagcloud = null
    }
}
</script>

<template>
    <div ref="tagCloud" :style="{ width: width, height: height }"></div>
</template>

<style lang="scss" scoped>
:deep(.tag-cloud) {
    position: relative;
    width: 100%;
    height: 100%;
    margin: 0 auto;
    color: #333;
}
</style>
