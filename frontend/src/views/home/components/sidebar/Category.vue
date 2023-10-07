<script>
import { getCategoryList } from '@/apis/category'
import { goToPath } from '@/utils/util'

export default {
    name: 'Category',
    data() {
        return {
            categoryList: []
        }
    },
    methods: {
        select({ id, name }) {
            goToPath({
                target: 'CategoryArticle',
                params: {
                    cid: id,
                    name: name
                }
            })
        }
    },
    created() {
        getCategoryList().then(({ data }) => {
            this.categoryList = data.list
        }).catch(err => {
            this.$message.error(err.errMsg || err)
        })
    }
}
</script>

<template>
    <ul>
        <li
            class="category-item"
            v-for="category in categoryList"
            :key="category.id"
            @click="select(category)"
        >
            <span class="category-item--name">
                <fa-icon icon="fas fa-angle-right" />&nbsp;<span>{{ category.name }}</span>
            </span>
            <span class="category-item--count">{{ category.articles.length }}</span>
        </li>
    </ul>
</template>

<style lang="scss" scoped>
/* 分类卡片样式 */
.category-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    line-height: $lh-large-x;
    border-radius: 2em;
    transition: background-color .3s ease-out;
    cursor: pointer;

    &:not(:first-of-type) {
        margin-top: 10px;
    }

    &:hover {
        @include bg-color(bg-accent);
        color: rgba($color: $cl-light-3, $alpha: .8);
    }

    &:hover .category-item--name {
        transform: translate(10px, 0);
    }

    &:hover .category-item--count {
        transform: translate(-10px, 0);
    }
}

.category-item--name,
.category-item--count {
    transition: transform .3s ease;
}
</style>
