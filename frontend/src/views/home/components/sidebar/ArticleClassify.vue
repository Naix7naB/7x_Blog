<script>
import { getClassifyList } from '@/apis/classify'

export default {
    name: 'ArticleClassify',
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
    <div class="article-classify">
        <div class="article-classify--label"><fa-icon icon="far fa-folder-open" /> 文章分类</div>
        <ul>
            <li class="article-classify-item" v-for="classify in classifyList" :key="classify.id">
                <fa-icon icon="fas fa-angle-right" />
                <span class="article-classify--name">{{ classify.name }}</span>
            </li>
        </ul>
    </div>
</template>

<style lang="scss" scoped>
/* 文章分类卡片样式 */
.article-classify--label {
    margin-bottom: 20px;
    font-size: $fz-medium-x;
}

.article-classify-item {
    line-height: $lh-large-x;
    padding: 0 20px;
    border-radius: 1rem;
    transition: background-color .3s ease;
    cursor: pointer;

    &:not(:first-of-type) {
        margin-top: 6px;
    }

    &:hover {
        background-color: rgb(173, 121, 24);
    }
}

.article-classify--name {
    margin-left: 4px;
}
</style>
