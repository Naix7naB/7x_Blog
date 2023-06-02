import Request from './request'

/* 获取文章列表 */
function getArticleList(data) {
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
        url: '/article/create',
        data
    })
}

export { getArticleList, uploadImg, createArticle }
