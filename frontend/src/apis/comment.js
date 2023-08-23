import Request from '@/utils/request'

/* 获取文章评论列表 */
function getArticleComments({ page = 1, size = 20, aid } = {}) {
    return Request.requestForm({
        methodType: Request.GET,
        url: '/api/comment',
        data: {
            page,
            size,
            condition: {
                topic_type: 'article_comment',
                topic_id: aid
            }
        }
    })
}

/* 发表评论 */
function leaveComment(data) {
    return Request.request({
        methodType: Request.POST,
        url: '/comment/leave',
        data
    })
}

/* 回复评论 */
function replyComment(data) {
    return Request.request({
        methodType: Request.POST,
        url: '/comment/reply',
        data
    })
}

export { getArticleComments, leaveComment, replyComment }
