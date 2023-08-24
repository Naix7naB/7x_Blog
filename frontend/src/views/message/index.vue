<script>
import CommentEditor from '@/components/commentEditor'
import CommentList from '@/components/commentList'

import { getMessageComments, leaveComment } from '@/apis/comment'
import { mapGetters } from 'vuex'

export default {
    name: 'MessagePage',
    components: { CommentEditor, CommentList },
    data() {
        return {
            comments: []
        }
    },
    computed: {
        ...mapGetters(['getWebsiteInfo'])
    },
    methods: {
        async getComments() {
            try {
                const { data } = await getMessageComments({ mid: this.getWebsiteInfo.id })
                this.comments = data.list
            } catch (err) {
                this.$message.error(err || err.errMsg)
            }
        },
        handlePost(comment) {
            leaveComment({
                topic_type: 'message_comment',
                topic_id: this.getWebsiteInfo.id,
                content: comment
            }).then(res => {
                this.$message.success(res.errMsg)
                this.getComments()
            }).catch(err => {
                this.$message.error(err.errMsg)
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
        <CommentEditor title="留言" :autosize="{ minRows: 7, maxRows: 10 }" @post="handlePost" />
        <CommentList statsLabel="Messages" :showStats="true" :comments="comments" />
    </div>
</template>

<style lang="scss" scoped>
/* 留言板样式 */
.message-comment {
    width: 90%;
    margin: 0 auto;
    padding: 80px 5%;

    & > div:not(:first-of-type) {
        margin-top: 40px;
    }
}
</style>
