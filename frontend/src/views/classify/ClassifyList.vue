<script>
import Hashtag from '@/components/hashtag'

import { getClassifyList } from '@/apis/classify'
import { goToPath } from '@/utils/util'

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
            goToPath({
                target: 'ClassifyArticle',
                params: {
                    cid: tagId,
                    name: tagName
                }
            })
        }
    },
    created() {
        getClassifyList().then(({ data }) => {
            this.tags = data.list
        }).catch(err => {
            this.$message.error(err.errMsg)
        })
    }
}
</script>

<template>
    <div class="classify-list">
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
/* 分类列表样式 */
.classify-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}
</style>
