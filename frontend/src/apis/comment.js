import Request from '@/utils/request'

/* 获取评论列表 */
function getCommentList({ page = 1, size = 10, topic_type, topic_title, topic_id } = {}) {
    return Request.requestForm({
        methodType: Request.GET,
        url: '/api/comment',
        data: {
            page,
            size,
            condition: {
                topic_type,
                topic_title,
                topic_id,
                parent_id: {
                    $type: 'null'
                }
            }
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

export { getCommentList, leaveComment }
