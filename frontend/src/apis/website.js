import Request from '@/utils/request'

/* 获取博客网站信息 */
function getWebsiteInfo() {
    return Request.requestForm({
        methodType: Request.GET,
        url: '/api/website',
        data: {
            populate: {
                path: 'host',
                select: 'nickname username avatar email'
            }
        }
    })
}

export { getWebsiteInfo }
