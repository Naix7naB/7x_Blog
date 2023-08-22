import Request from '@/utils/request'

/* 获取所有标签 */
function getTagList() {
    return Request.requestForm({
        methodType: Request.GET,
        url: '/api/tag',
        data: {
            page: 1,
            size: 10,
            populate: {
                path: '-'
            }
        }
    })
}

export { getTagList }
