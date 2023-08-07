import Request from '@/utils/request'

/* 获取文章列表 */
function getArticleList(data) {
    return Request.requestForm({
        methodType: Request.GET,
        url: '/api/article',
        data
    })
}

/* 根据文章ID获取详细内容 */
function getArticleInfoById(aid) {
    return Request.request({
        methodType: Request.GET,
        url: `/api/article/${aid}`
    })
}

export { getArticleList, getArticleInfoById }
