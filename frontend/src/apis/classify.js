import Request from '@/utils/request'

/* 获取所有分类 */
function getClassifyList() {
    return Request.requestForm({
        methodType: Request.GET,
        url: '/api/classify',
        data: {
            page: 1,
            size: 10,
            populate: {
                path: 'creator',
                select: 'nickname avatar'
            }
        }
    })
}

export { getClassifyList }
