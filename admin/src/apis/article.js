import Request from '@/utils/request'

/* 获取文章列表 */
function getArticleList({ page, size } = {}) {
    return Request.requestForm({
        methodType: Request.GET,
        url: '/api/article',
        data: {
            page,
            size
        }
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

/* 更新文章内容 */
function modifyArticleById(id, updates) {
    return Request.requestForm({
        methodType: Request.PUT,
        url: `/api/article/${id}`,
        data: updates
    })
}

/* 删除文章 */
function deleteArticleById(id) {
    return Request.requestForm({
        methodType: Request.DELETE,
        url: `/api/article/${id}`
    })
}

export { getArticleList, createArticle, modifyArticleById, deleteArticleById }
