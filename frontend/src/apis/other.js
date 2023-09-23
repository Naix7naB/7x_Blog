import Request from '@/utils/request'

/* 获取随机句子 */
function getRandomWords() {
    return Request.request({
        methodType: Request.GET,
        url: '/other/words'
    })
}

/* 获取随机图片 */
function getRandomImage() {
    return Request.request({
        methodType: Request.GET,
        url: '/other/image'
    })
}

export { getRandomWords, getRandomImage }
