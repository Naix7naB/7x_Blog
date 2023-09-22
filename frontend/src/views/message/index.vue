<script>
import CommentEditor from '@/components/commentEditor'
import CommentList from '@/components/commentList'

import { getMessageComments, leaveComment } from '@/apis/comment'
import { mapGetters } from 'vuex'

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
        ...mapGetters('site', ['getSiteInfo']),
        topic() {
            return {
                type: 'message_comment',
                title: this.getSiteInfo.name,
                id: this.getSiteInfo.id
            }
        }
    },
    methods: {
        async getComments() {
            try {
                const { data } = await getMessageComments({ mid: this.getSiteInfo.id })
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
        <CommentEditor title="留言" :autosize="{ minRows: 7, maxRows: 10 }" @post="postMessage" />
        <CommentList statsLabel="Messages" :showStats="true" :comments="comments" />
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

@media screen and (max-width: 1000px) {
    .message-comment {
        width: 100%;
    }
}
</style>
