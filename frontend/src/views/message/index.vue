<script>
import CommentEditor from '@/components/commentEditor'
import CommentList from '@/components/commentList'

import { leaveComment } from '@/apis/comment'

export default {
    name: 'MessagePage',
    components: { CommentEditor, CommentList },
    computed: {
        siteInfo() {
            return this.$store.getters.siteInfo
        },
        stats() {
            return {
                label: 'Messages',
                total: this.siteInfo.message_count
            }
        },
        topic() {
            return {
                type: 'message',
                title: this.siteInfo.name,
                id: this.siteInfo.id
            }
        }
    },
    methods: {
        postMessage(message) {
            leaveComment({
                topic_type: this.topic.type,
                topic_title: this.topic.title,
                topic_id: this.topic.id,
                content: message
            }).then(res => {
                this.$message.success(res.errMsg)
                this.$refs.commentList.refresh()
            }).catch(err => {
                this.$message.error(err.errMsg || err)
            })
        }
    }
}
</script>

<template>
    <div class="message-comment">
        <CommentEditor
            title="留言"
            :type="topic.type"
            :autosize="{ minRows: 7, maxRows: 10 }"
            @post="postMessage"
        />
        <CommentList ref="commentList" :topic="topic" :stats="stats" />
    </div>
</template>

<style lang="scss" scoped>
/* 留言板样式 */
.message-comment {
    width: 85%;
    margin: auto;

    & > div:not(:first-of-type) {
        margin-top: 40px;
    }
}

/* 媒体查询样式 */
@media screen and (max-width: 1000px) {
    .message-comment {
        width: 100%;
    }
}
</style>
