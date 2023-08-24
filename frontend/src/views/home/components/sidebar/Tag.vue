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
            <span
                v-text="tag.name"
                class="tag-name"
                :data-count="tag.articles.length"
                :style="{ color: tag.color }"
            />
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
    margin: 8px 4px;
    transition: transform .3s;

    &:hover {
        transform: scale(1.15);
    }
}

.tag-name {
    position: relative;
    padding: 2px 10px;
    font-size: $fz-large;
    cursor: pointer;

    &::after {
        content: attr(data-count);
        position: absolute;
        top: 0;
        right: 0;
        font-size: $fz-small;
    }
}
</style>
