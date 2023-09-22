<script>
import Hashtag from '@/components/hashtag'

import { getCategoryList } from '@/apis/category'
import { goToPath } from '@/utils/util'

export default {
    name: 'CategoryList',
    components: { Hashtag },
    data() {
        return {
            tags: []
        }
    },
    methods: {
        choose({ tagId, tagName }) {
            goToPath({
                target: 'CategoryArticle',
                params: {
                    cid: tagId,
                    name: tagName
                }
            })
        }
    },
    created() {
        getCategoryList().then(({ data }) => {
            this.tags = data.list
        }).catch(err => {
            this.$message.error(err.errMsg || err)
        })
    }
}
</script>

<template>
    <div class="category-list">
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
.category-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}
</style>
