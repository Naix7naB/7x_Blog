import Request from '@/utils/request'

/* 获取文章标签列表 */
function fetchTags(data) {
    return Request.requestForm({
        methodType: Request.GET,
        url: '/api/tag',
        data
    })
}

/* 创建文章标签 */
function createTag(data) {
    return Request.requestForm({
        methodType: Request.POST,
        url: '/api/tag',
        data
    })
}

/* 删除文章标签 */
function deleteTagById(id) {
    return Request.request({
        methodType: Request.DELETE,
        url: `/api/tag/${id}`
    })
}

export { fetchTags, createTag, deleteTagById }
