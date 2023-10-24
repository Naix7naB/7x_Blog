import Request from '@/utils/request'

/* 获取文章列表 */
function getArticleList({ page = 1, size = 10, condition, query }) {
    return Request.requestForm({
        methodType: Request.GET,
        url: '/api/article',
        data: {
            page,
            size,
            condition: {
                ...condition,
                published: true
            },
            query,
            populate: [
                {
                    path: 'category',
                    select: 'name'
                },
                {
                    path: 'tags',
                    select: 'name'
                }
            ],
            select: '-author -comments -published'
        }
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
            condition: {
                published: true
            },
            sort: {
                view_count: -1
            },
            populate: '',
            select: 'title description cover_img view_count'
        }
    })
}

/* 获取按照日期排序(降序)的文章列表 */
function getArticlesAndSortedByDate(condition) {
    return Request.requestForm({
        methodType: Request.GET,
        url: '/api/article',
        data: {
            condition: {
                ...condition,
                published: true
            },
            populate: '',
            sort: {
                created_at: -1
            },
            select: '-author -content -category -tags -comments -published'
        }
    })
}

/* 根据文章ID修改点赞状态 */
function getArticleInfoById(aid) {
    return Request.request({
        methodType: Request.GET,
        url: `/api/article/${aid}`
    })
}

function changeLikeState(aid) {
    return Request.request({
        methodType: Request.POST,
        url: `/article/like/${aid}`
    })
}

export {
    getArticleList,
    getRecommendArticles,
    getArticlesAndSortedByDate,
    getArticleInfoById,
    changeLikeState
}
