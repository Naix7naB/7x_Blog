<script>
import TagCloud from 'TagCloud'

export default {
    props: {
        height: {
            type: String,
            default: '400px'
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
    computed: {
        tagCloudStyle() {
            return {
                width: '100%',
                height: '100%'
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
    <div class="dashboard-card" :style="{ height }">
        <div ref="tagCloud" :style="tagCloudStyle"></div>
    </div>
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
