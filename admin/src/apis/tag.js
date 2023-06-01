import Request from './request'

function getTagList(data) {
    return Request.requestForm({
        methodType: Request.GET,
        url: '/api/tag',
        data
    })
}

export { getTagList }
