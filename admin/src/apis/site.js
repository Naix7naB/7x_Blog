import Request from '@/utils/request'

function getSiteInfo() {
    return Request.requestForm({
        methodType: Request.GET,
        url: '/site/info'
    })
}

export { getSiteInfo }
