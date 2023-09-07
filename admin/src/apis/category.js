import Request from '@/utils/request'

/* 获取文章分类列表 */
function getCategoryList(data) {
    return Request.requestForm({
        methodType: Request.GET,
        url: '/api/category',
        data
    })
}

/* 创建文章分类 */
function createCategory(data) {
    return Request.requestForm({
        methodType: Request.POST,
        url: '/api/category',
        data
    })
}

/* 修改文章分类 */
function modifyCategoryById(id, data) {
    return Request.requestForm({
        methodType: Request.PUT,
        url: `/api/category/${id}`,
        data
    })
}

/* 删除文章分类 */
function deleteCategoryById(id) {
    return Request.request({
        methodType: Request.DELETE,
        url: `/api/category/${id}`
    })
}

export { getCategoryList, createCategory, modifyCategoryById, deleteCategoryById }
