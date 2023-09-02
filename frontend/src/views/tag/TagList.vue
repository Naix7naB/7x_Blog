<script>
import Hashtag from '@/components/hashtag'

import { getTagList } from '@/apis/tag'
import { goToPath } from '@/utils/util'

export default {
    name: 'TagList',
    components: { Hashtag },
    data() {
        return {
            tags: []
        }
    },
    methods: {
        choose({ tagId, tagName }) {
            goToPath({
                target: 'TagArticle',
                params: {
                    tid: tagId,
                    name: tagName
                }
            })
        }
    },
    created() {
        getTagList().then(({ data }) => {
            this.tags = data.list
        }).catch(err => {
            this.$message.error(err.errMsg || err)
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
}
</style>
