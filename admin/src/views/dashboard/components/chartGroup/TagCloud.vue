<script>
import TagCloud from 'TagCloud'

import { mapGetters } from 'vuex'

export default {
    name: 'TagCloud',
    data() {
        return {
            tagcloud: null
        }
    },
    computed: {
        ...mapGetters('article', ['getTagList']),
        tagCloudStyle() {
            return {
                width: '100%',
                height: '100%'
            }
        }
    },
    mounted() {
        this.tagcloud = TagCloud(
            this.$refs.tagCloud,
            this.getTagList.map(tag => tag.name),
            {
                radius: 120,
                direction: 45,
                keep: false,
                initSpeed: 'normal',
                maxSpeed: 'normal',
                containerClass: 'tag-cloud',
                itemClass: 'tag-cloud--item',
                useContainerInlineStyles: false
            }
        )
        document.querySelectorAll('.tag-cloud--item').forEach(tag => {
            this.getTagList.forEach(item => {
                const text = tag.textContent ?? tag.innerText
                if (item.name === text) {
                    tag.style.color = item.color
                }
            })
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
    <div ref="tagCloud" :style="tagCloudStyle"></div>
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
