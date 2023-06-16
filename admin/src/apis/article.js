import Request from './request'

/* 获取文章列表 */
function fetchArticles(data) {
    return Request.requestForm({
        methodType: Request.GET,
        url: '/api/article',
        data
    })
}

/* 上传文章相关的图片 */
async function uploadImg({ filename, file }) {
    const { data } = await Request.postFile({
        url: '/upload/article',
        data: {
            [filename]: file
        }
    })
    return {
        ...data.fileUrls[0]
    }
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
function updateArticleById(id, updates) {
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

export { fetchArticles, uploadImg, createArticle, updateArticleById, deleteArticleById }
