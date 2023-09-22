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
    cursor: pointer;

    &:not(:first-of-type) {
        margin-top: 10px;
    }

    &:hover {
        background-color: rgb(173, 121, 24);
    }

    &:hover .category-item--name {
        transform: translate3d(10px, 0, 0);
    }

    &:hover .category-item--count {
        transform: translate3d(-10px, 0, 0);
    }
}

.category-item,
.category-item--name,
.category-item--count {
    transition: all .3s ease;
}
</style>
