<script>
import { getTagList } from '@/apis/tag'
import { goToPath } from '@/utils/util'

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
        select({ id, name }) {
            goToPath({
                target: 'ClassifyArticle',
                params: {
                    cid: id,
                    name: name
                }
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
        <li class="tag-item" v-for="tag in tags" :key="tag.id" @click="() => select(tag)">
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
