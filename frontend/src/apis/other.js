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

/* 获取波浪HTML */
function getWaveHtml() {
    return Request.request({
        methodType: Request.GET,
        url: '/other/wave'
    })
}

export { getRandomWords, getRandomImage, getWaveHtml }
