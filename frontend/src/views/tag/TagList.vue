<script>
import Hashtag from '@/components/hashtag'

import { getTagList } from '@/apis/tag'

export default {
    name: 'ClassifyList',
    components: { Hashtag },
    data() {
        return {
            tags: []
        }
    },
    methods: {
        choose({ tagId, tagName }) {
            this.$router.push({
                name: 'TagArticle',
                params: { tagId, tagName }
            })
        }
    },
    created() {
        getTagList().then(({ data }) => {
            this.tags = data.list
            this.$bus.$emit('assignTitle', this.$route.meta.secondTitle)
        }).catch(err => {
            this.$message.error(err.errMsg)
        })
    }
}
</script>

<template>
    <div class="tag-list">
        <Hashtag
            v-for="tag in tags"
            :key="tag.id"
            :tag-id="tag.id"
            :tag-name="tag.name"
            :color="tag.color"
            :count="tag.articles.length"
            @choose="choose"
        />
    </div>
</template>

<style lang="scss" scoped>
/* 标签列表样式 */
.tag-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    padding: 40px;
}
</style>
