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

/* 获取推荐文章列表 */
function getRecommendArticles() {
    return Request.requestForm({
        methodType: Request.GET,
        url: '/api/article',
        data: {
            page: 1,
            size: 3,
            sort: {
                view_num: -1
            },
            populate: {
                path: 'author',
                select: 'nickname avatar'
            },
            select: 'title description cover_img view_num'
        }
    })
}

export { getArticleList, getArticleInfoById, getRecommendArticles }
