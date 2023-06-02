import Request from './request'

/* 获取文章标签列表 */
function getTagList(data) {
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
        url: '/tag/create',
        data
    })
}

export { getTagList, createTag }
