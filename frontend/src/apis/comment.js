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
            },
            populate: [
                {
                    path: 'reviewer',
                    select: 'avatar nickname'
                },
                {
                    path: 'mention',
                    select: 'avatar nickname'
                }
            ]
        }
    })
}

/* 获取浏览板评论列表 */
function getMessageComments({ page = 1, size = 20, mid } = {}) {
    return Request.requestForm({
        methodType: Request.GET,
        url: '/api/comment',
        data: {
            page,
            size,
            condition: {
                topic_type: 'message_comment',
                topic_id: mid
            },
            populate: [
                {
                    path: 'reviewer',
                    select: 'avatar nickname'
                },
                {
                    path: 'mention',
                    select: 'avatar nickname'
                }
            ]
        }
    })
}

/* 发表评论 */
function leaveComment(data) {
    return Request.request({
        methodType: Request.POST,
        url: '/comment',
        data
    })
}

export { getArticleComments, getMessageComments, leaveComment }
