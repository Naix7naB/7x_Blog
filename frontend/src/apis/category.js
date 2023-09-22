import Request from '@/utils/request'

/* 获取所有分类 */
function getCategoryList() {
    return Request.requestForm({
        methodType: Request.GET,
        url: '/api/category',
        data: {
            page: 1,
            size: 10,
            populate: ''
        }
    })
}

export { getCategoryList }
