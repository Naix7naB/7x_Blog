<script>
import CommentEditor from '@/components/commentEditor'
import CommentList from '@/components/commentList'

import { getCommentList, leaveComment } from '@/apis/comment'

export default {
    name: 'MessagePage',
    components: { CommentEditor, CommentList },
    provide() {
        return {
            topic: this.topic
        }
    },
    data() {
        return {
            comments: []
        }
    },
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
        async getComments() {
            try {
                const { data } = await getCommentList({
                    topic_type: this.topic.type,
                    topic_id: this.topic.id
                })
                this.comments = data.list
            } catch (err) {
                this.$message.error(err || err.errMsg)
            }
        },
        postMessage(message) {
            leaveComment({
                topic_type: this.topic.type,
                topic_title: this.topic.title,
                topic_id: this.topic.id,
                content: message
            }).then(res => {
                this.$message.success(res.errMsg)
                this.getComments()
            }).catch(err => {
                this.$message.error(err.errMsg || err)
            })
        }
    },
    created() {
        this.getComments()
        this.$bus.$on('refreshComments', this.getComments)
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
        <CommentList :stats="stats" :comments="comments" />
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
