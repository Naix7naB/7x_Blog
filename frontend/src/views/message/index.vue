<script>
import Comment from '@/components/comment'

export default {
    components: { Comment },
    data() {
        return {}
    }
}
</script>

<template>
    <div class="message-page">
        <Comment />
    </div>
</template>

<style lang="scss" scoped>
/* 留言页面样式 */
.message-page {
    width: 90%;
    margin: 0 auto;
    padding: 80px;
}
</style>
