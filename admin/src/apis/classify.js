import Request from '@/utils/request'

/* 获取文章分类列表 */
function getClassifyList(data) {
    return Request.requestForm({
        methodType: Request.GET,
        url: '/api/classify',
        data
    })
}

/* 创建文章分类 */
function createClassify(data) {
    return Request.requestForm({
        methodType: Request.POST,
        url: '/api/classify',
        data
    })
}

/* 修改文章分类 */
function modifyClassifyById(id, data) {
    return Request.requestForm({
        methodType: Request.PUT,
        url: `/api/classify/${id}`,
        data
    })
}

/* 删除文章分类 */
function deleteClassifyById(id) {
    return Request.request({
        methodType: Request.DELETE,
        url: `/api/classify/${id}`
    })
}

export { getClassifyList, createClassify, modifyClassifyById, deleteClassifyById }
