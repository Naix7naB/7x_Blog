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
                target: 'TagArticle',
                params: {
                    tid: id,
                    name: name
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
    <ul class="tags">
        <li
            class="tag-item"
            v-for="tag in tags"
            :key="tag.id"
            :style="{ backgroundColor: tag.color }"
            @click="select(tag)"
        >
            <fa-icon class="tag-icon" icon="fas fa-tag" />{{ tag.name }}
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
    padding: 2px 10px;
    border-radius: 2px;
    transition: transform .3s;
    cursor: pointer;

    &:hover {
        transform: translate3d(0, -4px, 1px);
    }
}

.tag-icon {
    margin-right: 6px;
    vertical-align: -4px;
}
</style>
