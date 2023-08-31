<script>
import { searchArticleList } from '@/apis/article'

export default {
    name: 'SearchBar',
    data() {
        return {
            value: ''
        }
    },
    computed: {
        clearable() {
            return this.value
        }
    },
    methods: {
        clear() {
            this.value = ''
            this.$bus.$emit('refreshList')
        },
        search() {
            searchArticleList({ q: this.value }).then(({ data }) => {
                this.$bus.$emit('changeList', data)
            }).catch(err => {
                this.$message.error(err.errMsg)
            })
        }
    }
}
</script>

<template>
    <div class="search-bar">
        <input type="text" placeholder="搜索文章" v-model="value" @keyup.enter="search" />
        <span v-if="clearable" class="search-bar--clear" @click="clear">
            <fa-icon icon="fas fa-xmark" />
        </span>
    </div>
</template>

<style lang="scss" scoped>
/* 搜索栏卡片样式 */
.search-bar {
    position: relative;
}

.search-bar input {
    width: 100%;
    height: 30px;
    padding: 0 32px 0 14px;
    border: 2px solid #39c5bb;
    border-radius: 2rem;
    background-color: #ffffff;
}

.search-bar--clear {
    position: absolute;
    top: 3px;
    right: 12px;
    padding: 4px;
    cursor: pointer;
}
</style>
