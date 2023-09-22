import Request from '@/utils/request'

/* 获取博客网站信息 */
function getSiteInfo() {
    return Request.requestForm({
        methodType: Request.GET,
        url: '/site/info'
    })
}

export { getSiteInfo }
