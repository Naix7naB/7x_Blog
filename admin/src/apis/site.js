import Request from '@/utils/request'

/* 获取网站信息 */
function getSiteInfo() {
    return Request.requestForm({
        methodType: Request.GET,
        url: '/site/info'
    })
}

/* 修改网站信息 */
function modifySiteInfo(data) {
    return Request.requestForm({
        methodType: Request.PUT,
        url: '/site/info',
        data
    })
}

export { getSiteInfo, modifySiteInfo }
