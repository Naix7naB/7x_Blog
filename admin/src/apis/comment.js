import Request from '@/utils/request'

/* 获取文章评论列表 */
function getArticleComments({ page, size, query }) {
    return Request.requestForm({
        methodType: Request.GET,
        url: '/api/comment',
        data: {
            page,
            size,
            condition: {
                topic_type: 'article'
            },
            query
        }
    })
}

/* 获取留言列表 */
function getMessageComments({ page, size, query }) {
    return Request.requestForm({
        methodType: Request.GET,
        url: '/api/comment',
        data: {
            page,
            size,
            condition: {
                topic_type: 'message'
            },
            query
        }
    })
}

/* 根据id删除评论 */
function deleteCommentById(id) {
    return Request.request({
        methodType: Request.DELETE,
        url: `/comment/${id}`
    })
}

export { getArticleComments, getMessageComments, deleteCommentById }
