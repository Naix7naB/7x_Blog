import Request from '@/utils/request'

/* 获取文章列表 */
function getArticleList({ page = 1, size = 10 } = {}) {
    return Request.requestForm({
        methodType: Request.GET,
        url: '/api/article',
        data: {
            page,
            size,
            populate: [
                {
                    path: 'classify',
                    select: 'name'
                },
                {
                    path: 'tags',
                    select: 'name'
                }
            ],
            select: '-author -content -comments -state'
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
            sort: {
                view_num: -1
            },
            populate: {
                path: 'author',
                select: 'nickname'
            },
            select: 'title description cover_img view_num'
        }
    })
}

/* 获取所属分类文章列表 */
function getClassifyArticles({ page = 1, size = 10, classify_id } = {}) {
    return Request.requestForm({
        methodType: Request.GET,
        url: '/api/article',
        data: {
            page,
            size,
            condition: {
                classify: classify_id
            },
            populate: [
                {
                    path: 'classify',
                    select: 'name'
                },
                {
                    path: 'tags',
                    select: 'name'
                }
            ],
            select: '-author -content -comments -state'
        }
    })
}

/* 获取所属分类文章列表 */
function getTagArticles({ page = 1, size = 10, tag_id } = {}) {
    return Request.requestForm({
        methodType: Request.GET,
        url: '/api/article',
        data: {
            page,
            size,
            condition: {
                tags: {
                    $in: [tag_id]
                }
            },
            populate: [
                {
                    path: 'classify',
                    select: 'name'
                },
                {
                    path: 'tags',
                    select: 'name'
                }
            ],
            select: '-author -content -comments -state'
        }
    })
}

/* 根据文章ID获取详细内容 */
function getArticleInfoById(aid) {
    return Request.request({
        methodType: Request.GET,
        url: `/api/article/${aid}`
    })
}

export {
    getArticleList,
    getRecommendArticles,
    getClassifyArticles,
    getTagArticles,
    getArticleInfoById
}
