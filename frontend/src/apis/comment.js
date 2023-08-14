import Request from '@/utils/request'

/* 获取文章评论列表 */
function getArticleComments(aid) {
    return Request.requestForm({
        methodType: Request.GET,
        url: '/api/comment',
        data: {
            condition: { aid }
        }
    })
}

/* 发布评论 */
function postComment(data) {
    return Request.request({
        methodType: Request.POST,
        url: '/api/comment',
        data
    })
}

export { getArticleComments, postComment }
