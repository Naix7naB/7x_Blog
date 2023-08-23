<script>
import { getTagList } from '@/apis/tag'

export default {
    name: 'Tag',
    data() {
        return {
            tags: []
        }
    },
    computed: {

    },
    methods: {
        select(e) {
            let target = e.target
            while(target.className !== 'tag-item') {
                target = target.parentElement
            }
            const { tagId, tagName } = target.dataset
            this.$router.push({
                name: 'TagArticle',
                params: { tagId, tagName }
            })
        }
    },
    created() {
        getTagList().then(({ data }) => {
            this.tags = data.list
        }).catch(err => {
            this.$message.error(err.errMsg)
        })
    }
}
</script>

<template>
    <ul class="tags">
        <li
            class="tag-item"
            v-for="tag in tags"
            :key="tag.id"
            :data-tag-id="tag.id"
            :data-tag-name="tag.name"
            @click="select"
        >
            <span :style="{ color: tag.color }">{{ tag.name }}</span>
        </li>
    </ul>
</template>

<style lang="scss" scoped>
/* 分类卡片样式 */
.tags {
    display: flex;
    flex-wrap: wrap;
}

.tag-item {
    margin: 6px;
    padding: 3px 8px;
    font-size: $fz-small;
    border-radius: 4px;
    background-color: #333;
    transition: all .3s;
    cursor: pointer;

    &:hover {
        transform: scale(1.15);
    }
}
</style>
