<script>
import { getClassifyList } from '@/apis/classify'

export default {
    name: 'Classify',
    data() {
        return {
            classifyList: []
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
        <li class="classify-item" v-for="classify in classifyList" :key="classify.id">
            <div class="classify-item--wrapper">
                <fa-icon icon="fas fa-angle-right" />
                <span class="classify-item--name">{{ classify.name }}</span>
            </div>
        </li>
    </ul>
</template>

<style lang="scss" scoped>
/* 分类卡片样式 */
.classify-item {
    border-radius: 2em;
    cursor: pointer;

    &:not(:first-of-type) {
        margin-top: 10px;
    }

    &:hover {
        background-color: rgb(173, 121, 24);
    }

    &:hover .classify-item--wrapper {
        transform: translate3d(10px, 0, 0);
    }
}

.classify-item--wrapper {
    padding: 0 20px;
    line-height: $lh-large-x;
}

.classify-item,
.classify-item--wrapper {
    transition: all .2s ease;
}

.classify-item--name {
    margin-left: 4px;
}
</style>
