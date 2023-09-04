import Request from '@/utils/request'

/* 获取文章评论列表 */
function getArticleComments({ page = 1, size = 10 } = {}) {
    return Request.requestForm({
        methodType: Request.GET,
        url: '/api/comment',
        data: {
            page,
            size,
            condition: {
                topic_type: 'article_comment'
            }
        }
    })
}

/* 获取留言列表 */
function getMessageComments({ page = 1, size = 10 } = {}) {
    return Request.requestForm({
        methodType: Request.GET,
        url: '/api/comment',
        data: {
            page,
            size,
            condition: {
                topic_type: 'message_comment'
            }
        }
    })
}

/* 删除 */
// function deleteClassifyById(id) {
//     return Request.request({
//         methodType: Request.DELETE,
//         url: `/api/classify/${id}`
//     })
// }

export { getArticleComments, getMessageComments }
