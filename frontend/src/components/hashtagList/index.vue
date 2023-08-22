<script>
export default {
    name: 'HashtagList',
    props: {
        tags: {
            type: Array,
            default: () => []
        }
    }
}
</script>

<template>
    <div class="hashtag-list">
        <div
            class="hashtag-item shadow-box"
            v-for="tag in tags"
            :key="tag.id"
            @click="() => $emit('choose', tag)"
        >
            <span class="hashtag-icon">#</span>
            <span class="hashtag-name">{{ tag.name }}</span>
            <span class="hashtag-count">{{ tag.articles.length }}</span>
        </div>
    </div>
</template>

<style lang="scss" scoped>
/* 标签列表样式 */
.hashtag-list {
    display: flex;
    flex-wrap: wrap;
}

.hashtag-item {
    display: flex;
    align-items: center;
    margin: 10px;
    padding: 16px 20px;
    border-radius: 8px;
    color: #c6c1b9;
    background-color: #24272d;
    cursor: pointer;
}

.hashtag-icon {
    font-size: $fz-large-x;
    color: #828080;
}

.hashtag-name {
    padding: 0 8px 0 4px;
    font-size: 28px;
}

.hashtag-count {
    display: inline-block;
    min-width: 30px;
    padding: 4px;
    font-size: $fz-medium-x;
    text-align: center;
    border-radius: 8px;
    background-color: #363636;
}
</style>
