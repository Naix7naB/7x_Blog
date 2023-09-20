<script>
import TagCloud from 'TagCloud'

import { getTagList } from '@/apis/tag'

export default {
    name: 'TagCloud',
    data() {
        return {
            tagcloud: null
        }
    },
    computed: {
        tagcloudOpt() {
            return {
                radius: 120,
                direction: 45,
                keep: false,
                initSpeed: 'fast',
                maxSpeed: 'fast',
                containerClass: 'tag-cloud',
                itemClass: 'tag-cloud--item',
                useContainerInlineStyles: false
            }
        },
        tagcloudStyle() {
            return {
                width: '100%',
                height: '100%'
            }
        }
    },
    methods: {
        initTagcloud(list) {
            const texts = list.map(item => item.name)
            this.tagcloud = TagCloud(this.$refs.tagCloud, texts, this.tagcloudOpt)
        },
        drawTagcloudColor(list) {
            document.querySelectorAll('.tag-cloud--item').forEach(tag => {
                const text = tag.textContent ?? tag.innerText
                const idx = list.findIndex(item => item.name === text)
                if (idx === -1) return false
                tag.style.color = list[idx]['color']
            })
        }
    },
    mounted() {
        getTagList({
            populate: '',
            select: 'name color'
        }).then(({ data }) => {
            this.initTagcloud(data.list)
            this.drawTagcloudColor(data.list)
        }).catch(err => {
            this.$message.error(err.errMsg || err)
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
    <div ref="tagCloud" :style="tagcloudStyle"></div>
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
