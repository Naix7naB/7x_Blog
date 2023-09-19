import Request from '@/utils/request'

/* 获取文章列表 */
function getArticleList(data) {
    return Request.requestForm({
        methodType: Request.GET,
        url: '/api/article',
        data
    })
}

/* 创建文章 */
function createArticle(data) {
    return Request.requestForm({
        methodType: Request.POST,
        url: '/api/article',
        data
    })
}

/* 根据文章ID修改文章内容 */
function modifyArticleById(id, data) {
    return Request.requestForm({
        methodType: Request.PUT,
        url: `/api/article/${id}`,
        data
    })
}

/* 根据文章ID删除文章 */
function deleteArticleById(id) {
    return Request.requestForm({
        methodType: Request.DELETE,
        url: `/api/article/${id}`
    })
}

export { getArticleList, createArticle, modifyArticleById, deleteArticleById }
