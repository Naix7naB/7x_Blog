import Request from './request'

function getArticleList(data) {
    return Request.requestForm({
        methodType: Request.GET,
        url: '/api/article',
        data
    })
}

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

function createArticle(data) {
    return Request.requestJson({
        methodType: Request.POST,
        url: '/article/create',
        data
    })
}

export { getArticleList, uploadImg, createArticle }
