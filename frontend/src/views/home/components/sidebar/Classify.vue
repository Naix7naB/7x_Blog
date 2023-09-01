<script>
import { getClassifyList } from '@/apis/classify'
import { goToPath } from '@/utils/util'

export default {
    name: 'Classify',
    data() {
        return {
            classifyList: []
        }
    },
    methods: {
        select( id, name ) {
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
        getClassifyList().then(({ data }) => {
            this.classifyList = data.list
        }).catch(err => {
            this.$message.error(err.errMsg)
        })
    }
}
</script>

<template>
    <ul>
        <li
            class="classify-item"
            v-for="classify in classifyList"
            :key="classify.id"
            @click="() => select(classify)"
        >
            <span class="classify-item--name">
                <fa-icon icon="fas fa-angle-right" />&nbsp;<span>{{ classify.name }}</span>
            </span>
            <span class="classify-item--count">{{ classify.articles.length }}</span>
        </li>
    </ul>
</template>

<style lang="scss" scoped>
/* 分类卡片样式 */
.classify-item {
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

    &:hover .classify-item--name {
        transform: translate3d(10px, 0, 0);
    }

    &:hover .classify-item--count {
        transform: translate3d(-10px, 0, 0);
    }
}

.classify-item,
.classify-item--name,
.classify-item--count {
    transition: all .3s ease;
}
</style>
